import { SelectButton } from 'primereact/selectbutton'
import React from 'react'
import RangeDateSearch from 'src/components/search-box/RangeDateSearch'
import RangeNumberSearch from 'src/components/search-box/RangeNumberSearch'
import TextSearch from 'src/components/search-box/TextSearch'

type Props = {
    title: string
    total: number

    commonSearch: CommonSearch
    rangeDateSearch?: RangeDateSearch
    rangeNumberSearch?: RangeNumberSearch
    textSearch?: TextSearch
    mutipleSelectSearch?: MultipleSelectSearch
}

function PageHeader(props: Props) {
    const { title, total, commonSearch, rangeDateSearch, rangeNumberSearch, textSearch, mutipleSelectSearch } = props
    const { clearSearchOptions, onChangeCateDropdown, onSearch } = commonSearch
    return (
        <div className="page-header border rounded-lg flex bg-white mb-5">
            <div className="flex-1">
                <div className="flex items-center px-4 pt-4 border-b h-[66px] box-border min-w-[70vw]">
                    <div className="flex flex-col justify-center ">
                        <span className="font-bold text-lg relative">{title}</span>
                        <div className="border-2 w-full border-blue-500 relative -bottom-[14px]"></div>
                    </div>
                    <span className="border rounded bg-white p-1 text-[11px] ml-4">Total : {total}</span>
                </div>

                <div className="flex space-x-4 px-4 pt-4">
                    {textSearch && (
                        <TextSearch
                            currentCate={textSearch.currentCate}
                            options={textSearch.searchCate}
                            text={textSearch.text}
                            onChangeText={textSearch.onChangeText}
                            onChangeDropdown={onChangeCateDropdown}
                        />
                    )}
                    {rangeDateSearch && (
                        <RangeDateSearch
                            currentCate={rangeDateSearch.currentCate}
                            options={rangeDateSearch.searchCate}
                            startDate={rangeDateSearch.startDate}
                            endDate={rangeDateSearch.endDate}
                            onChangeDates={rangeDateSearch.onChangeDates}
                            onChangeDropdown={onChangeCateDropdown}
                        />
                    )}

                    {rangeNumberSearch && (
                        <RangeNumberSearch
                            currentCate={rangeNumberSearch.currentCate}
                            options={rangeNumberSearch.searchCate}
                            endNumber={rangeNumberSearch.endNumber}
                            startNumber={rangeNumberSearch.startNumber}
                            onChangeNumbers={rangeNumberSearch.onChangeNumbers}
                            onChangeDropdown={onChangeCateDropdown}
                        />
                    )}

                    {mutipleSelectSearch && (
                        <SelectButton
                            multiple
                            optionLabel="name"
                            className="h-[32px] text-xs border-box"
                            options={mutipleSelectSearch.options}
                            value={mutipleSelectSearch.value}
                            onChange={mutipleSelectSearch.onChangeValue}
                        />
                    )}
                </div>
            </div>
            <div className="border-l flex flex-col">
                <div className="h-[65px]"></div>
                <div className="flex items-end space-x-2 p-4">
                    <button className="btn default-btn" onClick={clearSearchOptions}>
                        초기화
                    </button>
                    <button className="btn primary-btn" onClick={onSearch}>
                        검색
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PageHeader
