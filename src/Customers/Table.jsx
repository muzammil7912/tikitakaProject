import React, { useEffect, useState } from 'react';
import { Modal, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import usePost from '../customHooks/usePost';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from "../services/config.json";
import { getTokenSession } from '../utils/common';

const Tables = ({ datass,update }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openRowData, setOpenRowData] = useState()
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

  function createOptions(data, prop) {
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

const name = createOptions(datass, 'name');
const email = createOptions(datass, 'email');


  const columns = [
    {
      key: 'profile_image',
      title: 'Profile',
      render: (_, record) => (
        <div className='vendercustomer flex  items-center gap-2'>
            <div className="vendercustomer_ flex">
               <img  className='object-cover' src={record.profile_image ?? require('../dist/webImages/noimage.jpg')} alt={record.id} onError={(e) => { e.target.src = require('../dist/webImages/noimage.jpg') }} />
            </div>
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
       filters: name,
      onFilter: (value, record) => String(record.name).includes(value),
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
       filters: email,
      onFilter: (value, record) => String(record.email).includes(value),
      ellipsis: true,
    },
  
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (

         <Space size="middle">
         <div className='flex items-center gap-3 tableaction'>
         <Link key={`view-${record.id}`} onClick={() => showModal(record)}>
                <img src={require("../dist/webImages/view.png")} alt="" />
            </Link>
            <Link key={`delete-${record.id}`}  onClick={() => handleDelete(record)}>
                <img src={require("../dist/webImages/delete.png")} alt="" />
            </Link>
         </div>
        </Space>
      ),
    },
  ];
  const keyDaata = datass&&datass.map(v=>{ return {key:v.id,...v}})
  const handleDelete = (item) => {
    let formdata = new FormData();
    formdata.append("id",item?.id)
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
            Authorization: `Bearer ${getTokenSession()}`,
          };
          axios.get(`${config.apiEndPoint}dashboard/deleteUser/${item.id}`)
          .then((response) => {
            swal(`${response.data.message}`, "", "success");

          })
          .catch((error) => {
            if (error.response?.status === 401)
              toast.error(error.response.data.message);
            else toast.error(error.response.data.errorMessage);
          });
          let updatevenderdata = datass.filter((ites) => ites.id !== item.id);
          update(updatevenderdata)
        }
     
      });
  };



  return (
    <div className="tablereact rounded-sm my-5 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
     

      <Table scroll={{ x: 'max-content' }}  columns={columns} dataSource={keyDaata} />

      {openRowData &&   <Modal title={openRowData?.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className='venderview'>
                    <b>Profile</b>
                    <div className=' flex  items-center gap-2'>
            <div className="vendercustomer_ flex">
            <img  className='object-cover' src={openRowData.profile_image ?? require('../dist/webImages/noimage.jpg')} alt={openRowData.user_id} onError={(e) => { e.target.src = require('../dist/webImages/noimage.jpg') }} />
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
                </div>
      </Modal>}
    </div>
  );
};

export default Tables;
