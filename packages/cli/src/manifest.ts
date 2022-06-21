import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
export interface Manifest {
    entries: Record<string, string>
    i18n?: {
        files: string
    }
}
export const manifest: Manifest = JSON.parse(
    (await readFile(join(process.cwd(), 'mask-manifest.json'), 'utf-8'))
        .split('\n')
        .filter((x) => !x.match(/^ +\/\//))
        .join('\n'),
)

export const packageJSON = JSON.parse(await readFile(join(process.cwd(), 'package.json'), 'utf-8'))
// TODO: A manifest validator
