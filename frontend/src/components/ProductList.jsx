
import React, { useState } from "react";
import { products } from "../data";
import "./css/ProductList.css";

const ProductList = () => {
	const [products, setProducts] = useState([{ 
		productID: 1,
		productName: 'Zapatos',
		description: 'descrpasdasd',
		price: 200,
	 },
	 { 
		productID: 2,
		productName: 'Zapatos2',
		description: 'descrpasdasd',
		price: 200,
	 },
	 { 
		productID: 3,
		productName: 'Zapatos3',
		description: 'descrpasdasd',
		price: 200,
	 }]);

	return (
		<div className='container-items'>
			{products?.map((product) => (
				<div className='item' key={product.productID}>
					<figure>
						{/* <img src={product.img} alt={product.nameProduct} /> */}
					</figure>
					<div className='info-product'>
						<h2>{product.productName}</h2>
						<p className='description'>${product.description}</p>
						<p className='price'>${product.price}</p>
						<button>Añadir al carrito</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProductList;
