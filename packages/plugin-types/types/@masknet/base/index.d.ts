/// <reference path="./identifier.d.ts" />

declare module '@masknet/base' {
    export * from '@mask-net/base/identifier.js'

    export function openWindow(
        // @ts-expect-error DOM
        url: string | URL | undefined | null,
        // @ts-expect-error DOM
        target?: WindowTarget,
        // @ts-expect-error DOM
        features?: WindowFeatureFlags,
    ): void
}
