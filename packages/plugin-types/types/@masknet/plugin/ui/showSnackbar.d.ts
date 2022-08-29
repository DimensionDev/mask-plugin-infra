declare module '@masknet/plugin/ui/showSnackbar' {
    export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info'
    export type SnackbarMessage = string | React.ReactNode
    export interface ShowSnackbarOptions {
        /**
         * Used to easily display different variant of snackbars. When passed to `SnackbarProvider`
         * all snackbars inherit the `variant`, unless you override it in `enqueueSnackbar` options.
         * @default default
         */
        variant?: VariantType
    }
    export function showSnackbar(text: SnackbarMessage, options?: ShowSnackbarOptions): void
}
