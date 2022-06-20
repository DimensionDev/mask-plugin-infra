declare module '@masknet/plugin/content-script' {
    /**
     * Attach a metadata to the current composition instance.
     *
     * If there is no composition, it will throw.
     * @param metaID Metadata ID to attach.
     * @param value Attached value.
     */
    export function attachMetadata(metaID: string, value: unknown): void
    /**
     * Drop a metadata from the current composition instance.
     *
     * If there is no composition, it will throw.
     * @param metaID Metadata ID to drop.
     */
    export function dropMetadata(metaID: string): void
    export function closeApplicationBoardDialog(): void
    export function addMetadataRender(metaID: string, meta: unknown): void
    export function addMetadataBadgeRender(metaID: string, meta: unknown): void
    export function addCompositionEntry(label: any, dialog: any): void
}
