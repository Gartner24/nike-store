import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	urlProducts,
	urlCart,
	urlImages,
	urlUsers,
	urlOrders,
} from '../helpers/urls.js';
import { AuthContext } from '../store/AuthContext';
import parseJwt from '../helpers/parseJwt.js';
import axios from 'axios';
import getData from '../helpers/getData.js';

const CartPage = () => {
	const [cart, setCart] = useState([]);
	const [user, setUser] = useState({
		userID: null,
		username: '',
		password: '',
		fullName: '',
		email: '',
		phone: '',
		address: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [products, setProducts] = useState([]);
	const [images, setImages] = useState([]);

	const token = localStorage.getItem('token');
	const username = parseJwt(token).username;

	const handlePayment = async () => {
		const response = await axios.post(urlOrders, {
			userID: user.userID,
			shippingAddress: user.address,
		});
		// response.data.url enlace de pago open in a new tab
		window.open(response.data.url, '_blank');
	};

	const handleDeleteCart = async (cartId) => {
		await axios.delete(`${urlCart}/${cartId}`);
		const newCart = cart.filter((item) => item.cartID !== cartId);
		setCart(newCart);
	};

	useEffect(() => {
		setLoading(true);
		const getUser = async () => {
			const data = await getData(`${urlUsers}/username/${username}`);
			setUser(data);
			console.log(user);
		};
		getUser();
	}, [username]);

useEffect(() => {
    setLoading(true);
    // user.userID is null
    if (user.userID) {
        const getCart = async () => {
            const data = await axios.get(`${urlCart}/user/${user.userID}`);
            setCart(data.data.cartItems);
            console.log(data.data.cartItems);
        };
        getCart();
        const getProducts = async () => {
            const data = await getData(urlProducts);
            setProducts(data);
        };
        getProducts();
        const getImages = async () => {
            const data = await getData(urlImages);
            setImages(data);
        };
        getImages();
        
    setLoading(false)
    }
}, [user]);

useEffect(() => {
    if (cart.length > 0) {
        const productsFiltered = products.filter((product) => {
            return cart.filter((item) => {
                return (
                    item.productID === product.productID &&
                    item.cartStatus === 'Active'
                );
            });
        });
        console.log(productsFiltered);
        setProducts(prevProducts => productsFiltered);
    }
}, [cart]);

	if (loading) {
		return (
			<div className='loading'>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<>
			<h1>Cart Page</h1>

			<div className='cart-container'>
				<div className='cart-items'>
					{products.map((product) => {
						return (
							<div key={product.productID} className='cart-item'>
								<img
									// src={images.find((image) => image.productID === product.productID).url}
									alt={product.productName}
								/>
								<div
									className='cart-
                                    item-info'
								>
									<h3>{product.productName}</h3>
									<p>{product.description}</p>
									<p>${product.price}</p>
								</div>
								<button
									onClick={() =>
										handleDeleteCart(product.cartID)
									}
								>
									Delete
								</button>
							</div>
						);
					})}
				</div>
				<button onClick={handlePayment}>Pay</button>
			</div>
		</>
	);
};

export default CartPage;
