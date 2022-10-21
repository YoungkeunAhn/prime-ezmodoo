import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { imageBodyTemplate, printBodyTemplate, urlBodyTemplate } from '../../hooks/data-table-hooks/HeaderHooks'

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

function OrderList() {
    const productNameBodyTemplate = (rowData: any) => {
        return <span className="w-[300px]">{rowData.productName}</span>
    }
    return (
        <div>
            <div className="page-header border rounded-lg flex bg-white mb-5">
                <div>
                    <div className="flex items-center px-4 pt-4 border-b h-[66px] box-border">
                        <div className="flex flex-col justify-center ">
                            <span className="font-bold text-lg relative">상품관리</span>
                            <div className="border-2 w-full border-blue-500 relative -bottom-[14px]"></div>
                        </div>
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : 3862</span>
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
                <DataTable value={fakeData} responsiveLayout="scroll" onRowClick={() => {}} className="max-h-[99vh] text-sm">
                    <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '3em' }} field="id"></Column>
                    <Column align="center" field="seq" header="NO" />
                    <Column align="center" field="id" header="발주번호" />
                    <Column align="center" field="priority" header="우선순위" />
                    <Column align="center" field="orderDate" header="발주일자" />
                    <Column align="center" field="manager" header="담당자" />
                    <Column align="center" field="image" header="이미지" body={imageBodyTemplate} />
                    <Column align="center" field="url" header="url" body={urlBodyTemplate} />
                    <Column align="center" field="productName" header="상품명" body={productNameBodyTemplate} bodyStyle={{ width: 500 }} />
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
            {/* <ProductDetailModal open={dialogId === 'DETAIL'} onClose={onCloseModal} data={fakeInfoData} /> */}
        </div>
    )
}

export default OrderList
