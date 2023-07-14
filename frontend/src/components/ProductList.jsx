import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/ProductList.css";
import getData from "../helpers/getData";

const urlProducts = "https://nike-fake-store.onrender.com/api/products";
const urlImages = "https://nike-fake-store.onrender.com/api/images/";

const getImage = async (id) => {
	const data = await getData(urlImages + id);
	return data[0].imageUrls;
};

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [imageUrls, setImageUrls] = useState([]);
	const userID = "1";
	const quantity = 1;

	const addToCart = async (userID, productID, quantity) => {
		try{
			const response = await axios.post("https://nike-fake-store.onrender.com/api/cart", {userID, productID, quantity});
			console.log(response.data);
		}catch(error){
			console.log(error);
		}
	};

	useEffect(() => {
		getData(urlProducts).then((data) => {
			setProducts(data);
			const urls = data.map((product) => getImage(product.productID));
			Promise.all(urls).then((urls) => setImageUrls(urls));
		});
	}, []);

	return (
		<div className="container-items">
			{products?.map((product, index) => (
				<div className="item" key={product.productID}>
					<img src={imageUrls[index]} alt={product.nameProduct} />
					<div className="info-product">
						<h2>{product.productName}</h2>
						<p className="price">${product.price}</p>
						<button onClick={() => addToCart(userID, product.productID, quantity)}>Añadir al carrito</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProductList;