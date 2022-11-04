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
}

export declare type ProductItem = {
    pk: string
    itemId: string
    itemName: string
    itemAttr: { [key: string]: string }
    itemImageUrls: string[]
    skuId: string
    qrcode: string
    barcode: string
    sellPrice: number
    salePrice: number
    couponPrice: number
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

export declare type ProductGruop = {
    pk: string
    productsId: string
    productsCode: string
    productsName: string
    productImageUrl: string
    productsLinkUrls: string[]
    products: ProductItem[]
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

export declare type TradeInfo = {
    company: {
        name: string
        bizId: string
        faxNo: string
        telNo: string
        address: string
        stieUrl1: string
        stieUrl2: string
    }
    officer: {
        name: string
        email: string
    }
    memo: string
}

export declare type StockInfo = {
    trade: {
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
    }
    enSkuMaterial: string
    enSkuName: string
}
