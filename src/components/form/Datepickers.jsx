import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const Datepickers = ({datee,update}) => (
  <Space direction="vertical" size={12}>
    <RangePicker  onChange={(item,date) => console.log(item,date)} style={{
        width: 200,
      }} />
  </Space>
);
export default Datepickers;