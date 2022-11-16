import axios from 'axios'
import * as FileSaver from 'file-saver'
import { cloneDeep, flattenDeep, map, set } from 'lodash'
import numeral from 'numeral'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from 'src/api/ApiConfig'
import { fakeConfig } from 'src/common/fake-data/config'
import MenuButton from 'src/components/custom-buttons/MenuButton'
import { imageBodyTemplate, urlBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import { marketTemplate } from 'src/hooks/dropdown/ValueTemplate'
import { ProductGruop } from 'src/types/product-manage'
import * as XLSX from 'xlsx'
import ProductDialog from './detail-modal/ProductDialog'

type DialogId = 'CREATE' | 'DETAIL'

type DetailModalProps = {
    pk: string
}

type SearchOptions = {
    seller: string
    marketId: string
    searchCate: 'global' | 'productsName' | 'managerName' | 'products.0.items.0.units.0.skuId' | 'products.0.items.0.units.0.trade.purchasePrice'
    searchText: string
    year: string
    month: string
    startDate: string
    endDate: string
}

const initSearhOptions: SearchOptions = {
    seller: '',
    marketId: '',
    searchCate: 'global',
    searchText: '',
    year: '',
    month: '',
    startDate: '',
    endDate: '',
}

export const ecommerceList = [
    'coupang_rocket',
    'coupang_jet',
    'coupang_3p',
    'auction',
    'street11',
    'gmarket',
    'tmon',
    'wemakeprice',
    'interpark',
    'ably',
    'zigzag',
    'talkstore',
    'funshop',
    'smartstore',
]

export const sellerOptions = [{ pk: '', name: '전체' }].concat(fakeConfig.sellers)
export const marketIdOptions = [{ id: '', name: '전체' }].concat(fakeConfig.markets)
export const searchCateList = [
    { label: '통합', field: 'global' },
    { label: '상품명', field: 'productsName' },
    { label: '담당자', field: 'managerName' },
    { label: '상품코드', field: 'products.0.items.0.units.0.skuId' },
    // { label: '옵션', field: 'itemOptions' },
    // { label: '상품바코드', field: 'barcode' },
    // { label: '옵션ID', field: 'itemId' },
    // { label: 'SKU.No', field: 'marketSkuId' },
]
export const searchYear = [
    { label: '연도별', value: '' },
    { label: '2022년', value: '2022' },
    { label: '2023년', value: '2023' },
]

export const searchMonth = [
    {
        label: '월별',
        value: '',
    },
].concat(new Array(12).fill(0).map((x, idx) => ({ label: idx + 1 + '월', value: idx + 1 + '' })))

const initFileter = {
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
    productsName: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.CONTAINS }] },
    managerName: { value: '', matchMode: FilterMatchMode.CONTAINS },
    sellerList: { value: '', matchMode: FilterMatchMode.CONTAINS },
    marketList: { value: '', matchMode: FilterMatchMode.CONTAINS },
    'products.0.items.0.units.0.skuId': { value: '', matchMode: FilterMatchMode.CONTAINS },
}

