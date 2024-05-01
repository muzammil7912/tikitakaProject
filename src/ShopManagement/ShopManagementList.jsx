import React, { useContext, useEffect, useState } from 'react'
import Tables from './Table'
import DashboardMessage from '../components/DashboardMessage'
import useFetch from '../customHooks/useFetch'
import Loader from '../components/Loader';
import config from "../services/config.json";
import { MenuActive } from '../context/MenuActiveContext';

const ShopManagementList = () => {
  const {loading,data} = useFetch("dashboard/viewShops")
  const [shopData, setShopData] = useState("");
  const { setMunuActiv } = useContext(MenuActive);

  useEffect(() => {
    if(data) {
      setMunuActiv([true,"ShopManagement"])
      setShopData(data?.data)
    }
  }, [data,setMunuActiv]);



  if(loading) return <Loader />;

  return (
    <>
    <DashboardMessage    />
   <div className="orderPage">
  {shopData && <Tables datass={shopData}  update={setShopData} />}


   </div>
    </>
  )
}

export default ShopManagementList