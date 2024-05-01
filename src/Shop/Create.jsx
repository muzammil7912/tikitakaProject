import { Field, Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react';
import * as yup from "yup";
import FormControl from '../components/form/FormControl';
import { MenuActive } from '../context/MenuActiveContext';
import File from '../components/form/File';
import SubmitButton from '../components/SubmitButton';

import upload from "../dist/webImages/filedocumet.png";
import useFetch from '../customHooks/useFetch';
import Loader from '../components/Loader';
import { MyContext } from '../context/MyContext';
import usePost from '../customHooks/usePost';
import { toast } from 'react-toastify';

const ShopCreate = () => {
  const { rolesData } = useContext(MyContext);
    const {loading:loading,data:data,error:error} = useFetch(`dashboard/editShop/${rolesData?.shop_id}`)
    const { setMunuActiv } = useContext(MenuActive);
    const [dataShop, setDataShop] = useState("")
    const [image, setImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [imgPath2, setImgPath2] = useState();
    const [loadingg, setLoadingg] = useState(true)
    useEffect(() => {
        setMunuActiv([true,"Shop"])
        if(data) {
          setDataShop(data?.data)
          setCoverImage(data?.data[0]?.cover)
          setImage(data?.data[0]?.logo)
          setImgPath2(data?.data[0]?.cover)
          setLoadingg(false)
        }
        if(rolesData?.shop_id) {
          
        }
        else {
          setLoadingg(false)
        }
    
      }, [setMunuActiv,data])



    const handleUpload2 = (e) => {
        const file = e.target.files[0];
        if(e.target.files[0]) {
          let path = (window.URL || window.webkitURL).createObjectURL(file);
          setImgPath2(path);
          setCoverImage(file);
        }
    
    }
    const [res, apiMethod] = usePost()
    const validationSchema = yup.object({
        name: yup.string().required(),
    })
    const handleSubmit = (values) => {
        let formdata = new FormData();

        formdata.append("name",values.name)
        formdata.append("logo",image)
        formdata.append("cover",coverImage)
        formdata.append("vendor_id",rolesData?.id)
        if(dataShop.length > 0) {
            apiMethod(`dashboard/updateShop/${rolesData?.shop_id}`,formdata);
        }
        else {
            apiMethod(`dashboard/storeShop`,formdata);
        }
    }
    useEffect(() => {
     if(res.data) {
      toast.success(res.data.message);
      window.location.reload(); 
     }
    }, [res.data])
    
    if(loadingg) return <Loader />;
    const initialValues = {
        name: dataShop[0] && dataShop[0].name,
    }
    return (
        <div className='SignInPage '>
          <div  className="arrowArrow flex items-center  gap-2">
            <img src={require("../dist/webImages/arrow-left2.png")} alt="" />
            <span>Shop</span>
          </div>
          <br />
          <br />
          
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
        >
            <Form name="myForm">
            <div className='shopcover'>
                        <label htmlFor='cover'>
                    <Field
        type="file"
        id={"cover"}
        style={{ display: "none" }}
        name={"cover"}
        onChange={(e) => handleUpload2(e)}
        accept="image/*"
      />
            
            <img src={imgPath2 || upload} alt="" />
           {!imgPath2 && <div className='uploadd'> Upload Cover Image</div>}
            </label>
          </div>

          <br />
            <File
                    label={"Logo"}
                    value={image}
                    onUpload={setImage}
                    name={"logo"}
                    typeFile="image/*"
                    shoplogo={<span>  Upload <br /> Shop Logo</span>}
                  />
                  <br />
          <div className="SignInPage__rightBox grid grid-cols-2 gap-5">
            <FormControl
                    name="name"
                    placeholder="Name"
                    label={"Name"}
                    className="w-full"
                    control="input"
                    />
                    </div>

                  
                    <SubmitButton
                props={{
                  class: "btn btn-primary  block mt-5 submit",
                  text: "Submit",
                }}
               buttonLoading={res.isLoading}
              />
             
            </Form>
        </Formik>

        </div>
    )
}

export default ShopCreate