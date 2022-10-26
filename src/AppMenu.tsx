import classNames from 'classnames'
import { Badge } from 'primereact/badge'
import { Ripple } from 'primereact/ripple'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

const AppSubmenu = (props: any) => {
    const [activeIndex, setActiveIndex] = useState(null)

    const onMenuItemClick = (event: any, item: any, index: any) => {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault()
            return true
        }

        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item })
        }

        if (index === activeIndex) setActiveIndex(null)
        else setActiveIndex(index)

        if (props.onMenuItemClick) {
            props.onMenuItemClick({
                originalEvent: event,
                item: item,
            })
        }
    }

    const renderLinkContent = (item: any) => {
        let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
        let badge = item.badge && <Badge value={item.badge} />

        return (
            <React.Fragment>
                <i className={item.icon}></i>
                <span>{item.label}</span>
                {submenuIcon}
                {badge}
                <Ripple />
            </React.Fragment>
        )
    }

    const renderLink = (item: any, i: any) => {
        let content = renderLinkContent(item)

        if (item.to) {
            return (
                <NavLink aria-label={item.label} role="menuitem" className="p-ripple" activeClassName="router-link-active router-link-exact-active" to={item.to} onClick={(e) => onMenuItemClick(e, item, i)} exact target={item.target}>
                    {content}
                </NavLink>
            )
        } else {
            return (
                <a tabIndex={0} aria-label={item.label} role="menuitem" href={item.url} className="p-ripple" onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
                    {content}
                </a>
            )
        }
    }

    let items =
        props.items &&
        props.items.map((item: any, i: number) => {
            let active = activeIndex === i
            let styleClass = classNames(item.badgeStyleClass, { 'layout-menuitem-category': props.root, 'active-menuitem': active && !item.to })

            if (props.root) {
                return (
                    <li className={styleClass} key={i} role="none">
                        {props.root === true && (
                            <React.Fragment>
                                <div className="layout-menuitem-root-text" aria-label={item.label}>
                                    {item.label}
                                </div>
                                <AppSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} />
                            </React.Fragment>
                        )}
                    </li>
                )
            } else {
                return (
                    <li className={styleClass} key={i} role="none">
                        {renderLink(item, i)}
                        <CSSTransition classNames="layout-submenu-wrapper" timeout={{ enter: 1000, exit: 450 }} in={active} unmountOnExit>
                            <AppSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} />
                        </CSSTransition>
                    </li>
                )
            }
        })

    return items ? (
        <ul className={props.className} role="menu">
            {items}
        </ul>
    ) : null
}

export const AppMenu = (props: any) => {
    return (
        <div className="layout-menu-container">
            <AppSubmenu items={props.model} className="layout-menu text-sm" onMenuItemClick={props.onMenuItemClick} root={true} role="menu" />
        </div>
    )
}
