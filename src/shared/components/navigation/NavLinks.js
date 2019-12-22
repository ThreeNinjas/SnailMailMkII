import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavLinks.css'

const NavLinks = props => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/u1/alerts" exact>
                    My Alerts
                </NavLink>
            </li>
            <li>
                <NavLink to="/alerts/new" exact>
                    New Alert
                </NavLink>
            </li>
            <li>
                <NavLink to="/auth" exact>
                    Sign In
                </NavLink>
            </li>
            <li>
                <NavLink to="/help" exact>
                    How To Use This Service
                </NavLink>
            </li>
        </ul>
    )
}

export default NavLinks