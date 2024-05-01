import React from "react";
import FormControl from "../components/form/FormControl";
import { Form, Formik } from "formik";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import config from "../services/config.json";
import { removeTokenSession, setTokenSession } from "../utils/common";
import { toast } from "react-toastify";
import { useState } from "react";

const LogIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email("Invaild Email").required("Must Required"),
    password: yup
      .string()
      .min(6, "Mininum 6 length")
      .max(20, "Maximum 20 length")
      .required("Must Required")
  });
  const handleSubmit = async (values) => {
    setLoading(true)
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
    };
    axios.post(`${config.apiEndPoint}Adminlogin`, values)
    .then((response) => {
      setLoading(false)
      if (response.data.status === "false") {
        removeTokenSession("token");
        toast.error(response.data.message);
      } else {
        setTokenSession(response.data.data.api_token);
        toast.success(response.data.message);
        navigate(`/${config.demo}`);
        }
      })
      .catch((error) => {
        if (error.response?.status === 401)
          toast.error(error.response.data.message);
        else toast.error(error.response.data.errorMessage);
      });
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
        <div className="loginPage__right_">
      <Formik initialValues={initialValues}  
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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
                <h1 className="font-bold">Log in to your account</h1>
                <p>Welcome back! Please enter your details.</p>
              </div>

              <FormControl name="email" placeholder="Enter your email" label={"Email"} className="w-full" control="input" />
              <FormControl name="password" placeholder="Enter your Password" label={"Password"} className="w-full" control="password" />
                <ul className="forget mt-2">
                  <li>
                    <Link to={`/${config.demo}forgot`} className="font-medium">Forgot password</Link>
                  </li>
                </ul>
                <SubmitButton
                 props={{
                    class: "btn btn-primary w-100 block mt-5 submit",
                    text: "Sign In",
                  }}
                 buttonLoading={loading}
                />
          </Form>
        </Formik>
        <div className="reuser mx-auto mt-4 text-center">
          <Link to={`/${config.demo}register`} className="font-medium">Register for Vendor</Link>
        </div>
        </div>
      </div>
    </section>
  );
};  

export default LogIn;
