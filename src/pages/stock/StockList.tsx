import axios from 'axios'
import { map } from 'lodash'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { SelectButton, SelectButtonChangeParams } from 'primereact/selectbutton'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from 'src/api/ApiConfig'
import MenuButton from 'src/components/custom-buttons/MenuButton'
import SearchCateDateRangeOption from 'src/components/search-box/SearchCateDateRangeOption'
import SearchCateTextOption from 'src/components/search-box/SearchCateTextOption'
import {
    arrayCommaBodyTemplate,
    dateBodyTemplate,
    imageBodyTemplate,
    numberBodyTemplate,
    seqBodyTemplate,
} from 'src/hooks/data-table-hooks/BodyHooks'
import { lineHeader } from 'src/hooks/data-table-hooks/HeaderHooks'
import { ProductItemUnit } from 'src/types/product-manage'
import LogViewModal from './LogViewModal'

const globalFilterFields = ['skuName', 'managerName', 'skuId', 'barcode']

type SearchOptions = {
    marketId: string
    year: string
    month: string

    dateRangeCate: 'order.lastReceiptDate'
    startDate: Date
    endDate: Date

    searchCate: 'global' | 'skuName' | 'managerName' | 'skuId' | 'barcode'
    searchText: string

    searchRangeCate: 'stock.availableQty' | 'order.totalReceiptPrice' | 'order.lastReceiptPrice' | 'order.lastReceiptQty'
    searchNumberStart: number | null
    searchNumberEnd: number | null

    serachIsStockQty: string[]
}

const initSearhOptions: SearchOptions = {
    marketId: '',
    searchCate: 'global',
    searchText: '',
    year: '',
    month: '',

    dateRangeCate: 'order.lastReceiptDate',
    startDate: new Date(),
    endDate: new Date(),

    searchRangeCate: 'stock.availableQty',
    searchNumberStart: null,
    searchNumberEnd: null,

    serachIsStockQty: ['hasStock', 'emptyStock'],
}

const searchCateTextOptions = [
    { label: '??????', field: 'global' },
    { label: '?????????', field: 'skuName' },
    { label: '?????????', field: 'managerName' },
    { label: '????????????', field: 'skuId' },
    { label: '???????????????', field: 'barcode' },
]

const searchRangeCateOptions: SearchCate[] = [
    { label: '????????????', field: 'stock.availableQty' },
    { label: '????????????', field: 'order.totalReceiptPrice' },
    { label: '???????????????', field: 'order.lastReceiptPrice' },
    { label: '??????????????????', field: 'order.lastReceiptQty' },
]

const selectBtnOptions = [
    { name: '????????????', value: 'hasStock' },
    { name: '????????????', value: 'emptyStock' },
]

const dateRangeCateOptions = [{ label: '???????????????', field: 'order.lastReceiptDate' }]

