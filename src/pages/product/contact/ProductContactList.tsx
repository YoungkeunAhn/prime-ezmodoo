import axios from 'axios'
import { map } from 'lodash'
import numeral from 'numeral'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { DropdownChangeParams } from 'primereact/dropdown'
import { Paginator, PaginatorPageState } from 'primereact/paginator'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from 'src/api/ApiConfig'
import SearchCateDateRangeOption from 'src/components/search-box/SearchCateDateRangeOption'
import SearchCateTextOption from 'src/components/search-box/SearchCateTextOption'
import { dateBodyTemplate, imageBodyTemplate, numberBodyTemplate, seqBodyTemplate, urlBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import { ProductsGruop } from 'src/types/product-manage'

type DialogId = 'CREATE' | 'DETAIL'

type DetailModalProps = {
    pk: string
}

type SearchOptions = {
    seller: string
    marketId: string
    year: string
    month: string

    dateRangeCate: 'createdAt'
    startDate: Date
    endDate: Date
    searchText: string
    searchCate: 'global' | 'productsName' | 'managerName' | 'products.0.items.0.units.0.skuId' | 'products.0.items.0.units.0.trade.purchasePrice'
}

const initSearhOptions: SearchOptions = {
    seller: '',
    marketId: '',
    searchCate: 'global',
    searchText: '',
    year: '',
    month: '',

    dateRangeCate: 'createdAt',
    startDate: new Date(),
    endDate: new Date(),
}

const searchCateTextOptions: SearchCate[] = [
    { label: '통합', field: 'global' },
    { label: '상품명', field: 'productsName' },
    { label: '담당자', field: 'managerName' },
    { label: '상품코드', field: 'products.0.items.0.units.0.skuId' },
]

const searchCateDateRangeOptions: SearchCate[] = [
    {
        label: '등록일',
        field: 'createdAt',
    },
]

const initFileter = {
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
    productsName: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.CONTAINS }] },
    managerName: { value: '', matchMode: FilterMatchMode.CONTAINS },
    sellerList: { value: '', matchMode: FilterMatchMode.CONTAINS },
    marketList: { value: '', matchMode: FilterMatchMode.CONTAINS },
    'products.0.items.0.units.0.skuId': { value: '', matchMode: FilterMatchMode.CONTAINS },
}

