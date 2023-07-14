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

  // Fetch the images associated with the product
  const getImages = async (id) => {
    const images = await getData(urlImages + id);
    const isNotFrontImage = images.filter((image) => image.isFront === false);
    setImages(isNotFrontImage);
    setFrontImage(images[0]);
  };

  // Fetch the product details
  const getProduct = async () => {
    const productResponse = await getData(urlProducts + id);
    setProduct(productResponse);
    await getImages(productResponse.productID);
  };

  // Handle image click to update the front image and reorder the images
  const handleClickImage = (image) => {
    const newFrontImage = image;
    const newImages = images.filter((image) => image.imageID !== newFrontImage.imageID);
    newImages.push(frontImage);
    setImages(newImages);
    setFrontImage(newFrontImage);
  };

  // Handle adding the product to the cart
  const handleAddToCart = async () => {
    const data = {
      userID: userID,
      productID: product.productID,
      quantity: count,
    };
    const response = await postData(`${urlCart}/add`, data);
    console.log(response);
  };

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
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
              <button className='AddToCartButton' onClick={handleAddToCart}>
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
