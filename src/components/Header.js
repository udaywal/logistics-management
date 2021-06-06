import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Header.css"

function Header() {
    return (
        <div className="header">
            
            <div className="header__logo">
                <img src="https://firebasestorage.googleapis.com/v0/b/syook-logistics.appspot.com/o/syook_logo.png?alt=media&token=06b7c408-6af3-4522-ae5a-1bc423ed5bdf" alt="icon"/>
                <span>Logistics</span>
            </div>

            <div className="header__menu">
                <NavLink to='/' exact className="header__option" activeClassName="active_link">
                    Home
                </NavLink>
                <NavLink to='/vehicles' className="header__option" activeClassName="active_link">
                    Vehicles
                </NavLink>
                <NavLink to='/items' className="header__option" activeClassName="active_link">
                    Items
                </NavLink>
                <NavLink to='/customers' className="header__option" activeClassName="active_link">
                    Customers
                </NavLink>
                <NavLink to='/orders' className="header__option" activeClassName="active_link">
                    Orders
                </NavLink>
            </div>

        </div>
    )
}

export default Header
