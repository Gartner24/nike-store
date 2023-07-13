import React, { useEffect, useState } from 'react';
import './css/product.css';
import { useParams } from 'react-router-dom';
import { products } from '../data';
import ProductCard from './ProductCard';
import { urlProducts, urlImages } from '../helpers/urls';

const Product = () => {
	const [product, setProduct] = useState(null);
	const [count, setCount] = useState(0);
	const { id } = useParams();

	const getProduct = () => {
		const response = products.find((product) => Number(id) === product.productID);


		setProduct(response);
	};

	useEffect(() => {
		getProduct();
	}, []);

	console.log('Este es el producto:', product);

	return (
		<>
			{product === null ? (
				<div className='Product'>
					<div className='ProductInfo'>
						<h2>Loading...</h2>
					</div>
				</div>
			) : (
				<div className='Product'>
					<ProductCard
						id={product.id}
						image={product.image}
						name={product.name}
						description={product.description}
						price={product.price}
					/>
					<div className='ProductInfo'>
						<h2>{product.name}</h2>
						<p>{product.price}</p>
						<p>{product.description}</p>
						<div className='AddToCart'>
							<div className='AddToCartCont'>
								<span>{count}</span>
								<button onClick={() => setCount(count - 1)} disabled={count === 0}>
									-
								</button>
								<button onClick={() => setCount(count + 1)}>+</button>
							</div>
							<button
								className='AddToCartButton'
								onClick={() => {
									console.log('Added to cart');
									setCount(count + 1);
								}}
							>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Product;
