import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { data } from "../data";

const ProductList = () => {
	const [products, setProducts] = useState([]);

  

	useEffect(() => {
		axios
			.get('http://localhost:8080/api/products')
			.then((res) => {
				setProducts(res.data);
        console.log(res.data)
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className='container-items'>
			{/* {data.map((product) => (
				<div className='item' key={product.id}>
					<figure>
						<img src={product.img} alt={product.nameProduct} />
					</figure>
					<div className='info-product'>
						<h2>{product.nameProduct}</h2>
						<p className='price'>${product.price}</p>
						<button>Añadir al carrito</button>
					</div>
				</div>
			))} */}
		</div>
	);
};

export default ProductList;