function ProductContactList() {
    const [searchOptions, setSearchOptions] = useState<SearchOptions>(initSearhOptions)
    const [productsGroupList, setProductsGroupList] = useState<ProductsGruop[]>([])
    const [dialogId, setDialogId] = useState<DialogId>()
    const [detailModalProps, setDetailmodalProps] = useState<DetailModalProps>()
    const [filter, setFilter] = useState(initFileter)
    const [selection, setSelection] = useState<ProductsGruop[]>([])

    const [basicFirst, setBasicFirst] = useState(0)
    const [basicRows, setBasicRows] = useState(10)

    const onBasicPageChange = (event: PaginatorPageState) => {
        setBasicFirst(event.first)
        setBasicRows(event.rows)
    }

    const productsNameBodyTemplate = (rowData: any) => {
        return (
            <span className="flex w-full py-2" onClick={() => onClickProductsName(rowData.pk)}>
                {rowData.productsName}
            </span>
        )
    }

    const optionsBodyTemplate = (rowData: any, index: number) => {
        const option = rowData.products[0].items[0].itemOptions[index] as string
        const itemsLength = rowData.products[0].items.length

        if (option) {
            return <span>{itemsLength > 1 ? `${option} 외(${itemsLength - 1})` : option}</span>
        }
    }

    const profitRateBodyTemplate = (rowData: any) => {
        return numeral(rowData.profitRate).format('0.0%')
    }

    const commissionRateBodyTemplate = (rowData: any) => {
        return numeral(rowData.products[0].items[0].commissionRate).format('0.00') + '%'
    }

    const onClickProductsName = (pk: string) => {
        setDialogId('DETAIL')
        setDetailmodalProps({ pk })
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

    const onChangeDates = (range: { startDate: Date; endDate: Date }) => {
        const { startDate, endDate } = range
        setSearchOptions((prev) => ({
            ...prev,
            startDate,
            endDate,
        }))
    }

    const onSearch = () => {
        const { searchCate, searchText, marketId, seller } = searchOptions

        console.log(productsGroupList)

        const sellerListFilter = { value: seller, matchMode: FilterMatchMode.CONTAINS }
        const marketListFilter = { value: marketId, matchMode: FilterMatchMode.CONTAINS }
        const searchCateFilter = { value: searchText, matchMode: FilterMatchMode.CONTAINS }

        if (searchCate === 'productsName') {
            setFilter((prev) => ({
                ...prev,
                productsName: {
                    ...prev.productsName,
                    constraints: searchText.split(' ').map((word) => ({ value: word, matchMode: FilterMatchMode.CONTAINS })),
                },
                sellerList: sellerListFilter,
                marketList: marketListFilter,
            }))
        } else {
            setFilter((prev) => ({
                ...prev,
                [searchCate]: searchCateFilter,
                sellerList: sellerListFilter,
                marketList: marketListFilter,
            }))
        }
        setFilter((prev) => ({ ...prev, sellerList: sellerListFilter, marketList: marketListFilter }))
    }

    const clearSearchOptions = () => {
        setSearchOptions(initSearhOptions)
        setFilter(initFileter)
    }

    const loadList = async () => {
        try {
            const { data } = await axios.get(BASE_URL + 'products')

            setProductsGroupList(
                map(data, function (x, i) {
                    const item = x.products[0].items[0]
                    const salePrice = item.salePrice
                    const couponPrice = item.couponPrice
                    const deliveryCharge = item.deliveryCharge
                    const commissionRate = item.commissionRate
                    const purchasePrice = item.units[0].trade.purchasePrice

                    const calcPrice = Math.floor(((salePrice - couponPrice) / 100) * (100 - commissionRate) - deliveryCharge)
                    const profit = calcPrice - purchasePrice
                    const profitRate = profit / salePrice

                    const sellerList: string = map(x.products, (product) => product.sellerPk).join(',')
                    const marketList: string = map(x.products, (product) => product.marketId).join(',')

                    return {
                        ...x,
                        seq: i + 1,
                        calcPrice,
                        profit,
                        profitRate,
                        sellerList,
                        marketList,
                        createdAt: new Date(x.createdAt),
                    }
                })
            )
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        loadList()
    }, [])

    return (
        <div>
            <div className="page-header border rounded-lg flex bg-white mb-5">
                <div>
                    <div className="flex items-center px-4 pt-4 border-b h-[66px] box-border">
                        <div className="flex flex-col justify-center ">
                            <span className="font-bold text-lg relative">상품관리</span>
                            <div className="border-2 w-full border-blue-500 relative -bottom-[14px]"></div>
                        </div>
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : {productsGroupList.length}</span>
                    </div>
                    <div className="flex space-x-4 p-4 min-w-[70vw]">
                        <SearchCateTextOption
                            options={searchCateTextOptions}
                            cate={searchOptions.searchCate}
                            onChangeDropdown={onChangeSearchOptionDropdown}
                            text={searchOptions.searchText}
                            onChangeText={onChangeSearchOptionInput}
                        />

                        <SearchCateDateRangeOption
                            startDate={searchOptions.startDate}
                            endDate={searchOptions.endDate}
                            onChangeDates={onChangeDates}
                            options={searchCateDateRangeOptions}
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
                <div className="flex items-center justify-between space-x-2 mb-2">
                    <div className="flex items-center space-x-2">
                        <button className="btn primary-btn" onClick={() => {}}>
                            신규등록
                        </button>
                        <button className="btn primary-btn" onClick={() => {}}>
                            선택삭제
                        </button>
                        {/* <button className="btn primary-btn" onClick={() => alert('추후 업데이트 될 예정입니다.')}>
                            선택복사
                        </button> */}
                        <button className="btn primary-btn" onClick={() => {}}>
                            상품관리보내기
                        </button>
                    </div>
                    <div className="flex items-center space-x-2"></div>
                </div>

                <DataTable
                    value={productsGroupList}
                    removableSort
                    sortMode="multiple"
                    responsiveLayout="scroll"
                    className="max-h-[99vh]"
                    selectionMode="checkbox"
                    selection={selection}
                    onSelectionChange={(e) => setSelection(e.value)}
                    filters={filter}
                    globalFilterFields={['productsName', 'managerName', 'products.0.items.0.units.0.skuId']}
                    // resizableColumns
                    // columnResizeMode="expand"
                >
                    <Column
                        align="center"
                        selectionMode="multiple"
                        selectionAriaLabel="productsId"
                        headerStyle={{
                            width: '3em',
                        }}
                        field="productsId"
                    ></Column>
                    <Column align="center" className="text-[12px]" field="seq" header="NO" body={seqBodyTemplate} />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="createdAt"
                        header="등록일"
                        body={(rowData) => dateBodyTemplate(rowData.createdAt)}
                    />
                    <Column align="center" className="text-[12px]" field="managerName" header="담당자" filterField="managerName" />
                    <Column
                        align="center"
                        className="text-[12px]"
                        header="상품코드"
                        field="products.0.items.0.units.0.skuId"
                        filterField="products.0.items.0.units.0.skuId"
                    />
                    <Column align="center" className="text-[12px]" field="productsImageUrl" header="이미지" body={imageBodyTemplate} />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="url"
                        header="URL"
                        body={(rowData) => urlBodyTemplate(rowData.productsLinkUrls[0])}
                    />
                    <Column
                        alignHeader="center"
                        align="left"
                        className="text-[12px] cursor-pointer"
                        field="productsName"
                        header="상품명"
                        filterField="productsName"
                        headerClassName="min-w-[250px]"
                        body={productsNameBodyTemplate}
                    />
                    <Column
                        alignHeader="center"
                        align="left"
                        className="text-[12px]"
                        field="options"
                        header="옵션1"
                        body={(rowdata) => optionsBodyTemplate(rowdata, 0)}
                    />
                    <Column
                        alignHeader="center"
                        align="left"
                        className="text-[12px]"
                        field="options"
                        header="옵션2"
                        body={(rowdata) => optionsBodyTemplate(rowdata, 1)}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="products.0.items.0.units.0.trade.purchasePrice"
                        header="입고가격"
                        sortable
                        body={(rowData) => numberBodyTemplate(rowData.products[0].items[0].units[0].trade.purchasePrice)}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="products.0.items.0.salePrice"
                        header="판매가격"
                        sortable
                        body={(rowData) => numberBodyTemplate(rowData.products[0].items[0].salePrice)}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="products.0.items.0.couponPrice"
                        header="할인쿠폰금액"
                        body={(rowData) => numberBodyTemplate(rowData.products[0].items[0].couponPrice)}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="products.0.items.0.commissionRate"
                        header="판매수수료"
                        body={commissionRateBodyTemplate}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="calcPrice"
                        header="정산금액"
                        sortable
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                    />
                    <Column
                        align="center"
                        className="text-[12px]"
                        field="profit"
                        header="판매이익"
                        sortable
                        body={(rowData, option) => numberBodyTemplate(rowData[option.field])}
                    />
                    <Column align="center" className="text-[12px]" field="profitRate" header="판매이익률" sortable body={profitRateBodyTemplate} />
                </DataTable>

                <Paginator first={basicFirst} rows={basicRows} totalRecords={productsGroupList.length} onPageChange={onBasicPageChange}></Paginator>
            </div>
            {/* {<ProductDialog open={dialogId === 'CREATE' || dialogId === 'DETAIL'} onClose={onCloseModal} {...detailModalProps} />} */}
        </div>
    )
}

export default ProductContactList
