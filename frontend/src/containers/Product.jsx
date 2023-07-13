import React, { useEffect, useState } from 'react';
import './css/product.css';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { urlProducts, urlImages } from '../helpers/urls';
import getData from '../helpers/getData';

const Product = () => {
	const [product, setProduct] = useState(null);
	const [images, setImages] = useState([]);
	const [frontImage, setFrontImage] = useState(null);
	const [count, setCount] = useState(0);
	const { id } = useParams();

	const getImages = async (id) => {
		const images = await getData(
			'https://nike-fake-store.onrender.com/api/images/' + id
		);
		const isNotFrontImage = images.filter((image) => image.isFront === false);
		setImages(isNotFrontImage);
		setFrontImage(images.filter((image) => image.isFront === true)[0].imageURL);
	};

	const getProduct = async () => {
		const productResponse = await getData(urlProducts + id);
		setProduct(productResponse);
		await getImages(productResponse.productID);
	};

	useEffect(() => {
		getProduct();
		console.log(images);

	}, []);

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
						image={frontImage}
						name={product.name}
						description={product.description}
						price={product.price}
					/>
					<div className='ProductInfo'>
						<h2>{product.name}</h2>
						<p>{product.price}</p>
						<p>{product.description}</p>

						{images.map((image) => (
							<img src={image.imageURL} alt={image.imageURL} />
						))}


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
			)}
		</>
	);
};

export default Product;
