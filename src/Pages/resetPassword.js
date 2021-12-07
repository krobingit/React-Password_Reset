import { Form, Button } from 'semantic-ui-react';
import * as yup from 'yup';
import { useFormik } from "formik";
import {  useState } from 'react';
import { useParams } from 'react-router-dom'
/*import { Link } from 'react-router-dom';
import Loader from "react-loader-spinner";*/
import axios from 'axios';

export function ResetPassword() {

  const [info, setInfo] = useState(null);
  /*const [loading, setLoading] = useState(false);
 const history = useHistory();*/
 const { id, token } = useParams();

  async function ResetPasswordVerify (values){
    try {
      const { request, data } = await axios.post(`https://password-reset-mern.herokuapp.com/resetPassword/${id}/${token}`, values)
      console.log(request.status, data)

    }
    catch (err)
    {
     setInfo("Invalid password/Password")
      return false;

    }
  }


 const ResetSchema =
  yup.object({
   password: yup.string().required('Password is required'),
   confirmpassword:  yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match').required("Required Field")

  });


    const { handleChange, handleSubmit, handleBlur, errors, touched, values } = useFormik({

      initialValues: {
        password: "",
        confirmpassword: ""
      },
       validationSchema: ResetSchema,
      onSubmit: async (values,{resetForm}) => {

       let res = ResetPasswordVerify();
       console.log(res);
             // setLoading(true);
       //setLoading(false);

      }


    })

 const formStyles = {
  background: 'whitesmoke',
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37)",
  width: "28rem",
  padding: "2rem",
  borderRadius: "1rem",
  margin:"0rem 1.5rem"
 }

return(
 <section className="loginPage">

  <Form style={formStyles} onSubmit={handleSubmit} >
   <h3 style={{textAlign:"center"}}>Change Password</h3>
   <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.password}
    error={ errors.password && touched.password && errors.password}
      fluid
      label='New Password'
      placeholder='New Password'
    id='password'
    name="password"
    type="text"
    />
   <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.confirmpassword}
          error={ errors.confirmpassword && touched.confirmpassword && errors.confirmpassword}
      fluid
      label='Confirm New Password'
    placeholder='Confirm New Password'
    id="confirmpassword"
    name="confirmpassword"
    type="confirmpassword"
   />
<div className="signin">
   <Button type="submit" inverted color='red'>Change Password</Button>
</div>
      {info ?  <p style={{ color: info.length>13 ? "red" : "blue"  }}>{info}</p>
 : '' }
  </Form>


 </section>


)
}
