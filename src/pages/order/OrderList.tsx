import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Tooltip } from 'primereact/tooltip'
import React, { useState, useEffect } from 'react'
import { imageBodyTemplate, printBodyTemplate, urlBodyTemplate } from '../../hooks/data-table-hooks/HeaderHooks'
import OrderDetailModal from './detail-modal/OrderDetailModal'

const fakeData = [
    {
        id: '1234',
        priority: '긴급',
        orderDate: '2022-10-21 10:10:10',
        manager: '안영근',
        image: 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg',
        url: 'http://im.imama.kr/imama/',
        productName: '로지 샤프트 펄 실내화 슬리퍼 2P',
        orderNum: '订单编号：2963422620261524134',
        orderQty: 1000,
        price: 16,
        transitPee: 750,
        paymentDate: '2022-10-21',
        factoryReleaseDate: '2022-10-21',
        arrivalReleaseDate: '2022-10-21',
        chinaTransitInfo: '安能 3005-1600-6972',
        productDistribution: ['카톤사이즈: 60*45*40', 'Net W/T(Kg): 201.4', 'Gross W/T (Kg): 205', '박스입수량(EA): 130', '박스수량: 8.1538461538462', 'Measurement (CBM): 0.88061538461538'],
        mdMemo: '바코드 전달 완료- 추가요금 50원 합의 완료-(단가+0.1) 交通银行 622262 016000 2492 946 李采蔚 /추가배송비 15위안은 다음발주시 계산',
        traderMemo: '금액수정완료/ 업체가 속해 있는 지역 코로나 봉쇄로 인해 출고 미정',
        packingState: '파렛트',
    },
    {
        id: '1233',
        priority: '보통 ',
        orderDate: '2022-10-21 10:10:10',
        manager: '안영근',
        image: 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg',
        url: 'http://im.imama.kr/imama/',
        productName: '로지 샤프트 펄 실내화 슬리퍼 2P',
        orderNum: '订单编号：2963422620261524134',
        orderQty: 1000,
        price: 16,
        transitPee: 750,
        paymentDate: '2022-10-21',
        factoryReleaseDate: '2022-10-21',
        arrivalReleaseDate: '2022-10-21',
        chinaTransitInfo: '安能 3005-1600-6972',
        productDistribution: ['카톤사이즈: 60*45*40', 'Net W/T(Kg): 201.4', 'Gross W/T (Kg): 205', '박스입수량(EA): 130', '박스수량: 8.1538461538462', 'Measurement (CBM): 0.88061538461538'],
        mdMemo: '바코드 전달 완료- 추가요금 50원 합의 완료-(단가+0.1) 交通银行 622262 016000 2492 946 李采蔚 /추가배송비 15위안은 다음발주시 계산',
        traderMemo: '금액수정완료/ 업체가 속해 있는 지역 코로나 봉쇄로 인해 출고 미정',
        packingState: '파렛트',
    },
    {
        id: '1232',
        priority: '긴급',
        orderDate: '2022-10-21 10:10:10',
        manager: '안영근',
        image: 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg',
        url: 'http://im.imama.kr/imama/',
        productName: '로지 샤프트 펄 실내화 슬리퍼 2P',
        orderNum: '订单编号：2963422620261524134',
        orderQty: 1000,
        price: 16,
        transitPee: 750,
        paymentDate: '2022-10-21',
        factoryReleaseDate: '2022-10-21',
        arrivalReleaseDate: '2022-10-21',
        chinaTransitInfo: '安能 3005-1600-6972',
        productDistribution: ['카톤사이즈: 60*45*40', 'Net W/T(Kg): 201.4', 'Gross W/T (Kg): 205', '박스입수량(EA): 130', '박스수량: 8.1538461538462', 'Measurement (CBM): 0.88061538461538'],
        mdMemo: '바코드 전달 완료- 추가요금 50원 합의 완료-(단가+0.1) 交通银行 622262 016000 2492 946 李采蔚 /추가배송비 15위안은 다음발주시 계산',
        traderMemo: '금액수정완료/ 업체가 속해 있는 지역 코로나 봉쇄로 인해 출고 미정',
        packingState: '파렛트',
    },
]

