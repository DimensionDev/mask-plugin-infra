export interface PluginEntries {
    rpc?: string
    rpcGenerator?: string
    background?: string
    content_script?: string
    popup?: string
    dashboard?: string
}
export interface PluginManifest {
    entries?: PluginEntries
    id: string
}
