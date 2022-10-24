import React from 'react'

export const sellShopSelectTemplate = (option: any) => {
    return <img src={`./assets/sell-shop/${option}.jpg`} alt={option} className="max-h-[15px] object-contain m-auto" />
}