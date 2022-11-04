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
