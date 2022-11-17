import dayjs from 'dayjs'
import numeral from 'numeral'
import { Image } from 'primereact/image'
import React from 'react'

export const imageBodyTemplate = (rowData: any, option?: any) => {
    return <Image src={rowData[option.field]} alt={rowData[option.field]} className="w-[65px] h-[65px] m-auto" preview />
}

export const urlBodyTemplate = (url: string) => {
    return (
        <a href={url} target="blank" className="text-[#39cc2f] hover:text-[#146bce] transition">
            <i className="fa-solid fa-link text-[12px]"></i>
        </a>
    )
}

export const printBodyTemplate = (rowData: any) => {
    return (
        <button>
            <i className="fa-solid fa-print"></i>
        </button>
    )
}

export const numberBodyTemplate = (value: number) => {
    return numeral(value).format('0,0')
}

export const dateBodyTemplate = (rowData: any, option: any) => {
    return dayjs(rowData[option.field]).format('YYYY-MM-DD')
}

export const arrayCommaBodyTemplate = (value: string[]) => {
    return value.join(', ')
}
