import React, { useState } from 'react'
import SubmitButton from '../components/SubmitButton';
import { Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import File2 from '../components/form/File';

const Profile = () => {
    const [image, setImage] = useState("")
    const initialValues = {
        email: "",
        password: "",
      };
      const handleSubmit = () => {};
  return (
    <div className='profilePage'>
         <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form name="myForm">
          <div className='ProfileImage'>
          <File2
                          label={"Profile"}
                          value={image}
                          onUpload={setImage}
                          name={"avatar"}
                        />
                        </div>
            <div className='grid grid-cols-2 gap-6'>
            <FormControl name="name" placeholder="Enter your name" label={"Name"} className="w-full" control="input" />
            <FormControl name="email" placeholder="Enter your email" label={"Email"} className="w-full" control="input" />
            </div>

          <SubmitButton
                 props={{
                    class: "btn btn-primary block mt-3 submit profilebtn",
                    text: "Update",
                  }}
                //  buttonLoading={updateMeeting.isLoading}
                />
          </Form>
          </Formik>
    </div>
  )
}

export default Profile