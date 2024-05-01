import React, { useRef } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { IoEyeOutline } from "react-icons/io5";

function Password({ name,required,mustrequried, label , ...rest}) {
  const ref = useRef(0);
  let showPassword = false
  const hidePass = (e) =>{
    ref.current.type = "password"
    showPassword = false
  }
  const showPass = (e)=>{
  ref.current.type = "text"
    showPassword = true
  }
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
    <>
    <div className="inputfeild mt-3">
       <label htmlFor={name}  className="mb-1 block">{label}</label>
      <div className="password">
        <input
          id={name}
          error={errors[name]}
          autoComplete="off"
          ref={ref}
          type="password" 
          {...field}
          {...rest}
          />
        <span>
        <IoEyeOutline color={"#cdcdcd"}  onClick={(e)=> !showPassword ? showPass(e) : hidePass(e)}  />
        </span>
      </div>
    </div>
    {mustrequried && <p className="mustrequried">Must be at least 8 characters.</p>}
    {  <div className='my-1'>
      <ErrorMessage name={name}>
                  {(msg) => (
                    <div style={{ color: "red", whiteSpace: "nowrap" }}>
                      {msg}
                    </div>
                  )}
        </ErrorMessage>
      </div>}
          </>
  );
}

export default Password;
