import axios from 'axios'
import * as FileSaver from 'file-saver'
import { flattenDeep, map } from 'lodash'
import numeral from 'numeral'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { DropdownChangeParams } from 'primereact/dropdown'
import React, { useCallback, useEffect, useState } from 'react'
import { BASE_URL } from 'src/api/ApiConfig'
import MenuButton from 'src/components/custom-buttons/MenuButton'
import SearchCateTextOption from 'src/components/search-box/SearchCateTextOption'
import SearchDateOption from 'src/components/search-box/SearchDateOption'
import SearchMarketIdOption from 'src/components/search-box/SearchMarketIdOption'
import SellerOption from 'src/components/search-box/SearchSellerOption'
import { dateBodyTemplate, imageBodyTemplate, numberBodyTemplate, seqBodyTemplate, urlBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import { ProductsGruop } from 'src/types/product-manage'
import * as XLSX from 'xlsx'
import ProductDialog from './detail-modal/ProductDialog'

type DialogId = 'CREATE' | 'DETAIL'

type DetailModalProps = {
    pk: string
}

export type TableViwer = 'ALL' | 'true' | 'false'

type SearchOptions = {
    seller: string
    marketId: string
    year: string
    month: string
    startDate: string
    endDate: string
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
    startDate: '',
    endDate: '',
}

const searchCateTextOptions = [
    { label: '통합', field: 'global' },
    { label: '상품명', field: 'productsName' },
    { label: '담당자', field: 'managerName' },
    { label: '상품코드', field: 'products.0.items.0.units.0.skuId' },
]

const initFileter = {
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
    productsName: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.CONTAINS }] },
    managerName: { value: '', matchMode: FilterMatchMode.CONTAINS },
    sellerList: { value: '', matchMode: FilterMatchMode.CONTAINS },
    marketList: { value: '', matchMode: FilterMatchMode.CONTAINS },
    'products.0.items.0.units.0.skuId': { value: '', matchMode: FilterMatchMode.CONTAINS },
}

const excelBtnMenu = [
    { label: '전체상품 엑셀 다운로드', action: 'ALL' },
    { label: '선택상품 엑셀 다운로드', action: 'select' },
    { label: '엑셀 업로드(증감/차감)', action: 'upload' },
]

const showBtnMenu = [
    { label: '전체상품 보기', action: 'ALL' },
    { label: '전체상품 보기(마감제외)', action: 'true' },
    { label: '마감상품 보기', action: 'false' },
]

