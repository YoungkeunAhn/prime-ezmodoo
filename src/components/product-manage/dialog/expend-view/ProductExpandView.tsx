import { DropdownChangeParams } from 'primereact/dropdown'
import React from 'react'
import SortableList from 'react-easy-sort'
import ManageListItem from 'src/components/product-manage/dialog/expend-view/ManageListItem'
import TradeInfoTable from 'src/components/product-manage/dialog/expend-view/StockInfoTable'
import VendorInfoTable from 'src/components/product-manage/dialog/expend-view/VendorInfoTable'
import { ContentProductItem, ITrade, IVendor } from 'src/types/product-manage'

type Props = {
    productItemList: ContentProductItem[]
    checkList: string[]
    vendorInfo: IVendor
    tradeInfo: ITrade
    onChangeVendor: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChangeTrade: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChangeProductItemText: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
    onChangeImage: (file: File | string, index: number) => void
    onChangeDropdown: (event: DropdownChangeParams, index: number) => void
    onToggleCheckbox: (pk: string) => void
    onChangeSalePrice: (value: number | null, index: number) => void
    onChangePurchasePrice: (value: number | null, index: number) => void
    onChangeDeliveryCharge: (value: number | null, index: number) => void
    onChangeCommissionRate: (value: number | null, index: number) => void
    onChangeOptionsInput: (event: React.ChangeEvent<HTMLInputElement>, index: number, optionIndex: number) => void
}

function ProductExpandView(props: Props) {
    const {
        productItemList,
        checkList,
        vendorInfo,
        tradeInfo,
        onChangeVendor,
        onChangeTrade,
        onChangeProductItemText,
        onChangeCommissionRate,
        onChangeDeliveryCharge,
        onChangeDropdown,
        onChangeImage,
        onChangePurchasePrice,
        onChangeSalePrice,
        onToggleCheckbox,
        onChangeOptionsInput,
    } = props

    return (
        <div className="flex border-t-4 border-[#0D3157] h-auto">
            <div className="min-w-[1050px]">
                <SortableList onSortEnd={() => {}} draggedItemClassName="dragged" className="text-[12px] max-h-[76vh] overflow-y-auto manage-list">
                    {productItemList.map((productItem, idx) => (
                        <ManageListItem
                            key={idx}
                            idx={idx}
                            checkList={checkList}
                            productItem={productItem}
                            onChangeImage={onChangeImage}
                            onChangeDropdown={onChangeDropdown}
                            onToggleCheckbox={onToggleCheckbox}
                            onChangeSalePrice={onChangeSalePrice}
                            onChangeText={onChangeProductItemText}
                            onChangePurchasePrice={onChangePurchasePrice}
                            onChangeDeliveryCharge={onChangeDeliveryCharge}
                            onChangeCommissionRate={onChangeCommissionRate}
                            onChangeOptionsInput={onChangeOptionsInput}
                        />
                    ))}
                </SortableList>
            </div>
            <div className="ml-2 h-auto flex flex-col justify-between">
                <div className="w-[400px]">
                    <VendorInfoTable info={vendorInfo} onChange={onChangeVendor} />
                </div>
                <div className="w-[400px]">
                    <TradeInfoTable info={tradeInfo} onChange={onChangeTrade} />
                </div>
            </div>
        </div>
    )
}

export default ProductExpandView