type DialogId = 'DETAIL'

function OrderList() {
    const [paymentOpen, setPaymentOpen] = useState<boolean>(true)
    const [dialogId, setDialogId] = useState<DialogId>()

    const openDetailDialog = () => {
        setDialogId('DETAIL')
    }

    const closeModal = () => {
        setDialogId(undefined)
    }

    const onTogglePayment = () => {
        setPaymentOpen(!paymentOpen)
    }
    const productNameBodyTemplate = (rowData: any) => {
        return <span className="w-[300px]">{rowData.productName}</span>
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
                            <div className="rounded-b-full pt-1 bg-[#7E00B2] text-center text-white h-[35px] cursor-pointer w-[75px]" onClick={onTogglePayment}>
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
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-[13px]">등록일</span>
                            <button className="border rounded px-4 h-[30px] text-[12px] border-[#ddd] text-black">전체</button>
                            <Dropdown value="연도별" />
                            <Dropdown value="월별" />
                            <InputText type="date" />
                            <span>~</span>
                            <InputText type="date" />
                        </div>
                        <div className="flex space-x-2 items-center">
                            <Dropdown value="상품명" />
                            <InputText />
                        </div>
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
                    <Dropdown value="배송정보" className="h-[32px]" />
                    <button className="btn primary-btn">선택수정</button>
                    <button className="btn primary-btn">선택삭제</button>
                    <button className="btn primary-btn">물류보내기</button>
                    <button className="border border-[#098000] rounded bg-white flex items-center space-x-2 p-1 px-2 h-[30px]">
                        <img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />
                        <span className="font-bold text-black text-sm">엑셀 다운로드</span>
                    </button>
                </div>
                <DataTable value={fakeData} responsiveLayout="scroll" resizableColumns onRowClick={openDetailDialog} className="text-sm" columnResizeMode="expand">
                    <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '3em' }} field="id"></Column>
                    <Column align="center" field="seq" header="NO" />
                    <Column align="center" field="id" header="발주번호" />
                    <Column align="center" field="priority" header="우선순위" />
                    <Column align="center" field="orderDate" header="발주일자" />
                    <Column align="center" field="manager" header="담당자" />
                    <Column align="center" field="image" header="이미지" body={imageBodyTemplate} />
                    <Column align="center" field="url" header="url" body={urlBodyTemplate} />
                    <Column align="center" field="productName" header="상품명" body={productNameBodyTemplate} headerStyle={{ minWidth: '200px' }} />
                    <Column align="center" field="orderNum" header="주문번호" />
                    <Column align="center" field="orderQty" header="발주수량" />
                    <Column align="center" field="cost" header="구매단가" />
                    <Column align="center" field="transitPee" header="중국운송비" />
                    <Column align="center" field="totalCost" header="구매총액" />
                    <Column align="center" field="koreaCost" header="한국금액" />
                    <Column align="center" field="paymentDate" header="결제일" />
                    <Column align="center" field="factoryReleaseDate" header="공장출고 예정일" />
                    <Column align="center" field="arrivalReleaseDate" header="본사도착 예정일" />
                    <Column align="center" field="chinaTransitInfo" header="중국 운송장정보" />
                    <Column align="center" field="productDistribution" header="상품물류정보" />
                    <Column align="center" field="mdMemo" header="MD메모" />
                    <Column align="center" field="traderMemo" header="무역메모" />
                    <Column align="center" field="packingState" header="패킹상태" />
                    <Column align="center" field="print" header="인쇄" body={printBodyTemplate} />
                </DataTable>
            </div>
            <OrderDetailModal open={dialogId === 'DETAIL'} onClose={closeModal} data={fakeData} />
        </div>
    )
}

export default OrderList
