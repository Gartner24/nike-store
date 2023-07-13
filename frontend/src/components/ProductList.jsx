import React from 'react';
import { products } from '../data';
import './css/ProductList.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const displayedProducts = products.slice(0, 3); // Mostrar solo los primeros 3 productos

  return (
    <div className='container-items'>
      {displayedProducts.map((product) => (
        <div className='item' key={product.id}>
          <figure>
            {/* <img src={product.img} alt={product.nameProduct} /> */}
          </figure>
          <div className='info-product'>
            <img className='image' src={product.image} alt={product.productName} />
            <h2>{product.productName}</h2>
            <p className='description'>${product.description}</p>
            <Link to='/Store'><button>Go to store</button></Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
