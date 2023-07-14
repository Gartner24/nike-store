import { useState } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import '../css/login.css';

function Login() {
  return (
    <div className='container-login'>
      {/* Display the login heading */}
      <h2>LOGIN</h2>
      <Formik 
        initialValues={{
          email:'',
          password:'',
        }}
        onSubmit={(values)=>{
          console.log (values)
        }}
      >
        {({handleChange,handleSubmit })=> (
          <Form>
            {/* Email field */}
            <div className='email'>
              <label>Email:</label>
              <input
                type="email" 
                name='email'
                placeholder='example@gmail.com'
                onChange={handleChange}
              />
            </div>
            {/* Password field */}
            <div className='password'>
              <label>Password:</label>
              <input
                type="password"
                name='password'
                placeholder='********'
                onChange={handleChange}
              />
            </div>
            {/* Login button */}
            <div className='login'> 
              <button type="submit">Login</button>
            </div>
            {/* Sign-up button */}
            <div className='signUp'> 
              <button type="submit">Sign Up</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
