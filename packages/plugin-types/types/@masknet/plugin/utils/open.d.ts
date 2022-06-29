declare module '@masknet/plugin/utils/open' {
    export type WindowTarget = '_top' | '_self' | '_parent' | '_blank' | string
    export interface BehaviorFlags {
        popup?: boolean
        toolbar?: boolean
        status?: boolean
        resizable?: boolean
        scrollbars?: boolean
    }

    export interface WindowFeatureFlags {
        // Behavior
        opener?: boolean
        referrer?: boolean
        behaviors?: BehaviorFlags
        // Dimension
        width?: number
        height?: number
        screenX?: number
        screenY?: number
    }
    export function openWindow(
        url: string | URL | undefined | null,
        target?: WindowTarget,
        features?: WindowFeatureFlags,
    ): void
}
