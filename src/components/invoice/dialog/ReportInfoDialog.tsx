import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import React, { useRef } from 'react'

type Props = {
    open: boolean
    onClose: () => void
}

function ReportInfoDialog(props: Props) {
    const { open, onClose } = props
    const inputFileRef = useRef<HTMLInputElement>(null)

    const onClickReportBtn = (pk: string) => {
        if (inputFileRef.current) {
            inputFileRef.current.click()
        }
    }

    return (
        <Dialog header="수입신고서 정보" visible={open} onHide={onClose}>
            <input type="file" hidden name="" id="" />
            <ul className="grid grid-cols-5 mt-8 gap-x-4 gap-y-8 item-center">
                <li className="p-float-label col-span-2">
                    <InputText id="in" className="w-full" />
                    <label htmlFor="in">BL번호</label>
                </li>
                <li className="p-float-label col-span-2">
                    <InputText id="in" className="w-full" />
                    <label htmlFor="in">신고번호</label>
                </li>
            </ul>
            <ul className="grid grid-cols-5 mt-8 gap-x-4 gap-y-8 item-center">
                <li className="p-float-label">
                    <InputNumber id="in" />
                    <label htmlFor="in">통관수수료</label>
                </li>
                <li className="p-float-label">
                    <InputNumber id="in" />
                    <label htmlFor="in">한국내륙 운송비</label>
                </li>
                <li className="p-float-label">
                    <InputNumber id="in" />
                    <label htmlFor="in">서류발급비</label>
                </li>
                <li className="p-float-label">
                    <InputNumber id="in" />
                    <label htmlFor="in">원산지증명서</label>
                </li>
                <li>
                    <Button className="p-button-raised p-button-secondary p-2.5 w-full flex justify-center">수입신고서 등록</Button>
                </li>
            </ul>
        </Dialog>
    )
}

export default ReportInfoDialog
