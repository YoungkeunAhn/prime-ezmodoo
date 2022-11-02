import React from 'react'

export const imageBodyTemplate = (rowData: any, option?: any) => {
    return <img src={rowData[option.field]} alt={rowData[option.field]} className="w-[65px] h-[65px] m-auto" />
}

export const urlBodyTemplate = (rowData: any, option?: any) => {
    return (
        <a href={rowData.url} target="blank" className="text-[#39cc2f] hover:text-[#146bce] transition">
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
