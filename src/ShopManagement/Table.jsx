import React, { useEffect, useState } from 'react';
import { Modal, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import usePost from '../customHooks/usePost';
import config from "../services/config.json";
import SkeletonLoader from '../components/form/SkeletonLoader';
import axios from 'axios';
import { getTokenSession } from '../utils/common';
import { toast } from 'react-toastify';

const Tables = ({ datass,update,classoff,tab }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openRowData, setOpenRowData] = useState();
    function createOptions(data, prop) {
      return data
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
  
  const name = createOptions(datass, 'name');
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
      key: 'action',
      title: 'Action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
         <div className='flex items-center gap-3 tableaction'>  
            <Link key={`edit-${record.id}`} to={`/${config.demo}shop/edit/${record.id}`}>
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


  const keyDaata=datass&&datass.map(v=>{ return {key:v.id,...v}})
  const handleDelete = (item) => {
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
              axios.get(`${config.apiEndPoint}dashboard/deleteShop/${item.id}`)
              .then((response) => {
                if (response.data.status === "false") {
                  toast.error(response.data.message);
                } else {
                  toast.success(response.data.message);
                  let updatevenderdata = datass.filter((ites) => ites.id !== item.id);
                  update(updatevenderdata)
                  swal("Deleted!", "", "success");
                  }
                })
                .catch((error) => {
                  if (error.response?.status === 401)
                    toast.error(error.response.data.message);
                  else toast.error(error.response.data.errorMessage);
                })


        
        }
     
      });
  };
  

  return (
    <div className={classoff ? "" : "tablereact rounded-sm my-5 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"}>
     

    {  <Table scroll={{ x: 'max-content' }}
    
    columns={columns} dataSource={keyDaata} />}

    </div>
  );
};

export default Tables;
