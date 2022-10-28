import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { imageBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import { wrapColumnHeader } from 'src/hooks/data-table-hooks/HeaderHooks'
import LogViewModal from './LogViewModal'

function StockList() {
    const [logId, setLogId] = useState<number>(0)

    const fakeData = [
        {
            id: '2',
            manager: '안영근',
            productCode: '123456',
            image: 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg',
            productName: '로지 샤프트 펄 실내화 슬리퍼 2P',
            options: ['브라운+그레이', 's'],
            stock: {
                qty: 100,
                price: 714870,
                lastPrice: 5200,
                lastDate: '2022-09-22',
                lastQty: 500,
                defectStock: 25,
            },
            palette: [
                {
                    location: '4111',
                    qty: 11,
                },
            ],
        },
    ]

    const locationBodyTemplate = (rowData: any) => {
        return (
            <div className={`${rowData.palette.length > 1 && 'grid grid-cols-2'}>`}>
                {rowData.palette.map((data: any, idx: number) => (
                    <span key={idx}>
                        {data.location}({data.qty}){idx === rowData.palette.length - 1 ? '' : ','}
                    </span>
                ))}
            </div>
        )
    }
    const logBodyTemplate = (rowData: any) => {
        return (
            <button onClick={() => onClickLog(rowData.id)}>
                <i className="fa-regular fa-file-lines text-black text-lg"></i>
            </button>
        )
    }

    const optionBodyTemplate = (rowData: any) => {
        return (
            <>
                {rowData.options.map((option: string, idx: number) => (
                    <span key={idx} className="uppercase">
                        {idx === rowData.options.length - 1 ? '/' : ''}
                        {option}
                    </span>
                ))}
            </>
        )
    }

    const onClickLog = (id: number) => {
        setLogId(id)
    }

    const closeLogModal = () => {
        setLogId(0)
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
                    <div className="flex space-x-4 px-4 pt-4">
                        <div className="flex space-x-2 items-center">
                            <span className="font-bold text-[13px]">판매사</span>
                            <Dropdown />
                        </div>

                        <div className="flex space-x-2 items-center">
                            <span className="font-bold text-[13px]">공급사</span>
                            <Dropdown />
                        </div>
                        <div className="flex space-x-2 items-center">
                            <Dropdown value="상품명" />
                            <InputText />
                        </div>
                        <div className="flex space-x-2 items-center">
                            <Dropdown value="재고수량" />
                            <InputText />~
                            <InputText />
                        </div>
                    </div>
                    <div className="flex space-x-4 px-4 pt-4 pb-4">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-[13px]">등록일</span>
                            <button className="border rounded px-4 h-[30px] text-[12px] border-[#ddd] text-black">전체</button>
                            <Dropdown />
                            <Dropdown />
                            <InputText type="date" />
                            <span>~</span>
                            <InputText type="date" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="border px-1 h-[30px] flex justify-center items-center rounded text-[#BEBEBE] text-sm">재고있는 상품만 표시</button>
                            <button className="border px-1 h-[30px] flex justify-center items-center rounded text-[#BEBEBE] text-sm">재고없는 상품만 표시</button>
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
                <div className="flex items-center justify-between pb-4">
                    <div className="flex space-x-2 items-center">
                        <span className="font-bold">수동입출고</span>
                        <InputText placeholder="상세내역" className="w-[300px] h-[30px] rounded" />
                        <InputText placeholder="수량" className="w-[80px] h-[30px] rounded text-center" />
                        <button className="min-w-[50px] h-[30px] border border-[#146BCE] text-[#146BCE] rounded text-sm font-bold">입고</button>
                        <button className="min-w-[50px] h-[30px] border border-[#098000] text-[#098000] rounded text-sm font-bold">출고</button>
                    </div>
                    <div className="flex space-x-2">
                        <button className="border border-[#098000] rounded bg-white flex items-center space-x-2 p-1 px-2 h-[30px]">
                            <img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />
                            <span className="font-bold text-black text-sm">EXCEL</span>
                            <i className="fa-solid fa-ellipsis-vertical text-[#098000]"></i>
                        </button>
                        <button className="font-bold border text-sm border-[#146BCE] rounded text-black p-1 px-2 bg-white h-[30px]">전체로그확인</button>
                        <button className="font-bold border text-sm border-[#C6D4E6] rounded text-black p-1 px-2 bg-[#F5F9FD] h-[30px]">그리드 항목설정</button>
                    </div>
                </div>
                <DataTable value={fakeData} responsiveLayout="scroll" sortMode="multiple" removableSort resizableColumns className="max-h-[99vh]" columnResizeMode="expand">
                    <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '3em' }} field="id"></Column>
                    <Column align="center" className="text-[12px]" field="seq" header="NO" />
                    <Column align="center" className="text-[12px]" field="manager" header="담당자" />
                    <Column align="center" className="text-[12px]" field="productCode" header="상품코드" />
                    <Column align="center" className="text-[12px]" field="image" header="이미지" body={imageBodyTemplate} />
                    <Column alignHeader="center" align="left" className="text-[12px]" field="productName" header="상품명" />
                    <Column align="center" className="text-[12px]" field="options" header="옵션1 / 옵션2" body={optionBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="stock.qty" header="재고수량" sortable />
                    <Column align="center" className="text-[12px]" field="stock.price" header={wrapColumnHeader('재고금액 (수량x입고가격)')} sortable />
                    <Column align="center" className="text-[12px]" field="stock.lastPrice" header={wrapColumnHeader('마지막 입고가격')} sortable />
                    <Column align="center" className="text-[12px]" field="stock.lastDate" header={wrapColumnHeader('마지막 입고일')} sortable />
                    <Column align="center" className="text-[12px]" field="stock.lastQty" header={wrapColumnHeader('마지막 입고수량')} sortable />
                    <Column align="center" className="text-[12px]" field="stock.defectStock" header="불량수량" sortable />
                    <Column align="center" className="text-[12px]" field="location" header="파렛트위치" body={locationBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="log" header="로그" body={logBodyTemplate} />
                </DataTable>
            </div>
            <LogViewModal open={logId !== 0} onClose={closeLogModal} logId={logId} />
        </div>
    )
}

export default StockList
