import React from 'react'
import { Link } from 'react-router-dom'

export const AppTopbar = (props: any) => {
    return (
        <div className="layout-topbar" style={{ background: '#2A3652' }}>
            <Link to="/" className="flex text-white">
                <img src="./images/logo.png" alt="logo" className="w-[200px]" />
            </Link>

            <button
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={props.onToggleMenuClick}
                style={{ border: 'none' }}
            >
                <i className="pi pi-bars" />
            </button>

            {/* <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button> */}

            {/* <ul className={classNames('layout-topbar-menu lg:flex origin-top', { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-calendar" />
                        <span>Events</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-cog" />
                        <span>Settings</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </button>
                </li>
            </ul> */}
        </div>
    )
}
