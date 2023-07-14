import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../components/auth/Login';
import Home from '../containers/Home';
import Footer from '../components/Footer';
import SignUp from '../components/auth/Signup';
import Store from '../containers/ProductPage';
import About from '../components/AboutNike';
import AdminDashboard from '../containers/AdminDashboard';
import Error404 from '../components/PageNotFound';
import Product from '../containers/Product';
import PrivateRoutes from './Private.routes';
import PublicRoutes from './Public.routes';
import AdminRoutes from './Admin.routes';
import parseJwt from '../helpers/parseJwt';
import Profile from '../components/Profile';

const AppRoutes = () => {
	const [isAuthenticated, setisAuth] = useState(false);
	const [role, setRole] = useState();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const parsedToken = parseJwt(token);
			const isTokenValid = parsedToken.exp * 1000 > Date.now();
			setisAuth(isTokenValid);
			setRole(parsedToken.role);
		}
	}, []);

	return (
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/home' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/store' element={<Store />} />
				<Route path='/product/:id' element={<Product />} />

				<Route
					path='/login'
					element={
						<PublicRoutes isAuth={isAuthenticated}>
							<Login />
						</PublicRoutes>
					}
				/>
				<Route
					path='/signUp'
					element={
						<PublicRoutes isAuth={isAuthenticated}>
							<SignUp />
						</PublicRoutes>
					}
				/>
				{isAuthenticated && (
					<>
						<Route
							path='/admin-dashboard'
							element={
								<AdminRoutes
									isAuth={isAuthenticated}
									role={role}
								>
									<AdminDashboard />
								</AdminRoutes>
							}
						/>
						{/* Otras rutas privadas */}
					</>
				)}
				<Route path='*' element={<Error404 />} />
			</Routes>

			<Footer />
		</BrowserRouter>
	);
};

export default AppRoutes;
