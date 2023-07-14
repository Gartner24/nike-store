import React, { useState, useEffect } from 'react';
import './css/ProductList.css';
import getData from '../helpers/getData';
import { urlProducts, urlImages } from '../helpers/urls';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const getImage = async (id) => {
    const data = await getData(urlImages + id).then(
      (data) => data[0].imageURL
    );
    return data;
  };

  useEffect(() => {
    getData(urlProducts).then((data) => {
      setProducts(data);
      const urls = data.map((product) => getImage(product.productID));
      Promise.all(urls).then((urls) => setImageUrls(urls));
    });
  }, []);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container-items">
      {products?.map((product, index) => (
        <div className="item" key={product.productID} onClick={() => handleClick(product.productID)}>
          <img src={imageUrls[index]} alt={product.nameProduct} />
          <div className="info-product">
            <h2>{product.productName}</h2>
            <p className="price">${product.price}</p>
            <button>Show More</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;


