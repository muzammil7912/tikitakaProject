import React from 'react';
import { Select } from 'antd';

const AntdSelect = () => {
const handleChange = (value) => {
};
    return(
    <Select
      defaultValue="Filters"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'jack',
          label: 'A-Z',
        },
      ]}
    />
    )
    };
export default AntdSelect;