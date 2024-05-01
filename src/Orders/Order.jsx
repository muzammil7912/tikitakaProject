import React, { useContext, useEffect, useState } from "react";
import Tables from "./Tables";
import DashboardMessage from "../components/DashboardMessage";
import useFetch from "../customHooks/useFetch";
import Loader from "../components/Loader";
import { MenuActive } from "../context/MenuActiveContext";

const Order = () => {
  const {loading:loading,data:data,error:error1} = useFetch("dashboard/viewOrders");
  const [orderData, setOrderData] = useState("")
  const { setMunuActiv } = useContext(MenuActive);
  const [allorder, setAllorder] = useState([])
  useEffect(() => {
    setMunuActiv([true,"Orders"])
    if(data) {
      setOrderData(data)
    }
  }, [data])


  const [filterIndex, setFilterIndex] = useState("created")
  const filterData = [
    // {
    //   label: "All Orders"
    // },
    {
      label: "created"
    },
    {
      label: "delivered"
    },
    {
      label: "processing"
    },
    {
      label: "rejected"
    },
  ];

  const handleFilter = (item) => {
    setFilterIndex(item)
  }

    if(loading) {
      return <Loader />;
  }

  return (
    <>
     <DashboardMessage />
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
        <div className="orderPage_bottom">
         {orderData?.orders ? <Tables tabname={filterIndex} statusOption={filterData} data={filterIndex === "All Orders" ?  allorder : orderData?.orders[filterIndex]} update={setOrderData} />
         
        :
        
        <> <br /><br /><h4>{orderData.message}</h4></>
        }
        </div>
      </div>
    </>
  );
};

export default Order;
