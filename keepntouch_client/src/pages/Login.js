import  React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { AuthContext } from '../helpers/AuthContext';

import '../css/login.css';
import { GoEye, GoEyeClosed } from "react-icons/go";

function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const {setAuthState} = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordShown = () => {
      setPasswordShown(!passwordShown);
  }

  const initialValues = {
      eMail: '',
      password: '',
      response: '', 
  }

  const validationSchema = yup.object().shape({
    eMail: yup
        .string()
        .required('E-mail is required.')
        .email('Invalid e-mail address.')
        .min(5, 'E-mail should have at least 5 characters.')
        .max(255, 'E-mail should have at most 255 characters.'),
    password: yup
        .string()
        .required('Password is required.')
        .min(8, 'Password should have at least 8 characters.')
        .max(50, 'Password should have at most 50 characters.'),
    response: yup.string()
    });

  const onSubmit = (data, { setFieldError }) => {
    axios.post('/user/login', data).then((response) => {
        setAuthState(true);
        navigate('/');
    })
    .catch((error) => {
      setFieldError(error.response.data.field, error.response.data.message);
    });
  } 

  return (
    <div className='login-page'>
        <div className="login-page-container">
            <h1>LOGIN</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className='login-form'>
                    <ErrorMessage render={msg => <div className="error">{msg}</div>} name="eMail" />
                    <Field className='login-input' name="eMail" type="text" placeholder="E-mail..." />
                    
                    <ErrorMessage render={msg => <div className="error">{msg}</div>} name="password" />
                    <div className="password-field">
                        <Field className='login-input' name="password" type={passwordShown ? "text" : "password"} placeholder="Password..." />
                        <span onClick={togglePasswordShown}>{passwordShown ? <GoEyeClosed/> : <GoEye/>}</span>
                    </div>
                    
                    <ErrorMessage render={msg => <div className="error response">{msg}</div>} name="response" /> 
                    <Field className='hidden-login-input' name="response" type="text" placeholder="response..." /> 
                    <button type="submit"><h2>connect</h2> <img src="/icons/arrow2.svg" alt="connect" /></button>
                </Form>
            </Formik>
            <div className="bottom-messages">
                <Link to='/register'>I don't have an account yet!</Link>
                <Link to='/'>I forgot my password!<span>(don't worry, it happens to all of us)</span></Link>
            </div>
        </div>
    </div>
  );
}

export default Login