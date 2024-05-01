import React, { useContext, useEffect, useState } from "react";
import Charts from "./components/Charts";
import DashboardMessage from "./components/DashboardMessage";
import useFetch from "./customHooks/useFetch";
import Loader from "./components/Loader";
import { Modal, Space, Table } from "antd";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { MyContext } from "./context/MyContext";
import config from "./services/config.json";
import { MenuActive } from "./context/MenuActiveContext";


const VenderDashboard = () => {
  const { rolesData } = useContext(MyContext);
  const {loading,data} = useFetch(`dashboard/dashboardData/${rolesData?.id}`)
  const [adminDashboard, setAdminDashboard] = useState("");
  const { setMunuActiv } = useContext(MenuActive);
  useEffect(() => {
    if(data) {
      setMunuActiv([true,"Dashboard"])
      setAdminDashboard(data.data)
    }
  }, [data,setMunuActiv])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
   
    {
      key: 'companyname',
      title: 'Name',
      dataIndex: 'companyname',
    },
    {
      key: 'contactperson',
      title: 'Contact Person',
      dataIndex: 'contactperson',
    },
    {
      key: 'phone',
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      key: 'products',
      title: 'Products',
      dataIndex: 'products',
    },
    {
      key: 'order',
      title: 'Order',
      dataIndex: 'order',
    },
    {
      key: 'address',
      title: 'Address',
      dataIndex: 'address',
    },
   
    {
      key: 'action',
      title: 'Action',
fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
         <div className='flex items-center gap-3 tableaction'>
            <Link onClick={showModal}>
                <img src={require("./dist/webImages/view.png")} alt="" />
            </Link>
            <Link to={`/${config.demo}vender/edit/1`}>
                <img src={require("./dist/webImages/edit.png")} alt="" />
            </Link>
            <Link onClick={() => handleDelete(record)}>
                <img src={require("./dist/webImages/delete.png")} alt="" />
            </Link>
         </div>
        </Space>
      ),
    },
  ];


  const handleDelete = (item) => {
    swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          swal("Deleted!", "", "success");
        }
      });
  };
  if(loading) return <Loader />;

  let topselling = adminDashboard.top_selling;
  let topselling2 = 0
  for (let index in topselling) {
    if(topselling[index])
    topselling2 += Number(topselling[index])
  }
  return (
    <>
   
    <DashboardMessage />
      <div className="dashboard2">
        <div className="dashboard2d grid grid-cols-4 mb-5 gap-3">
        <div className="dashboard2dBox bb1 grid items-center py-8 px-5">
          <div className="dashboard2dBox__left">
            <div className="h3">Orders</div>
            <div className="h4">{adminDashboard.orders}</div>
          </div>
          <div className="dashboard2dBox__right">
            <img src={require("./dist/webImages/dashboard/1.png")} alt="" />
          </div>
        </div>
        {/* close dashboard2dBox   */}
        <div className="dashboard2dBox bb2 grid items-center py-8 px-5">
          <div className="dashboard2dBox__left">
            <div className="dashboard2dBox__leftB grid items-center gap-2">
              <div className="dashboard2dBox__leftBimg">
                <img src={require("./dist/webImages/dashboard/4.png")} alt="" />
              </div>
              <div className="dashboard2dBox__leftBr">
            <div className="h3">New Customers</div>
            <div className="h4">{adminDashboard.users}</div>

              </div>
            </div>
          </div>
          <div className="dashboard2dBox__right">
            <img src={require("./dist/webImages/dashboard/2.png")} alt="" />
          </div>
        </div>
        {/* close dashboard2dBox   */}
        <div className="dashboard2dBox bb3 grid items-center py-8 px-5">
          <div className="dashboard2dBox__left">
            <div className="h3">Low Stocks</div>
            <div className="h4">{adminDashboard.stocks}</div>
          </div>
          <div className="dashboard2dBox__right">
            <img src={require("./dist/webImages/dashboard/3.png")} alt="" />
          </div>
        </div>
        {/* close dashboard2dBox   */}
        <div className="dashboard2dBox bb4 grid items-center py-8 px-5">
          <div className="dashboard2dBox__left">
            <div className="h3">Earnings</div>
            <div className="h4">AED {adminDashboard.earning}</div>
          </div>
        </div>
        {/* close dashboard2dBox   */}
        </div>
      
        <div className="grid dashboard2grid gap-6">
          <div className="card">
            <div className="card__top flex justify-between items-center">
              <div className="card__top-left">
              <div className="h2">Top Selling Products</div>
              <div className="h6 mt-2">{topselling2}</div>
              </div>
              {/* <div className="card__top-right">
                <Datepickers />
              </div> */}
            </div>
            <div className="card__bottom">
              <Charts dataa={adminDashboard.top_selling} />
            </div>
          </div>
          <div className="card card2 p-6">
          <div className="card2Box">
            <div className="card2BoxImg">
              <img src={adminDashboard?.brand_image} alt="" />
            </div>
            <h4>{adminDashboard?.brand_name}</h4>
          </div>
          <div className="card2Box2">
            <div className="card2Box2_">
              <span>Products</span>
              <p>{adminDashboard?.products}+</p>
            </div>
            <div className="card2Box2_">
              <span>Followers</span>
              <p>{adminDashboard?.shop_followers}</p>
            </div>
          </div>
          </div>
        </div>
      
      </div>
    </>
  );
};

export default VenderDashboard;
