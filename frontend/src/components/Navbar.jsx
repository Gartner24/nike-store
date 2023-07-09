import * as React from 'react';
import './css/navbar.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
	console.log();
	return (
		<div className='App'>
			<header className='App-menu'>
				<div className='options'>
					<img src={logo} alt='Logo' className='logo' />
					<div className='options'>
						<Link to='/'>
							<p className='option-1'>
								<span className='material-symbols-outlined'>
									store
								</span>
								store
							</p>
						</Link>
						<p className='option-2'>
							<span className='material-symbols-outlined'>
								info
							</span>
							About
						</p>
						<Link to='/login'>
							<p className='option-3'>
								<span className='material-symbols-outlined'>
									login
								</span>
								Login
							</p>
						</Link>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Navbar;
