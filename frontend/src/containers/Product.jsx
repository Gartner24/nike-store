import React, { useEffect, useState } from 'react';
import './css/product.css';
import { useParams } from 'react-router-dom';
import { urlProducts, urlImages, urlCart } from '../helpers/urls';
import getData from '../helpers/getData';
import postData from '../helpers/postData';

const Product = () => {
	const [product, setProduct] = useState(null);
	const [images, setImages] = useState([]);
	const [frontImage, setFrontImage] = useState(null);
	const [count, setCount] = useState(1);
	const [userID, setUserID] = useState(1);
	const { id } = useParams();

	const getImages = async (id) => {
		const images = await getData(urlImages + id);
		const isNotFrontImage = images.filter(
			(image) => image.isFront === false
		);
		setImages(isNotFrontImage);
		setFrontImage(images[0]);
	};

	const getProduct = async () => {
		const productResponse = await getData(urlProducts + id);
		setProduct(productResponse);
		await getImages(productResponse.productID);
	};

	const handleClickImage = (image) => {
		const newFrontImage = image;
		// remove image from images and add frontImage to images
		const newImages = images.filter((image) => image.imageID !== newFrontImage.imageID);
		newImages.push(frontImage);
		setImages(newImages);
		setFrontImage(newFrontImage);
	};

	const handleAddToCart = async () => {
		const data = {
			userID: userID,
			productID: product.productID,
			quantity: count,
		};
		const response = await postData(`${urlCart}/add`, data);
		console.log(response);
	}

	useEffect(() => {
		getProduct();
	}, []);

	return (
		<>
			{!product ? (
				<h1>Loading...</h1>
			) : (
				<div className='productContainer'>
					<div className='productFrontImage'>
						<img src={frontImage?.imageURL} alt={product.productName} />
					</div>
					<div className='ProductInfo'>
						<div className='imagesContainer'>
							{images.map((image) => (
								<img
									key={image.imageID}
									onClick={() => handleClickImage(image)}
									src={image.imageURL}
									alt={image.imageURL}
								/>
							))}
						</div>
						<div className='productInfoContainer'>
							<p className='productPrice'>$ {product.price}</p>
							<h2 className='productName'>{product.productName}</h2>
							<p className='productDescription'>{product.description}</p>
						</div>
						<div className='AddToCart'>
							<div className='AddToCartContainer'>
								<span>{count}</span>
								<button
									onClick={() => setCount(count - 1)}
									disabled={count === 1}
								>
									-
								</button>
								<button onClick={() => setCount(count + 1)}>
									+
								</button>
							</div>
							<button
								className='AddToCartButton'
								onClick={handleAddToCart}
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

// import React, { useEffect, useState } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import './css/Product.css';
// import URLS from '../helpers/urls';
// import getData from '../helpers/getData';

// const urlCart = "https://nike-fake-store.onrender.com/api/cart";

// const Product = () => {
//   const { id } = useParams();
//   const history = useHistory();
//   const [product, setProduct] = useState(null);
//   const dataProduct = getData(`${URLS.urlProduct}/${id}`);
//   console.log(dataProduct);

//   return (
//     <div className="product-container">
//       {product ? (
//         <div>
//           <h2>{product.name}</h2>
//           <p>Price: ${product.price}</p>
//           <button onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Product;
