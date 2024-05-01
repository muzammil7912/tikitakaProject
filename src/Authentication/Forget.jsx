import React, { useEffect, useState } from "react";
import FormControl from "../components/form/FormControl";
import { Form, Formik } from "formik";
import SubmitButton from "../components/SubmitButton";
import usePost from "../customHooks/usePost";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import config from "../services/config.json";

const Forget = () => {
  const [res, apiMethod] = usePost()
  const navigate = useNavigate();
  const [formdaata, setFormdaata] = useState({
    email: ""
  })

  const [forgetStatus, setforgetStatus] = useState(1)
  const initialValues = {
    email: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email("Invaild Email").required(),
  })
  const handleSubmit = (values) => {
    let formdata = new FormData();

    for (let item in values) {
      formdata.append(item,values[item])
      formdaata.email = values.email
    }
    setFormdaata({...formdaata,"email":values.email})
    apiMethod(`vendorForgetEmail`,formdata);
  };
  useEffect(() => {
   if(res.data) {
    if(res.data.status === "false") {
    toast.error(res.data.message);
    }
    else {
      if(forgetStatus === 5) {
        navigate(`/${config.demo}login`);
      }
      setforgetStatus(forgetStatus + 1)
    }
   }
  }, [res.data])

  const initialValues2 = {
    otp: "",
  };
  const initialValues3 = {
    new_password: "",
  };
  const validationSchema2 = yup.object({
    opt: yup.string().min(6, "Mininum and Maximum 6 length")
    .max(6, "Mininum and Maximum 6 length").required(),
  })
  const handleSubmit2 = (values) => {
    let formdata = new FormData();
    formdata.append("email", formdaata["email"])
    setFormdaata({...formdaata,"otp":values.otp})
    for (let item in values) {
      formdata.append(item,values[item])
    }
    apiMethod(`confirmVendorOtp`,formdata);
  };
  const handleSubmit3 = (values) => {
    let formdata = new FormData();
    formdata.append("email", formdaata["email"])
    formdata.append("otp", formdaata["otp"])
    formdata.append("new_password", values.new_password)
    for (let item in values) {
      formdata.append(item,values[item])
    }
    setforgetStatus(5)
    apiMethod(`resetVendorPassword`,formdata);
  };
  

  return (
    <section className="loginPage  grid grid-cols-2">
    <div className="loginPage__left">
      <img
        src={require("../dist/webImages/login.png")}
        className="w-full h-svh object-cover"
        alt="login"
      />
    </div>
    <div className="loginPage__right flex items-center justify-center  p-10 ">
      {forgetStatus === 1 &&
      
      <Formik initialValues={initialValues} onSubmit={handleSubmit}   
      validationSchema={validationSchema}
      validateOnChange>
      <Form name="myForm">
      <div className="loginPage__right-logo flex items-center justify-center gap-3">
            <img
              src={require("../dist/webImages/logo512.png")}
              alt=""
            />
            <span>TIKITAKA </span>
               </div>
          <div className="text-center">
            <h1 className="font-bold">Forgot  Account</h1>
          </div>

        <FormControl name="email" placeholder="Enter your email" label={"Email"} className="w-full" control="input" />
         
            <SubmitButton
             props={{
                class: "btn btn-primary w-100 block mt-5 submit",
                text: "Forget Password",
              }}
            //  buttonLoading={updateMeeting.isLoading}
            />
      </Form>
    </Formik>}

    {forgetStatus === 2 &&
      
      <Formik                  initialValues={initialValues2} onSubmit={handleSubmit2}   >
      <Form name="myForm">
      <div className="loginPage__right-logo flex items-center justify-center gap-3">
            <img
              src={require("../dist/webImages/logo512.png")}
              alt=""
            />
            <span>TIKITAKA </span>
               </div>
          <div className="text-center">
            <h1 className="font-bold">Forgot  Account</h1>
          </div>

        <FormControl name="otp" type={"number"} placeholder="Enter your OTP" label={"OTP"} className="w-full" control="input" />
         
            <SubmitButton
             props={{
                class: "btn btn-primary w-100 block mt-5 submit",
                text: "SUBMIT",
              }}
            //  buttonLoading={updateMeeting.isLoading}
            />
      </Form>
    </Formik>}

    {
forgetStatus === 3 &&
<Formik initialValues={initialValues3} onSubmit={handleSubmit3}   >
<Form name="myForm">
<div className="loginPage__right-logo flex items-center justify-center gap-3">
      <img
        src={require("../dist/webImages/logo512.png")}
        alt=""
      />
      <span>TIKITAKA </span>
         </div>
    <div className="text-center">
      <h1 className="font-bold">New Password</h1>
    </div>
    <FormControl name="new_password" placeholder="Enter your New Password" label={"New Password"} className="w-full" control="password" />
  
      <SubmitButton
       props={{
          class: "btn btn-primary w-100 block mt-5 submit",
          text: "SUBMIT",
        }}
      //  buttonLoading={updateMeeting.isLoading}
      />
</Form>
</Formik>}
     
    
    </div>
  </section>
  
  );
};  

export default Forget;
