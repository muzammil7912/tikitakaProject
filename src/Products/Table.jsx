import React, { useEffect, useState } from 'react';
import { Modal, Rate, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import config from "../services/config.json";
import { toast } from 'react-toastify';
import { getTokenSession } from '../utils/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
const Tables = ({ data,update }) => {
  const [openRowData, setOpenRowData] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyDaata, setKeyDaata] = useState([])
  useEffect(() => {
   if(data) {
    let AkeyDaata=  data.map(v=>{ return {key:v.id,...v}})
    setKeyDaata(AkeyDaata)
   }
  }, [data])

  function createOptions(datas, prop) {
    return Array.isArray(datas) && datas
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

const product_name = createOptions(keyDaata, 'product_name');
const category_name = createOptions(keyDaata, 'category_name');
const price = createOptions(keyDaata, 'price');
const product_stock = createOptions(keyDaata, 'product_stock');
const average_rating = createOptions(keyDaata, 'average_rating');



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
      title: 'Product Name',
      dataIndex: 'product_name',
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
      key: 'product_stock',
      title: 'Stock Quantity',
      dataIndex: 'product_stock',
       filters: product_stock,
      onFilter: (value, record) => String(record.product_stock).includes(value),
      ellipsis: true,
    },
    {
      key: 'average_rating',
      title: 'Average Rating',
       filters: average_rating,
      onFilter: (value, record) => String(record.average_rating).includes(value),
      ellipsis: true,
      render: (_, record) => (
        <Rate disabled  allowHalf defaultValue={record.average_rating} />
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
          axios.get(`${config.apiEndPoint}dashboard/deleteProduct/${item?.id}`)
          .then((response) => {
            swal(response.data.message, "", "success");
            axios.get(`${config.apiEndPoint}dashboard/productForVendor`)
            .then((response) => {
              update(response.data?.data)
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
    <div className="tablereact rounded-sm my-5 border border-stroke  bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
     {console.log("jskdfjbsafjfb")}

      <Table scroll={{ x: 'max-content' }}  columns={columns} dataSource={keyDaata} />
    {openRowData &&   <Modal width="70%" title={openRowData?.product_name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
<div className='w-5/12 tablereactSlider22'>


<Swiper
  onSlideChange={() => console.log('slide change')}
  onSwiper={(swiper) => console.log(swiper)}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  modules={[Autoplay]}
  className="tablereactSlider"
>
  {openRowData?.attachment_urls?.map((item, index) => (
    <SwiperSlide key={`slide-${index}`}>
      <img
        src={item}
        alt={`${openRowData?.product_name} - Image ${index + 1}`}
        className="w-full h-52 object-cover"
      />
    </SwiperSlide>
  ))}
</Swiper>

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
                      <span>{openRowData?.product_stock}</span>  
                    </div>
                    <div className='venderview'>
                    <b>Average Rating</b>
                      <br />
                      <span>{ <Rate disabled  allowHalf defaultValue={openRowData?.average_rating} />}</span>  
                    </div>
                    <div className='venderview'>
                    <b>Review Count</b>
                      <br />
                      <span>{openRowData?.review_count}</span>  
                    </div>
                    <div className='venderview'>
                    <b>Product Count</b>
                      <br />
                      <span>{openRowData?.shop_product_count}</span>  
                    </div>
                </div>
             { openRowData?.product_detail &&  <div className='venderview '>
                      <b>Product Detail</b>
                      <br />
                      <span>{openRowData?.product_detail}</span>
                    </div>}

        </Modal>}
    </div>
  );
};

export default Tables;
