import { Form, Button } from 'semantic-ui-react';
//import * as yup from 'yup';
import { useFormik } from "formik";
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
/**/
function Login() {
  const [login, setLogin] = useState(false);
  const [info, setInfo] = useState(null);
  const history = useHistory();
  const loginVerify = async (values) => {

     const req=  await fetch("https://password-reset-mern.herokuapp.com/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        }
      ).then((response) => {
        if (response.status === 200) {
          // localStorage.setItem("x-auth-token",)
          setLogin(true)
          setInfo("Logging in.")
          return response.json();
        }
        else if (response.status === 401) {
          setLogin(false)
          setInfo("Invalid Email/Password")
        }
      })

    console.log(req)
    localStorage.setItem('x-auth-token',req.token)
    return login;



  }
/*
 const signInSchema =
  yup.object({
   email: yup.string().email().required('Please enter your Email'),
   password: yup.string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, "Password must be eight characters or more including one uppercase letter,one lowercase letter, one special character").required('Please enter your password')

  });
*/
 const { handleChange,handleSubmit, handleBlur,errors, touched, values } = useFormik({

  initialValues:{
   email: "",
   password:""
  },
 // validationSchema: signInSchema,
  onSubmit: async (values) => {
    let isUser=await loginVerify(values);
  console.log(isUser)
    let result = () =>  isUser ? history.push("/securedpage") : ''
    result();
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
   <h3 style={{textAlign:"center"}}>Login to your Account</h3>
   <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.email}
    error={ errors.email && touched.email && errors.email}
      fluid
      label='Email'
      placeholder='Email'
    id='email'
    name="email"
    type="text"
    />
   <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.password}
          error={ errors.password && touched.password && errors.password}
      fluid
      label='Password'
    placeholder='Password'
    id="password"
    name="password"
    type="password"
   />
<div className="signin">
   <Button type="submit" inverted color='red'>Sign in</Button>
</div>
   <section className="FormAction">
    <p>New here?   <Link to="/register">Sign up</Link></p>
    <Link to="/forgotPassword">Forgot Password</Link>
      </section>
      {info ? <p style={{ color: info.length>13 ? "red" : "blue"  }}>{info}</p> : '' }
  </Form>


 </section>


)

}

export {Login}