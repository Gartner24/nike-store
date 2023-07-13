import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/ProductList.css";
import getData from "../helpers/getData";

const urlProducts = "https://nike-fake-store.onrender.com/api/products";
const urlImages = "https://nike-fake-store.onrender.com/api/images/";

const getImage = async (id) => {
	const data = await getData(urlImages + id).then((data) => data[0].imageURL);
	return data;
	  };

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [imageUrls, setImageUrls] = useState([]);

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
						<button>Añadir al carrito</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProductList;
