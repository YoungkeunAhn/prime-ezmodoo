declare type ICommonInfo = {
    title: string
    info: string
}

declare type IProductManageList = {
    seq: number
    createdAt: string
    seller: string
    image?: string
    url: string
    productCode: string
    productGroupName: string
    options: string[]

    cost?: number
    price?: number
    deliveryCharge?: number
    discountPrice?: number
    calcPrice?: number //판매가격 - 수수료
    sellCommition?: number
    profit?: number //판매가격 - 수수료 - 배송비
    profitRate?: number //판매이익 / 판매가격 * 100
}
