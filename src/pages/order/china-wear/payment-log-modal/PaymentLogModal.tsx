import dayjs from 'dayjs'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

type Props = {
    open: boolean
    onClose: () => void
}

const fakeData = [
    {
        id: '1',
        date: '2022-10-28',
        payment: 30000,
    },
    {
        id: '2',
        date: '2022-10-28',
        payment: 50000,
    },
]

type LogType = {
    id: string
    date: string
    payment: number
}
function PaymentLogModal(props: Props) {
    const { open, onClose } = props
    const [date, setDate] = useState<string>(dayjs(new Date()).format('YYYY-MM-DD'))
    const [payment, setPayment] = useState<number | null>()
    const [logList, setLogList] = useState<LogType[]>(fakeData)

    return (
        <Dialog visible={open} onHide={onClose}>
            <div className="flex flex-col">
                <div className="flex items-center mb-4">
                    <InputText className="h-[32px]" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <InputNumber className="h-[32px]" value={payment} onChange={(e) => setPayment(e.value)} placeholder="지급액" />
                    <button className="btn primary-btn">추가</button>
                </div>
                <div className="max-h-[50vh] overflow-y-auto w-full">
                    <table className="border text-sm w-full">
                        {logList.map((log) => (
                            <tr>
                                <th className="border">{log.date}</th>
                                <td className="border">
                                    <InputNumber className="w-full border-none" value={log.payment} />
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </Dialog>
    )
}

export default PaymentLogModal
