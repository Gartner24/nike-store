import React, { useEffect, useState } from 'react';
import './css/product.css';
import { useParams } from 'react-router-dom';
import { products } from '../data';

const Product = () => {

	const [product, setProduct] = useState(null);
	
	// console.log(props.image)
	// console.log(`../assets/${props.image}.png`)
	const [count, setCount] = useState(0);

	const { id } = useParams();

	console.log(id)

	const getProduct = () => {
		const response = products.filter((product) => id == product.id )
		setProduct(response)	
	}

	useEffect(() => {
	  getProduct()
	}, [])
	
	console.log( "Este es el producto: " + product)

	return (
		<>
 	{ 
		product == null?
		(
			
		<div className='Product'>
		{/* <img src={image} alt={name} /> */}
		<div className='ProductInfo'>
			<h2>{product}</h2>
			<p>{price}</p>
			<p>{description}</p>
			<div className='AddToCart'>
				<div className='AddToCartCont'>
					<span>{count}</span>
					<button
						onClick={() => setCount(count - 1)}
						disabled={count === 0}
					>
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
		):
		(
			<div>
			loading...
			</div>
		)
	 }
	 </>
	)
};

export default Product;
