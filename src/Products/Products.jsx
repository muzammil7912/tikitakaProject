import React, { useContext, useEffect, useState } from 'react'
import Tables from './Table'
import DashboardMessage from '../components/DashboardMessage'
import useFetch from '../customHooks/useFetch'
import Loader from '../components/Loader'
import config from "../services/config.json";
import { MenuActive } from '../context/MenuActiveContext'

const Products = () => {
  const {loading,data} = useFetch("dashboard/productForVendor")
  const [ProductList, setProductList] = useState("");
  const { setMunuActiv } = useContext(MenuActive);
  useEffect(() => {
    if(data) {
      setMunuActiv([true,"Products"])
      setProductList(data.data)
    }
  }, [data])

  const [filterIndex, setFilterIndex] = useState("new")
  const filterData = [
    {
      label: "new"
    },
    {
      label: "top_selling"
    },
    {
      label: "trending"
    },
  ];
  const handleFilter = (item) => {
    setFilterIndex(item)
  }
  
  
  if (loading) { return <Loader />}
  return (
    <>
        <DashboardMessage
  data={{
    button: {
      label: "Add New Product",
      link: `/${config.demo}products/create`
    }
  }}
/>
<section className="orderPage">
<div className="orderPage_top mt-5 flex justify-between">
          <div className="orderPage_topl">
            <ul className="list flex gap-3">
              {
                filterData.map((item,index) => {
                  return (
                    <li className={filterIndex === item.label ? "active" : ""} key={index} onClick={() => handleFilter(item.label)}>{item.label.replaceAll("_"," ")}</li>
                  )
                })
              }
            </ul>
          </div>
          <div className="orderPage_topr flex gap-2">
          <div className="orderPage_toprBox">
              {/* <AntdSelect  /> */}
            </div>
            <div className="orderPage_toprBox">
          {/* <Datepickers datee={date} update={setDate} /> */}
            </div>
           
          </div>
        </div>
   {ProductList && <Tables data={ProductList[filterIndex]} update={setProductList} />}
   </section>
    </>
  )
}

export default Products 