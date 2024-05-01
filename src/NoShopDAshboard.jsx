import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import config from "./services/config.json";
import { MenuActive } from './context/MenuActiveContext';

const NoShopDAshboard = () => {
    const { setMunuActiv } = useContext(MenuActive);
    useEffect(() => {
          setMunuActiv([true,"Dashboard"])
      }, [setMunuActiv])
  return (
    <div className='flex items-center flex-col justify-center gap-2 h-screen'>

    <h1 className='text-center font-medium'>
        No Shop Found
    </h1>

    <Link to={`/${config.demo}shop`} className="btn btn-primary flex gap-2 items-center">Create Shop</Link>

    </div>
  )
}

export default NoShopDAshboard