import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth-context'

import './NavLinks.css'

const NavLinks = props => {
    const auth = useContext (AuthContext)
    
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    Home
                </NavLink>
            </li>
            {auth.isLoggedIn && (<li>
                <NavLink to="/5e7abdf76c1b7845b8eef0e0/alerts" exact>
                    My Alerts
                </NavLink>
            </li>)}
            {auth.isLoggedIn && (<li>
                <NavLink to="/alerts/new" exact>
                    New Alert
                </NavLink>
            </li>)}
            {!auth.isLoggedIn && (<li>
                <NavLink to="/auth" exact>
                    Sign In
                </NavLink>
            </li>)}
            {auth.isLoggedIn && (
                <li>
                  <button onClick={auth.logout}>LOGOUT</button>
                </li>
              )}
            <li>
                <NavLink to="/help" exact>
                    How To Use This Service
                </NavLink>
            </li>
        </ul>
    )
}

export default NavLinks