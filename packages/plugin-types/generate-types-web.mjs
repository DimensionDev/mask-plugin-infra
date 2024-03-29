import ts from 'typescript'
import { writeFile, readFile } from 'node:fs/promises'

const contains = [
    'atob',
    'btoa',
    'TextEncoder',
    'TextDecoder',
    'crypto',
    'EventTarget',
    'URL',
    'fetch',
    'AbortController',
    'CustomEvent',
    'DOMException',
    'FileReader',
    'IdleDeadline',
    'ReadableStreamBYOBReader',
    'ReadableStreamBYOBRequest',
    'TextDecoderStream',
    'TextEncoderStream',
    // 'WebSocket',
    'console',
    'WebAssembly',
    // 'self',
    'requestIdleCallback',
    'cancelIdleCallback',
    'setInterval',
    'clearInterval',
    'setTimeout',
    'clearTimeout',
    'queueMicrotask',
    // 'structuredClone',
]
const CanContainTypeReference = [ts.SyntaxKind.TypeReference, ts.SyntaxKind.ExpressionWithTypeArguments]
/** @type {Set<string>} */
const bundledTypes = new Set()
/** @type {Set<string>} */
const excludedTypes = new Set(['URL.createObjectURL', 'FormData[[Construct]]'])
/** @type {Record<string, Set<string>>} */
const referencingTypes = Object.create(null)

const sourceFile = ts.createSourceFile(
    'index.d.ts',
    (await readFile(new URL('./node_modules/@types/web/index.d.ts', import.meta.url), 'utf8')) +
        '\n' +
        (await readFile(new URL('./node_modules/@types/web/iterable.d.ts', import.meta.url), 'utf8')),
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TS,
)
const printer = ts.createPrinter()

ts.forEachChild(sourceFile, collectReferences)
contains.forEach(bundleType)
const after = ts.transform(sourceFile, [pickDeclaration]).transformed[0]
// @ts-ignore
const text = ts.createPrinter({}).printFile(after).replaceAll('/// <reference path="./iterable.d.ts" />', '')
await writeFile(new URL('./types/web.d.ts', import.meta.url), '// This file is generated from @types/web\n' + text)

/** @param {string} name */
function bundleType(name) {
    if (bundledTypes.has(name)) return
    bundledTypes.add(name)
    for (const key in referencingTypes) {
        if (key === name || key.startsWith(name + '.') || key.startsWith(name + '[')) {
            referencingTypes[key].forEach(bundleType)
        }
    }
}

/** @type {ts.TransformerFactory<ts.SourceFile>} */
function pickDeclaration(context) {
    return (node) => {
        /** @type {(namePrefix: string) => (node: ts.Node) => ts.VisitResult<ts.Node>} */
        const visitor = (namePrefix) =>
            function self(node) {
                if (
                    ts.isInterfaceDeclaration(node) ||
                    ts.isModuleDeclaration(node) ||
                    ts.isTypeAliasDeclaration(node) ||
                    ts.isFunctionDeclaration(node) ||
                    ts.isVariableStatement(node)
                ) {
                    const name = getName(node)
                    const fullQualifiedName = namePrefix + name
                    if (excludedTypes.has(fullQualifiedName)) return
                    if (!bundledTypes.has(fullQualifiedName)) return

                    if (ts.isInterfaceDeclaration(node)) {
                        return context.factory.updateInterfaceDeclaration(
                            node,
                            undefined,
                            node.modifiers,
                            node.name,
                            node.typeParameters,
                            node.heritageClauses,
                            node.members.filter((member) => {
                                const prop = getName(member)
                                return !excludedTypes.has(fullQualifiedName + prop)
                            }),
                        )
                    } else if (ts.isVariableStatement(node)) {
                        const first = node.declarationList.declarations[0]
                        if (!first) return ts.visitEachChild(node, self, context)
                        const type = first.type
                        if (!type) return ts.visitEachChild(node, self, context)
                        if (!ts.isTypeLiteralNode(type)) return ts.visitEachChild(node, self, context)

                        return context.factory.updateVariableStatement(
                            node,
                            node.modifiers,
                            context.factory.updateVariableDeclarationList(node.declarationList, [
                                context.factory.updateVariableDeclaration(
                                    first,
                                    first.name,
                                    undefined,
                                    context.factory.updateTypeLiteralNode(
                                        type,
                                        // @ts-ignore
                                        type.members.filter((member) => {
                                            const prop = getName(member)
                                            return !excludedTypes.has(fullQualifiedName + prop)
                                        }),
                                    ),
                                    undefined,
                                ),
                            ]),
                        )
                    }
                }
                return ts.visitEachChild(node, self, context)
            }
        return ts.visitEachChild(node, visitor(''), context)
    }
}

