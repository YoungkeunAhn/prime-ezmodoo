import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Route, useLocation } from 'react-router-dom'

import { AppMenu } from './AppMenu'

import Dashboard from './components/Dashboard'

import ProductManageList from './pages/product/manage/ProductManageList'
import StockList from './pages/stock/StockList'

import PrimeReact from 'primereact/api'

// import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.css'
import 'prismjs/themes/prism-coy.css'
import './App.scss'
import { AppTopbar } from './AppTopbar'
import './assets/demo/Demos.scss'
import './assets/demo/flags/flags.css'
import './assets/layout/layout.scss'
import TableDemo from './components/TableDemo'
import BagsIcon from './icons/BagsIcon'
import ChartIcon from './icons/ChartIcon'
import CogChatIcon from './icons/CogChatIcon'
import CogsIcon from './icons/CogsIcon'
import HomeIcon from './icons/HomeIcon'
import KeyboardIcon from './icons/KeyboardIcon'
import LogisTruckIcon from './icons/LogisTruckIcon'
import ProductsIcon from './icons/ProductsIcons'
import DesignManageList from './pages/design-manage/DesignManageList'
import InvoiceList from './pages/invoice/InvoiceList'
import JetRequestList from './pages/jet-warehousing/JetRequestList'
import ChinaWearOrder from './pages/order/china-wear/ChinaWearOrder'
import OrderManageList from './pages/order/manage/OrderManageList'
import ProductContactList from './pages/product/contact/ProductContactList'
import ValidationTest from './pages/vaildation-test/ValidationTest'

const App = () => {
    const [layoutMode, setLayoutMode] = useState('static')
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined')
    const [ripple, setRipple] = useState(true)
    const [staticMenuInactive, setStaticMenuInactive] = useState(false)
    const [overlayMenuActive, setOverlayMenuActive] = useState(false)
    const [mobileMenuActive, setMobileMenuActive] = useState(false)
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false)
    const copyTooltipRef = useRef()
    const location = useLocation()

    PrimeReact.ripple = true

    let menuClick = false
    let mobileTopbarMenuClick = false

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, 'body-overflow-hidden')
        } else {
            removeClass(document.body, 'body-overflow-hidden')
        }
    }, [mobileMenuActive])

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents()
    }, [location])

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false)
            setMobileMenuActive(false)
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false)
        }

        mobileTopbarMenuClick = false
        menuClick = false
    }

    const onToggleMenuClick = (event) => {
        menuClick = true

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true)
                }

                setOverlayMenuActive((prevState) => !prevState)
                setMobileMenuActive(false)
            } else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState)
            }
        } else {
            setMobileMenuActive((prevState) => !prevState)
        }

        event.preventDefault()
    }

    const onSidebarClick = () => {
        menuClick = true
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true

        setMobileTopbarMenuActive((prevState) => !prevState)
        event.preventDefault()
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true

        event.preventDefault()
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false)
            setMobileMenuActive(false)
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992
    }
    const menu = [
        {
            items: [
                {
                    label: 'Dashboard',
                    icon: <HomeIcon />,
                    to: '/',
                },
                {
                    label: '상품',
                    className: 'mt-10',
                    icon: <ProductsIcon />,
                    items: [
                        { label: '상품컨택', to: '/products/contact' },
                        { label: '상품관리', to: '/products/manage' },
                        { label: '상품디자인관리', to: '/products/design' },
                    ],
                },
                {
                    label: '재고관리',
                    className: 'mt-10',
                    icon: <BagsIcon />,
                    to: '/stock',
                },
                {
                    label: '발주관리',
                    className: 'mt-10',
                    icon: <KeyboardIcon />,
                    items: [
                        { label: '리오더', to: '/order/reorder' },
                        { label: '일반발주관리', to: '/order/list' },
                        { label: '의류발주관리', to: '/order/china-wear' },
                    ],
                },
                {
                    label: '상품통계',
                    className: 'mt-10',
                    icon: <ChartIcon />,
                    items: [
                        { label: '전체상품통계', to: '/analnysis/normal' },
                        { label: '로켓상품통계', to: '/analnysis/rocket' },
                    ],
                },
                // {
                //     label: '트렌드키워드',
                //     className: 'mt-10',
                //     icon: <SearchIcon />,
                //     to: '/keywords',
                // },
                // {
                //     label: '판매순위관리',
                //     className: 'mt-10',
                //     icon: <NumberIcon />,
                //     to: '/sales-rank',
                // },
                // {
                //     label: '광고금액관리',
                //     className: 'mt-10',
                //     icon: <WonIcon />,
                //     to: '/advertisement',
                // },
                {
                    label: '물류관리',
                    className: 'mt-10',
                    icon: <LogisTruckIcon />,
                    items: [
                        { label: '물류', to: '/invoice' },
                        { label: '파렛트', to: '/palette' },
                        { label: '로켓그로스입고요청', to: '/jet-request' },
                        { label: '로켓발주리스트', to: '/rocket-invoice' },
                    ],
                },
                {
                    label: '고객센터',
                    className: 'mt-10',
                    icon: <CogChatIcon />,
                    items: [
                        { label: '공지사항', to: '/bbs/notice' },
                        { label: '업체게시판', to: '/bbs/list' },
                        { label: 'FAQ', to: '/bbs/faq' },
                    ],
                },
                {
                    label: '설정',
                    className: 'mt-10',
                    icon: <CogsIcon />,
                    items: [
                        { label: '사용자관리', to: '/config/user' },
                        { label: '계정관리', to: '/config/account' },
                        { label: '운영관리', to: '/config/operation' },
                    ],
                },
            ],
        },
    ]

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className)
        else element.className += ' ' + className
    }

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className)
        else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light',
    })

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            {/* <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" /> */}

            <AppTopbar
                onToggleMenuClick={onToggleMenuClick}
                layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive}
                onMobileTopbarMenuClick={onMobileTopbarMenuClick}
                onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
            />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />

                    <Route path="/table" component={TableDemo} />
                    <Route path="/order/list" component={OrderManageList} />
                    <Route path="/order/china-wear" component={ChinaWearOrder} />
                    <Route path="/stock" component={StockList} />
                    <Route path="/products/contact" component={ProductContactList} />
                    <Route path="/products/manage" component={ProductManageList} />
                    <Route path="/products/design" component={DesignManageList} />
                    <Route path="/invoice" component={InvoiceList} />
                    <Route path="/jet-wearhousing/requests" component={JetRequestList} />
                    <Route path="/test/validation" component={ValidationTest} />
                </div>

                {/* <AppFooter layoutColorMode={layoutColorMode} /> */}
            </div>

            {/* <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} /> */}

            {/* <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition> */}
        </div>
    )
}

export default App
