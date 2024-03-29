import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { DropdownChangeParams } from 'primereact/dropdown'
import React, { useState } from 'react'
import RangeDateSearch from 'src/components/search-box/RangeDateSearch'
import TextSearch from 'src/components/search-box/TextSearch'
import { imageBodyTemplate, urlBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import DegsignManageDetailModal from './detail-modal/DegsignManageDetailModal'

const fakeData = [
    {
        id: 1,
        productCode: '123456',
        requestDate: '2022-10-24',
        manager: '안영근',
        image: 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg',
        url: 'http://im.imama.kr/imama/',
        productName: '로지 샤프트 펄 실내화 슬리퍼 2P',
        designer: '안영근',
        arrivalDate: '2022-10-24',
        finishDate: '2022-10-24',
        confirmStatus: ['디자인'],
        workStatus: '대기중', //대기중, 작업중, 완료, 보류, 수정, 리뉴얼
        Instruction: '테스트중...',
    },
    {
        id: 2,
        productCode: '123456',
        requestDate: '2022-10-24',
        manager: '안영근',
        image: 'http://im.imama.kr/imama/imgs/19090352_20221019_090120.jpg',
        url: 'http://im.imama.kr/imama/',
        productName: '로지 샤프트 펄 실내화 슬리퍼 2P',
        designer: '안영근',
        arrivalDate: '2022-10-24',
        finishDate: '2022-10-24',
        confirmStatus: ['디자인', 'MD', '보류'],
        workStatus: '작업중',
        Instruction: '테스트중....1.',
    },
]

type SearchOptions = {
    dataRangeCate: 'createdAt'
    startDate: Date
    endDate: Date

    searchCate: 'global' | 'productName'
    searchText: string
}

const initSearchOptions: SearchOptions = {
    dataRangeCate: 'createdAt',
    startDate: new Date(),
    endDate: new Date(),

    searchCate: 'global',
    searchText: '',
}

const searchDateRangeCateOptions: SearchCate[] = [
    {
        label: '등록일',
        field: 'createdAt',
    },
]

const searchCateOptions: SearchCate[] = [
    {
        label: '통합',
        field: 'global',
    },
    {
        label: '상품명',
        field: 'productName',
    },
]

type DialogId = 'DETAIL'

function DesignManageList() {
    const [dialogId, setDialogId] = useState<DialogId>()
    const [searchOptions, setSearchOptions] = useState<SearchOptions>(initSearchOptions)

    const openDetailModal = () => {
        setDialogId('DETAIL')
    }

    const closeModal = () => {
        setDialogId(undefined)
    }

    const onChangeDates = (range: { startDate: Date; endDate: Date }) => {
        const { startDate, endDate } = range

        setSearchOptions((prev) => ({ ...prev, startDate: startDate, endDate: endDate }))
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

    const confirmStatusBodyTemplate = (rowData: any) => {
        return (
            <div className="flex flex-col space-y-1 p-1">
                <button
                    className={`w-full rounded p-2 font-bold text-black border ${
                        rowData.confirmStatus.includes('디자인') ? 'bg-[#5F8EEC]' : 'bg-[#BEBEBE]'
                    }`}
                >
                    디자인
                </button>
                <button
                    className={`w-full rounded p-2 font-bold text-black border ${
                        rowData.confirmStatus.includes('MD') ? 'bg-[#5F8EEC]' : 'bg-[#BEBEBE]'
                    }`}
                >
                    MD
                </button>

                {rowData.confirmStatus.includes('보류') ? (
                    <button className="w-full rounded p-2 font-bold text-black border bg-[#FE7979]">보류</button>
                ) : (
                    <button
                        className={`w-full rounded p-2 font-bold text-black border ${
                            rowData.confirmStatus.includes('최종') ? 'bg-[#5F8EEC]' : 'bg-[#BEBEBE]'
                        }`}
                    >
                        최종
                    </button>
                )}
            </div>
        )
    }
    return (
        <div>
            <div className="page-header border rounded-lg flex bg-white mb-5">
                <div>
                    <div className="flex items-center px-4 border-b h-[66px] box-border">
                        <div className="flex flex-col justify-center pt-4">
                            <span className="font-bold text-lg relative">디자인관리</span>
                            <div className="border-2 w-full border-blue-500 relative -bottom-[14px]"></div>
                        </div>
                        <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : 3862</span>
                    </div>
                    <div className="flex space-x-4 p-4">
                        <RangeDateSearch
                            startDate={searchOptions.startDate}
                            endDate={searchOptions.endDate}
                            onChangeDates={onChangeDates}
                            currentCate={searchOptions.dataRangeCate}
                            options={searchDateRangeCateOptions}
                            onChangeDropdown={onChangeSearchOptionDropdown}
                        />
                        <TextSearch
                            currentCate={searchOptions.searchCate}
                            options={searchCateOptions}
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
                    <button className="btn primary-btn">선택삭제</button>
                    <button className="btn primary-btn">선택복사</button>
                </div>
                <DataTable
                    value={fakeData}
                    responsiveLayout="scroll"
                    resizableColumns
                    onRowClick={openDetailModal}
                    className="text-sm"
                    columnResizeMode="expand"
                >
                    <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '3em' }} field="id"></Column>
                    <Column align="center" field="seq" header="NO" />
                    <Column align="center" field="productCode" header="상품코드" />
                    <Column align="center" field="requestDate" header="디자인접수일" />
                    <Column align="center" field="manager" header="상품담당자" />
                    <Column align="center" field="image" header="이미지" body={imageBodyTemplate} />
                    <Column align="center" field="url" header="URL" body={(rowData) => urlBodyTemplate(rowData.url)} />
                    <Column align="center" field="productName" header="상품명" />
                    <Column align="center" field="Instruction" header="전달내용" />
                    <Column align="center" field="designer" header="디자인 담당자" />
                    <Column align="center" field="arrivalDate" header="입고예정일" />
                    <Column align="center" field="finishDate" header="디자인완료일" />
                    <Column align="center" field="confirmStatus" header="디자인확인" body={confirmStatusBodyTemplate} />
                    <Column align="center" field="workStatus" header="작업상태" />
                </DataTable>
            </div>
            {<DegsignManageDetailModal open={dialogId === 'DETAIL'} onClose={closeModal} />}
        </div>
    )
}
export default DesignManageList
