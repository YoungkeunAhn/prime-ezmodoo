import { ColumnProps } from 'primereact/column'
import { DataTableProps } from 'primereact/datatable'
import { DialogProps } from 'primereact/dialog'

export interface CustomDialogProps extends DialogProps {
    children?: any
}

export interface CustomDataTableProps extends DataTableProps {
    children?: any
}

export interface CustomColumnProps extends ColumnProps {
    selectionAriaLabel?: string
}
