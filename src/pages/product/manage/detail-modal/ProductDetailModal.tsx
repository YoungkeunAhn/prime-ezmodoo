import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import React, { useState } from 'react'
import { ecommerceList } from '../ProductManageList'
import CommonInfoTable from './CommonInfoTable'
import ContentHeader from './ContentHeader'
import ExpandViewDistributionInfo from './ExpandViewDistributionInfo'
import ExpandViewSupplierInfo from './ExpandViewSupplierInfo'
import ManageListItem from './ManageListItem'

type TabId = 'EXPAND' | 'LIST'

type Props = {
    open: boolean
    onClose: () => void
    data: any
}

function ProductDetailModal(props: Props) {
    const { open, onClose, data } = props
    const [tabId, setTabId] = useState<TabId>('LIST')

    const onClickListView = () => {
        setTabId('LIST')
    }

    const onClickExpandView = () => {
        setTabId('EXPAND')
    }

    const fakeHeaderInfo = {
        manager: '안영근',
        createAt: '2021-12-06 16:08:50',
        title: '로지 토끼 슬리퍼',
    }

    const fakeSupplierInfo: ICommonInfo[] = [
        {
            title: '공급사명',
            info: 'SHENGPENG',
        },
        {
            title: '대표자',
            info: 'LEEKANGRO',
        },
        {
            title: '사업자등록번호',
            info: '111-11-111111',
        },
        {
            title: '팩스번호',
            info: '02-1577-7777',
        },
        {
            title: '대표번호',
            info: '02-1577-7777',
        },
        {
            title: '대표이메일주소',
            info: 'SHENGPENG',
        },
        {
            title: '주소',
            info: 'SHENGPENG',
        },
        {
            title: 'URL1',
            info: '',
        },
        {
            title: 'URL2',
            info: '',
        },
    ]

    const fakeDistributionInfo: ICommonInfo[] = [
        {
            title: '카톤사이즈',
            info: '50*50*50* cm',
        },
        {
            title: '박스당 CBM',
            info: '0.125 cbm',
        },
        {
            title: '상품 영문명',
            info: 'Cable Fill',
        },
        {
            title: '재질 영문명',
            info: 'plastic',
        },
        {
            title: '발주 후 입고기간',
            info: '15일',
        },
        {
            title: '박스 입수량',
            info: '100',
        },
        {
            title: 'Net W/T (개당 상품순중량)',
            info: '0.4 kg',
        },
        {
            title: '상품 총중량',
            info: '15 kg',
        },
        {
            title: '관세율',
            info: '',
        },
        {
            title: '비고',
            info: '3.40 %',
        },
    ]

    const ModalHeader = () => {
        return (
            <div className="flex justify-between items-center p-0">
                <span></span>
                <div className="flex items-center space-x-2">
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">제트입고요청</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">발주요청</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]">저장</button>
                    <button className="border p-2 min-w-[50px] font-bold bg-[#E4F1FF] rounded text-black text-[12px]" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        )
    }

    const sellShopBodyTemplate = (rowData: any, option?: any) => {
        return <Dropdown className="w-full border-none mt-1" value={rowData.sellShop} options={ecommerceList} valueTemplate={sellShopSelectTemplate(rowData.sellShop)} itemTemplate={sellShopSelectTemplate} />
    }

    const sellShopSelectTemplate = (option: any) => {
        return <img src={`./assets/sell-shop/${option}.jpg`} alt={option} className="max-h-[15px] object-contain m-auto" />
    }

    return (
        <Dialog header={ModalHeader} visible={open} onHide={onClose} className="max-w-[1500px] w-full min-w-[500px]" closable={false}>
            <div>
                <ContentHeader manager={fakeHeaderInfo.manager} createdAt={fakeHeaderInfo.createAt} title={fakeHeaderInfo.title} />
                <div className="flex items-center p-1 space-x-2">
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-double-down text-[10px]" />
                    </button>
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-down text-[10px]" />
                    </button>
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-double-up text-[10px]" />
                    </button>
                    <button className="px-1.5 border border-[#707070] rounded text-[#707070]">
                        <i className="pi pi-angle-up text-[10px]" />
                    </button>
                    <button style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                        추가
                    </button>
                    <button style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-[#A10C0C] text-[12px] ">
                        삭제
                    </button>
                    <button style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                        복사
                    </button>
                    <button onClick={onClickExpandView} style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                        펼쳐보기
                    </button>
                    <button onClick={onClickListView} style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                        리스트형식보기
                    </button>
                    <button style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                        <i className="fa-regular fa-eye-slash mr-1"></i>
                        <span>숨김처리</span>
                    </button>
                    <button style={{ lineHeight: '1.1rem' }} className="p-1.5 min-w-[60px] border border-[#707070] rounded text-black text-[12px]">
                        <i className="fa-regular fa-eye mr-1"></i>
                        <span>모든옵션보기</span>
                    </button>
                </div>
                {tabId === 'EXPAND' && (
                    <div className="flex border-t-4 border-[#0D3157]">
                        <ul className="text-[12px] max-h-[76vh] overflow-y-auto manage-list">
                            <ManageListItem />
                            <ManageListItem />
                            <ManageListItem />
                        </ul>
                        <div className="ml-2 h-auto flex flex-col justify-between">
                            <CommonInfoTable title="공급사정보" content={fakeSupplierInfo} />
                            <CommonInfoTable title="상품물류 정보" content={fakeDistributionInfo} />
                        </div>
                    </div>
                )}
                {tabId === 'LIST' && (
                    <div className="flex flex-col">
                        <DataTable value={data} onRowReorder={() => {}} className="border-t-4 border-t-[#0D3157] border h-[60vh]">
                            <Column align="center" rowReorder headerStyle={{ width: '10px' }} />
                            <Column align="center" selectionMode="multiple" selectionAriaLabel="id" headerStyle={{ width: '10px' }} field="id"></Column>
                            <Column align="center" className="text-[12px]" field="seller" header="판매사" />
                            <Column align="center" className="text-[12px]" field="sellShop" header="판매처" headerStyle={{ width: '130px' }} body={sellShopBodyTemplate} />
                            <Column align="center" className="text-[12px]" field="productCode" header="판매사" />
                            <Column align="center" className="text-[12px]" field="optionId" header="옵션ID" />
                            <Column align="center" className="text-[12px]" field="options.0" header="옵션1" />
                            <Column align="center" className="text-[12px]" field="options.1" header="옵션2" />
                            <Column align="center" className="text-[12px]" field="stock" header="창고재고량" />
                            <Column align="center" className="text-[12px]" field="usableStock" header="가용재고량" />
                            <Column align="center" className="text-[12px]" field="coopangStock" header="쿠팡창고재고량" />
                            <Column align="center" className="text-[12px]" field="zetRequestStock" header="제트배송-입고요청수량" />
                            <Column align="center" className="text-[12px]" field="purchaseStock" header="발주(매입)수량" />
                        </DataTable>

                        <ExpandViewSupplierInfo />
                        <ExpandViewDistributionInfo />
                    </div>
                )}
            </div>
        </Dialog>
    )
}

export default ProductDetailModal
