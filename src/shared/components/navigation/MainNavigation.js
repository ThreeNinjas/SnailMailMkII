import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'
import './MainNavigation.css';

const MainNavigation = props => {
  const [ drawerIsOpen, setDrawerIsOpen] = useState(false)

  const openDrawerHandler = () => {
    setDrawerIsOpen(true)
  }

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false)
  }
  return (
    <React.Fragment>
      {/* javascript shorthand for the ternary operator...which is already shorthand... */}
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />} 
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer">
                    <NavLinks />
                </nav>
            </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
        <h1 className="main-navigation__title">
          <Link to="/">SnailMail</Link>
        </h1>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
