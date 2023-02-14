import { InputText } from 'primereact/inputtext'
import React from 'react'
import OrderProductsColumn from './OrderProductsColumn'

function OrderDetailListItem() {
    return (
        <li className="border">
            <div className="grid overflow-hidden grid-cols-12 grid-rows-none gap-0">
                <div className="row-span-6 col-span-2 border-r border-b flex flex-col">
                    <div className="flex items-cetner">
                        <img src="http://im.imama.kr/imama/imgs/tokki.jpg" alt="test" className="h-[159px] max-w-[150px] object-contain m-auto" />
                    </div>
                    <div className="flex justify-evenly items-center border-t pt-1 w-full h-[32px]">
                        <InputText className="w-full p-1 border-none h-full pl-3 text-center" placeholder="옵션명" disabled />
                    </div>
                </div>
                <OrderProductsColumn title="상품명" value="" rowSpan />
                <OrderProductsColumn title="판매사" value="" borderRight />
                <OrderProductsColumn title="판매처" value="" />
                <OrderProductsColumn title="상품코드" value="" borderRight />
                <OrderProductsColumn title="옵션ID" value="" />
                <OrderProductsColumn title="옵션1" value="" borderRight />
                <OrderProductsColumn title="옵션2" value="" />
                <OrderProductsColumn title="상품바코드" value="" borderRight />
                <OrderProductsColumn title="바코드부착여부" value="" />
                <OrderProductsColumn title="카톤박스 기획여부" value="" borderRight />
                <OrderProductsColumn title="발주(매입)수량" value="" />
            </div>
        </li>
    )
}

export default OrderDetailListItem
