import { Dialog } from 'primereact/dialog'
import React from 'react'

type Props = {
    open: boolean
    closeModal: () => void
}

function GettingCargoDialog(props: Props) {
    const { open, closeModal } = props

    const Header = () => {
        return (
            <div className="flex justify-end space-x-4">
                <button>선택분할</button>
                <button>인쇄</button>
                <button>닫기</button>
            </div>
        )
    }

    return <Dialog header={Header} onHide={closeModal} visible={open}></Dialog>
}

export default GettingCargoDialog
