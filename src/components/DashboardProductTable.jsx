import React, { useEffect, useState } from 'react';
import { Modal, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import usePost from '../customHooks/usePost';
import axios from 'axios';
import config from "../services/config.json";
import { toast } from 'react-toastify';
import { getTokenSession } from '../utils/common';
const DashboardProductTable = ({ data,update }) => {
  const [openRowData, setOpenRowData] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);


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

const product_name = createOptions(data, 'product_name');
const category_name = createOptions(data, 'category_name');
const price = createOptions(data, 'price');
const quantity_sold = createOptions(data, 'quantity_sold');
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
  const columns = [
    {
      key: 'product_name',
      title: 'Product',
      render: (_, record) => (
        <div className='productList'>
            <div className="productListImg">
                {/* <img src={record.attachment_urls[0]} alt='dfsd'  /> */}
            </div>
            <div className="productListtxt">
                {record?.product_name}
            </div>
        </div>
      ),
      filters: product_name,
      onFilter: (value, record) => String(record.product_name).includes(value),
      ellipsis: true,
    },
    {
      key: 'category_name',
      title: 'Category',
      dataIndex: 'category_name',
      filters: category_name,
      onFilter: (value, record) => String(record.category_name).includes(value),
      ellipsis: true,
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: 'price',
      filters: price,
      onFilter: (value, record) => String(record.price).includes(value),
      ellipsis: true,
    },
    {
      key: 'quantity_sold',
      title: 'Quantity Sold',
      dataIndex: 'quantity_sold',
       filters: quantity_sold,
      onFilter: (value, record) => String(record.quantity_sold).includes(value),
      ellipsis: true,
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
        <Link key={`edit-${record.id}`} to={`/${config.demo}products/edit/${record.id}`}>
          <img src={require("../dist/webImages/edit.png")} alt="" />
        </Link>
        <Link key={`delete-${record.id}`} onClick={() => handleDelete(record)}>
          <img src={require("../dist/webImages/delete.png")} alt="" />
        </Link>
         </div>
        </Space>
      ),
    },
  ];

  const keyDaata=data&&data.map(v=>{ return {key:v.top_selling_id,...v}})
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
          axios.get(`${config.apiEndPoint}dashboard/deleteProduct/${item?.top_selling_id}`)
          .then((response) => {
             let updateproductdata = data.filter((ites) => ites.top_selling_id !== item.top_selling_id);
          update(updateproductdata)
            swal(response.data.message, "", "success");
           
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
    <div className="tablereact rounded-sm my-5 border border-stroke  bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
     

      <Table scroll={{ x: 'max-content' }}  columns={columns} dataSource={keyDaata} />
    {openRowData &&   <Modal width={'70%'} title={openRowData?.product_name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <div className='w-5/12 tablereactSlider22'>
          <img src={openRowData?.product_image} alt={openRowData?.product_name} className='w-full h-52 object-cover'  />

  </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='venderview'>
                      <b>Product Name</b>
                      <br />
                      <span>{openRowData?.product_name}</span>
                    </div>
                   
                    <div className='venderview'>
                    <b>Category</b>
                      <br />
                      <span>{openRowData?.category_name}</span>  
                    </div>
                    <div className='venderview'>
                    <b>Price</b>
                      <br />
                      <span>{openRowData?.price}</span>  
                    </div>
                  
                    <div className='venderview'>
                    <b>Stock Quantity</b>
                      <br />
                      <span>{openRowData?.quantity_sold}</span>  
                    </div>
                </div>
              {openRowData?.product_detail &&  <div className='venderview '>
                      <b>Product Detail</b>
                      <br />
                      <span>{openRowData?.product_detail}</span>
                    </div>}

        </Modal>}
    </div>
  );
};

export default DashboardProductTable;
