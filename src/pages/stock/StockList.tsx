import axios from 'axios'
import { map } from 'lodash'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from 'src/api/ApiConfig'
import MenuButton from 'src/components/custom-buttons/MenuButton'
import SearchCateTextOption from 'src/components/search-box/SearchCateTextOption'
import SearchDateOption from 'src/components/search-box/SearchDateOption'
import SearchMarketIdOption from 'src/components/search-box/SearchMarketIdOption'
import { arrayCommaBodyTemplate, dateBodyTemplate, imageBodyTemplate, numberBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import { wrapColumnHeader } from 'src/hooks/data-table-hooks/HeaderHooks'
import { ProductItemUnit } from 'src/types/product-manage'
import LogViewModal from './LogViewModal'

const searchOptionSellers = ['아이마마', '엘케이알', '와이엘']

const searchCateTextOptions = [
    { label: '통합', field: 'global' },
    { label: '상품명', field: 'productsName' },
    { label: '담당자', field: 'managerName' },
    { label: '재고코드', field: 'skuId' },
    { label: '재고바코드', field: 'barcode' },
]

const searchCateNumberOptions = [
    { label: '재고수량', field: 'stockQty' },
    { label: '재고금액', field: 'stockPrice' },
    { label: '최근입고가', field: 'purchasePrice' },
    { label: '최근입고수량', field: 'purchaseQty' },
]

function StockList() {
    const [logId, setLogId] = useState<number>(0)
    const [unitList, setUnitList] = useState<ProductItemUnit[]>([])
    const [searchOption, setSearchOption] = useState()
    const [searchCategory1, setSearchCategory1] = useState('상품명')
    const [searchOptionSeller, setSearchOptionSeller] = useState(searchOptionSellers[0])

    const [logOpen, setLogOpen] = useState<boolean>(false)

    const logBodyTemplate = (rowData: any) => {
        return (
            <Button className="p-button-rounded p-button-secondary p-button-text" onClick={() => onClickLog(rowData.id)}>
                <i className="fa-regular fa-file-lines text-lg"></i>
            </Button>
        )
    }

    const onChangeDropdown = (event: DropdownChangeParams) => {}
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {}

    const onClickLog = (id: number) => {
        setLogOpen(true)
        setLogId(id)
    }

    const closeLogModal = () => {
        setLogOpen(false)
        setLogId(0)
    }

    const getUnitList = async () => {
        try {
            const { data } = await axios.get(BASE_URL + 'units')
            console.log(data)
            const stockList = map(data, (unit, idx) => {
                const image = unit.skuImageUrls[0]
                return {
                    ...unit,
                    seq: idx + 1,
                    image,
                }
            })
            setUnitList(stockList)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getUnitList()
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
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : {unitList.length}</span>
                    </div>
                    <div className="flex space-x-4 px-4 pt-4">
                        <SearchMarketIdOption value="" onChange={onChangeDropdown} />
                        <SearchCateTextOption
                            cate=""
                            text=""
                            options={searchCateTextOptions}
                            onChangeDropdown={onChangeDropdown}
                            onChangeText={onChangeInput}
                        />
                        <div className="flex space-x-2 items-center">
                            <Dropdown options={searchCateNumberOptions} value="재고수량" />
                            <div className="flex space-x-2 items-center">
                                <InputText />
                                <span>~</span>
                                <InputText />
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-4 px-4 pt-4 pb-4">
                        <SearchDateOption startDate="" endDate="" onChangeDates={() => {}} onChangeInput={() => {}} />
                        <div className="flex items-center space-x-2">
                            <button className="border px-1 h-[30px] flex justify-center items-center rounded text-[#BEBEBE] text-sm">
                                재고있는 상품만 표시
                            </button>
                            <button className="border px-1 h-[30px] flex justify-center items-center rounded text-[#BEBEBE] text-sm">
                                재고없는 상품만 표시
                            </button>
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
                            menu={['전체상품 엑셀 다운로드', '선택상품 엑셀 다운로드', '엑셀 업로드(증감/차감)']}
                            icon={<img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />}
                            onClickMenu={(action: string) => alert(action)}
                        />
                        <button
                            className="font-bold border text-sm border-[#146BCE] rounded text-black p-1 px-2 bg-white h-[32px]"
                            onClick={() => {
                                onClickLog(0)
                            }}
                        >
                            전체로그확인
                        </button>
                        <button className="font-bold border text-sm border-[#C6D4E6] rounded text-black p-1 px-2 bg-[#F5F9FD] h-[32px]">
                            그리드 항목설정
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <DataTable
                        value={unitList}
                        rows={15}
                        paginator
                        removableSort
                        scrollable
                        scrollHeight="70vh"
                        sortMode="multiple"
                        responsiveLayout="scroll"
                        columnResizeMode="expand"
                    >
                        <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerClassName="w-[10px]" field="id"></Column>
                        <Column align="center" className="text-[12px]" field="seq" header="NO" />
                        <Column align="center" className="text-[12px]" field="managerName" header="담당자" />
                        <Column align="center" className="text-[12px]" field="skuId" header="재고코드" />
                        <Column align="center" className="text-[12px]" field="image" header="이미지" body={imageBodyTemplate} />
                        <Column
                            alignHeader="center"
                            align="left"
                            className="text-[12px] w-[300px]"
                            headerClassName="w-[300px]"
                            field="skuName"
                            header="상품명"
                        />
                        <Column
                            align="center"
                            className="text-[12px]"
                            field="order.lastReceiptPrice"
                            header={wrapColumnHeader('최근 입고가격')}
                            body={(rowData) => numberBodyTemplate(rowData.order.lastReceiptPrice)}
                            sortable
                        />
                        <Column
                            align="center"
                            className="text-[12px]"
                            field="order.lastReceiptQty"
                            header={wrapColumnHeader('최근 입고수량')}
                            body={(rowData) => numberBodyTemplate(rowData.order.lastReceiptQty)}
                        />
                        <Column
                            align="center"
                            className="text-[12px]"
                            field="order.lastReceiptDate"
                            header={wrapColumnHeader('최근 입고일')}
                            body={dateBodyTemplate}
                            sortable
                        />
                        <Column
                            align="center"
                            className="text-[12px]"
                            field="order.totalReceiptPrice"
                            header={wrapColumnHeader('재고금액 (수량x입고가격)')}
                            body={(rowData) => numberBodyTemplate(rowData.order.totalReceiptPrice)}
                        />
                        <Column align="center" className="text-[12px]" field="stock.availableQty" header="재고수량" sortable />
                        <Column align="center" className="text-[12px]" field="stock.disusedQty" header="불량수량" sortable />
                        <Column
                            align="center"
                            className="text-[12px]"
                            field="stock.locations"
                            header="파렛트위치"
                            body={(rowData) => arrayCommaBodyTemplate(rowData.stock.locations)}
                        />

                        <Column align="center" className="text-[12px]" field="log" header="로그" body={logBodyTemplate} />
                    </DataTable>
                </div>
            </div>
            <LogViewModal open={logOpen} onClose={closeLogModal} logId={logId} />
        </div>
    )
}

export default StockList
