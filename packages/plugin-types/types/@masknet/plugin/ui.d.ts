declare module '@masknet/plugin/ui' {
    export function showSnackbar(
        // @ts-expect-error
        text: SnackbarMessage,
        // @ts-expect-error
        options?: ShowSnackbarOptions,
        // @ts-expect-error
    ): SnackbarKey
}
