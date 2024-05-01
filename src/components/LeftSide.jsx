import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { Menu } from 'antd';
import { getTokenSession, removeTokenSession } from '../utils/common';
import { toast } from 'react-toastify';
import config from "../services/config.json";
import axios from 'axios';
import { MenuActive } from '../context/MenuActiveContext';
import { FaChevronRight } from 'react-icons/fa6';
function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  
  }
  
  
const LeftSide = ({roles}) => {
  const { munuActiv } = useContext(MenuActive);
  const navigate = useNavigate();
  
    const [openKeys, setOpenKeys] = useState([]);
    const [navactive, setNavactive] = useState(false)
    const rootSubmenuKeys = ['Dashboard', 'VendorManagement', 'Orders', 'Products', 'Customers', 'Reports', 'Settings', 'Shop', 'sub10', 'sub11', 'sub12', 'sub13', 'sub14', 'sub15', 'sub16', 'sub17'];
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => Number(openKeys.indexOf(key)) === -1);
        if (Number(rootSubmenuKeys.indexOf(latestOpenKey)) === -1) {
          setOpenKeys(keys);
        } else {
          setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
      };
      let  VendorManagement;
      let  ProductManagement;
      let  OrderManagement;
      let  Orders ;
      let  Shop;
      let  Products ;
      let  Customers ;
      let  Reports ;
      let  Settings ;
      let  Analytics;
      let  ShopManagement;
    let  dashboard =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}dashboard`}>Dashboard</Link>, 'Dashboard')
    if(roles?.role === "vendor") {
      
      Orders =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}order/list`}>Order</Link>, 'Orders')
      Products =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}product/list`}>Products</Link>, 'Products')
      Customers =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}customers`}>Customers</Link>, 'Customers')
      Reports =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}report`}>Reports</Link>, 'Reports')
      Shop =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}shop`}>Shop</Link>, 'Shop')
      
    }
    if(roles?.role === "admin") {
      VendorManagement  =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}vendor/list`}>Vendor Management</Link>, 'VendorManagement')
      ProductManagement  =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}product/list`}>Product Management</Link>, 'ProductManagement')
      OrderManagement  =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}order/list`}>Order Management</Link>, 'OrderManagement')
      ShopManagement  =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}shop/list`}>Shop Management</Link>, 'ShopManagement')
    Analytics =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}report`}>Reports & Analytics</Link>, 'Reports')
    }
    Settings =   getItem(<Link onClick={() => setNavactive(false)} to={`/${config.demo}setting`}>Settings</Link>, 'Settings')
   const items = [
        dashboard,
        Orders,
        Shop,
        ShopManagement,
        Products,
        Customers,
        Reports,
        VendorManagement,
        ProductManagement,
        OrderManagement,
        Analytics,
        Settings,
    ];
    const handleLogout = (e) => {
      e.preventDefault();
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${getTokenSession()}`,
      };
      axios.get(`${config.apiEndPoint}Adminlogout`)
      .then((response) => {
        if (response.data.status === "false") {
        } else {
          toast.success(response.data.message);
          }
        })
        .catch((error) => {
          if (error.response?.status === 401)
            toast.error(error.response.data.message);
          else toast.error(error.response.data.errorMessage);
        });
      removeTokenSession();
      navigate(`/${config.demo}login`);
    }

    const handleNav = () => {
      setNavactive(!navactive)
    }
    
  return (
    <>
    <div className={`dashboard__left ${navactive ? "active" : ""}`}>
      <div className='dashboard__leftNav' onClick={handleNav}><FaChevronRight /> </div>
        <div className="dashboard__leftlogo">
            <Link className='flex gap-2 items-center px-4' onClick={() => setNavactive(false)} to={`/${config.demo}`}>
                <img src={require("../dist/webImages/logo2.png")} alt="logo" />
                <span>TIKITAKA </span>
            </Link>
        </div>

        <nav>
            <ul className='list'>
          {munuActiv[0] &&   <Menu
              defaultSelectedKeys={[munuActiv[1]]}
              defaultOpenKeys={[munuActiv[1]]}
              mode="inline"
              theme="light"
              items={items}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              />
              }
            </ul>
        </nav>
        <div className="dashboard__leftbottom">
            <ul >
               <li><Link className='flex items-center gap-4'  to={""} onClick={handleLogout}> <AiOutlineLogout  /> Log Out  </Link></li>
            </ul>
        </div>

    </div>
    </>
  )
}

export default LeftSide