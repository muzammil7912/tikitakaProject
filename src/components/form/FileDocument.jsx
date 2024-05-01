import { useField, useFormikContext } from 'formik';
import React from 'react'

const FileDocument = ({ name,required, label,update,updateValue, ...rest }) => {
  const { errors } = useFormikContext();
  const [field] = useField(name);
const handleFileInputChange = (e) => {
  const selectedFile = e.target.files[0];
  update(selectedFile)
}
  return (
   <div className='fileDocumet mt-3 flex gap-3 items-center py-3 px-5'>
    <input type="file" {...rest}  onChange={handleFileInputChange} />
    <div className="fileDocumet__left">
    <img src={require("../../dist/webImages/filedocumet.png")} alt="" />
    </div>
    <div className="fileDocumet__right">
   {updateValue?.name ? updateValue.name : updateValue ? updateValue.split("/")[updateValue?.split("/").length -1] : "Upload Documents for verification"}
    </div>
   </div>
  )
}

export default FileDocument