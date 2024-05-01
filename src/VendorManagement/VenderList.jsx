import React, { useContext, useEffect, useState } from 'react'
import Tables from './Table'
import DashboardMessage from '../components/DashboardMessage'
import useFetch from '../customHooks/useFetch'
import Loader from '../components/Loader';
import config from "../services/config.json";
import { MenuActive } from '../context/MenuActiveContext';

const VenderList = () => {
  const {loading,data} = useFetch("getVendor")
  const [vendorData, setVendorData] = useState("");
  const { setMunuActiv } = useContext(MenuActive);

  useEffect(() => {
    if(data) {
      setMunuActiv([true,"VendorManagement"])
      setVendorData(data?.data)
    }
  }, [data,setMunuActiv]);

  const [filterIndex, setFilterIndex] = useState("new")
  const filterData = [
    {
      label: "new"
    },
    {
      label: "hold"
    },
    {
      label: "request"
    },
  ];
  const handleFilter = (item) => {
    setFilterIndex(item)
  }

  if(loading) return <Loader />;

  return (
    <>
    <DashboardMessage   data={{
    button: {
      label: "Add New Vendor",
      link: `/${config.demo}vendor/create`
    }
  }} />
   <div className="orderPage">
    <div className="orderPage_top mt-5 flex justify-between">
          <div className="orderPage_topl">
            <ul className="list flex gap-3">
              {
                filterData.map((item,index) => {
                  return (
                    <li className={filterIndex === item.label ? "active" : ""} key={index} onClick={() => handleFilter(item.label)}>{item.label}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
  {vendorData && <Tables datass={vendorData[filterIndex]} tabdrop={filterData} tab={filterIndex} update={setVendorData} />}


   </div>
    </>
  )
}

export default VenderList