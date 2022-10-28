import dayjs from 'dayjs'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { useState } from 'react'

type Props = {
    open: boolean
    onClose: () => void
}

function PaymentLogModal(props: Props) {
    const { open, onClose } = props
    const [date, setDate] = useState<string>(dayjs(new Date()).format('YYYY-MM-DD'))
    const [payment, setPayment] = useState<number | null>()

    return (
        <Dialog visible={open} onHide={onClose}>
            <div className="flex flex-col">
                <div className="flex items-center">
                    <InputText type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <InputNumber value={payment} onChange={(e) => setPayment(e.value)} />
                    <button className="btn primary-btn">추가</button>
                </div>
            </div>
        </Dialog>
    )
}

export default PaymentLogModal
