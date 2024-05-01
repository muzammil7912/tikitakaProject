    import React, { useContext, useEffect, useState } from "react";
import {  Route, Routes, useNavigate } from "react-router-dom";
import VenderDashboard from "./VenderDashboard";
import LeftSide from "./components/LeftSide";
import Profile from "./User/Profile";
import Roles from "./Roles";
import Order from "./Orders/Order";
import Products from "./Products/Products";
import Customers from "./Customers/Customers";
import Reports from "./Reports/Reports";
import CreateProduct from "./Products/CreateProduct";
import Setting from "./Setting/Setting";
import VenderCreate from "./VendorManagement/VenderCreate";
import {  getTokenSession } from "./utils/common";
import EditProduct from "./Products/EditProduct";
import VenderList from "./VendorManagement/VenderList";
import VenderEdit from "./VendorManagement/VenderEdit";
import EditCustomers from "./Customers/EditCustomers";
import Analytics from "./Analytics/Analytics";
import useFetch from "./customHooks/useFetch";
import Loader from "./components/Loader";
import SuperAdminDashboard from "./SuperAdminDashboard";
import ProductManagement from "./ProductManagement/ProductManagement";
import { MyContext } from "./context/MyContext";
import SalesReport from "./Reports/SalesReport";
import config from "./services/config.json";
import { MenuActive } from "./context/MenuActiveContext";
import InventoryReport from "./Reports/InventoryReport";
import ShopCreate from "./Shop/Create";
import ShopManagementList from "./ShopManagement/ShopManagementList";
import EditShop from "./ShopManagement/EditShop";
import NoShopDAshboard from "./NoShopDAshboard";
const Dashboard = () => {
  const [rolesData, setRolesData] = useState("");
  const [munuActiv, setMunuActiv] = useState([false,"Dashboard"]);
  const {loading,data} = useFetch("AdminProfile")
  const navigate = useNavigate();
  useEffect(() => {
    if(!getTokenSession()) {
      navigate(`/${config.demo}login`)
    }
  }, [navigate])
  useEffect(() => {
    if(data) {
      setRolesData(data.data)
    }
    }, [data])

    if(loading) return <Loader />;
    
  return (
    <>
     <MyContext.Provider value={{ rolesData, setRolesData }}>
     <MenuActive.Provider value={{ munuActiv, setMunuActiv }}>
      {rolesData &&  <div className="dashboard flex">
        <LeftSide roles={rolesData} />
        <div className="dashboard__right">
          <div className="dashboard__Body">
            
            <Routes>
           
            {rolesData?.role === "vendor" &&  
    <>
       {
       rolesData?.shop_id ? 
       <Route path={`/*`} element={<VenderDashboard rolesDataa={rolesData} />}  />
      :
      <Route path={`/*`} element={<NoShopDAshboard />}  /> 
      }
        <Route path={`/customers`} element={<Customers rolesDataa={rolesData} />}  />
        <Route path={`/customer/edit/:id`} element={<EditCustomers rolesDataa={rolesData} />}  />
        <Route path={`/product/list`} element={<Products rolesDataa={rolesData} />}  />
        <Route path={`/report`} element={<Reports rolesDataa={rolesData} />}  />
        <Route path={`/sales/report`} element={<SalesReport rolesDataa={rolesData} />}  />
        <Route path={`/inventory/report`} element={<InventoryReport rolesDataa={rolesData} />}  />
        <Route path={`/shop`} element={<ShopCreate />}  />

        {
       rolesData?.shop_id ? 
       <Route path={`/products/create`} element={<CreateProduct rolesDataa={rolesData} />}  />
      :
      <Route  path={`/products/create`} element={<NoShopDAshboard />}  /> 
      }
    </>
}
{rolesData?.role === "admin" &&  
    <>
        <Route path={`/*`} element={<SuperAdminDashboard rolesDataa={rolesData} />}  />
        <Route path={`/vendor/list`} element={<VenderList rolesDataa={rolesData} />}  />
        <Route path={`/vendor/create`} element={<VenderCreate rolesDataa={rolesData} />}  />
        <Route path={`/vendor/edit/:id`} element={<VenderEdit rolesDataa={rolesData} />}  />
        <Route path={`/report`} element={<Analytics rolesDataa={rolesData} />}  />
    <Route path={`/product/list`} element={<ProductManagement rolesDataa={rolesData} />}  />
    <Route path={`/shop/list`} element={<ShopManagementList />}  />
    <Route path={`/shop/edit/:id`} element={<EditShop />}  />
    </>
}
 
                <Route path={`/profile`} element={<Profile rolesDataa={rolesData} />}  />
              <Route path={`/products/edit/:id`} element ={<EditProduct rolesDataa={rolesData} />}  />
              <Route path={`/role`} element={<Roles rolesDataa={rolesData} />}  />
              <Route path={`/setting/`} element={<Setting rolesDataa={rolesData} />}  />
<Route path={`/order/list`} element={<Order rolesDataa={rolesData} />}  />
            </Routes>
          </div>
        </div>
      </div>}
      </MenuActive.Provider>
      </MyContext.Provider>
    </>
  );
};

export default Dashboard;
