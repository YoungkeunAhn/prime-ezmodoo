import axios from 'axios'
import { map, sumBy } from 'lodash'
import numeral from 'numeral'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from 'src/api/ApiConfig'
import TextSearch from 'src/components/search-box/TextSearch'
import YearMonthDateSearch from 'src/components/search-box/YearMonthDateSearch'
import {
    dateBodyTemplate,
    imageBodyTemplate,
    numberBodyTemplate,
    printBodyTemplate,
    seqBodyTemplate,
    urlBodyTemplate,
} from 'src/hooks/data-table-hooks/BodyHooks'
import OrderProductItem from '../../../components/order/manage/dialog/OrderDetailModal'

type DialogId = 'DETAIL'

type SearchOptions = {
    startDate: Date
    endDate: Date
    searchCate: string
    searchText: string
}

const initSearchOptions: SearchOptions = {
    startDate: new Date(),
    endDate: new Date(),
    searchCate: 'global',
    searchText: '',
}

const searchCateTextOptions = [
    { label: '통합', field: 'global' },
    { label: '상품명', field: 'productsName' },
    { label: '담당자', field: 'managerName' },
    { label: '상품코드', field: 'skuId' },
    { label: '발주번호', field: 'orderNum' },
]

type DetailDialogProps = {
    pk: string
}

