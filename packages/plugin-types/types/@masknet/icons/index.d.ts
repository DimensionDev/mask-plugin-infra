// TODO: @masknet/icons should be released on npm so we don't need to manually write its type
declare module '@masknet/icons' {
    import { SxProps, Theme } from '@mui/material'
    export type MaskIconPalette = 'light' | 'dark' | 'dim'
    export interface GeneratedIconProps<Variants extends MaskIconPalette = never>
        extends GeneratedIconNonSquareProps<Variants> {
        size?: number
    }
    export interface GeneratedIconNonSquareProps<Variants extends MaskIconPalette = never>
        extends React.HTMLProps<HTMLElement> {
        variant?: Variants[] | Variants
        height?: number
        width?: number
        color?: string
        sx?: SxProps<Theme>
    }

    export * as Icons from '@masknet/icons/jsx'
}

declare module '@masknet/icons/jsx' {
    export const FileService: ComponentType<GeneratedIconNonSquareProps<never>>
}
