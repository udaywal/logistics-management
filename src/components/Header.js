import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Header.css"

function Header() {
    return (
        <div className="header">
            
            <div className="header__logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="icon"/>
                <span>Logistics</span>
            </div>

            <div className="header__menu">
                <NavLink to='/'>
                    <div className="header__option">
                        Home
                </div>
                </NavLink>
                <NavLink to='/vehicle'>
                    <div className="header__option">
                        Vehicle
                    </div>
                </NavLink>
                <NavLink to='/customer'>
                    <div className="header__option">
                        Customer
                    </div>
                </NavLink>
                <NavLink to='/order'>
                    <div className="header__option">
                        Order
                    </div>
                </NavLink>
            </div>

        </div>
    )
}

export default Header
