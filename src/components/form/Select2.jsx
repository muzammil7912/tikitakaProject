import { Field, useField } from 'formik';
import React from 'react'

function Select2({ name, required, label, selectList, Changes, firstSelect, custom_label_name, customer_value_name, ...rest }) {
  const [field] = useField(name);
  return (
    <div className={`inputfeild2 mt-3`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select  {...rest}    as="Field" name={name} id={name}>
          {firstSelect &&  <option  hidden>{firstSelect}</option>}
          {Array.isArray(selectList) &&  selectList.map((item,index) => {
            return (
                <option  value={item[customer_value_name]}  key={index}   >{item[custom_label_name] && item[custom_label_name].replace(/_/g, ' ')}</option>
            )
        })} 
           </select>
      </div>
    );
}

export default Select2