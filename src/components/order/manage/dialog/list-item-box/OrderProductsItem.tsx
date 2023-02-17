import { InputNumberChangeParams } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import OrderProductsColumn from './OrderProductsColumn'

export type OrderProduct = {
    pk: string
    cnItemName: string
    productName: string
    sellerName: string
    marketName: string
    skuId: string
    itemId: string
    itemOptions: string[]
    barcode: string
    hasBarcode: boolean
    hasCarton: boolean
    orderQty: number
    image: string
}

type Props = {
    product: OrderProduct
    onChangeOrderQty: (event: InputNumberChangeParams) => void
}

function OrderDetailListItem(props: Props) {
    const { product, onChangeOrderQty } = props
    const { pk, productName, sellerName, marketName, skuId, itemId, itemOptions, barcode, hasBarcode, hasCarton, orderQty, cnItemName, image } =
        product
    return (
        <li className="border">
            <div className="grid overflow-hidden grid-cols-12 grid-rows-none gap-0">
                <div className="row-span-6 col-span-2 border-r border-b flex flex-col">
                    <div className="flex items-cetner">
                        <img src={image} alt="상품 이미지" className="h-[159px] max-w-[150px] object-contain m-auto" />
                    </div>
                    <div className="flex justify-evenly items-center border-t pt-1 w-full h-[32px]">
                        <InputText className="w-full p-1 border-none h-full pl-3 text-center" placeholder="중국옵션명" disabled value={cnItemName} />
                    </div>
                </div>
                <OrderProductsColumn title="상품명" value={productName} rowSpan />
                <OrderProductsColumn title="판매사" value={sellerName} borderRight />
                <OrderProductsColumn title="판매처" value={marketName} />
                <OrderProductsColumn title="상품코드" value={skuId} borderRight />
                <OrderProductsColumn title="옵션ID" value={itemId} />
                <OrderProductsColumn title="옵션1" value={itemOptions[0]} borderRight />
                <OrderProductsColumn title="옵션2" value={itemOptions[1]} />
                <OrderProductsColumn title="상품바코드" value={barcode} borderRight />
                <OrderProductsColumn title="바코드부착여부" value={hasBarcode ? '부착' : '미부착'} />
                <OrderProductsColumn title="카톤박스 기획여부" value={hasCarton ? '유' : '무'} borderRight />
                <OrderProductsColumn
                    title="발주(매입)수량"
                    name={pk}
                    valueType="number"
                    value={orderQty}
                    numberValue={orderQty}
                    editable={true}
                    onChangeOrderQty={onChangeOrderQty}
                />
            </div>
        </li>
    )
}

export default OrderDetailListItem
