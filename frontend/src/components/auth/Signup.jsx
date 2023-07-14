import '../css/signup.css';
import { Formik, Form } from 'formik';

/**
 * SignUp Component
 * Renders a registration form.
 */
function SignUp() {
  return (
    <div className='container'>
      <h2>REGISTER</h2>
      <form>
        {/* Name field */}
        <div className='form-group'>
          <label htmlFor='nombre'>Name:</label>
          <input
            type='text'
            id='nombre'
            name='nombre'
            required
          ></input>
        </div>
        {/* Email field */}
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            required
          ></input>
        </div>
        {/* Password field */}
        <div className='form-group'>
          <label htmlFor='contrasena'>Password:</label>
          <input
            type='password'
            id='contrasena'
            name='contrasena'
            required
          ></input>
        </div>
        {/* Confirm Password field */}
        <div className='form-group'>
          <label htmlFor='confirmar-contrasena'>Confirm password:</label>
          <input
            type='password'
            id='confirmar-contrasena'
            name='confirmar-contrasena'
            required
          ></input>
        </div>
        {/* Register button */}
        <div className='form-group'>
          <button type='submit'>Register</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
