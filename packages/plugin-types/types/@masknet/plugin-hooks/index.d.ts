declare module '@masknet/plugin-hooks' {
    import type { OwnedTranslation, OwnedTranslationInterop } from 'mask://self'
    export function useI18N(): OwnedTranslation
    export const Translate: OwnedTranslationInterop
    export function usePluginWrapper(
        open: boolean,
        options?: {
            width?: number
            name?: string
        },
    ): void
}
