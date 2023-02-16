declare type SearchCate = {
    label: string
    field: string
}
declare type CommonSearch = {
    onChangeCateDropdown: (event: DropdownChangeParams) => void
    onSearch: () => void
    clearSearchOptions: () => void
}

declare type CateSearch = {
    currentCate: string
    searchCate: SearchCate[]
}

declare interface RangeDateSearch extends CateSearch {
    startDate: Date
    endDate: Date
    onChangeDates: (range: { startDate: Date; endDate: Date }) => void
}

declare interface TextSearch extends CateSearch {
    text: string
    onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void
}

declare interface RangeNumberSearch extends CateSearch {
    startNumber: number | null
    endNumber: number | null
    onChangeNumbers: (event: InputNumberChangeParams) => void
}

declare interface MultipleSelectSearch {
    options: { name: string; value: string }[]
    value: string[]
    onChangeValue: (event: SelectButtonChangeParams) => void
}
