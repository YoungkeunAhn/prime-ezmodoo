import React, { useState, useEffect, useRef } from 'react'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { Chart } from 'primereact/chart'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ProductService } from '../service/ProductService'

const Dashboard = (props) => {
    const [products, setProducts] = useState(null)
    const menu1 = useRef(null)
    const menu2 = useRef(null)
    const [lineOptions, setLineOptions] = useState(null)

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
            },
        }

        setLineOptions(lineOptions)
    }

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    },
                },
                y: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    },
                },
            },
        }

        setLineOptions(lineOptions)
    }

    useEffect(() => {
        const productService = new ProductService()
        productService.getProductsSmall().then((data) => setProducts(data))
    }, [])

    useEffect(() => {
        if (props.colorMode === 'light') {
            applyLightTheme()
        } else {
            applyDarkTheme()
        }
    }, [props.colorMode])

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }

    return (
        <div>
            <iframe src="http://im.imama.kr/imama/dashboard/" className="w-full h-[90vh]"></iframe>
        </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode
}

export default React.memo(Dashboard, comparisonFn)
