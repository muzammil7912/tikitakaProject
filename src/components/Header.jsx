import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DropdownUser from './header/DropdownUser';

const Header = () => {

  return (
   <div className="header flex justify-between items-center">
        <div className="header__left">
            <h1>Dashboard</h1>
        </div>
        <div className="header__right">
       <DropdownUser />
  </div>
  </div>
  )

}
export default Header