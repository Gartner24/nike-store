import React, { useState, useEffect } from 'react';
import './css/ProductPage.css';
import ProductCard from '../components/ProductCard';
import Carrusel from '../components/Carrusel';
import getData from '../helpers/getData';
import { urlProducts, urlImages } from '../helpers/urls';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // Function to fetch the image URL for a given product ID
  const getImage = async (id) => {
    const data = await getData(urlImages + id).then(
      (data) => data[0].imageURL
    );
    return data;
  };

  useEffect(() => {
    // Fetch product data and image URLs
    getData(urlProducts).then((data) => {
      setProducts(data);
      const urls = data.map((product) => getImage(product.productID));
      Promise.all(urls).then((urls) => setImageUrls(urls));
    });
  }, []);

  return (
    <>
      <div>
        <Carrusel />

        <div className="row">
          <h1 className='title-just-do-it'> JUST DO IT </h1>
          <div className='productss'>
            {/* Render ProductCard components for each product */}
            {products.map((product, index) => (
              <div className="col-md-4" key={product.productID}>
                <ProductCard
                  product={product}
                  imageUrl={imageUrls[index]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
