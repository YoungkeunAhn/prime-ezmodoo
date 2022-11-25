export declare type UnitStock = {
    totalQty: number
    disusedQty: number
    availableQty: number
    locations: string[]
}

export declare type UnitTradeVendor = {
    pk: string
    memo: string
    company: {
        name: string
        bizId: string
        telNo: string
        faxNo: string
        address: string
        siteUrls: string[]
    }
    officer: {
        name: string
        telNo: string
        faxNo: string
        email: string
        snsNm: string
        snsId: string
    }
    manager: {
        name: string
        telNo: string
        faxNo: string
        email: string
        snsNm: string
        snsId: string
    }
}

export declare type UnitTrade = {
    currencyUnit: string
    currencyCost: number
    costPrice: number
    purchasePrice: number
    cbm: number
    lwh: {
        length: number
        weight: number
        height: number
    }
    gwt: number
    nwt: number
    qtyPerBox: number
    tariffCode: string
    tariffRate: number
    receiptPeriod: number
    vendors: UnitTradeVendor[]
}

export declare type ProductItemUnit = {
    pk: string
    skuId: string
    skuCode: string
    skuName: string
    skuAttr: {}
    enSkuName: string
    enSkuMaterial: string
    hscode: string
    qrcode: string
    barcode: string
    memo: string
    stock: UnitStock
    trade: UnitTrade
    order: {
        lastReceiptDate: string
        lastReceiptPrice: number
        lastReceiptQty: number
        totalReceiptPrice: number
    }

    image: string
    createdAt: string
}

export declare type ProductItem = {
    pk: string
    itemId: string
    itemName: string
    itemAttr?: { [key: string]: string }
    itemImageUrls: string[]
    itemOptions: string[]
    marketSkuId: string
    marketQrcode: string
    marketBarcode: string
    sellPrice: number
    salePrice: number
    couponPrice: number
    stockQty: number
    memo: string
    commissionRate: number
    deliveryCharge: number
    optionalCharge: number
    units: ProductItemUnit[]
}

export declare type Product = {
    pk: string
    productId: string
    productName: string
    sellerPk: string
    sellerName: string
    marketId: string
    marketName: string
    memo: string
    attrs: any[] //나중에 사용
    items: ProductItem[]
}

export declare type ProductsGruop = {
    pk: string
    productsId: string
    productsCode: string
    productsName: string
    productImageUrl: string
    productsLinkUrls: string[]
    products: Product[]

    sellerList: string
    marketList: string

    isSales: boolean
}

export declare type CommonTableContent = {
    /**
     * 공급사명
     */
    title: string
    /**
     * 값
     */
    value: string
    /**
     * ex) trade.company.name
     */
    key: string
}

export declare type IVendor = {
    company: {
        name: string
        bizId: string
        faxNo: string
        telNo: string
        address: string
    }
    officer: {
        name: string
        email: string
    }
    memo?: string
    linkUrls: string[]
}

export declare type ITrade = {
    lwh: {
        width: number
        length: number
        height: number
    }
    cbm: number
    receiptPeriod: number
    qtyPerBox: number
    nwt: number
    gwt: number
    tariffRate: number
    enSkuMaterial: string
    enSkuName: string
}

export declare type ProductsGroupInfo = {
    vendor: IVendor
    stock: ITrade
}

export declare type HeaderInfo = {
    managerName: string
    createdAt: string
    currencyCost: number
    applyExchangeRateCost: number
    productsName: string
}

export declare interface ContentProductItem extends ProductItem {
    productPk: string
    productName: string
    sellerPk: string
    sellerName: string
    marketId: string

    stockUnitId: string
    totalQty: number //창고재고량
    availableQty: number //가용재고량
    disusedQty: number //불량수량
    reorderPeriod: number
    purchasePrice: number

    calcPrice: number //정산금액
    profit: number //판매이익금
    profitRate: number //판매이익율

    hasBarcode: boolean | null
    hasCarton: boolean | null
}
