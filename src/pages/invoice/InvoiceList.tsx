import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'

const fakeData = [
    {
        pk: '1',
        createdAt: '2022-11-25 10:52:00',
        forwarding: '마린',
        commingDate: '2022-11-25 00:00:00',
        blNumber: 'MRGCO221020A1',
        registeredNumber: '12400-22-304393M',
        importCommition: 33000,
        internalDeliveryCharge: 165000,
        documentPee: 33000,
        certificatePee: 33000,
        totalCurrencyTax: 6833,
        deliveryCharge: 114024,
        duty: 114024,
        surtax: 114024,
        exchangeRate: 1330,
    },
].map((data, idx) => ({ ...data, seq: idx + 1 }))

function InvoiceList() {
    const [selection, setSelection] = useState([])

    const clearSearchOptions = () => {}

    const onSearch = () => {}

    return (
        <div>
            <div className="page-header border rounded-lg flex bg-white mb-5">
                <div>
                    <div className="flex items-center px-4 pt-4 border-b h-[66px] box-border min-w-[70vw]">
                        <div className="flex flex-col justify-center ">
                            <span className="font-bold text-lg relative">물류정보</span>
                            <div className="border-2 w-full border-blue-500 relative -bottom-[14px]"></div>
                        </div>
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : 123</span>
                    </div>
                    <div className="flex space-x-4 px-4 pt-4"></div>
                </div>
                <div className="border-l flex flex-col">
                    <div className="h-[65px]"></div>
                    <div className="flex items-end space-x-2 p-4">
                        <button className="btn default-btn" onClick={clearSearchOptions}>
                            초기화
                        </button>
                        <button className="btn primary-btn" onClick={onSearch}>
                            검색
                        </button>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="flex items-center justify-between pb-4">
                    <div></div>
                </div>

                <DataTable
                    value={fakeData}
                    removableSort
                    rows={5}
                    resizableColumns
                    scrollHeight="82vh"
                    sortMode="multiple"
                    columnResizeMode="expand"
                    responsiveLayout="scroll"
                    selection={selection}
                    onSelectionChange={(e) => setSelection(e.value)}
                >
                    <Column align="center" className="max-w-[50px]" selectionMode="multiple" selectionAriaLabel="id" field="id"></Column>
                    <Column align="center" className="text-[12px]" field="managerName" header="담당자" />
                    <Column align="center" className="text-[12px]" field="skuId" header="재고코드" />
                    <Column
                        alignHeader="center"
                        align="left"
                        className="text-[12px] min-w-[300px]"
                        headerClassName="min-w-[300px]"
                        field="skuName"
                        filterField="skuName"
                        header="상품명"
                    />
                </DataTable>
            </div>
        </div>
    )
}

export default InvoiceList