function OrderManageList() {
    const [paymentOpen, setPaymentOpen] = useState<boolean>(false)
    const [dialogId, setDialogId] = useState<DialogId>()
    const [detailDialogProps, setDetailDialogProps] = useState<DetailDialogProps>({ pk: '' })
    const [searchOptions, setSearchOptions] = useState<SearchOptions>(initSearchOptions)
    const [selection, setSelection] = useState([])
    const [orderList, setOrderList] = useState<any[]>([])

    const openDetailDialog = (pk: string) => {
        setDialogId('DETAIL')
        setDetailDialogProps({ pk })
    }

    const closeModal = () => {
        setDialogId(undefined)
    }

    const onTogglePayment = () => {
        setPaymentOpen(!paymentOpen)
    }

    const onClickOrderNumbreCell = (text: string) => {
        navigator.clipboard.writeText('订单编号：' + text).then(() => alert('클립보드에 저장되었습니다.'))
    }

    const wonSymbolBodyTemplate = (rowData: any, option: any) => {
        return '₩' + numeral(rowData[option.field] ?? '').format('0,0')
    }

    const cnySymbolBodyTemplate = (rowData: any, option: any) => {
        return '￥' + numeral(rowData[option.field]).format('0,0.00')
    }

    const productNameBodyTemplate = (rowData: any) => {
        return (
            <span className="flex-1 p-1" onClick={() => openDetailDialog(rowData.pk)}>
                {rowData.productName}
            </span>
        )
    }
    const longTextBodyTemplate = (rowData: any, option: any) => {
        const text = rowData[option.field]

        return <span className="text-[11px]">{text.length > 100 ? text.slice(0, 100) + '...' : text}</span>
    }

    const orderNumBodyTemplate = (rowData: any, option: any) => {
        return (
            <div className="cursor-pointer flex space-x-1 items-center" onClick={() => onClickOrderNumbreCell(rowData[option.field])}>
                <span>{rowData[option.field]}</span>
                <i className="pi pi-clone"></i>
            </div>
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

    const onChangeDates = (range: { startDate: Date; endDate: Date }) => {
        const { startDate, endDate } = range

        setSearchOptions((prev) => ({
            ...prev,
            startDate,
            endDate,
        }))
    }

    const getOrderList = async () => {
        try {
            const { data } = await axios.get(BASE_URL + 'orders')

            setOrderList(
                map(data, (order) => {
                    const { cost, orderQty, transitPee } = order
                    const totalCost = cost * orderQty + transitPee
                    const totalOrderQty = sumBy(order.products, (product: any) => product.items[0].orderQty)
                    const exchangRate = 190

                    return { ...order, totalCost, totalOrderQty, exchangeTotalCost: totalCost * exchangRate }
                })
            )
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getOrderList()
    }, [])

    return (
        <div>
            <div className="page-header border rounded-lg flex bg-white mb-5">
                <div>
                    <div className="flex items-center px-4 border-b h-[66px] box-border">
                        <div className="flex flex-col justify-center pt-4">
                            <span className="font-bold text-lg relative">발주리스트</span>
                            <div className="border-2 w-full border-blue-500 relative -bottom-[14px]"></div>
                        </div>
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : 3862</span>
                        <div className="flex ml-10 h-full text-sm space-x-5">
                            <div
                                className="rounded-b-full pt-1 bg-[#7E00B2] text-center text-white h-[35px] cursor-pointer w-[75px]"
                                onClick={onTogglePayment}
                            >
                                결제금액
                            </div>
                            <div className={`flex space-x-2 h-[50px] overflow-hidden ${paymentOpen ? 'w-fit' : 'w-0'}`}>
                                <table className="text-sm border text-center">
                                    <tr>
                                        <th className="border bg-[#F7E2FF] px-2 border-b">결제 예정 금액</th>
                                        <td className="border w-[140px]">￥ 828,419.24</td>
                                        <td className="border w-[140px]">￦ 167,340,687</td>
                                    </tr>
                                    <tr>
                                        <th className="border bg-[#F7E2FF] px-2">결제 완료 금액</th>
                                        <td className="border w-[140px]">￥ 0.00</td>
                                        <td className="border w-[140px]">￦ 0</td>
                                    </tr>
                                </table>
                                <table className="text-center border">
                                    <tr>
                                        <td className="border w-[140px] custom-tooltip" data-tooltip="긴급,미결제건">
                                            ￦ 75,285,339
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border w-[140px] custom-tooltip" data-tooltip="긴급,결제건">
                                            ￦ 1,783,256
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-4 p-4">
                        <YearMonthDateSearch
                            title="발주일"
                            startDate={searchOptions.startDate}
                            endDate={searchOptions.endDate}
                            onChangeDates={onChangeDates}
                            onChangeInput={onChangeSearchOptionInput}
                        />
                        <TextSearch
                            options={searchCateTextOptions}
                            currentCate={searchOptions.searchCate}
                            text={searchOptions.searchText}
                            onChangeDropdown={onChangeSearchOptionDropdown}
                            onChangeText={onChangeSearchOptionInput}
                        />
                    </div>
                </div>
                <div className="border-l flex flex-col">
                    <div className="h-[65px]"></div>
                    <div className="flex items-end space-x-2 p-4">
                        <button className="btn default-btn">초기화</button>
                        <button className="btn primary-btn">검색</button>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="flex items-center space-x-2 mb-2 text-sm">
                    <Dropdown value="" className="h-[32px]" options={[{ label: '배송정보', value: '' }]} optionLabel="label" optionValue="value" />
                    <button className="btn primary-btn">선택수정</button>
                    <button className="btn primary-btn">선택삭제</button>
                    <button className="btn primary-btn">물류보내기</button>
                    <button className="border border-[#098000] rounded bg-white flex items-center space-x-2 p-1 px-2 h-[30px]">
                        <img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />
                        <span className="font-bold text-black text-sm">엑셀 다운로드</span>
                    </button>
                </div>
                <DataTable
                    value={orderList}
                    resizableColumns
                    removableSort
                    sortMode="multiple"
                    className="text-sm"
                    responsiveLayout="scroll"
                    columnResizeMode="expand"
                    selectionMode="checkbox"
                    selection={selection}
                    onSelectionChange={(e) => setSelection(e.value)}
                >
                    <Column align="center" selectionMode="multiple" selectionAriaLabel="id" field="id"></Column>
                    <Column align="center" field="seq" header="NO" body={seqBodyTemplate} />
                    <Column align="center" field="id" header="발주번호" />
                    <Column align="center" field="orderDate" header="발주일자" sortable body={(rowData) => dateBodyTemplate(rowData.orderDate)} />
                    <Column align="center" field="manager" header="담당자" />
                    <Column align="center" field="image" header="이미지" body={imageBodyTemplate} />
                    <Column align="center" field="url" header="URL" body={(rowData) => urlBodyTemplate(rowData.url)} />
                    <Column
                        align="center"
                        field="productName"
                        header="상품명"
                        body={productNameBodyTemplate}
                        headerStyle={{ minWidth: '200px' }}
                        className="cursor-pointer"
                    />
                    <Column align="center" field="orderNum" header="주문번호" body={orderNumBodyTemplate} />
                    <Column
                        align="center"
                        field="totalOrderQty"
                        header="발주총수량"
                        sortable
                        body={(rowData) => numberBodyTemplate(rowData.totalOrderQty)}
                    />
                    <Column align="center" field="cost" header="구매단가" sortable body={cnySymbolBodyTemplate} />
                    <Column align="center" field="transitPee" header="중국운송비" sortable body={cnySymbolBodyTemplate} />
                    <Column align="center" field="totalCost" header="구매총액" sortable body={cnySymbolBodyTemplate} />
                    <Column align="center" field="exchangeTotalCost" header="한국금액" body={wonSymbolBodyTemplate} />
                    <Column align="center" field="paymentDate" header="결제일" sortable />
                    <Column align="center" field="factoryReleaseDate" header="공장출고 예정일" sortable />
                    <Column align="center" field="arrivalReleaseDate" header="본사도착 예정일" sortable />
                    <Column align="center" field="chinaTransitInfo" header="중국운송장정보" />
                    <Column align="center" field="productDistribution" header="상품물류정보" body={longTextBodyTemplate} />
                    <Column align="center" field="mdMemo" header="MD메모" body={longTextBodyTemplate} headerStyle={{ minWidth: '200px' }} />
                    <Column align="center" field="traderMemo" header="무역메모" body={longTextBodyTemplate} />
                    <Column align="center" field="packingState" header="패킹상태" />
                    <Column align="center" field="print" header="인쇄" body={printBodyTemplate} />
                </DataTable>
            </div>
            <OrderProductItem open={dialogId === 'DETAIL'} onClose={closeModal} {...detailDialogProps} />
        </div>
    )
}

export default OrderManageList
