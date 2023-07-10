import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../components/auth/Login';
import Home from '../containers/Home';
import Advertisements from '../components/Advertisements';
import Carrusel from '../components/Carrusel';

const AppRoutes = () => {
	const [isAuth, setisAuth] = useState(false);

	return (
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />

				<Route path='/login' element={<Login />} />

				<Route path='/Carrusel' element={<Carrusel />} />

				<Route path='/' element={<Carrusel />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
