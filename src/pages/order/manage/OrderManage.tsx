import numeral from 'numeral'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import React, { useState } from 'react'
import SearchCateTextOption from 'src/components/search-box/SearchCateTextOption'
import SearchDateOption from 'src/components/search-box/SearchDateOption'
import { dateBodyTemplate, imageBodyTemplate, printBodyTemplate, seqBodyTemplate, urlBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import OrderProductItem from './detail-modal/OrderDetailModal'

const fakeData = [
    {
        id: '1234',
        priority: '1',
        orderDate: '2022-10-21 10:10:10',
        manager: '안영근',
        image: 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg',
        url: 'http://im.imama.kr/imama/',
        productName: '로지 샤프트 펄 실내화 슬리퍼 2P',
        orderNum: '2963422620261524134',
        orderQty: 600,
        cost: 45.0,
        transitPee: 0,
        paymentDate: '2022-10-21',
        factoryReleaseDate: '2022-10-21',
        arrivalReleaseDate: '2022-10-21',
        chinaTransitInfo: '安能 3005-1600-6972',
        productDistribution: [
            '카톤사이즈: 60*45*40',
            'Net W/T(Kg): 201.4',
            'Gross W/T (Kg): 205',
            '박스입수량(EA): 130',
            '박스수량: 8.1538461538462',
            'Measurement (CBM): 0.88061538461538',
        ],
        mdMemo: '바코드 전달 완료- 추가요금 50원 합의 완료-(단가+0.1) 交通银行 622262 016000 2492 946 李采蔚 /추가배송비 15위안은 다음발주시 계산',
        traderMemo: '금액수정완료/ 업체가 속해 있는 지역 코로나 봉쇄로 인해 출고 미정',
        packingState: '파렛트',
    },
    {
        id: '1233',
        priority: '2',
        orderDate: '2022-10-21 10:10:10',
        manager: '안영근',
        image: 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg',
        url: 'http://im.imama.kr/imama/',
        productName: '로지 샤프트 펄 실내화 슬리퍼 2P',
        orderNum: '2963422620261524134',
        orderQty: 200,
        cost: 30.1,
        transitPee: 200,
        paymentDate: '2022-10-21',
        factoryReleaseDate: '2022-10-21',
        arrivalReleaseDate: '2022-10-21',
        chinaTransitInfo: '安能 3005-1600-6972',
        productDistribution: [
            '카톤사이즈: 60*45*40',
            'Net W/T(Kg): 201.4',
            'Gross W/T (Kg): 205',
            '박스입수량(EA): 130',
            '박스수량: 8.1538461538462',
            'Measurement (CBM): 0.88061538461538',
        ],
        mdMemo: '바코드 전달 완료- 추가요금 50원 합의 완료-(단가+0.1) 交通银行 622262 016000 2492 946 李采蔚 /추가배송비 15위안은 다음발주시 계산',
        traderMemo: '금액수정완료/ 업체가 속해 있는 지역 코로나 봉쇄로 인해 출고 미정',
        packingState: '파렛트',
    },
    {
        id: '1232',
        priority: '1',
        orderDate: '2022-10-21 10:10:10',
        manager: '안영근',
        image: 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg',
        url: 'http://im.imama.kr/imama/',
        productName: '로지 샤프트 펄  2P',
        orderNum: '2963422620261524134',
        orderQty: 480,
        cost: 13,
        transitPee: 1040,
        paymentDate: '2022-10-21',
        factoryReleaseDate: '2022-10-21',
        arrivalReleaseDate: '2022-10-21',
        chinaTransitInfo: '安能 3005-1600-6972',
        productDistribution: [
            '카톤사이즈: 60*45*40',
            'Net W/T(Kg): 201.4',
            'Gross W/T (Kg): 205',
            '박스입수량(EA): 130',
            '박스수량: 8.1538461538462',
            'Measurement (CBM): 0.88061538461538',
        ],
        mdMemo: '바코드 전달 완료- 추가요금 50원 합의 완료-(단가+0.1) 交通银行 622262 016000 2492 946 李采蔚 /추가배송비 15위안은 다음발주시 계산',
        traderMemo: '금액수정완료/ 업체가 속해 있는 지역 코로나 봉쇄로 인해 출고 미정',
        packingState: '파렛트',
    },
].map((data) => {
    const { cost, orderQty, transitPee } = data
    const totalCost = cost * orderQty + transitPee
    const exchangRate = 190

    return { ...data, totalCost, exchangeTotalCost: totalCost * exchangRate }
})

type DialogId = 'DETAIL'

type SearchOptions = {
    startDate: string
    endDate: string
    searchCate: string
    searchText: string
}

const initSearchOptions: SearchOptions = {
    startDate: '',
    endDate: '',
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

function OrderManage() {
    const [paymentOpen, setPaymentOpen] = useState<boolean>(false)
    const [dialogId, setDialogId] = useState<DialogId>()
    const [searchOptions, setSearchOptions] = useState<SearchOptions>(initSearchOptions)
    const [selection, setSelection] = useState([])

    const openDetailDialog = () => {
        setDialogId('DETAIL')
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
            <span className="flex-1 p-1" onClick={openDetailDialog}>
                {rowData.productName}
            </span>
        )
    }
    const longTextBodyTemplate = (rowData: any, option: any) => {
        return rowData[option.field].length > 100 ? rowData[option.field].slice(0, 100) + '...' : rowData[option.field]
    }

    const priorityBodyTemplate = (rowData: any, option: any) => {
        const options = [
            { label: '담당자확인', value: '1' },
            { label: '발주확정', value: '2' },
        ]
        return <Dropdown className="w-full border-none" options={options} optionLabel="label" optionValue="value" value={rowData[option.field]} />
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

    const onChangeDates = (startDate: string, endDate: string) => {
        setSearchOptions((prev) => ({
            ...prev,
            startDate,
            endDate,
        }))
    }

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
                        <SearchDateOption
                            title="발주일"
                            startDate={searchOptions.startDate}
                            endDate={searchOptions.endDate}
                            onChangeDates={onChangeDates}
                            onChangeInput={onChangeSearchOptionInput}
                        />
                        <SearchCateTextOption
                            options={searchCateTextOptions}
                            cate={searchOptions.searchCate}
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
                    value={fakeData}
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
                    <Column align="center" field="priority" header="작업순번" sortable body={priorityBodyTemplate} />
                    <Column align="center" field="orderDate" header="발주일자" sortable body={(rowData) => dateBodyTemplate(rowData.orderDate)} />
                    <Column align="center" field="manager" header="담당자" />
                    <Column align="center" field="image" header="이미지" body={imageBodyTemplate} />
                    <Column align="center" field="url" header="URL" body={urlBodyTemplate} />
                    <Column
                        align="center"
                        field="productName"
                        header="상품명"
                        body={productNameBodyTemplate}
                        headerStyle={{ minWidth: '200px' }}
                        className="cursor-pointer"
                    />
                    <Column align="center" field="orderNum" header="주문번호" body={orderNumBodyTemplate} />
                    <Column align="center" field="orderQty" header="발주수량" sortable />
                    <Column align="center" field="cost" header="구매단가" sortable body={cnySymbolBodyTemplate} />
                    <Column align="center" field="transitPee" header="중국운송비" sortable body={cnySymbolBodyTemplate} />
                    <Column align="center" field="totalCost" header="구매총액" sortable body={cnySymbolBodyTemplate} />
                    <Column align="center" field="exchangeTotalCost" header="한국금액" body={wonSymbolBodyTemplate} />
                    <Column align="center" field="paymentDate" header="결제일" sortable />
                    <Column align="center" field="factoryReleaseDate" header="공장출고 예정일" sortable />
                    <Column align="center" field="arrivalReleaseDate" header="본사도착 예정일" sortable />
                    <Column align="center" field="chinaTransitInfo" header="중국 운송장정보" />
                    <Column align="center" field="productDistribution" header="상품물류정보" body={longTextBodyTemplate} />
                    <Column align="center" field="mdMemo" header="MD메모" body={longTextBodyTemplate} headerStyle={{ minWidth: '200px' }} />
                    <Column align="center" field="traderMemo" header="무역메모" body={longTextBodyTemplate} />
                    <Column align="center" field="packingState" header="패킹상태" />
                    <Column align="center" field="print" header="인쇄" body={printBodyTemplate} />
                </DataTable>
            </div>
            <OrderProductItem open={dialogId === 'DETAIL'} onClose={closeModal} data={fakeData} />
        </div>
    )
}

export default OrderManage