function ProductManageList() {
    const [dialogId, setDialogId] = useState<DialogId>()
    const [productList, setProductList] = useState<ProductGruop[]>([])
    const [detailModalProps, setDetailmodalProps] = useState<DetailModalProps>()
    const [searchOptions, setSearhOptions] = useState<SearchOptions>(initSearhOptions)
    const [filter, setFilter] = useState(initFileter)

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

        if (itemsLength > 1) {
            return (
                <span>
                    {option} 외(
                    {itemsLength - 1})
                </span>
            )
        } else {
            return <span>{option}</span>
        }
    }

    const numberBodyTemplate = (value: number) => {
        return numeral(value).format('0,0')
    }

    const commissionRateBodyTemplate = (rowData: any) => {
        return numeral(rowData.products[0].items[0].commissionRate).format('0.0') + '%'
    }

    const profitRateBodyTemplate = (rowData: any) => {
        return numeral(rowData.profitRate).format('0.0%')
    }

    const onClickProductsName = (pk: string) => {
        setDialogId('DETAIL')
        setDetailmodalProps({ pk })
    }

    const onClickCreateBtn = () => {
        setDialogId('CREATE')
        setDetailmodalProps(undefined)
    }

    const onCloseModal = () => {
        setDialogId(undefined)
        setDetailmodalProps(undefined)
    }

    const loadProductList = async () => {
        try {
            const { data } = await axios.get(BASE_URL + 'products')
            setProductList(
                map(data, function (x, i) {
                    const item = x.products[0].items[0]
                    const salePrice = item.salePrice
                    const deliveryCharge = item.deliveryCharge
                    const commissionRate = item.commissionRate
                    const purchasePrice = item.units[0].trade.purchasePrice

                    const settlementPrice = (salePrice / 100) * (100 - commissionRate) - deliveryCharge
                    const profit = settlementPrice - purchasePrice
                    const profitRate = profit / salePrice

                    const sellerList: string = map(x.products, (product) => product.sellerPk).join(',')
                    const marketList: string = map(x.products, (product) => product.marketId).join(',')

                    return {
                        ...x,
                        seq: i + 1,
                        settlementPrice,
                        profit,
                        profitRate,
                        sellerList,
                        marketList,
                    }
                })
            )
        } catch (err) {
            console.error(err)
        }
    }

    const onChangeSearchOptionDropdown = (event: DropdownChangeParams) => {
        setSearhOptions((prev) => ({
            ...prev,
            [event.target.name]: event.value,
        }))
    }

    const onChangeSearchOptionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearhOptions((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const onSearch = () => {
        const { searchCate, searchText, marketId, seller } = searchOptions

        console.log(productList)

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
            // setFilter((prev) => set(cloneDeep(prev), [searchCate, 'value'], searchText))
            setFilter((prev) => ({
                ...prev,
                [searchCate]: searchCateFilter,
                sellerList: sellerListFilter,
                marketList: marketListFilter,
            }))
        }
        setFilter((prev) => ({ ...prev, sellerList: sellerListFilter, marketList: marketListFilter }))
    }

    const onClickExcelMenu = (action: string) => {
        const itemPkList = flattenDeep(map(productList, (g) => map(g.products, (p) => map(p.items, (i) => i.pk))))

        const xlsxColumn = ['그룹ID', '그룹상품명']
        exportXlsx(xlsxColumn, productList)
    }

    const exportXlsx = (column: string[], data: ProductGruop[]) => {
        const exceFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const excelFileExtension = '.xlsx'
        const excelFileName = '상품리스트_' + new Date().getTime()

        const ws = XLSX.utils.aoa_to_sheet([column])

        data.map((item) => XLSX.utils.sheet_add_aoa(ws, [Object.values(item)], { origin: -1 }))

        const wb: any = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const excelFile = new Blob([excelBuffer], { type: exceFileType })

        FileSaver.saveAs(excelFile, excelFileName + excelFileExtension)
    }

    const resetSearchOptions = () => {
        setSearhOptions(initSearhOptions)
        setFilter(initFileter)
    }

    useEffect(() => {
        loadProductList()
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
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : {productList.length}</span>
                    </div>
                    <div className="flex space-x-4 p-4 min-w-[70vw]">
                        <div className="flex space-x-2 items-center">
                            <span className="font-bold text-[13px]">판매사</span>
                            <Dropdown
                                className="min-w-[100px]"
                                name="seller"
                                optionLabel="name"
                                optionValue="pk"
                                options={sellerOptions}
                                value={searchOptions.seller}
                                onChange={onChangeSearchOptionDropdown}
                            />
                        </div>

                        <div className="flex space-x-2 items-center">
                            <span className="font-bold text-[13px]">판매처</span>
                            <Dropdown
                                className="min-w-[100px]"
                                name="marketId"
                                optionLabel="name"
                                optionValue="id"
                                options={marketIdOptions}
                                value={searchOptions.marketId}
                                onChange={onChangeSearchOptionDropdown}
                                valueTemplate={marketTemplate(searchOptions.marketId)}
                                itemTemplate={(option) => marketTemplate(option.id)}
                            />
                        </div>
                        <div className="flex space-x-2 items-center">
                            <Dropdown
                                className="min-w-[100px]"
                                name="searchCate"
                                optionLabel="label"
                                optionValue="field"
                                options={searchCateList}
                                value={searchOptions.searchCate}
                                onChange={onChangeSearchOptionDropdown}
                            />

                            <InputText name="searchText" value={searchOptions.searchText} onChange={onChangeSearchOptionInput} />
                        </div>
                        {/* <div className="flex items-center space-x-2">
                            <span className="font-bold text-[13px]">등록일</span>
                            <button className="border rounded px-4 h-[30px] text-[12px] border-[#ddd] text-black">전체</button>
                            <Dropdown
                                className="min-w-[100px]"
                                name="year"
                                optionLabel="label"
                                optionValue="value"
                                options={searchYear}
                                value={searchOptions.year}
                                onChange={onChangeSearchOptionDropdown}
                            />
                            <Dropdown
                                className="min-w-[100px]"
                                name="month"
                                optionLabel="label"
                                optionValue="value"
                                options={searchMonth}
                                value={searchOptions.month}
                                onChange={onChangeSearchOptionDropdown}
                            />
                            <InputText type="date" name="startDate" value={searchOptions.startDate} onChange={onChangeSearchOptionInput} />
                            <span>~</span>
                            <InputText type="date" name="endDate" value={searchOptions.endDate} onChange={onChangeSearchOptionInput} />
                        </div> */}
                    </div>
                </div>
                <div className="border-l flex flex-col">
                    <div className="h-[65px]"></div>
                    <div className="flex items-end space-x-2 p-4">
                        <button className="btn default-btn" onClick={resetSearchOptions}>
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
                        <button className="btn primary-btn" onClick={onClickCreateBtn}>
                            신규등록
                        </button>
                        <button className="btn primary-btn">선택삭제</button>
                        <button className="btn primary-btn">선택복사</button>
                        <button className="btn primary-btn">상품마감</button>
                        <button className="btn primary-btn">마감해제</button>
                        <MenuButton
                            title="전체상품보기"
                            color="#146BCE"
                            menu={['전체상품 보기', '전체상품 보기(마감제외)', '마감상품 보기']}
                            onClickMenu={(action: string) => alert(action)}
                        />
                        <button className="btn primary-btn">디자인요청</button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MenuButton
                            title="EXCEL"
                            position="left"
                            color="#098000"
                            menu={['전체상품 엑셀 다운로드', '선택상품 엑셀 다운로드', '엑셀 업로드(상품 수정)']}
                            icon={<img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />}
                            onClickMenu={onClickExcelMenu}
                        />
                    </div>
                </div>
                <DataTable
                    value={productList}
                    responsiveLayout="scroll"
                    sortMode="multiple"
                    removableSort
                    resizableColumns
                    className="max-h-[99vh]"
                    columnResizeMode="expand"
                    filters={filter}
                    globalFilterFields={['productsName', 'managerName', 'products.0.items.0.units.0.skuId']}
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
                    <Column align="center" className="text-[12px]" field="seq" header="NO" />
                    <Column align="center" className="text-[12px]" field="createdAt" header="등록일" />
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
                        body={(rowData: any) => urlBodyTemplate(rowData.productsLinkUrls[0])}
                    />
                    <Column
                        alignHeader="center"
                        align="left"
                        className="text-[12px]"
                        field="productsName"
                        header="상품명"
                        filterField="productsName"
                        headerStyle={{
                            width: '250px',
                        }}
                        body={productsNameBodyTemplate}
                    />
                    <Column
                        alignHeader="center"
                        align="left"
                        className="text-[12px]"
                        field=""
                        header="옵션1"
                        body={(rowdata) => optionsBodyTemplate(rowdata, 0)}
                    />
                    <Column
                        alignHeader="center"
                        align="left"
                        className="text-[12px]"
                        field=""
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
                        field="settlementPrice"
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
                    {/* 
                    <Column align="center" className="text-[12px]" field="seller" header="판매사" />
                    <Column align="center" className="text-[12px]" field="ecommerce" header="판매처" body={ecommerceBodyTemplate} />
                    */}
                </DataTable>
            </div>
            {<ProductDialog open={dialogId === 'CREATE' || dialogId === 'DETAIL'} onClose={onCloseModal} {...detailModalProps} />}
        </div>
    )
}

export default ProductManageList
