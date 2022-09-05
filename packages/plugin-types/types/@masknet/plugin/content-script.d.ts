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
}
declare module '@masknet/plugin/content-script/react' {
    // TODO: those hooks should have DOM equivalent
    export function registerMetadataRender(metaID: string, render: (meta: any) => React.ReactElement): void
    export function registerMetadataBadgeRender(metaID: string, render: (meta: any) => React.ReactElement): void
    export function registerCompositionEntry(
        label: React.ReactElement,
        dialog: React.ComponentType<CompositionEntryProps>,
    ): void
    export interface CompositionEntryProps {
        onClose: () => void
        open: boolean
    }
}
