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
                <NavLink to='/'>
                    <div className="header__option">
                        Home
                </div>
                </NavLink>
                <NavLink to='/vehicles'>
                    <div className="header__option">
                        Vehicles
                    </div>
                </NavLink>
                <NavLink to='/items'>
                    <div className="header__option">
                        Items
                    </div>
                </NavLink>
                <NavLink to='/customers'>
                    <div className="header__option">
                        Customers
                    </div>
                </NavLink>
                <NavLink to='/orders'>
                    <div className="header__option">
                        Orders
                    </div>
                </NavLink>
            </div>

        </div>
    )
}

export default Header
