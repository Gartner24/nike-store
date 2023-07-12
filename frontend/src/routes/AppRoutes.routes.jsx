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

				<Route path='/About' element={<About />} />

				<Route path='/Store' element={<Store />} />

				<Route path='/login' element={<Login />} />

				<Route path='/SignUp' element={<SignUp />} />

				<Route path='/Dashboard' element={<Dashboard />} />

				<Route path='/product/:id' element={<Product />} />

			</Routes>

			<Footer />
		</BrowserRouter>
	);
};

export default AppRoutes;
