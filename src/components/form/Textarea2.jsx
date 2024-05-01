import React from "react";
import { useField, useFormikContext } from "formik"

function Textarea2({ name,required, label, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
    <div className="inputfeild2 row mt-3">
      {label && (
        <div className="">
          <label htmlFor={name}>{label}</label>
        </div>
      )}
      <div  className="" >
        <textarea
          id={name}
          error={errors[name]}
          {...field}
          {...rest}
        ></textarea>
      </div>
    </div>
  );
}

export default Textarea2;