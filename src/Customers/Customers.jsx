import React, { useContext, useEffect, useState } from 'react'
import Tables from './Table'
import DashboardMessage from '../components/DashboardMessage'
import useFetch from '../customHooks/useFetch'
import Loader from '../components/Loader'
import { MenuActive } from '../context/MenuActiveContext'

const Customers = () => {
  const { setMunuActiv } = useContext(MenuActive);
  const {loading,data} = useFetch("dashboard/viewUsers");
  const [customerData, setCustomerData] = useState("");
  useEffect(() => {
    setMunuActiv([true,"Customers"])
    if(data) {
      setCustomerData(data.users)
    }
  }, [data]);

  if(loading) return <Loader />;
  return (
    <>
       <DashboardMessage />
       {   <Tables datass={customerData} update={setCustomerData} />
      
       }
      
    </>
  )
}

export default Customers