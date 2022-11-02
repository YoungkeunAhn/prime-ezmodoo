declare type BaseSearchOption = {
    startDate?: string
    endDate?: string
    searchText?: string
}

declare interface StockSearchOption extends BaseSearchOption {
    isStock?: boolean
    seller?: string
    market?: string
    [searchCate: string]: string
    [numberRangeCate: string]: {
        startNumber: number
        endNumber: number
    }
}
