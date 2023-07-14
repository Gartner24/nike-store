import React, { useState, useEffect } from 'react';
import './css/ProductList.css';
import getData from '../helpers/getData';
import { urlProducts, urlImages } from '../helpers/urls';
import { Link } from 'react-router-dom';

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

	const firstThreeProducts = products.slice(0, 3);

	return (
		<div className='container-items'>
			{firstThreeProducts.map((product, index) => (
				<div className='item' key={product.productID}>
					<img src={imageUrls[index]} alt={product.nameProduct} />
					<div className='info-product'>
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