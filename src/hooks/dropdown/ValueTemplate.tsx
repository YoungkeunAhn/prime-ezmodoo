import React from 'react'

export const marketTemplate = (option: any) => {
    if (option === '') {
        return <div>전체</div>
    } else {
        return <img src={`./assets/sell-shop/${option}.jpg`} alt={option} className="max-h-[15px] object-contain m-auto" />
    }
}
