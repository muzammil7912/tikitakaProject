import React from 'react';
import { Space, Table, Tag } from 'antd';

const Tables = () => {
  const columns = [
    {
      title: 'Products',
      dataIndex: 'Products',
      key: 'Products',
    },
    {
      title: 'Order Value',
      dataIndex: 'OrderValue',
      key: 'OrderValue',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },
    {
      title: 'Order ID',
      dataIndex: 'OrderID',
      key: 'OrderID',
    },
    {
      title: 'Expected Delivery',
      dataIndex: 'ExpectedDelivery',
      key: 'ExpectedDelivery',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button className='btn btn-primary btn-ant'>Delete</button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
   
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
   
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
    {
      key: '1',
      Products: 'Ball Joint DELPHI TC918',
      OrderValue: `₹4306`,
      Quantity: '43',
      OrderID: '7535',
      ExpectedDelivery: '11/12/22',
      Status: 'Delayed',
    },
   
  ];

  return (
    <div className="rounded-sm my-5 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black">
      Products
      </h4>

      <Table scroll={{ x: 'max-content' }}  columns={columns} dataSource={data} />
    </div>
  );
};

export default Tables;
