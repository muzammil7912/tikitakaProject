import React, { useContext, useEffect, useState } from "react";
import FormControl from "../components/form/FormControl";
import { Form, Formik } from "formik";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import config from "../services/config.json";
import UploadProduct from "../components/form/UploadProduct";
import useFetch from "../customHooks/useFetch";
import Loader from "../components/Loader";
import usePost from "../customHooks/usePost";
import { MenuActive } from "../context/MenuActiveContext";
import { MyContext } from "../context/MyContext";
import swal from "sweetalert";
import { toast } from "react-toastify";

const EditProduct = () => {
  const {id} = useParams();
  const [productData, setProductData] = useState()
  const { setMunuActiv } = useContext(MenuActive);
  const { rolesData } = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    if(rolesData.role_id === 2) {
      setMunuActiv([true,"ProductManagement"])
    }
    else {
      setMunuActiv([true,"Products"])
    }
  }, [])
  
  const [fileList, setFileList] = useState([
  ]);
  const {loading,data:data1} = useFetch(`dashboard/editProduct/${id}`)
  const {loading:loading2,data:data2} = useFetch(`viewCategories`)
useEffect(() => {
 if(data1) {
  if(data1.status === false) {
    navigate(`/${config.demo}product/list`)
  }
  else {
    setProductData(data1.data[0])
    let attention = []
    let att = data1?.data[0]?.attachment_urls
    for (let index = 0; index < att.length; index++) {  
      attention.push({
        uid: `-${index + 1}`,
        name: `${att[index].split("/")[att[index].split("/").length -1]}`,
        status: 'done',
        url: `${att[index]}`,
      })
    }
    setFileList(attention)
  }
 }
}, [data1]);

const [res, apiMethod] = usePost()

const hanldefileUpdate = (values) => {
  setFileList(values)
}

 
  useEffect(() => {
    if(res?.data) {
      navigate(`/${config.demo}product/list`)
    }
   }, [res.data]);

  const handleSubmit = async (values) => {
    let formdata = new FormData();
    let Feilds = {
      "name": "Product Name",
      "detail":"Description",
      "stock":"Quantity in Stock",
      "price":"Price",
      "category_id":"Category",
    }
    const requirdFeild = []

    if(!fileList || fileList.length < 3) {
      requirdFeild.push("Product Images")
    }
    for (let item  in values) {
      if(values[item]) {
      }
      else {
        requirdFeild.push(Feilds[item])
      }
      formdata.append(item,values[item]);
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
      if(fileList.length) {
        console.log(fileList,"shkjfsdhkj")
        for (let index = 0; index < fileList.length; index++) {
          formdata.append(`attachments[]`,fileList[index]?.originFileObj ?? fileList[index]?.url)
          
        }
      }
      apiMethod(`dashboard/updateProduct/${id}`,formdata);
    }
  };
  useEffect(() => {
    if(res.data) {
     toast.success(res.data.message);
    }
   }, [res.data])
  if(loading || loading2) return <Loader />;
  let initialValues = {};
  if(data1?.data.length > 0) {
    initialValues = {
      name: data1.data[0].product_name,
      detail: data1.data[0].product_detail ?? "",
      price: Number(data1.data[0].price).toFixed(0),
      category_id: data1.data[0]?.category_id,
      stock: data1.data[0]?.product_stock,
      shop_id: data1.data[0]?.id,
    }
  };
  return (
    <section className="SignInPage">    
      <div className=" flex items-center px-10 py-5  productRes">
        <div className="SignInPage__right_ w-100 h-full">
          <Link to={`/${config.demo}product/list`} className="arrowArrow flex items-center  gap-2">
            <img src={require("../dist/webImages/arrow-left2.png")} alt="" />
            <span>Add New Product</span>
          </Link>
          <br />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <Form name="myForm">
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
                    type="number"
                    placeholder="Price"
                    label={"Price"}
                    className="w-full"
                    control="input"
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
                  {/* <div className="term mt-5">
                  <div className="flex items-center">
    <input  id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium">Mark as Featured</label>
</div>
                  
                  </div> */}

                  
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

export default EditProduct;
