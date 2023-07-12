import * as React from 'react';
import './css/navbar.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import CartOverlay from '../components/CartOverlay';
import CartWindow from './CartWindow';

const Navbar = () => {
	console.log();
	return (
		<div className='App'>
			<header className='App-menu'>
				<div className='options'>
					<a href='/'><img src={logo} alt='Logo' className='logo' /></a>
					<div className='options'>
						<Link to='/store'>
							<p className='option-1'>
								<span className='material-symbols-outlined'>
									store
								</span>
								store
							</p>
						</Link >
						<Link to='/About'>
						<p className='option-2'>
							<span className='material-symbols-outlined'>
								info
							</span>
							About
						</p>
						</Link>
						<Link to='/login'>
							<p className='option-3'>
								<span className='material-symbols-outlined'>
									login
								</span>
								Login
							</p>
						</Link>

						<nav>
							<CartOverlay />
						</nav>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Navbar;
