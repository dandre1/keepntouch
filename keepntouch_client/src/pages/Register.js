import React from 'react';
import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import '../css/register.css';
import { GoEye, GoEyeClosed } from "react-icons/go";
import axios from 'axios';

function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [response, setResponse] = useState(false);

  const togglePasswordShown = () => setPasswordShown(!passwordShown);

  const initialValues = {
    firstName: '',
    lastName: '',
    eMail: '',
    password: '',
    response: '', 
  }

  const validationSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required.')
        .matches('^[a-zA-Z]*$', 'First name contains invalid characters.')
        .min(2, 'First name should have at least 2 characters.')
        .max(35, 'First name should have at most 35 characters.'),
    lastName: yup
        .string()
        .required('Last name is required.')
        .matches('^[a-zA-Z]*$', 'Last name contains invalid characters.')
        .min(2, 'Last name should have at least 2 characters.')
        .max(35, 'Last name should have at most 35 characters.'),
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

  const onSubmit = async (data, { setFieldError }) => {
    axios.post('http://localhost:3001/user/register', data)
    .then((response) => {
      setResponse(true);
      setFieldError(response.data.field, response.data.message);
    })
    .catch((response) => {
      setResponse(false);
      setFieldError(response.response.data.field, response.response.data.message);
    });
  } 

  return (
    <div className='signup-page'>
        <div className="signup-page-container">
            <h1>REGISTER</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className='signup-form'>
                    <div className="full-name-errors">
                      <ErrorMessage render={msg => <div className="error first-error">{msg}</div>} name="firstName" />
                      <ErrorMessage render={msg => <div className="error second-error">{msg}</div>} name="lastName" />
                    </div>
                    <div className="full-name">
                      <Field className='signup-input first-input' name="firstName" type="text" placeholder="First name..." />
                      <ErrorMessage render={msg => <div className="error second-error-responsive">{msg}</div>} name="lastName" />
                      <Field className='signup-input' name="lastName" type="text" placeholder="Last name..." />
                    </div>

                    <ErrorMessage render={msg => <div className="error">{msg}</div>} name="eMail" />
                    <Field className='signup-input' name="eMail" type="text" placeholder="E-mail..." />

                    <ErrorMessage render={msg => <div className="error">{msg}</div>} name="password" />
                    <div className="password-field">
                      <Field className='signup-input' name="password" type={passwordShown ? "text" : "password"} placeholder="Password..." />
                      <span onClick={togglePasswordShown}>{passwordShown ? <GoEyeClosed/> : <GoEye/>}</span>
                    </div>

                    <ErrorMessage render={msg => response ? <div className="valid response">{msg}</div> : <div className="error response">{msg}</div>} name="response" /> 
                    <Field className='hidden-signup-input' name="response" type="text" placeholder="response..." /> 
                    
                    <button type="submit"><h2>create account</h2> <img src="/icons/arrow2.svg" alt="connect" /></button>
                </Form>
            </Formik>
            <div className="bottom-messages">
                <Link to='/terms'>By creating your account you acknowledge our <span>Terms & Conditions</span> and fully agree with them!</Link>
                <Link to='/login'><span>I already have an account!</span></Link>
            </div>
        </div>
    </div>
  )
}

export default Register