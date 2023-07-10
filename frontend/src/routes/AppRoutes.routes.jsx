import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../components/auth/Login';
import Home from '../containers/Home';
import Footer from '../components/Footer';
import SignUp from '../components/auth/Signup';
import Store from '../containers/ProductPage';
import About from '../components/AboutNike';
import Dashboard from '../components/Dashboard';
import Product from '../components/Product';

const AppRoutes = () => {
	const [isAuth, setisAuth] = useState(false);

	return (
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />

				<Route path='/about' element={<About />} />

				<Route path='/store' element={<Store />} />

				<Route path='/product' element={<Product />} />

				<Route path='/login' element={<Login />} />

				<Route path='/signUp' element={<SignUp />} />

				<Route path='/dashboard' element={<Dashboard />} />

			</Routes>

			<Footer />
		</BrowserRouter>
	);
};

export default AppRoutes;
