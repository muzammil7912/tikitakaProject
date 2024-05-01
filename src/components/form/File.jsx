import { Field } from "formik";
import React, { useState, useEffect, useRef } from "react";
import upload from "../../dist/webImages/filedocumet.png";
import swal from "sweetalert";

function File({ typeFile, label, name, onUpload, value,shoplogo, ...rest }) {
  const ref = useRef(null)

  const [imgPath, setImgPath] = useState();
  useEffect(() => {
    if (typeof (value) === "object") {
      let path = (window.URL || window.webkitURL).createObjectURL(value);
      setImgPath(path);
    } else {

      if (value !== undefined)
        if (value.includes("http")) {
          setImgPath(value);
        }
        else {
          let path = ``
          setImgPath(path);
        }

      else {
        setImgPath(value);
      }
    }
  }, [value]);
  const handleDrop = (e) => {
    e.preventDefault();
      if(e.dataTransfer.files[0] && e.dataTransfer.files[0]?.type?.includes("image")) {
        let path = (window.URL || window.webkitURL).createObjectURL(e.dataTransfer.files[0]);
        setImgPath(path);
        const file = e.dataTransfer.files[0];
        onUpload(file);
        ref.current.classList.remove("mystyle")
      }
      else {
        swal("Only use Image", "", "warning");
      }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if(e.target.files[0]) {
      let path = (window.URL || window.webkitURL).createObjectURL(file);
      setImgPath(path);
      onUpload(file);
    }

    };



  return (

    <div className="inputGroup" onDragOver={(e) => {
      e.preventDefault();
      ref.current.classList.add("mystyle")
    }}
      onDrop={handleDrop}>
      <Field
        type="file"
        id={name}
        style={{ display: "none" }}
        name={name}
        onChange={(e) => handleUpload(e)}
        accept={typeFile ? typeFile : ''}
      />
      <div ref={ref} className="pictureUpload flex gap-2 items-center">
        <div className={`pictureUpload__left ${imgPath && "pictureUpload__left1" || upload && "pictureUpload__left2"}`}>
      <label htmlFor={name}>
     <img  src={imgPath || upload} alt="" /> 
      </label>
        </div>
        <div className="pictureUpload__right">
        {shoplogo ? shoplogo : <span>Upload <br /> Company Logo </span>}
        </div>
      </div>
    </div>
  );
}

export default File;
