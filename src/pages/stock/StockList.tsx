import axios from 'axios'
import { flatten, map } from 'lodash'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from 'src/api/ApiConfig'
import MenuButton from 'src/components/custom-buttons/MenuButton'
import { imageBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import LogViewModal from './LogViewModal'

const searchCategories1 = ['상품명', '담당자', '상품바코드', '옵션ID', 'SKU.No']
const searchOptionSellers = ['아이마마', '엘케이알', '와이엘']

function StockList() {
    const [logId, setLogId] = useState<number>(0)
    const [stockList, setStockList] = useState<any[]>([])
    const [searchOption, setSearchOption] = useState()
    const [searchCategory1, setSearchCategory1] = useState('상품명')
    const [searchOptionSeller, setSearchOptionSeller] = useState(searchOptionSellers[0])

    // const locationBodyTemplate = (rowData: any, options: any) => {
    //     return (
    //         <div className={`${rowData[options.field].length > 1 && 'grid grid-cols-2'}>`}>
    //             {rowData.palette.map((data: any, idx: number) => (
    //                 <span key={idx}>
    //                     {data.location}({data.qty}){idx === rowData.palette.length - 1 ? '' : ','}
    //                 </span>
    //             ))}
    //         </div>
    //     )
    // }
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
                {rowData.options
                    .map((option: string, idx: number) => (
                        <span key={idx} className="uppercase">
                            {option}
                        </span>
                    ))
                    .join(' / ')}
            </>
        )
    }

    const onClickLog = (id: number) => {
        setLogId(id)
    }

    const closeLogModal = () => {
        setLogId(0)
    }

    const getStockList = async () => {
        try {
            const { data } = await axios.get(BASE_URL + 'units')

            const mergeData = flatten(
                map(data, (obj) => {
                    return map(obj.units, (unit, i) => {
                        return { ...unit, seq: i + 1, manager: obj.manager }
                    })
                })
            )

            console.log(mergeData)
            setStockList(mergeData)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getStockList()
    }, [])

    return (
        <div>
            <div className="page-header border rounded-lg flex bg-white mb-5">
                <div>
                    <div className="flex items-center px-4 pt-4 border-b h-[66px] box-border">
                        <div className="flex flex-col justify-center ">
                            <span className="font-bold text-lg relative">재고관리</span>
                            <div className="border-2 w-full border-blue-500 relative -bottom-[14px]"></div>
                        </div>
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : 3862</span>
                    </div>
                    <div className="flex space-x-4 px-4 pt-4">
                        <div className="flex space-x-2 items-center">
                            <span className="font-bold text-[13px]">판매사</span>
                            <Dropdown value={searchOptionSeller} options={searchOptionSellers} onChange={(e) => setSearchOptionSeller(e.value)} className="w-[120px]" />
                        </div>

                        <div className="flex space-x-2 items-center">
                            <span className="font-bold text-[13px]">공급사</span>
                            <Dropdown />
                        </div>
                        <div className="flex space-x-2 items-center">
                            <Dropdown value={searchCategory1} options={searchCategories1} onChange={(e) => setSearchCategory1(e.value)} className="font-bold w-[120px]" />
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
                        <MenuButton
                            title="EXCEL"
                            position="left"
                            color="#098000"
                            menu={['전체상품 엑셀 다운로드', '선택상품 엑셀 다운로드', '엑셀 업로드(상품 수정)']}
                            icon={<img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />}
                            onClickMenu={(action: string) => alert(action)}
                        />
                        <button className="font-bold border text-sm border-[#146BCE] rounded text-black p-1 px-2 bg-white h-[32px]">전체로그확인</button>
                        <button className="font-bold border text-sm border-[#C6D4E6] rounded text-black p-1 px-2 bg-[#F5F9FD] h-[32px]">그리드 항목설정</button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <DataTable value={stockList} responsiveLayout="scroll" sortMode="multiple" removableSort resizableColumns className="max-h-[99vh]" columnResizeMode="expand">
                        <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '3em' }} field="id"></Column>
                        <Column align="center" className="text-[12px]" field="seq" header="NO" />
                        <Column align="center" className="text-[12px]" field="manager" header="담당자" />
                        <Column align="center" className="text-[12px]" field="unitCode" header="상품코드" />
                        <Column align="center" className="text-[12px]" field="unitImage" header="이미지" body={imageBodyTemplate} />
                        <Column alignHeader="center" align="left" className="text-[12px]" field="unitName" header="상품명" />
                        {/* <Column align="center" className="text-[12px]" field="options" header="옵션1 / 옵션2" body={optionBodyTemplate} /> */}
                        <Column align="center" className="text-[12px]" field="stock.stockQty" header="재고수량" sortable />
                        {/* <Column align="center" className="text-[12px]" field="stockPrice" header={wrapColumnHeader('재고금액 (수량x입고가격)')} sortable />
                    <Column align="center" className="text-[12px]" field="stock.lastPrice" header={wrapColumnHeader('마지막 입고가격')} sortable />
                    <Column align="center" className="text-[12px]" field="stock.lastDate" header={wrapColumnHeader('마지막 입고일')} sortable />
                    <Column align="center" className="text-[12px]" field="stock.lastQty" header={wrapColumnHeader('마지막 입고수량')} sortable />
                    <Column align="center" className="text-[12px]" field="stock.defectStock" header="불량수량" sortable /> */}
                        <Column align="center" className="text-[12px]" field="stock.stockPlace" header="파렛트위치" />
                        {/* <Column align="center" className="text-[12px]" field="log" header="로그" body={logBodyTemplate} /> */}
                    </DataTable>
                </div>
            </div>
            <LogViewModal open={logId !== 0} onClose={closeLogModal} logId={logId} />
        </div>
    )
}

export default StockList
