import React, { useContext, useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { MyContext } from '../context/MyContext';
import useFetch from '../customHooks/useFetch';
import DashboardMessage from '../components/DashboardMessage';
import { MenuActive } from '../context/MenuActiveContext';

const InventoryReport = () => {
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
    <div className="h3 mb-2">Inventory Report:</div>
        <div className="reportssCard_">
            <div className="reportssCard_head grid grid-cols-3 gap-6">
            <div>Product</div>
                        <div>Current Stock</div>
                        <div>Reorder Level</div>
            </div>
            <div className="reportssCard_body mt-3">
              {rolePage && rolePage?.inventory_report.map((item) => {
                return (
                  <div className="reportssCard_bodyBox grid grid-cols-3 items-center gap-6 my-3">

                  <div className="reportssCard_bodyBox1 ">
                  {item.name}
                  </div>
                  <div className="reportssCard_bodyBox2 gree">
                  {item.current_stock}
                  </div>
                  <div className="reportssCard_bodyBox2 gree">
                  {item.order_level}
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

export default InventoryReport