import React, { useContext, useEffect, useState } from 'react';
import { Modal, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import usePost from '../customHooks/usePost';
import config from "../services/config.json";
import SkeletonLoader from '../components/form/SkeletonLoader';
import axios from 'axios';
import { getTokenSession } from '../utils/common';
import { toast } from 'react-toastify';
import { MyContext } from '../context/MyContext';

const Tables = ({ datass,update,classoff,tab,dashboard }) => {
  const { rolesData } = useContext(MyContext);
  const [keyDaata, setKeyDaata] = useState([])
  useEffect(() => {
   if(datass) {
    let AkeyDaata=  datass.map(v=>{ return {key:v.id,...v}})
    setKeyDaata(AkeyDaata)
   }
  }, [datass])
  
  const selectedd = {"new":"active","hold":"hold","request":"inactive"}
  const  tabdrop = [
    {
      label: "active"
    },
    {
      label: "inactive"
    },
    {
      label: "hold"
    },
    {
      label: "remove_hold"
    },
  ]
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openRowData, setOpenRowData] = useState();
    function createOptions(data, prop) {
      console.log(data)
      return Array.isArray(data) && data
          .map(item => ({ text: item[prop], value: item[prop] }))
          .filter(item => item.value !== null)
          .reduce((acc, curr) => {
              const existingObj = acc.find(item => item.value === curr.value);
              if (!existingObj) {
                  acc.push(curr);
              }
              return acc;
          }, []);
  }
  
  const name = createOptions(keyDaata, 'name');
  const email = createOptions(keyDaata, 'email');
  const city = createOptions(keyDaata, 'city');
  const phone = createOptions(keyDaata, 'phone');
  const address = createOptions(keyDaata, 'address');

    const showModal = (item) => {
      setOpenRowData(item)
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const [res, apiMethod] = usePost()
    const handlechange = (item,value) => {
      let formdata = new FormData();
      formdata.append("vendor_id",item.id)
      formdata.append("status",value)
      apiMethod(`changeVendorStatus`,formdata);
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${getTokenSession()}`,
      };
      axios.get(`${config.apiEndPoint}getVendor`)
      .then((response) => {
        toast.success(response.data.message);
        update(response.data?.data)
        })
        .catch((error) => {
          if (error.response?.status === 401)
            toast.error(error.response.data.message);
          else toast.error(error.response.data.errorMessage);
        });
    }


  let columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      filters: name,
      onFilter: (value, record) => String(record.name).includes(value),
      ellipsis: true,
    },
    {
      key: 'email',
      title: 'Email',
       filters: email,
      onFilter: (value, record) => String(record.email).includes(value),
      render: (_, record) => (
       <div className='emaillist'>{record.email}</div>
       ),
    },
    {
      key: 'city',
      title: 'City',
      dataIndex: 'city',
       filters: city,
      onFilter: (value, record) => String(record.city).includes(value),
      ellipsis: true,
    },
    {
      key: 'logo',
      title: 'Logo',
      render: (_, record) => (
        <div className='vendercustomer flex  items-center gap-2'>
            <div className="vendercustomer_ flex">
               <img  className='object-cover' src={record.logo} alt={record.user_id} onError={(e) => { e.target.src = require('../dist/webImages/noimage.jpg') }} />
            </div>
        </div>
      ),
    },
    {
      key: 'phone',
      title: 'Phone',
      dataIndex: 'phone',
       filters: phone,
      onFilter: (value, record) => String(record.phone).includes(value),
      ellipsis: true,
    },
    {
      key: 'address',
      title: 'Address',
      dataIndex: 'address',
       filters: address,
      onFilter: (value, record) => String(record.address).includes(value),
      ellipsis: true,
    },
    {
      key: 'status',
      title: 'Status',
      render: (_, record) => (
        <select value={selectedd[tab]} onChange={(e) => handlechange(record,e.target.value)}  className='form-control'>
           {tabdrop.map((item) => {
             return (
               <option key={item.label} value={item.label}>{item.label.replaceAll("_"," ")}</option>
             )
           })}
        </select>
       ),
    },
    {
      key: 'action',
      title: 'Action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
         <div className='flex items-center gap-3 tableaction'>
         <Link key={`view-${record.id}`} onClick={() => showModal(record)}>
                <img src={require("../dist/webImages/view.png")} alt="" />
            </Link>
            <Link key={`edit-${record.id}`} to={`/${config.demo}vendor/edit/${record.user_id}`}>
                <img src={require("../dist/webImages/edit.png")} alt="" />
            </Link>
            <Link key={`delete-${record.id}`}  onClick={() => handleDelete(record)}>
                <img src={require("../dist/webImages/delete.png")} alt="" />
            </Link>
         </div>
        </Space>
      ),
    },
  ];


  const handleDelete = (item) => {
    let formdata = new FormData();
    formdata.append("id",item?.id)
    let aaa = dashboard ? `dashboard/superAdminDashboardData/${rolesData.id}` 
    : `getVendor`
    swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          axios.defaults.headers = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${getTokenSession()}`,
          };
          axios.get(`${config.apiEndPoint}deleteVendor/${item?.id}`)
          .then((response) => {
            toast.success(response.data.message);
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${getTokenSession()}`,
            };
            axios.get(`${config.apiEndPoint}${aaa}`)
            .then((responses) => {
              update(responses.data?.data)
              })
              .catch((error) => {
                if (error.response?.status === 401)
                  toast.error(error.response.data.message);
                else toast.error(error.response.data.errorMessage);
              });
            })
            .catch((error) => {
              if (error.response?.status === 401)
                toast.error(error.response.data.message);
              else toast.error(error.response.data.errorMessage);
            });
         
        }
     
      });
  };
  return (
    <div className={classoff ? "" : "tablereact rounded-sm my-5 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"}>
     

    {res.isLoading ?  <SkeletonLoader valuee={6} />:  
    <Table scroll={{ x: 'max-content' }}  columns={columns} dataSource={keyDaata} />
    }


    {openRowData &&   <Modal title={openRowData?.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className='venderview'>
                    <b>Logo</b>
                    <div className=' flex  items-center gap-2'>
            <div className="vendercustomer_ flex">
            <img  className='object-cover' src={openRowData.logo} alt={openRowData.user_id} onError={(e) => { e.target.src = require('../dist/webImages/noimage.jpg') }} />
            </div>
        </div>
                    </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='venderview'>
                      <b>Name</b>
                      <br />
                      <span>{openRowData?.name}</span>
                    </div>
                    <div className='venderview'>
                    <b>Email</b>
                      <br />
                      <span>{openRowData?.email}</span>  
                    </div>
                    <div className='venderview'>
                    <b>City</b>
                      <br />
                      <span>{openRowData?.city}</span>  
                    </div>
                  
                    <div className='venderview'>
                    <b>Phone</b>
                      <br />
                      <span>{openRowData?.phone}</span>  
                    </div>
                    <div className='venderview'>
                    <b>Address</b>
                      <br />
                      <span>{openRowData?.address}</span>  
                    </div>
                    <div className='venderview'>
                    <b>Vat Number</b>
                      <br />
                      <span>{openRowData?.vat_number}</span>  
                    </div>
                </div>
      </Modal>}
    </div>
  );
};

export default Tables;
