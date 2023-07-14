import React, { useState, useEffect, useContext } from 'react';
import './css/profile.css';
import getData from '../helpers/getData';
import putData from '../helpers/putData';
import { urlUsers } from '../helpers/urls';
import parseJwt from '../helpers/parseJwt';

const Profile = () => {
	const [user, setUser] = useState({
		userID: '',
		username: '',
		password: '',
		fullName: '',
		email: '',
		phone: '',
		address: '',
	});
	const token = localStorage.getItem('token');
	const [loading, setLoading] = useState(false);
	const [edit, setEdit] = useState(false);

	const username = parseJwt(token).username;

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setEdit(!edit);
		const updateUser = async () => {
			const response = await putData(`${urlUsers}/${user.userID}`, user);
			console.log(response);
		};
		updateUser();
	};

	useEffect(() => {
		setLoading(true);
		const getUser = async () => {
			const data = await getData(`${urlUsers}/username/${username}`);
			setUser(data);
			setLoading(false);
		};
		getUser();
	}, [username]);

	if (loading) {
		return (
			<div className='loading'>
				<h1>Loading...</h1>
			</div>
		);
	}		

	return (
		<>

			<div className='SectionProfile'>
				<div className='profileContainer'>
					<h1>Profile</h1>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label htmlFor='username'>Username</label>
							<input
								type='text'
								name='username'
								id='username'
								className='form-control'
								placeholder='Username'
								value={user.username}
								onChange={handleChange}
								disabled={!edit}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input
								type='text'
								name='password'
								id='password'
								className='form-control'
								placeholder='Password'
								value={user.password}
								onChange={handleChange}
								disabled={!edit}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='fullName'>Full Name</label>
							<input
								type='text'
								name='fullName'
								id='fullName'
								className='form-control'
								placeholder='Full Name'
								value={user.fullName}
								onChange={handleChange}
								disabled={!edit}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='email'>Email</label>
							<input
								type='text'
								name='email'
								id='email'
								className='form-control'
								placeholder='Email'
								value={user.email}
								onChange={handleChange}
								disabled={!edit}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='phone'>Phone</label>
							<input
								type='text'
								name='phone'
								id='phone'
								className='form-control'
								placeholder='Phone'
								value={user.phone}
								onChange={handleChange}
								disabled={!edit}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='address'>Address</label>
							<input
								type='text'
								name='address'
								id='address'
								className='form-control'
								placeholder='Address'
								value={user.address}
								onChange={handleChange}
								disabled={!edit}
							/>
						</div>
						<div className='form-group'>
							<button
								type='submit'
								className='btn btn-primary'
								disabled={!edit}
								style={
									edit
										? { display: 'inline-block' }
										: { display: 'none' }
								}
							>
								Save
							</button>
							<button
								type='button'
								className='btn btn-danger'
								onClick={() => setEdit(!edit)}
								style={
									edit
										? { display: 'inline-block' }
										: { display: 'none' }
								}
							>
								Cancel
							</button>
							<button
								type='button'
								className='btn btn-warning'
								onClick={() => setEdit(!edit)}
								style={
									edit
										? { display: 'none' }
										: { display: 'inline-block' }
								}
							>
								Edit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Profile;
