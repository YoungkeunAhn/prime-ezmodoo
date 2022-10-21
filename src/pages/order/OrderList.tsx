import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React from 'react'

function OrderList() {
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
                        <div className="flex space-x-2 items-center">
                            <span className="font-bold text-[13px]">판매사</span>
                            <Dropdown />
                        </div>

                        <div className="flex space-x-2 items-center">
                            <span className="font-bold text-[13px]">공급사</span>
                            <Dropdown />
                        </div>
                        <div className="flex space-x-2 items-center">
                            <Dropdown />
                            <InputText />
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-[13px]">등록일</span>
                            <button className="border rounded px-4 h-[30px] text-[12px] border-[#ddd] text-black">전체</button>
                            <Dropdown />
                            <Dropdown />
                            <InputText type="date" />
                            <span>~</span>
                            <InputText type="date" />
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
                <DataTable value={[]} responsiveLayout="scroll" sortMode="multiple" removableSort resizableColumns onRowClick={() => {}} className="max-h-[99vh] text-sm" columnResizeMode="expand">
                    <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '3em' }} field="id"></Column>
                    <Column align="center" field="seq" header="NO" />
                    <Column align="center" field="createdAt" header="등록일" />
                    <Column align="center" field="seller" header="판매사" />
                    <Column align="center" field="image" header="이미지" />
                    <Column align="center" field="url" header="url" />
                    <Column align="center" field="ecommerce" header="판매처" />
                    <Column alignHeader="center" align="left" field="productGroupName" header="상품명" />
                    <Column alignHeader="center" align="left" field="options.0" header="옵션1" />
                    <Column alignHeader="center" align="left" field="options.1" header="옵션2" />
                    <Column align="center" field="cost" header="입고가격" />
                    <Column align="center" field="price" header="판매가격" />
                    <Column align="center" field="discountPrice" header="할인쿠폰금액" />
                    <Column align="center" field="sellCommition" header="판매수수료" />
                    <Column align="center" field="calcPrice" header="정산금액" />
                    <Column align="center" field="profit" header="판매이익" />
                    <Column align="center" field="profitRate" header="판매이익률" />
                </DataTable>
            </div>
            {/* <ProductDetailModal open={dialogId === 'DETAIL'} onClose={onCloseModal} data={fakeInfoData} /> */}
        </div>
    )
}

export default OrderList
