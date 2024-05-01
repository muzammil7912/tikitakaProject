import React, { useState } from 'react';
import { Image, Modal, Upload } from 'antd';
import upload2 from "../../dist/webImages/filedocumet.png";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadProduct = ({filelis,updatess}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => updatess(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
      className='w-full h-full'
    >
     <div className="pictureUpload__left">
     <img  src={upload2} alt="" /> 
     </div>
    </button>



  );
  return (
    <>
    <div className='puplo flex items-center gap-3'>
        <div>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={filelis}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {filelis.length >= 3 ? null : uploadButton}
      </Upload>
     
      </div>
      <div>
      <span className='font-medium'>Upload <br /> Product Images</span>
      <br />
      <small>At least 3 images must be uploaded</small>
      </div>
      </div>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default UploadProduct;