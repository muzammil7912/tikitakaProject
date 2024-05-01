import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import axios from "axios";
import config from "../../services/config.json";
import { getTokenSession } from '../../utils/common';
import { useNavigate } from "react-router-dom";

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = async (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      const newOptions = await fetchOptions(value); // Await the fetchOptions function
      if (fetchId !== fetchRef.current) {
        return; // Check for outdated fetch
      }
      setOptions(newOptions);
      setFetching(false);
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      showSearch
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

async function fetchUserList(username) {
  try {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${getTokenSession()}`,
    };
    const response = await axios.get(`${config.apiEndPoint}dashboard/globalSearch/${username}`);
    return Array.isArray(response.data?.data) ? response.data.data.map((item) => ({ label: `${item.name}`, value: item.id })) : [];
  } catch (error) {
    console.error("Error fetching user list:", error);
    return [];
  }
}

const SearchSelect = () => {
  const [value, setValue] = useState(null); // Change to null for single-select
  const navigate = useNavigate();
  return (
    <DebounceSelect
      value={value}
      placeholder="Search"
      fetchOptions={fetchUserList}
      onChange={(newValue) => {
          console.log(newValue,"dfjhgjkdhk")
          if (newValue) {
              navigate(`/${config.demo}products/edit/${newValue}`); // Assuming value has a 'value' property
            }
            setValue(newValue);
      }}
      style={{
        width: '10rem',
      }}
    />
  );
};

export default SearchSelect;
