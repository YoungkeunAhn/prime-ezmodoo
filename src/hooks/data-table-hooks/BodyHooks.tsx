import dayjs from 'dayjs'
import numeral from 'numeral'
import { Image } from 'primereact/image'
import React from 'react'

export const imageBodyTemplate = (rowData: any, option?: any) => {
    return (
        <Image
            src={rowData[option.field]}
            alt={rowData[option.field]}
            className="w-[60px] h-[60px] m-auto p-0 mb-0"
            imageClassName="m-auto w-full h-full"
            preview
        />
    )
}

export const urlBodyTemplate = (url: string) => {
    return (
        <a href={url} target="blank" className="text-[#39cc2f] hover:text-[#146bce] transition cursor-pointer">
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

export const dateBodyTemplate = (value: string | Date) => {
    return dayjs(value).format('YYYY-MM-DD')
}

export const arrayCommaBodyTemplate = (value: string[]) => {
    return value.join(', ')
}

export const seqBodyTemplate = (rowData: any, option: any) => {
    return option.rowIndex + 1
}
