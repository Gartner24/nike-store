import '../css/signup.css';
import { Formik, Form } from 'formik';

function SignUp() {
	return (
		<div className='container'>
			<h2>REGISTER</h2>
			<form>
				<div className='form-group'>
					<label htmlFor='nombre'>Name:</label>
					<input
						type='text'
						id='nombre'
						name='nombre'
						required
					></input>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						required
					></input>
				</div>
				<div className='form-group'>
					<label htmlFor='contrasena'>Pasword:</label>
					<input
						type='password'
						id='contrasena'
						name='contrasena'
						required
					></input>
				</div>
				<div className='form-group'>
					<label htmlFor='confirmar-contrasena'>Confirm pasword:</label>
					<input
						type='password'
						id='confirmar-contrasena'
						name='confirmar-contrasena'
						required
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
