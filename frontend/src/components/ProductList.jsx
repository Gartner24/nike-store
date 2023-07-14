import React, { useState, useEffect } from 'react';
import './css/ProductList.css';
import getData from '../helpers/getData';
import { urlProducts, urlImages } from '../helpers/urls';
import { Link } from 'react-router-dom';

/**
 * Component for displaying a list of products.
 */
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  /**
   * Fetches the image URL for a given product ID.
   * @param {number} id - Product ID.
   * @returns {Promise<string>} - Image URL.
   */
  const getImage = async (id) => {
    const data = await getData(urlImages + id).then(
      (data) => data[0].imageURL
    );
    return data;
  };

  useEffect(() => {
    // Fetches the list of products and their image URLs on component mount.
    getData(urlProducts).then((data) => {
      setProducts(data);
      const urls = data.map((product) => getImage(product.productID));
      Promise.all(urls).then((urls) => setImageUrls(urls));
    });
  }, []);

  const firstThreeProducts = products.slice(0, 3);

  return (
    <div className="container-items">
      {firstThreeProducts.map((product, index) => (
        <div className="item" key={product.productID}>
          <img src={imageUrls[index]} alt={product.nameProduct} />
          <div className="info-product">
            <h2>{product.productName}</h2>
            <p className="price">${product.price}</p>
            <Link to="/store">
              <button>Show more...</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
