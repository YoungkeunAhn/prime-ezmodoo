import { Button } from 'primereact/button'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { DropdownChangeParams } from 'primereact/dropdown'
import React, { useRef, useState } from 'react'
import SearchCateDateRangeOption from 'src/components/search-box/SearchCateDateRangeOption'
import { dateBodyTemplate, numberBodyTemplate, seqBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import { numberEditor } from 'src/hooks/data-table-hooks/EditorHooks'
import { lineHeader } from 'src/hooks/data-table-hooks/HeaderHooks'
import ReportInfoModal from './report-info-modal/ReportInfoModal'

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
]

type DialogId = 'REPORT' | 'GETTINGCARGO' | 'MISSING'

type SearchOptions = {
    startDate: Date
    endDate: Date
    dateRangeCate: 'createdAt'
}

const initSearchOptions: SearchOptions = {
    startDate: new Date('2022-11-01'),
    endDate: new Date(),
    dateRangeCate: 'createdAt',
}

const dateRangeCateOptions: SearchCate[] = [{ label: '등록일', field: 'createdAt' }]

function InvoiceList() {
    const [dialogId, setDialogId] = useState<DialogId>()
    const [selection, setSelection] = useState([])
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [dialogOpen, setDialgoOpen] = useState<boolean>(false)
    const [searchOptions, setSearchOptions] = useState<SearchOptions>(initSearchOptions)

    const openDialog = () => {
        setDialgoOpen(true)
    }

    const closeDialog = () => {
        setDialgoOpen(false)
        setDialogId(undefined)
    }

    const clearSearchOptions = () => {}

    const onSearch = () => {}

    const onChangeDates = (range: { startDate: Date; endDate: Date }) => {
        const { startDate, endDate } = range

        setSearchOptions((prev) => ({ ...prev, startDate: startDate, endDate: endDate }))
    }

    const onChangeSearchOptionDropdown = (event: DropdownChangeParams) => {
        setSearchOptions((prev) => ({
            ...prev,
            [event.target.name]: event.value,
        }))
    }

    const invoiceReportBodyTemplate = (rowData: any) => {
        return <Button icon="pi pi-tag" className="p-button-rounded p-button-text" onClick={openDialog}></Button>
    }

    const gettingCargoBodyTemplate = (rowData: any) => {
        return <Button icon="pi pi-book" className="p-button-rounded p-button-text" onClick={openDialog}></Button>
    }
    const missingBodyTemplate = (rowData: any) => {
        return <Button icon="pi pi-exclamation-triangle" className="p-button-rounded p-button-text" onClick={openDialog}></Button>
    }

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
                    <div className="flex space-x-4 px-4 pt-4">
                        <SearchCateDateRangeOption
                            startDate={searchOptions.startDate}
                            endDate={searchOptions.endDate}
                            onChangeDates={onChangeDates}
                            options={dateRangeCateOptions}
                            cate={searchOptions.dateRangeCate}
                            onChangeDropdown={onChangeSearchOptionDropdown}
                        />
                    </div>
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
                <div className="flex items-center justify-between pb-4">{/* <div></div> */}</div>

                <input type="file" ref={inputFileRef} hidden />
                <DataTable
                    value={fakeData}
                    removableSort
                    rows={5}
                    resizableColumns
                    scrollHeight="82vh"
                    sortMode="multiple"
                    selectionMode="checkbox"
                    columnResizeMode="expand"
                    responsiveLayout="scroll"
                    selection={selection}
                    onSelectionChange={(e) => setSelection(e.value)}
                >
                    <Column align="center" className="max-w-[50px]" selectionMode="multiple" selectionAriaLabel="id" field="id"></Column>
                    <Column align="center" field="seq" header="NO" body={seqBodyTemplate} />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="createdAt"
                        header="작성일"
                        body={(rowData) => dateBodyTemplate(rowData.commingDate)}
                    />
                    <Column align="center" className="text-[12px]" field="forwarding" header="포워딩상호" />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="commingDate"
                        header="물류입고일"
                        body={(rowData) => dateBodyTemplate(rowData.commingDate)}
                    />
                    <Column align="center" className="text-[12px]" field="blNumber" header="BL번호" />
                    <Column align="center" className="text-[12px]" field="registeredNumber" header="신고번호" />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="importCommition"
                        header="통관수수료"
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                        editor={(options: ColumnEditorOptions) => numberEditor(options)}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="internalDeliveryCharge"
                        header={lineHeader('내륙 운송비')}
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="documentPee"
                        header="서류발급비"
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="certificatePee"
                        header="원산지증명서"
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="totalCurrencyTax"
                        header={lineHeader('총과세가격 (USD)')}
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="totalCurrencyTax"
                        header={lineHeader('총과세가격 (WON)')}
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="deliveryCharge"
                        header="운임"
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="duty"
                        header="관세"
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="surtax"
                        header="부과세"
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="exchangeRate"
                        header="구매시환율"
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                    />
                    <Column align="center" className="text-[12px]" field="id" header="수입신고서" body={invoiceReportBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="id" header="입고예정상품" body={gettingCargoBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="id" header="누락상품" body={missingBodyTemplate} />
                </DataTable>
                <ReportInfoModal open={dialogOpen} onClose={closeDialog} />
            </div>
        </div>
    )
}

export default InvoiceList
