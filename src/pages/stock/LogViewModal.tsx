import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState, useEffect } from 'react'

type Props = {
    open: boolean
    onClose: () => void
    logId: number
}

const fakeLogData = [
    {
        category: 'in',
        createdAt: '2022-10-21 10:10:10',
        qty: 1000,
        stockQty: 1000,
        manager: '안영근',
        cause: '발주입고',
    },
    {
        category: 'out',
        createdAt: '2022-10-22 20:20:20',
        qty: 1000,
        stockQty: 0,
        manager: '안영근',
        cause: '제트입고 출고',
    },
]

function LogViewModal(props: Props) {
    const { open, onClose, logId } = props
    const [title, setTitle] = useState<string>('')

    const categoryBodyTemplate = (rowData: any) => {
        return (
            <span
                className={`text-[${
                    rowData.category === 'in' ? '#146BCE' : '#098000'
                }] font-bold rounded-full w-10 h-10 flex justify-center items-center m-auto`}
            >
                {rowData.category === 'in' ? '입고' : '출고'}
            </span>
        )
    }

    const causeBodyTemplate = (rowData: any) => {
        return <span className="px-1">{rowData.cause}</span>
    }

    const qtyBodyTemplate = (rowData: any) => {
        return (
            <span>
                {rowData.category === 'in' ? '+' : '-'} {rowData.qty}
            </span>
        )
    }

    const modalHeader = () => {
        return <span className="text-lg">{title}</span>
    }

    useEffect(() => {
        setTitle('로지 샤프트 펄 실내화 2P - 브라운+그레이 / S')
    }, [])

    return (
        <Dialog visible={open} onHide={onClose} header={modalHeader}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <input type="date" name="" id="" className="border rounded p-1 pl-2 text-sm h-[32px]" />
                    <span>~</span>
                    <input type="date" name="" id="" className="border rounded p-1 pl-2 text-sm h-[32px]" />
                    <button className="btn primary-btn">검색</button>
                </div>

                <div className="flex space-x-2 items-center">
                    <span className="font-bold">수동입출고</span>
                    <InputText placeholder="상세내역" className="w-[300px] h-[30px] rounded" />
                    <InputText placeholder="수량" className="w-[80px] h-[30px] rounded text-center" />
                    <button className="min-w-[50px] h-[30px] border border-[#146BCE] text-[#146BCE] rounded text-sm font-bold">입고</button>
                    <button className="min-w-[50px] h-[30px] border border-[#098000] text-[#098000] rounded text-sm font-bold">출고</button>
                </div>
            </div>

            <DataTable
                value={fakeLogData}
                className="w-[1000px] max-h-[80vh] border rounded mt-4 text-sm"
                responsiveLayout="scroll"
                resizableColumns
                columnResizeMode="expand"
            >
                <Column align="center" field="category" header="분류" body={categoryBodyTemplate} />
                <Column align="center" field="createdAt" header="날짜" />
                <Column align="center" field="stockQty" header="이전재고" />
                <Column align="center" field="qty" header="증감수량" body={qtyBodyTemplate} />
                <Column align="center" field="stockQty" header="현재고" />
                <Column align="center" field="manager" header="작업자" />
                <Column align="left" alignHeader="center" headerStyle={{ width: '400px' }} field="cause" header="상세내역" body={causeBodyTemplate} />
            </DataTable>
        </Dialog>
    )
}

export default LogViewModal
