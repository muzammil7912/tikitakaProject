import { Field, Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react';
import * as yup from "yup";
import FormControl from '../components/form/FormControl';
import { MenuActive } from '../context/MenuActiveContext';
import File from '../components/form/File';
import SubmitButton from '../components/SubmitButton';
import config from "../services/config.json";
import upload from "../dist/webImages/filedocumet.png";
import useFetch from '../customHooks/useFetch';
import Loader from '../components/Loader';
import usePost from '../customHooks/usePost';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditShop = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {loading:loading,data:data,error} = useFetch(`dashboard/editShop/${id}`)
    const { setMunuActiv } = useContext(MenuActive);
    const [dataShop, setDataShop] = useState("")
    const [image, setImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [imgPath2, setImgPath2] = useState();
    useEffect(() => {
        setMunuActiv([true,"ShopManagement"])
        console.log(error,"sdjkfhkjdshkjdshfk")
        if(data) {
          setDataShop(data?.data)
          setCoverImage(data?.data[0]?.cover)
          setImage(data?.data[0]?.logo)
          setImgPath2(data?.data[0]?.cover)
        }
        if(error) {
          toast.error("Shop not found");
          navigate(`/${config.demo}shop/list`)
        }
    
      }, [data,error])



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
        formdata.append("vendor_id",id)
        apiMethod(`dashboard/updateShop/${id}`,formdata);

    }
    useEffect(() => {
      if(res.data) {
       toast.success(res.data.message);
      }
     }, [res.data])
    if(loading ||    !dataShop) return <Loader />;
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

export default EditShop