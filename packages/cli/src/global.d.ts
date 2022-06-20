declare module 'node:util' {
    export interface ParseArgsOption {
        type: 'boolean' | 'string'
        multiple?: boolean
        short?: string
    }
    export interface ParseArgsConfig {
        args?: string[]
        options?: Record<string, ParseArgsOption>
        strict?: boolean
        allowPositionals?: boolean
    }
    /** https://nodejs.org/api/util.html#utilparseargsconfig */
    export function parseArgs(config: ParseArgsConfig): { values: any; positionals: string[] }
}
