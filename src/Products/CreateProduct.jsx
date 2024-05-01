import React, { useContext, useEffect, useRef, useState } from "react";
import FormControl from "../components/form/FormControl";
import { Field, Form, Formik } from "formik";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import UploadProduct from "../components/form/UploadProduct";
import usePost from "../customHooks/usePost";
import config from "../services/config.json";
import { MenuActive } from "../context/MenuActiveContext";
import { MyContext } from "../context/MyContext";
import useFetch from "../customHooks/useFetch";
import Loader from "../components/Loader";
import swal from "sweetalert";
import axios from "axios";
import { getTokenSession } from "../utils/common";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { setMunuActiv } = useContext(MenuActive);
  const { rolesData } = useContext(MyContext);
  const [shopDetails, setShopDetails] = useState("")
  const {loading:loading2,data:data2} = useFetch(`viewCategories`)
  const [loading3, setLoading3] = useState(false)
  const isComponentMounted = useRef(true);
 useEffect(() => {
    if(rolesData.role_id === 2) {
      setMunuActiv([true,"ProductManagement"])

    }
    else {
      setMunuActiv([true,"Products"])


      if (isComponentMounted.current) {
        setLoading3(true)
        axios.defaults.headers = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${getTokenSession()}`,
        };
        axios.get(`${config.apiEndPoint}dashboard/editShop/${rolesData.id}`)
        .then((response) => {
          setLoading3(false)
         
          })
          .catch((error) => {
           console.log(error.status,"sdkjfdshfjds")
           setLoading3(false)
          });
      }
      return () => {
        isComponentMounted.current = false;
      };

}

  }, [rolesData])
  
  const [fileList, setFileList] = useState([
  ]);
  const hanldefileUpdate = (values) => {
    setFileList(values)
  }

  const initialValues = {
    name: "",
    detail: "",
    stock: "",
    price: "",
    category_id: "",
    shop_id: rolesData.shop_id,
  };
  const [res, apiMethod] = usePost()
  const handleSubmit = async (values,{ resetForm }) => {
    let formdata = new FormData();
    let Feilds = {
      "name": "Product Name",
      "detail":"Description",
      "stock":"Quantity in Stock",
      "price":"Price",
      "category_id":"Category",
    }
    const requirdFeild = []
    if(fileList.length < 3) {
      requirdFeild.push("Product Images")
    }
    for (let item in values) {
      if(values[item] === "") {
        requirdFeild.push(Feilds[item])
      }
      formdata.append(item,values[item])
    }
      if(requirdFeild.length > 0) {
        swal({
          title: "Must Required",
          text: requirdFeild.join(","),
          icon: "warning",
          dangerMode: true,
        });
      }
      else {
        console.log(fileList)
        if(fileList.length) {
          for (let index = 0; index < fileList.length; index++) {
            formdata.append(`attachments[]`,fileList[index]?.originFileObj)
            
          }
        }
        apiMethod(`dashboard/createProduct`,formdata);
        resetForm();
      }

  };



  useEffect(() => {
  if(res.data) {
    toast.success(res.data.message);
    navigate(`/${config.demo}product/list`)
  }
  }, [res.data])
  
  if(loading2 || loading3) return <Loader />
  return (
    <section className="SignInPage">    
      <div className=" flex items-center px-10 py-5 productRes ">
        <div className="SignInPage__right_ w-100 h-full">
          <Link to={`/${config.demo}products`} className="arrowArrow flex items-center  gap-2">
            <img src={require("../dist/webImages/arrow-left2.png")} alt="" />
            <span>Add New Product</span>
          </Link>
          <br />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <Form name="myForm">
             {rolesData.role_id !== 2 && <Field type="hidden" value={shopDetails} />}
            <UploadProduct updatess={(item) => hanldefileUpdate(item)} filelis={fileList} />

              <div className="SignInPage__rightBox grid grid-cols-2 gap-5">
                
                <div className="SignInPage__rightBoxl">
                 
                  <FormControl
                    name="name"
                    placeholder="Product Name"
                    label={"Product Name"}
                    className="w-full"
                    control="input"
                  />
                   <FormControl
                    name="category_id"
                    label={"Category"}
                    className="w-full"
                    control="select"
                    custom_label_name={"name"}
                    firstSelect={"Category"}
                    customer_value_name={"id"}
                    selectList={data2?.data}  
                  />
                  <FormControl
                    name="price"
                    placeholder="Price"
                    label={"Price"}
                    className="w-full"
                    control="input"
                    type="number"
                  />
                 
                  <FormControl
                    name="stock"
                    type={"number"}
                    placeholder="Quantity in Stock"
                    label={"Quantity in Stock"}
                    className="w-full"
                    control="input"
                  />
                
                </div>
                <div className="SignInPage__rightBoxr">
                <FormControl
                    name="detail"
                    placeholder="Description"
                    label={"Description"}
                    className="w-full"
                    control="textarea"
                  />
                  
              <SubmitButton
                props={{
                  class: "btn btn-primary  block mt-5 submit",
                  text: "Submit",
                }}
               buttonLoading={res.isLoading}
              />
                </div>
                <div>
               
                
                </div>
              </div>
            

            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
