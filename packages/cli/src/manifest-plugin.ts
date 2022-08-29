import type { Compiler, WebpackPluginInstance } from 'webpack'
import type { Manifest } from './manifest.js'

const name = 'MaskPluginManifestPlugin'
export class ManifestPlugin implements WebpackPluginInstance {
    constructor(public manifest: Manifest, public packageJSON: any) {}
    apply(compiler: Compiler) {
        compiler.hooks.thisCompilation.tap(name, (compilation) => {
            compilation.hooks.processAssets.tap(name, () => {
                const entries: Record<string, string | string[]> = {}
                compilation.entrypoints.forEach((entrypoint, name) => {
                    const entry = [...entrypoint.getEntrypointChunk().files]
                    entries[name] = entry.length === 1 ? entry[0]! : entry
                })
                const newManifest = JSON.parse(JSON.stringify(this.manifest))
                newManifest.entries = entries
                copyFields(newManifest, this.packageJSON, [
                    'contributors',
                    'version',
                    'homepage',
                    'bugs',
                    'license',
                    'funding',
                    'repository',
                ])
                delete newManifest.$schema
                if (this.manifest.i18n) {
                    newManifest.i18n.files = 'locales/'
                }

                compilation.assets['mask-manifest.json'] = new compiler.webpack.sources.RawSource(
                    JSON.stringify(newManifest, undefined, 4),
                )
            })
        })
    }
}
function copyFields(to: any, from: any, names: string[]) {
    for (const name of names) {
        to[name] = from[name]
    }
}
