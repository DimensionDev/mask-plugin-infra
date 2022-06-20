declare module '@masknet/theme' {
    import type { createMakeStyles } from 'tss-react'
    import type { Theme, DialogProps } from '@mui/material'

    export const makeStyles: ReturnType<typeof createMakeStyles<Theme>>['makeStyles']

    export interface MaskDialogTitleProps {
        children: string
        onBack?(): void
        onClose?(): void
    }
    export interface MaskDialogProps
        extends React.PropsWithChildren<Omit<MaskDialogTitleProps, 'children'>>,
            Pick<DialogProps, 'fullWidth' | 'maxWidth'> {
        title: string
        open: boolean
        DialogProps?: Omit<DialogProps, 'open'>
    }
    export const MaskDialog: React.ComponentType<MaskDialogProps>
}
