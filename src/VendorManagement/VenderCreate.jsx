import React, { useContext, useEffect, useState } from "react";
import FormControl from "../components/form/FormControl";
import { Field, Form, Formik } from "formik";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import config from "../services/config.json";
import { toast } from "react-toastify";
import File from "../components/form/File";
import swal from "sweetalert";
import { city } from "../data/alldata";
import usePost from "../customHooks/usePost";
import { MenuActive } from "../context/MenuActiveContext";

const VenderCreate = () => {
  const { setMunuActiv } = useContext(MenuActive);

  useEffect(() => {
    setMunuActiv([true,"VendorManagement"])

  }, [])
  const navigate = useNavigate();
  const [res, apiMethod] = usePost()
  const [image, setImage] = useState("");
  const [useDocument, setUseDocument] = useState("")
    const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    address: "",
    website: "",
    vat_number: "",
    return_policy: "",
    terms_conditions: "",
    };
    const validationSchema = yup.object({
      email: yup.string().email("Invaild Email").required(),
      password: yup
        .string()
        .min(6, "Mininum 6 length")
        .max(20, "Maximum 20 length").required(),
        website: yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Please enter website'),
        phone: yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(8)
        .required('A phone number is required'),
    });
    const handleSubmit = async (values,{ resetForm }) => {
      let formdata = new FormData();
      let Feilds = {
        "name": "Company Name",
        "email":"Email",
        "phone":"Phone",
        "city":"City",
        
        "address":"Address",
        "website":"Website",
        "vat_number":"Tax ID/ VAT Number",
        "return_policy":"Return Policy",
        "terms_conditions":"Terms and Conditions",
      }
      const requirdFeild = []
      if(image === "") {
        requirdFeild.push("Company Logo")
      }
      if(useDocument === "") {
        requirdFeild.push("Documents for verification")
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
      
        formdata.append("logo",image)
        formdata.append("document",useDocument)
        apiMethod(`addVendor`,formdata);
        resetForm();
        setUseDocument("");
        setImage("")
      }
    };
    useEffect(() => {
      if(res.data) {
        if(res.data.status === "false") {
          toast.error(res.data.message);
        }
        else {
          toast.success(res.data.message);
          navigate(`/${config.demo}vendor/list`)
        }
      }
     
    }, [res.data,navigate])
    
  return (
   <>
   
   <div className=" flex items-center px-10 py-5 ">
        <div className="SignInPage__right_ w-100 h-full">
          <Link to={`/${config.demo}vendor/list`} className="arrowArrow flex items-center ">
            <img src={require("../dist/webImages/arrow-left2.png")} alt="" />
            <span className="font-medium">Create Vendor Account</span>
          </Link>
          <br />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange
          >
            <Form name="myForm">
            <File
                    label={"Company Logo"}
                    value={image}
                    onUpload={setImage}
                    name={"logo"}
                    typeFile="image/*"
                  />

              <div className="SignInPage__rightBox grid grid-cols-2 gap-5">
                
                <div className="SignInPage__rightBoxl">
                 
                  <FormControl
                    name="name"
                    placeholder="Company Name"
                    label={"Company Name"}
                    className="w-full"
                    control="input"
                  />
                  <FormControl
                    name="email"
                    placeholder="Email Address"
                    label={"Email"}
                    autoComplete="off"
                    className="w-full"
                    control="input"
                  />
                   <FormControl name="password" placeholder="Enter your Password" label={"Password"} className="w-full" control="password" />
                  
                  
                  
                  <FormControl
                    name="phone"
                    type={"tel"}
                    placeholder="Phone Number"
                    label={"Phone Number"}
                    className="w-full"
                    control="input"
                  />
                  <FormControl
                    name="city"
                    label={"City"}
                    className="w-full"
                    control="select"
                    custom_label_name={"name"}
                    firstSelect={"City"}
                    customer_value_name={"name"}
                    selectList={city}
                  />
                  <FormControl
                    name="address"
                    type={"text"}
                    placeholder="Address"
                    label={"Address"}
                    className="w-full"
                    control="input"
                  />
                  <FormControl
                    name="website"
                    type={"text"}
                    placeholder="Website"
                    label={"Website"}
                    className="w-full"
                    control="input"
                  />
                
                </div>
                <div className="SignInPage__rightBoxr">
                <FormControl
                    name="vat_number"
                    type={"number"}
                    placeholder="Tax ID  VAT Number"
                    label={"Tax ID/ VAT Number"}
                    className="w-full"
                    control="input"
                  />
                <FormControl
                    name="return_policy"
                    placeholder="Return Policy"
                    label={"Return Policy"}
                    className="w-full"
                    control="textarea"
                  />
                <FormControl
                    name="verification"
                    className="w-full"
                    control="FileDoument"
                    update={setUseDocument}
                    updateValue={useDocument}
                  />
                  <div className="term mt-5">
                  <div className="flex items-center">
    <Field  id="default-radio-2" type="radio" value="1"  name="terms_conditions" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium">Terms and Conditions</label>
</div>
                  
                  </div>

                  
              <SubmitButton
                props={{
                  class: "btn btn-primary  block mt-5 submit",
                  text: "Create Vendor Account",
                  
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
   </>
  )
}

export default VenderCreate