/** @param {ts.Node} node */
function collectReferences(node, namePrefix = '') {
    if (ts.isInterfaceDeclaration(node)) {
        const localQualifiedName = node.name.text
        const fullQualifiedName = namePrefix + localQualifiedName
        const generics = collectGenerics(node.typeParameters)
        addDependency(fullQualifiedName, localQualifiedName, collectIdent(node.heritageClauses), generics)
        node.members.forEach((member) => {
            const key = getName(member)
            const propName = fullQualifiedName + key
            if (excludedTypes.has(propName)) return

            addDependency(propName, localQualifiedName, collectIdent(member), generics)
        })
    } else if (ts.isFunctionDeclaration(node)) {
        if (!node.name) return
        const localQualifiedName = node.name.text
        const fullQualifiedName = namePrefix + localQualifiedName

        const generics = collectGenerics(node.typeParameters)
        addDependency(fullQualifiedName, localQualifiedName, collectIdent(node.parameters), generics)
        addDependency(fullQualifiedName, localQualifiedName, collectIdent(node.type), generics)
    } else if (ts.isVariableStatement(node)) {
        if (node.declarationList.declarations.length > 1) return
        const ident = node.declarationList.declarations[0].name
        if (!ts.isIdentifier(ident)) return
        const localQualifiedName = ident.text
        const fullQualifiedName = namePrefix + localQualifiedName

        const type = node.declarationList.declarations[0].type
        if (type && ts.isTypeLiteralNode(type)) {
            type.members.forEach((member) => {
                const key = getName(member)
                const propName = fullQualifiedName + key
                if (excludedTypes.has(propName)) return

                addDependency(propName, localQualifiedName, collectIdent(member))
            })
        } else {
            addDependency(fullQualifiedName, localQualifiedName, collectIdent(type))
        }
    } else if (ts.isModuleDeclaration(node)) {
        if (!ts.isIdentifier(node.name)) return
        const name = namePrefix + node.name.text
        if (!node.body) return
        node.body.forEachChild((child) => collectReferences(child, `${name}.`))
    } else if (ts.isTypeAliasDeclaration(node)) {
        const localQualifiedName = node.name.text
        const fullQualifiedName = namePrefix + localQualifiedName

        addDependency(fullQualifiedName, localQualifiedName, collectIdent(node.type))
    } else if (node.kind === ts.SyntaxKind.EndOfFileToken) return
    else throw new Error(`Unhandled SyntaxKind ${ts.SyntaxKind[node.kind]}`)
}
/**
 * @param {ts.Node | ts.NodeArray<ts.Node> | undefined} node
 * @returns {Set<string>}
 */
function collectIdent(node, allowParentKinds = CanContainTypeReference) {
    const ident = new Set()
    if (!node) return ident

    if (Array.isArray(node)) {
        node.forEach((node) => collectIdent(node, allowParentKinds).forEach((t) => ident.add(t)))
    } else {
        // @ts-ignore
        ts.forEachChild(node, function visitor(node) {
            if (ts.isIdentifier(node) && allowParentKinds.includes(node.parent.kind)) {
                ident.add(node.text)
            } else ts.forEachChild(node, visitor)
        })
    }
    return ident
}

/** @param {ts.NodeArray<ts.TypeParameterDeclaration> | undefined} node */
function collectGenerics(node) {
    return new Set(node?.flatMap((param) => [...collectIdent(param, [ts.SyntaxKind.TypeParameter])]))
}

/**
 * @param {string} fullQualifiedName
 * @param {string} localQualifiedName
 * @param {string | ReadonlySet<string>} type
 * @param {ReadonlySet<string>} excludeType
 */
function addDependency(fullQualifiedName, localQualifiedName, type, excludeType = new Set()) {
    const result = typeof type === 'string' ? new Set([type]) : new Set(type)
    for (const each of excludeType) result.delete(each)
    result.delete(localQualifiedName)
    if (result.size === 0) return
    const set = (referencingTypes[fullQualifiedName] ??= new Set())
    for (const t of result) set.add(t)
}
/**
 * @param {ts.Node} node
 */
function getName(node) {
    if (ts.isVariableStatement(node)) {
        if (node.declarationList.declarations.length > 1) throw new Error('Multiple variable declarations')
        const ident = node.declarationList.declarations[0].name
        if (!ts.isIdentifier(ident)) throw new Error('Variable declaration is not an identifier')
        return ident.text
    } else if (ts.isModuleDeclaration(node)) return node.name.text
    else if (ts.isInterfaceDeclaration(node)) return node.name.text
    else if (ts.isFunctionDeclaration(node) && node.name) return node.name.text
    else if (ts.isTypeAliasDeclaration(node)) return node.name.text
    else if (ts.isCallSignatureDeclaration(node)) return '[[Call]]'
    else if (ts.isConstructSignatureDeclaration(node)) return '[[Construct]]'
    else if (ts.isIndexSignatureDeclaration(node)) return '[[Get]]'
    else if (ts.isMethodSignature(node)) return getPropertyName(node.name)
    else if (ts.isPropertySignature(node)) return getPropertyName(node.name)
    else if (ts.isGetAccessor(node)) return getPropertyName(node.name)
    else if (ts.isSetAccessor(node)) return getPropertyName(node.name)
    throw new Error(`Unhandled SyntaxKind ${ts.SyntaxKind[node.kind]}`)
}

/** @param {ts.PropertyName} node */
function getPropertyName(node) {
    if (ts.isIdentifier(node)) return '.' + node.text
    else if (ts.isStringLiteral(node)) return `[${JSON.stringify(node.text)}]`
    else if (ts.isNumericLiteral(node)) return `[${node.text}]`
    else if (ts.isComputedPropertyName(node)) {
        if (
            ts.isPropertyAccessExpression(node.expression) &&
            ts.isIdentifier(node.expression.expression) &&
            ts.isIdentifier(node.expression.name) &&
            node.expression.expression.text === 'Symbol'
        ) {
            return `[@@${node.expression.name.text}]`
        }
        throw new Error(
            `Unhandled computed property name ${printer.printNode(
                ts.EmitHint.Expression,
                node.expression,
                sourceFile,
            )}`,
        )
    }
    throw new Error(`Unhandled property name ${ts.SyntaxKind[node.kind]}`)
}