const initFileter: DataTableFilterMeta = {
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
    marketId: { value: '', matchMode: FilterMatchMode.CONTAINS },

    skuName: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.CONTAINS }] },
    managerName: { value: '', matchMode: FilterMatchMode.CONTAINS },
    skuId: { value: '', matchMode: FilterMatchMode.CONTAINS },
    barcode: { value: '', matchMode: FilterMatchMode.CONTAINS },
    createdAt: { operator: FilterOperator.AND, constraints: [{ value: new Date('2000-01-01'), matchMode: FilterMatchMode.DATE_AFTER }] },

    'stock.availableQty': {
        operator: FilterOperator.AND,
        constraints: [
            { value: 0, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
            { value: 999999, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO },
        ],
    },
    'order.totalReceiptPrice': {
        operator: FilterOperator.AND,
        constraints: [
            { value: 0, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
            { value: 999999, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO },
        ],
    },
    'order.lastReceiptPrice': {
        operator: FilterOperator.AND,
        constraints: [
            { value: 0, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
            { value: 999999, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO },
        ],
    },
    'order.lastReceiptQty': {
        operator: FilterOperator.AND,
        constraints: [
            { value: 0, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
            { value: 999999, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO },
        ],
    },
}

const excelBtnMenu = [
    { label: '???????????? ?????? ????????????', action: 'ALL' },
    { label: '???????????? ?????? ????????????', action: 'select' },
    { label: '?????? ?????????(??????/??????)', action: 'upload' },
]

function StockList() {
    const [logId, setLogId] = useState<number>(0)
    const [unitList, setUnitList] = useState<ProductItemUnit[]>([])
    const [searchOptions, setSearchOptions] = useState<SearchOptions>(initSearhOptions)
    const [selection, setSelection] = useState<ProductItemUnit[]>([])
    const [filter, setFilter] = useState<DataTableFilterMeta>(initFileter)

    const [logOpen, setLogOpen] = useState<boolean>(false)

    const logBodyTemplate = (rowData: any) => {
        return (
            <Button className="p-button-rounded p-button-secondary p-button-text" onClick={() => onClickLog(rowData.id)}>
                <i className="fa-regular fa-file-lines text-lg"></i>
            </Button>
        )
    }

    const onChangeSearchOptionDropdown = (event: DropdownChangeParams) => {
        setSearchOptions((prev) => ({
            ...prev,
            [event.target.name]: event.value,
        }))
    }

    const onChangeSearchOptionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchOptions((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const onChangeSelectBtn = (event: SelectButtonChangeParams) => {
        console.log(event.value)
        setSearchOptions((prev) => ({ ...prev, serachIsStockQty: event.value }))
    }

    const onChangeDates = (range: { startDate: Date; endDate: Date }) => {
        const { startDate, endDate } = range
        setSearchOptions((prev) => ({ ...prev, startDate, endDate }))
    }

    const onClickLog = (id: number) => {
        setLogOpen(true)
        setLogId(id)
    }

    const closeLogModal = () => {
        setLogOpen(false)
        setLogId(0)
    }

    const onSearch = () => {
        const { searchCate, searchText, searchRangeCate, searchNumberStart, searchNumberEnd, startDate, endDate } = searchOptions

        const searchCateFilter = { value: searchText, matchMode: FilterMatchMode.CONTAINS }
        const skuNameFilter = {
            operator: FilterOperator.AND,
            constraints: searchText.split(' ').map((word) => ({ value: word, matchMode: FilterMatchMode.CONTAINS })),
        }
        const rangeNumberFilter = {
            operator: FilterOperator.AND,
            constraints: [
                { value: searchNumberStart || 0, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
                { value: searchNumberEnd, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO },
            ],
        }
        const rangeCreatedAtFilter = {
            operator: FilterOperator.AND,
            constraints: [
                { value: new Date(startDate) || 0, matchMode: FilterMatchMode.DATE_AFTER },
                { value: new Date(endDate), matchMode: FilterMatchMode.DATE_BEFORE },
            ],
        }

        if (searchCate === 'skuName') {
            setFilter((prev) => ({
                ...prev,
                skuName: skuNameFilter,
                [searchRangeCate]: rangeNumberFilter,
                createdAt: rangeCreatedAtFilter,

                // marketId: marketIdFilter,
            }))
        } else {
            setFilter((prev) => ({
                ...prev,
                [searchCate]: searchCateFilter,
                [searchRangeCate]: rangeNumberFilter,
                createdAt: rangeCreatedAtFilter,

                // marketId: marketIdFilter,
            }))
        }
    }

    const clearSearchOptions = () => {
        setSearchOptions(initSearhOptions)
        setFilter(initFileter)
    }

    const getUnitList = async () => {
        try {
            const { data } = await axios.get(BASE_URL + 'units')
            const stockList = map(data, (unit, idx) => {
                const image = unit.skuImageUrls[0]
                return {
                    ...unit,
                    seq: idx + 1,
                    image,
                    createdAt: new Date(unit.createdAt),
                }
            })
            setUnitList(stockList)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getUnitList()
    }, [])

    return (
        <div>
            <div className="page-header border rounded-lg flex bg-white mb-5">
                <div>
                    <div className="flex items-center px-4 pt-4 border-b h-[66px] box-border min-w-[70vw]">
                        <div className="flex flex-col justify-center ">
                            <span className="font-bold text-lg relative">????????????</span>
                            <div className="border-2 w-full border-blue-500 relative -bottom-[14px]"></div>
                        </div>
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : {unitList.length}</span>
                    </div>
                    <div className="flex space-x-4 px-4 pt-4">
                        {/* <SearchMarketIdOption value={searchOptions.marketId} onChange={onChangeSearchOptionDropdown} /> */}
                        <SearchCateTextOption
                            cate={searchOptions.searchCate}
                            text={searchOptions.searchText}
                            options={searchCateTextOptions}
                            onChangeDropdown={onChangeSearchOptionDropdown}
                            onChangeText={onChangeSearchOptionInput}
                        />
                        {/* <SearchDateOption
                            title="?????????"
                            startDate={searchOptions.startDate}
                            endDate={searchOptions.endDate}
                            onChangeDates={onChangeDates}
                            onChangeInput={onChangeSearchOptionInput}
                        /> */}
                        <SearchCateDateRangeOption
                            startDate={searchOptions.startDate}
                            endDate={searchOptions.endDate}
                            onChangeDates={onChangeDates}
                            options={dateRangeCateOptions}
                            cate={searchOptions.dateRangeCate}
                            onChangeDropdown={onChangeSearchOptionDropdown}
                        />
                    </div>
                    <div className="flex space-x-4 px-4 pt-4 pb-4">
                        <div className="flex space-x-2 items-center">
                            <Dropdown
                                className="min-w-[100px]"
                                name="searchRangeCate"
                                optionLabel="label"
                                optionValue="field"
                                options={searchRangeCateOptions}
                                value={searchOptions.searchRangeCate}
                                onChange={onChangeSearchOptionDropdown}
                            />
                            <div className="flex space-x-2 items-center">
                                <InputNumber
                                    name="searchNumberStart"
                                    value={searchOptions.searchNumberStart}
                                    onChange={(e) => setSearchOptions((prev) => ({ ...prev, searchNumberStart: e.value }))}
                                />
                                <span>~</span>
                                <InputNumber
                                    name="searchNumberEnd"
                                    value={searchOptions.searchNumberEnd}
                                    onChange={(e) => setSearchOptions((prev) => ({ ...prev, searchNumberEnd: e.value }))}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <SelectButton
                                multiple
                                optionLabel="name"
                                className="h-[32px] text-xs border-box"
                                options={selectBtnOptions}
                                value={searchOptions.serachIsStockQty}
                                onChange={onChangeSelectBtn}
                            />
                        </div>
                    </div>
                </div>
                <div className="border-l flex flex-col">
                    <div className="h-[65px]"></div>
                    <div className="flex items-end space-x-2 p-4">
                        <button className="btn default-btn" onClick={clearSearchOptions}>
                            ?????????
                        </button>
                        <button className="btn primary-btn" onClick={onSearch}>
                            ??????
                        </button>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="flex items-center justify-between pb-4">
                    <div></div>
                    <div className="flex space-x-2">
                        <MenuButton
                            title="EXCEL"
                            position="left"
                            color="#098000"
                            menu={excelBtnMenu}
                            icon={<img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />}
                            onClickMenu={(action: string) => alert(action)}
                        />
                        <button
                            className="font-bold border text-sm border-[#146BCE] rounded text-black p-1 px-2 bg-white h-[32px]"
                            onClick={() => onClickLog(0)}
                        >
                            ??????????????????
                        </button>
                        {/* <button className="font-bold border text-sm border-[#C6D4E6] rounded text-black p-1 px-2 bg-[#F5F9FD] h-[32px]">
                            ????????? ????????????
                        </button> */}
                    </div>
                </div>

                <DataTable
                    value={unitList}
                    removableSort
                    rows={5}
                    scrollHeight="82vh"
                    sortMode="multiple"
                    responsiveLayout="scroll"
                    selection={selection}
                    onSelectionChange={(e) => setSelection(e.value)}
                    filters={filter}
                    globalFilterFields={globalFilterFields}
                    onValueChange={(e) => console.log('onValueChange : ', e)}
                    // resizableColumns
                    // columnResizeMode="expand"
                >
                    <Column align="center" className="max-w-[50px]" selectionMode="multiple" selectionAriaLabel="id" field="id"></Column>
                    <Column align="center" className="text-[12px]" field="seq" header="NO" bodyStyle={seqBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="managerName" header="?????????" />
                    <Column align="center" className="text-[12px]" field="skuId" header="????????????" />
                    <Column align="center" className="text-[12px] p-0 " field="image" header="?????????" body={imageBodyTemplate} />
                    <Column
                        alignHeader="center"
                        align="left"
                        className="text-[12px] min-w-[300px]"
                        headerClassName="min-w-[300px]"
                        field="skuName"
                        filterField="skuName"
                        header="?????????"
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="order.lastReceiptPrice"
                        header={lineHeader('?????? ????????????')}
                        body={(rowData) => numberBodyTemplate(rowData.order.lastReceiptPrice)}
                        sortable
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="order.lastReceiptQty"
                        header={lineHeader('?????? ????????????')}
                        body={(rowData) => numberBodyTemplate(rowData.order.lastReceiptQty)}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="order.lastReceiptDate"
                        header={lineHeader('?????? ?????????')}
                        body={(rowData) => dateBodyTemplate(rowData.order.lastReceipt)}
                        sortable
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="order.totalReceiptPrice"
                        header={lineHeader('???????????? (??????x????????????)')}
                        body={(rowData) => numberBodyTemplate(rowData.order.totalReceiptPrice)}
                    />
                    <Column align="center" className="text-[12px]" field="stock.availableQty" header="????????????" sortable />
                    <Column align="center" className="text-[12px]" field="stock.disusedQty" header="????????????" sortable />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="stock.locations"
                        header="???????????????"
                        body={(rowData) => arrayCommaBodyTemplate(rowData.stock.locations)}
                    />

                    <Column align="center" className="text-[12px]" field="log" header="??????" body={logBodyTemplate} />
                </DataTable>
            </div>
            <LogViewModal open={logOpen} onClose={closeLogModal} logId={logId} />
        </div>
    )
}

export default StockList
