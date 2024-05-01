import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardMessage from '../components/DashboardMessage'
import useFetch from '../customHooks/useFetch'
import { MyContext } from '../context/MyContext'
import Loader from '../components/Loader'
import { MenuActive } from '../context/MenuActiveContext'
import config from "../services/config.json";

const Reports = () => {
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
  

  if(loading && !rolePage) return <Loader />;
  return (
  <>
   <DashboardMessage />
    <div className="dashboard2d grid grid-cols-4 mb-5 gap-3">
        <div className="dashboard2dBox bb1 grid items-center py-8 px-5 gap-3">
          <div className="dashboard2dBox__left">
            <div className="h3">Sales</div>
            <div className="h4">{rolePage.sales}</div>
          </div>
          <div className="dashboard2dBox__right">
            <img src={require("../dist/webImages/dashboard/1.png")} alt="" />
          </div>
        </div>
        {/* close dashboard2dBox   */}
        <div className="dashboard2dBox bb1 grid items-center py-8 px-5 gap-3">
          <div className="dashboard2dBox__left">
            <div className="h3">Cost of Goods Sold</div>
            <div className="h4">{rolePage.cost_of_goods_sold}</div>
          </div>
          <div className="dashboard2dBox__right">
            <img src={require("../dist/webImages/dashboard/1.png")} alt="" />
          </div>
        </div>
        {/* close dashboard2dBox   */}
        <div className="dashboard2dBox bb1 grid items-center py-8 px-5 gap-3">
          <div className="dashboard2dBox__left">
            <div className="h3">Expenses</div>
            <div className="h4">{rolePage.expenses}</div>
          </div>
          <div className="dashboard2dBox__right">
            <img src={require("../dist/webImages/dashboard/1.png")} alt="" />
          </div>
        </div>
        {/* close dashboard2dBox   */}
        <div className="dashboard2dBox bb4 grid items-center py-8 px-5 gap-3">
          <div className="dashboard2dBox__left">
            <div className="h3">Profit</div>
            <div className="h4">{rolePage.profit}</div>
          </div>
        </div>
        {/* close dashboard2dBox   */}
        </div>


        <div className='reportss grid grid-cols-2 gap-5'>
            <div className="reportssCard py-6 px-7">
                <div className="h3 mb-2">Sales Report:</div>

                <div className="reportssCard_">
                    <div className="reportssCard_head grid grid-cols-3 gap-6">
                        <div>Product</div>
                        <div>Quantity Sold</div>
                        <div>Total Sales (AED)</div>
                    </div>
                    <div className="reportssCard_body mt-3">
                      {rolePage && rolePage?.sales_report.slice(0, 5).map((item) => {
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

                <Link className='viewall flex gap-2 items-center' to={`/${config.demo}sales/report`}> <span>View all</span> <img src={require("../dist/webImages/keyboard_backspace.png")} alt="" /> </Link>

            </div>
            {/* close reportssCard  */}
            <div className="reportssCard py-6 px-7">
                <div className="h3 mb-2">Inventory Report:</div>

                <div className="reportssCard_">
                    <div className="reportssCard_head grid grid-cols-3 gap-6">
                        <div>Product</div>
                        <div>Current Stock</div>
                        <div>Reorder Level</div>
                    </div>
                    <div className="reportssCard_body mt-3">

                    {rolePage && rolePage?.inventory_report.slice(0, 5).map((item) => {
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
                <Link className='viewall flex gap-2 items-center' to={`/${config.demo}inventory/report`}> <span>View all</span> <img src={require("../dist/webImages/keyboard_backspace.png")} alt="" /> </Link>

            </div>
        </div>
  
  
  </>
  )
}

export default Reports