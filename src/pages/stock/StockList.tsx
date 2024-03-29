import axios from 'axios'
import { map } from 'lodash'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { DropdownChangeParams } from 'primereact/dropdown'
import { InputNumberChangeParams } from 'primereact/inputnumber'
import { SelectButtonChangeParams } from 'primereact/selectbutton'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from 'src/api/ApiConfig'
import PageHeader from 'src/common/page-header/PageHeader'
import { dateBodyTemplate, imageBodyTemplate, numberBodyTemplate, seqBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import { lineHeader } from 'src/hooks/data-table-hooks/HeaderHooks'
import { ProductItemUnit } from 'src/types/product-manage'
import StockLogDialog from '../../components/stock/dialog/StockLogDialog'

const globalFilterFields = ['skuName', 'managerName', 'skuId', 'barcode']

type SearchOptions = {
    marketId: string
    year: string
    month: string

    rangeDateCate: 'order.lastReceiptDate'
    startDate: Date
    endDate: Date

    searchCate: 'global' | 'skuName' | 'managerName' | 'skuId' | 'barcode'
    searchText: string

    rangeNumberCate: 'stock.availableQty' | 'order.totalReceiptPrice' | 'order.lastReceiptPrice' | 'order.lastReceiptQty'
    startNumber: number | null
    endNumber: number | null

    serachIsStockQty: string[]
}

const initSearhOptions: SearchOptions = {
    marketId: '',
    searchCate: 'global',
    searchText: '',
    year: '',
    month: '',

    rangeDateCate: 'order.lastReceiptDate',
    startDate: new Date(),
    endDate: new Date(),

    rangeNumberCate: 'stock.availableQty',
    startNumber: null,
    endNumber: null,

    serachIsStockQty: ['hasStock', 'emptyStock'],
}

const searchCateTextOptions = [
    { label: '통합', field: 'global' },
    { label: '상품명', field: 'skuName' },
    { label: '담당자', field: 'managerName' },
    { label: '재고코드', field: 'skuId' },
    { label: '재고바코드', field: 'barcode' },
]

const rangeNumberCateOptions: SearchCate[] = [
    { label: '재고수량', field: 'stock.availableQty' },
    { label: '재고금액', field: 'order.totalReceiptPrice' },
    { label: '최근입고가', field: 'order.lastReceiptPrice' },
    { label: '최근입고수량', field: 'order.lastReceiptQty' },
]

const multipleSelectOptions = [
    { name: '재고있음', value: 'hasStock' },
    { name: '재고없음', value: 'emptyStock' },
]

const rangeDateCateOptions = [{ label: '최근입고일', field: 'order.lastReceiptDate' }]

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
    { label: '전체상품 엑셀 다운로드', action: 'ALL' },
    { label: '선택상품 엑셀 다운로드', action: 'select' },
    { label: '엑셀 업로드(증감/차감)', action: 'upload' },
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

    const onChangeCateDropdown = (event: DropdownChangeParams) => {
        setSearchOptions((prev) => ({
            ...prev,
            [event.target.name]: event.value,
        }))
    }

    const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchOptions((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const onChangeNumbers = (event: InputNumberChangeParams) => {
        setSearchOptions((prev) => ({ ...prev, [event.originalEvent.target.name]: event.value }))
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
        const { searchCate, searchText, rangeNumberCate, startNumber, endNumber, startDate, endDate } = searchOptions

        const searchCateFilter = { value: searchText, matchMode: FilterMatchMode.CONTAINS }
        const skuNameFilter = {
            operator: FilterOperator.AND,
            constraints: searchText.split(' ').map((word) => ({ value: word, matchMode: FilterMatchMode.CONTAINS })),
        }
        const rangeNumberFilter = {
            operator: FilterOperator.AND,
            constraints: [
                { value: startNumber || 0, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
                { value: endNumber, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO },
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
                [rangeNumberCate]: rangeNumberFilter,
                createdAt: rangeCreatedAtFilter,

                // marketId: marketIdFilter,
            }))
        } else {
            setFilter((prev) => ({
                ...prev,
                [searchCate]: searchCateFilter,
                [rangeNumberCate]: rangeNumberFilter,
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
            <PageHeader
                title="재고관리"
                total={unitList.length}
                commonSearch={{ clearSearchOptions, onChangeCateDropdown, onSearch }}
                textSearch={{
                    currentCate: searchOptions.searchCate,
                    searchCate: searchCateTextOptions,
                    text: searchOptions.searchText,
                    onChangeText,
                }}
                rangeDateSearch={{
                    currentCate: searchOptions.rangeDateCate,
                    searchCate: rangeDateCateOptions,
                    startDate: searchOptions.startDate,
                    endDate: searchOptions.endDate,
                    onChangeDates,
                }}
                rangeNumberSearch={{
                    currentCate: searchOptions.rangeNumberCate,
                    searchCate: rangeNumberCateOptions,
                    startNumber: searchOptions.startNumber,
                    endNumber: searchOptions.endNumber,
                    onChangeNumbers,
                }}
                mutipleSelectSearch={{
                    value: searchOptions.serachIsStockQty,
                    options: multipleSelectOptions,
                    onChangeValue: onChangeSelectBtn,
                }}
            />
            <div className="card">
                <div className="flex items-center justify-between pb-4">
                    <div></div>
                    <div className="flex space-x-2">
                        {/* <MenuButton
                            title="EXCEL"
                            position="left"
                            color="#098000"
                            menu={excelBtnMenu}
                            icon={<img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />}
                            onClickMenu={(action: string) => alert(action)}
                        /> */}
                        <button
                            className="font-bold border text-sm border-[#146BCE] rounded text-black p-1 px-2 bg-white h-[32px]"
                            onClick={() => onClickLog(0)}
                        >
                            전체로그확인
                        </button>
                        {/* <button className="font-bold border text-sm border-[#C6D4E6] rounded text-black p-1 px-2 bg-[#F5F9FD] h-[32px]">
                            그리드 항목설정
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
                    filters={filter}
                    globalFilterFields={globalFilterFields}
                    onValueChange={(e) => console.log('onValueChange : ', e)}
                    // resizableColumns
                    // columnResizeMode="expand"
                >
                    <Column align="center" className="text-[12px]" field="seq" header="NO" bodyStyle={seqBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="managerName" header="담당자" />
                    <Column align="center" className="text-[12px]" field="skuId" header="재고코드" />
                    <Column align="center" className="text-[12px] p-0 " field="image" header="이미지" body={imageBodyTemplate} />
                    <Column
                        alignHeader="center"
                        align="left"
                        className="text-[12px] min-w-[300px]"
                        headerClassName="min-w-[300px]"
                        field="skuName"
                        filterField="skuName"
                        header="상품명"
                    />
                    <Column align="center" field="options.0" header="옵션1" className="text-[12px]" />
                    <Column align="center" field="options.1" header="옵션2" className="text-[12px]" />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="order.lastReceiptPrice"
                        header={lineHeader('최근 입고가격')}
                        body={(rowData) => numberBodyTemplate(rowData.order.lastReceiptPrice)}
                        sortable
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="order.lastReceiptQty"
                        header={lineHeader('최근 입고수량')}
                        body={(rowData) => numberBodyTemplate(rowData.order.lastReceiptQty)}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="order.lastReceiptDate"
                        header={lineHeader('최근 입고일')}
                        body={(rowData) => dateBodyTemplate(rowData.order.lastReceipt)}
                        sortable
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="order.totalReceiptPrice"
                        header={lineHeader('재고금액 (수량x입고가격)')}
                        body={(rowData) => numberBodyTemplate(rowData.order.totalReceiptPrice)}
                    />
                    <Column align="center" className="text-[12px]" field="stock.availableQty" header="재고수량" sortable />
                    <Column align="center" className="text-[12px]" field="stock.disusedQty" header="불량수량" sortable />
                    {/* <Column
                        align="center"
                        className="text-[12px]"
                        field="stock.locations"
                        header="파렛트위치"
                        body={(rowData) => arrayCommaBodyTemplate(rowData.stock.locations)}
                    /> */}

                    <Column align="center" className="text-[12px]" field="log" header="로그" body={logBodyTemplate} />
                </DataTable>
            </div>
            <StockLogDialog open={logOpen} onClose={closeLogModal} logId={logId} />
        </div>
    )
}

export default StockList