function ProductManageList() {
    const [dialogId, setDialogId] = useState<DialogId>()
    const [productsGroupList, setProductsGroupList] = useState<ProductsGruop[]>([])
    const [detailModalProps, setDetailmodalProps] = useState<DetailModalProps>()
    const [searchOptions, setSearchOptions] = useState<SearchOptions>(initSearhOptions)
    const [filter, setFilter] = useState(initFileter)
    const [selection, setSelection] = useState<ProductsGruop[]>([])

    const [tableViewer, setTableViewer] = useState<TableViwer>('ALL')

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

        return <span>{itemsLength > 1 ? `${option} 외(${itemsLength - 1})` : option}</span>
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
        loadProductList()
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

    const onChangeDates = (startDate: string, endDate: string) => {
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

    const onClickExcelMenu = (action: string) => {
        const itemPkList = flattenDeep(map(productsGroupList, (g) => map(g.products, (p) => map(p.items, (i) => i.pk))))

        const xlsxColumn = ['그룹ID', '그룹상품명']
        exportXlsx(xlsxColumn, productsGroupList)
    }

    const exportXlsx = (column: string[], data: ProductsGruop[]) => {
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

    const clearSearchOptions = () => {
        setSearchOptions(initSearhOptions)
        setFilter(initFileter)
    }

    const onClickTableViewerBtn = (action: TableViwer) => {
        setTableViewer(action)
    }

    const isSalesTrue = useCallback(async () => {
        try {
            if (selection.length > 0) {
                // eslint-disable-next-line no-restricted-globals
                if (confirm('선택상품을 마감처리 하시겠습니까?')) {
                    await axios.post(
                        BASE_URL + 'products/isSales?value=true',
                        selection.map((select) => select.pk)
                    )
                }

                alert('완료되었습니다.')
                setSelection([])

                const selectionPkList = selection.map((select) => select.pk)
                setProductsGroupList((prev) => prev.map((group) => (selectionPkList.includes(group.pk) ? { ...group, isSales: true } : group)))
                console.log(productsGroupList)
            }
        } catch (err) {
            console.error(err)
        }
    }, [selection, productsGroupList])

    const isSalesFalse = useCallback(async () => {
        try {
            if (selection.length > 0) {
                // eslint-disable-next-line no-restricted-globals
                if (confirm('선택상품을 마감해제 하시겠습니까?')) {
                    await axios.post(
                        BASE_URL + 'products/isSales?value=false',
                        selection.map((select) => select.pk)
                    )
                }

                alert('완료되었습니다.')
                setSelection([])

                const selectionPkList = selection.map((select) => select.pk)
                setProductsGroupList((prev) => prev.map((group) => (selectionPkList.includes(group.pk) ? { ...group, isSales: false } : group)))
                console.log(productsGroupList)
            }
        } catch (err) {
            console.error(err)
        }
    }, [selection, productsGroupList])

    const deleteProductGroup = useCallback(async () => {
        try {
            if (selection.length > 0) {
                // eslint-disable-next-line no-restricted-globals
                if (confirm('삭제하시겠습니까?')) {
                    const checkList = selection.map((select) => select.pk)
                    await axios.post(BASE_URL + `products?_method=DELETE`, checkList)

                    setProductsGroupList((prev) => prev.filter((it) => !checkList.includes(it.pk)))
                }
                alert('삭제되었습니다.')
                setSelection([])
            }
        } catch (err) {
            console.error(err)
        }
    }, [selection])

    const loadProductList = async () => {
        try {
            const { data } = await axios.get(BASE_URL + 'products')
            setProductsGroupList(
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
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : {productsGroupList.length}</span>
                    </div>
                    <div className="flex space-x-4 p-4 min-w-[70vw]">
                        <SellerOption value={searchOptions.seller} onChange={onChangeSearchOptionDropdown} />

                        <SearchMarketIdOption value={searchOptions.marketId} onChange={onChangeSearchOptionDropdown} />

                        <SearchCateTextOption
                            options={searchCateTextOptions}
                            cate={searchOptions.searchCate}
                            onChangeDropdown={onChangeSearchOptionDropdown}
                            text={searchOptions.searchText}
                            onChangeText={onChangeSearchOptionInput}
                        />

                        <SearchDateOption
                            title="등록일"
                            startDate={searchOptions.startDate}
                            endDate={searchOptions.endDate}
                            onChangeDates={onChangeDates}
                            onChangeInput={onChangeSearchOptionInput}
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
                        <button className="btn primary-btn" onClick={onClickCreateBtn}>
                            신규등록
                        </button>
                        <button className="btn primary-btn" onClick={deleteProductGroup}>
                            선택삭제
                        </button>
                        <button className="btn primary-btn" onClick={() => alert('추후 업데이트 될 예정입니다.')}>
                            선택복사
                        </button>
                        <button className="btn primary-btn" onClick={isSalesFalse}>
                            상품마감
                        </button>
                        <button className="btn primary-btn" onClick={isSalesTrue}>
                            마감해제
                        </button>
                        <MenuButton title="전체상품보기" color="#146BCE" menu={showBtnMenu} onClickMenu={onClickTableViewerBtn} />
                        <button className="btn primary-btn">디자인요청</button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MenuButton
                            title="EXCEL"
                            position="left"
                            color="#098000"
                            menu={excelBtnMenu}
                            icon={<img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />}
                            onClickMenu={onClickExcelMenu}
                        />
                    </div>
                </div>
                <DataTable
                    value={
                        tableViewer === 'ALL'
                            ? productsGroupList
                            : tableViewer === 'true'
                            ? productsGroupList.filter((it) => it.isSales)
                            : productsGroupList.filter((it) => !it.isSales)
                    }
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
