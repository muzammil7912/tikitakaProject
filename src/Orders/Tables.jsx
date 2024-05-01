import React, { useEffect, useState } from 'react';
import { Modal, Space, Table, Tag } from 'antd';
import { status } from '../data/alldata';
import { Link } from 'react-router-dom';
import usePost from '../customHooks/usePost';
import SkeletonLoader from '../components/form/SkeletonLoader';
import axios from 'axios';
import config from "../services/config.json";
import { toast } from 'react-toastify';
import { getTokenSession } from '../utils/common';

const Tables = ({data,tabname,statusOption,update}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openRowData, setOpenRowData] = useState();
  function createOptions(datas, prop) {
    if(datas) {

      return datas
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
    else {
      return []
    }
}

const customer_name = createOptions(data, 'customer_name');
const order_date = createOptions(data, 'order_date');

const [res, apiMethod] = usePost()
const [loading, setLoading] = useState(false)
const handlechange = (item,value) => {
  if(value === "created") {

  }
  else {
    setLoading(true)
    let formdata = new FormData();
    formdata.append("order_id",item.id)
    formdata.append("status",value)
    apiMethod(`changeOrderStatus`,formdata);
  }
  

  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${getTokenSession()}`,
  };
  axios.get(`${config.apiEndPoint}dashboard/viewOrders`)
  .then((response) => {
    toast.success(response.data.message);
    update(response.data)
    setLoading(false)
    })
    .catch((error) => {
      if (error.response?.status === 401)
        toast.error(error.response.data.message);
      else toast.error(error.response.data.errorMessage);
    });
}


useEffect(() => {
  if(res.data) {
    toast.success(res.data.message);
  }
      }, [res.data])
  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
       filters: customer_name,
      onFilter: (value, record) => String(record.customer_name).includes(value),
      ellipsis: true,
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
       filters: order_date,
      onFilter: (value, record) => String(record.order_date).includes(value),
      ellipsis: true,
    },
    {
      title: 'Order Status',
      key: 'orderstatus',
      render: (_, record) => (
        <>
        
      {tabname === "delivered" ?
     <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{tabname.toUpperCase()}</span>
      : <select className='orderselect' value={tabname} onChange={(e) => handlechange(record,e.target.value)}>
      {statusOption.map((item) => {
        return (
          <React.Fragment key={item.label}>
         {item.label === "created" ? 
         <option  value={item.label} disabled>{item.label}</option>
         : <option  value={item.label} >{item.label}</option>
        }
          </React.Fragment>
        )
      })}
       </select>}
      </>
      ),
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Preview',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Link key={`view-${record.id}`} onClick={() => showModal(record)}>
        <img src={require("../dist/webImages/view.png")} alt="" />
    </Link>
      ),
    },
  ];

  const keyDaata = data&&data.map(v=>{ return {key:v.id,...v}})

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

  return (
    <div className="tablereact rounded-sm my-5 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
     

  {(res.isLoading || loading) ?  <SkeletonLoader valuee={6} />:   <Table scroll={{ x: 'max-content' }}  columns={columns} dataSource={keyDaata} />}



      
  {openRowData &&   <Modal title={openRowData?.customer_name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='venderview'>
                      <b>Name</b>
                      <br />
                      <span>{openRowData?.customer_name}</span>
                    </div>
                    <div className='venderview'>
                    <b>Order Date</b>
                      <br />
                      <span>{openRowData?.order_date}</span>  
                    </div>
                    <div className='venderview'>
                    <b>Total Amount</b>
                      <br />
                      <span>{openRowData?.total_amount}</span>  
                    </div>
                    <div className='venderview'>
                    <b>Status</b>
                      <br />
                      <span className="bg-gray-100 uppercase text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{tabname}</span>
                    </div>
               
                </div>
      </Modal>}
    </div>
  );
};

export default Tables;
