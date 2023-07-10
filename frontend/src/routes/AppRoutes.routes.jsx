import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../components/auth/Login';
import Home from '../containers/Home';
import Advertisements from '../components/Advertisements';
import Carrusel from '../components/Carrusel';
import Footer from '../components/Footer';
import SignUp from '../components/auth/Signup';

const AppRoutes = () => {
	const [isAuth, setisAuth] = useState(false);

	return (
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />

				<Route path='/login' element={<Login />} />

				<Route path='/signup' element={<SignUp />} />

			</Routes>

			<Footer />
		</BrowserRouter>
	);
};

export default AppRoutes;
