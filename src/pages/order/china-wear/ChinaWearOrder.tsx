import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { imageBodyTemplate, printBodyTemplate, urlBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import { lineHeader } from 'src/hooks/data-table-hooks/HeaderHooks'
import OrderDetailModal from './detail-modal/OrderDetailModal'
import PaymentLogModal from './payment-log-modal/PaymentLogModal'
import ChinaWearPaymentTable from './paymentTable/ChinaWearPaymentTable'

const fakeData = [
    {
        id: '1234',
        manager: '안영근',
        image: 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg',
        orderDate: '2022-10-21',
        productCode: '000000',
        productBarcode: 'S00000019749604100',
        productName: '로지 샤프트 펄 실내화 슬리퍼 2P',
        options: ['네이비', 'XXL'],
        url: 'http://im.imama.kr/imama/',
        cost: 1000,
        stock: {
            coopang: 180,
            warehouse: 0,
        },
        orderQty: 300,
        orderPrice: 1200,
        transitPee: 750,
        paymentDate: '2022-10-21',
        factoryReceptionDate: '2022-10-21',
        forwardingEstimatedDate: '2022-10-21',
        forwardingDate: '2022-10-21',
        forwardingQty: 300,
        forwardingPrice: '￥ 8,235.00',
        arrivalDate: '2022-10-21',
    },
    {
        id: '1234',
        manager: '안영근',
        image: 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg',
        orderDate: '2022-10-21',
        productCode: '000000',
        productBarcode: 'S00000019749604100',
        productName: '로지 샤프트 펄 실내화 슬리퍼 2P',
        options: ['네이비', 'XXL'],
        url: 'http://im.imama.kr/imama/',
        cost: 1000,
        stock: {
            coopang: 180,
            warehouse: 0,
        },
        orderQty: 300,
        orderPrice: 1200,
        transitPee: 750,
        paymentDate: '2022-10-21',
        factoryReceptionDate: '2022-10-21',
        forwardingEstimatedDate: '2022-10-21',
        forwardingDate: '2022-10-21',
        forwardingQty: 300,
        forwardingPrice: '￥ 8,235.00',
        arrivalDate: '2022-10-21',
    },
]

type DialogId = 'DETAIL' | 'PAYMENT'

function ChinaWearOrder() {
    const [paymentOpen, setPaymentOpen] = useState<boolean>(false)
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
    const longTextBodyTemplate = (rowData: any, option: any) => {
        return rowData[option.field].length > 100 ? rowData[option.field].slice(0, 100) + '...' : rowData[option.field]
    }
    const managerBodyTemplate = (rowData: any) => {
        return rowData.manager
    }
    const openPaymentDialog = () => {
        setDialogId('PAYMENT')
    }

    return (
        <div>
            <div className="page-header border rounded-lg flex bg-white mb-5">
                <div>
                    <div className="flex items-center px-4 border-b h-[62px] box-border">
                        <div className="flex flex-col justify-center pt-4">
                            <span className="font-bold text-lg relative">중국의류발주</span>
                            <div className="border-2 w-full border-blue-500 relative -bottom-[14px]"></div>
                        </div>
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : 3862</span>
                        <div className="flex ml-10 h-full text-sm space-x-5">
                            <div
                                className="rounded-b-full pt-1 bg-[#BC0033] text-center text-white h-[35px] cursor-pointer w-[75px]"
                                onClick={onTogglePayment}
                            >
                                결제금액
                            </div>
                            <ChinaWearPaymentTable open={paymentOpen} openModal={openPaymentDialog} />
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
                <DataTable
                    value={fakeData}
                    responsiveLayout="scroll"
                    resizableColumns
                    onRowClick={openDetailDialog}
                    className="text-sm"
                    columnResizeMode="expand"
                    rowGroupMode="rowspan"
                    groupRowsBy="id"
                >
                    <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '3em' }} field="id"></Column>
                    {/* <Column align="center" field="seq" header="NO" /> */}
                    <Column align="center" field="id" header="발주번호" />
                    <Column align="center" field="id" header="발주일" />
                    <Column align="center" field="id" header="담당자" body={managerBodyTemplate} />
                    <Column align="center" field="image" header="이미지" body={imageBodyTemplate} />
                    <Column align="center" field="productCode" header="제품코드" />
                    <Column align="center" field="productBarcode" header="제품바코드" />
                    <Column align="center" field="productName" header="상품명" body={productNameBodyTemplate} headerStyle={{ minWidth: '200px' }} />
                    <Column align="center" field="options.0" header="옵션1" />
                    <Column align="center" field="options.1" header="옵션2" />
                    <Column align="center" field="url" header="URL" body={(rowData) => urlBodyTemplate(rowData.url)} />
                    <Column align="center" field="cost" header="수입단가" />
                    <Column align="center" field="stock.coopang" header="창고재고" />
                    <Column align="center" field="stock.warehouse" header="쿠팡재고" />
                    <Column align="center" field="orderQty" header="발주수량" />
                    <Column align="center" field="id" header="발주총수량" />
                    <Column align="center" field="orderPrice" header="발주금액" />
                    <Column align="center" field="id" header="발주총금액" />
                    <Column align="center" field="transitPee" header="운송비" />
                    <Column align="center" field="paymentDate" header="결제일" />
                    <Column align="center" field="factoryReceptionDate" header={lineHeader('B공장 접수일')} />
                    <Column align="center" field="forwardingEstimatedDate" header={lineHeader('출고 예정일')} />
                    <Column align="center" field="forwardingDate" header={lineHeader('실제 공장출고일')} />
                    <Column align="center" field="forwardingQty" header={lineHeader('실제 출고수량')} />
                    <Column align="center" field="forwardingPrice" header="출고금액" />
                    <Column align="center" field="arrivalDate" header={lineHeader('본사도착 예정일')} />
                    <Column align="center" field="print" header="인쇄" body={printBodyTemplate} />
                </DataTable>
            </div>
            <OrderDetailModal open={dialogId === 'DETAIL'} onClose={closeModal} data={fakeData} />
            <PaymentLogModal open={dialogId === 'PAYMENT'} onClose={closeModal} />
        </div>
    )
}

export default ChinaWearOrder
