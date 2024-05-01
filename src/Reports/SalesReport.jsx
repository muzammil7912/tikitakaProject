import React, { useContext, useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { MyContext } from '../context/MyContext';
import useFetch from '../customHooks/useFetch';
import DashboardMessage from '../components/DashboardMessage';
import { MenuActive } from '../context/MenuActiveContext';

const SalesReport = () => {
    const { rolesData } = useContext(MyContext);
    const { setMunuActiv } = useContext(MenuActive);

    useEffect(() => {
      setMunuActiv([true,"Reports"])
  
    }, [])
    const {loading,data} = useFetch(`dashboard/vendorReportData/${rolesData.role_id}`);
    const [rolePage, setrolePage] = useState("")
  
    useEffect(() => {
      if(data) {
  
        setrolePage(data.data)
      }
    }, [data])
    
  
    if(loading || !rolePage) return <Loader />;
  return (
    <>
     <DashboardMessage    />
    <div className='reportss'>
    <div className="reportssCard py-6 px-7">
        <div className="h3 mb-2">Sales Report:</div>

        <div className="reportssCard_">
            <div className="reportssCard_head grid grid-cols-3 gap-6">
                <div>Product</div>
                <div>Quantity Sold</div>
                <div>Total Sales (AED)</div>
            </div>
            <div className="reportssCard_body mt-3">
              {rolePage && rolePage?.sales_report.map((item) => {
                return (
                  <div className="reportssCard_bodyBox grid grid-cols-3 items-center gap-6 my-3">

                  <div className="reportssCard_bodyBox1 ">
                  {item.name}
                  </div>
                  <div className="reportssCard_bodyBox2 gree">
                  {item.total_units_sold}
                  </div>
                  <div className="reportssCard_bodyBox2 gree">
                  {item.total_revenue}
                  </div>
              </div>
                )
              }) }
              
                
            </div>
        </div>

        </div>
    </div>
    </>
  )
}

export default SalesReport