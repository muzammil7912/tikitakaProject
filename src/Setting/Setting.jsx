import { Field, Form, Formik } from 'formik'
import React, { useContext, useEffect } from 'react'
import SubmitButton from '../components/SubmitButton'
import * as yup from "yup";
import { MyContext } from '../context/MyContext';
import usePost from '../customHooks/usePost';
import { toast } from 'react-toastify';
import { MenuActive } from '../context/MenuActiveContext';

const Setting = () => {
  const { rolesData } = useContext(MyContext);
  const { setMunuActiv } = useContext(MenuActive);
  useEffect(() => {
    setMunuActiv([true,"Settings"])
  }, [setMunuActiv])

  const [res, apiMethod] = usePost()
  const initialValues = {
    old_password: "",
    new_password: "",
    email: rolesData?.email,
  };

  const validationSchema = yup.object({
    old_password: yup
      .string()
      .min(6, "Mininum 6 length")
      .max(20, "Maximum 20 length")
      .required("Must Required"),
      new_password: yup
      .string()
      .min(6, "Mininum 6 length")
      .max(20, "Maximum 20 length")
      .required("Must Required")
  });
  const handleSubmit = async (values,{ resetForm }) => {
    let formdata = new FormData();
    for (let item in values) {
      formdata.append(item,values[item])
    }
    apiMethod(`changeVendorPassword`,formdata);
    resetForm();
  }
  useEffect(() => {
    if(res.data) {
      if(res.data.status === "false") {
        toast.error(res.data.message);
      }
      else {
        toast.success(res.data.message);
      }
    }
   
  }, [res.data])
  return (
    <div className='setting'>
        <div className="h4 font-medium mb-4">Settings</div>

        <div className="settingBox py-10 px-10">

            <div className="h5 font-medium mb-3 ">Reset Password</div>
            <Formik initialValues={initialValues}  
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnChange>
                <Form>
            <Field name={"old_password"} type="password" className="settingBox_input mb-3" placeholder="Old Password" />
            <Field name={"new_password"} type="password" className="settingBox_input" placeholder="New Password" />
            <SubmitButton
                 props={{
                    class: "btn btn-primary  block mt-5 submit",
                    text: "Submit",
                  }}
                //  buttonLoading={res.isLoading}
                />
                </Form>
            </Formik>
        </div>
    </div>
  )
}

export default Setting