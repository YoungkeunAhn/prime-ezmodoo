import { Dialog } from 'primereact/dialog'
import React from 'react'

type Props = {
    onClose: () => void
}

function PaletteManageDialog(props: Props) {
    const { onClose } = props

    const Header = () => {
        return (
            <div className="flex justify-between items-center">
                <span>파레트 적재관리</span>
                <div>
                    <button className="btn primary-btn">저장</button>
                    <button className="btn primary-btn" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        )
    }

    return (
        <Dialog visible={true} onHide={onClose} header={Header} closable={false}>
            <div></div>
        </Dialog>
    )
}

export default PaletteManageDialog
