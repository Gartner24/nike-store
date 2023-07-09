import React, { useState } from 'react';
import './css/product.css';

const Product = ({ image, name, description, price }) => {
	// console.log(props.image)
	// console.log(`../assets/${props.image}.png`)
	const [count, setCount] = useState(0);
	return (
		<div className='Product'>
			{/* <img src={image} alt={name} /> */}
			<div className='ProductInfo'>
				<h2>{name}</h2>
				<p>{`${price}$`}</p>
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
	);
};

export default Product;
