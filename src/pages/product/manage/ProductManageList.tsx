import axios from 'axios'
import { map } from 'lodash'
import numeral from 'numeral'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from 'src/api/ApiConfig'
import MenuButton from 'src/components/custom-buttons/MenuButton'
import { imageBodyTemplate, urlBodyTemplate } from 'src/hooks/data-table-hooks/BodyHooks'
import { ProductGruop } from 'src/types/product-manage'
import ProductDialog from './detail-modal/ProductDialog'

type DialogId = 'CREATE' | 'DETAIL'

type DetailModalProps = {
    pk: string
}

export const ecommerceList = ['coopang-rocket', 'coopang-zet', 'coopang-seller', 'auction', 'street11', 'gmarket', 'tmon', 'wemap', 'interpark', 'ably', 'zigzag', 'talkstore', 'funshop', 'smartstore']

function ProductManageList() {
    const [dialogId, setDialogId] = useState<DialogId>()
    const [productList, setProductList] = useState<ProductGruop[]>([])
    const [detailModalProps, setDetailmodalProps] = useState<DetailModalProps>()

    const productsNameBodyTemplate = (rowData: any) => {
        return (
            <span className="flex w-full py-2" onClick={() => onClickProductsName(rowData.pk)}>
                {rowData.productsName}
            </span>
        )
    }

    const optionsBodyTemplate = (rowData: any, index: number) => {
        const option = rowData.products[0].items[0].itemOptions[index]
        const itemsLength = rowData.products[0].items.length

        if (itemsLength > 1) {
            return (
                <span>
                    {option as string} 외({itemsLength - 1})
                </span>
            )
        } else {
            return <span>{option as string}</span>
        }
    }

    const numberBodyTemplate = (value: number) => {
        return numeral(value).format('0,0')
    }

    const commissionRateBodyTemplate = (rowData: any) => {
        return numeral(rowData.products[0].items[0].commissionRate).format('0.0') + '%'
    }

    const profitRateBodyTemplate = (rowData: any) => {
        return numeral(rowData.profitRate).format('0.0%')
    }

    const onClickProductsName = (pk: string) => {
        setDialogId('DETAIL')
        console.log(pk)
        setDetailmodalProps({ pk })
    }

    const onClickCreateBtn = () => {
        setDialogId('CREATE')
        setDetailmodalProps(undefined)
    }

    const onCloseModal = () => {
        setDialogId(undefined)
        setDetailmodalProps(undefined)
    }

    const loadProductList = async () => {
        try {
            const { data } = await axios.get(BASE_URL + 'products')

            setProductList(
                map(data, function (x, i) {
                    const item = data[0].products[0].items[0]
                    const salePrice = item.salePrice
                    const deliveryCharge = item.deliveryCharge
                    const commissionRate = item.commissionRate
                    const purchasePrice = item.units[0].trade.purchasePrice

                    const settlementPrice = (salePrice / 100) * (100 - commissionRate) - deliveryCharge
                    const profit = settlementPrice - purchasePrice
                    const profitRate = profit / salePrice

                    return { ...x, seq: i + 1, settlementPrice, profit, profitRate }
                })
            )
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        loadProductList()
    }, [])

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
                <div className="flex items-center justify-between space-x-2 mb-2">
                    <div className="flex items-center space-x-2">
                        <button className="btn primary-btn" onClick={onClickCreateBtn}>
                            신규등록
                        </button>
                        <button className="btn primary-btn">선택삭제</button>
                        <button className="btn primary-btn">선택복사</button>
                        <button className="btn primary-btn">상품마감</button>
                        <button className="btn primary-btn">마감해제</button>
                        <MenuButton title="전체상품보기" color="#146BCE" menu={['전체상품 보기', '전체상품 보기(마감제외)', '마감상품 보기']} onClickMenu={(action: string) => alert(action)} />
                        <button className="btn primary-btn">디자인요청</button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MenuButton
                            title="EXCEL"
                            position="left"
                            color="#098000"
                            menu={['전체상품 엑셀 다운로드', '선택상품 엑셀 다운로드', '엑셀 업로드(상품 수정)']}
                            icon={<img src="./assets/icons/excel.png" alt="excel" width={28} className="object-contain" />}
                            onClickMenu={(action: string) => alert(action)}
                        />
                    </div>
                </div>
                <DataTable value={productList} responsiveLayout="scroll" sortMode="multiple" removableSort resizableColumns className="max-h-[99vh]" columnResizeMode="expand">
                    <Column align="center" selectionMode="multiple" selectionAriaLabel="productsId" headerStyle={{ width: '3em' }} field="productsId"></Column>
                    <Column align="center" className="text-[12px]" field="seq" header="NO" />
                    <Column align="center" className="text-[12px]" field="createdAt" header="등록일" />
                    <Column align="center" className="text-[12px]" field="managerName" header="담당자" />
                    <Column align="center" className="text-[12px]" field="products.0.items.0.units.0.skuId" header="상품코드" />
                    <Column align="center" className="text-[12px]" field="productsImageUrl" header="이미지" body={imageBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="url" header="URL" body={(rowData: any) => urlBodyTemplate(rowData.productsLinkUrls[0])} />
                    <Column alignHeader="center" align="left" className="text-[12px]" field="productsName" header="상품명" headerStyle={{ width: '250px' }} body={productsNameBodyTemplate} />
                    <Column alignHeader="center" align="left" className="text-[12px]" field="" header="옵션1" body={(rowdata) => optionsBodyTemplate(rowdata, 0)} />
                    <Column alignHeader="center" align="left" className="text-[12px]" field="" header="옵션2" body={(rowdata) => optionsBodyTemplate(rowdata, 1)} />
                    <Column align="center" className="text-[12px]" field="products.0.items.0.units.0.trade.purchasePrice" header="입고가격" sortable body={(rowData) => numberBodyTemplate(rowData.products[0].items[0].units[0].trade.purchasePrice)} />
                    <Column align="center" className="text-[12px]" field="products.0.items.0.salePrice" header="판매가격" sortable body={(rowData) => numberBodyTemplate(rowData.products[0].items[0].salePrice)} />
                    <Column align="center" className="text-[12px]" field="products.0.items.0.couponPrice" header="할인쿠폰금액" body={(rowData) => numberBodyTemplate(rowData.products[0].items[0].couponPrice)} />
                    <Column align="center" className="text-[12px]" field="products.0.items.0.commissionRate" header="판매수수료" body={commissionRateBodyTemplate} />
                    <Column align="center" className="text-[12px]" field="settlementPrice" header="정산금액" sortable body={(rowData, option) => numberBodyTemplate(rowData[option.field])} />
                    <Column align="center" className="text-[12px]" field="profit" header="판매이익" sortable body={(rowData, option) => numberBodyTemplate(rowData[option.field])} />
                    <Column align="center" className="text-[12px]" field="profitRate" header="판매이익률" sortable body={profitRateBodyTemplate} />
                    {/* 
                    <Column align="center" className="text-[12px]" field="seller" header="판매사" />
                    <Column align="center" className="text-[12px]" field="ecommerce" header="판매처" body={ecommerceBodyTemplate} />
                    */}
                </DataTable>
            </div>
            {<ProductDialog open={dialogId === 'CREATE' || dialogId === 'DETAIL'} onClose={onCloseModal} {...detailModalProps} />}
        </div>
    )
}

export default ProductManageList
