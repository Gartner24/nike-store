import { Link, Navigate } from "react-router-dom";
import "../css/signup.css";
import React, { useState } from "react";
// import postData from "../../helpers/postData";
import axios from 'axios';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
      fullName,
      email,
      phone,
      address
    };

    try {
      const response = await axios.post('https://nike-fake-store.onrender.com/api/users', JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      // Restablecer los campos después de un registro exitoso
      setFullName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setPhone('');
      setAddress('');
	  <Navigate to="/login" />
    } catch (error) {
      console.error(error);
      // Lógica adicional en caso de error durante el registro
    }
  };

  return (
    <div className='container'>
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='nombre'>Name:</label>
          <input
            type='text'
            id='nombre'
            name='nombre'
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone:</label>
          <input
            type='text'
            id='phone'
            name='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            id='address'
            name='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <button type='submit'>Register</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;