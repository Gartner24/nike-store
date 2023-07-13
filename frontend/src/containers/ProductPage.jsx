import Product from '../components/ProductCard';

import React from 'react';
import './css/ProductPage.css';
import ProductCard from '../components/ProductCard';
import Carrusel from '../components/Carrusel';
import { products } from '../data';


const ProductPage = () => {



  return (
	<>
    <div>
		<Carrusel />
      <div className="row">
        {products?.map(({ productID,name,image,description,price }) => (
          
          <div className="col-md-4" key={productID}>
            <ProductCard
              id = { productID }
              name={name}
              image={image}
              description={description}
              price={price}
            />
          </div>
        ))}
      </div>
    </div>
	</>
  );
};

export default ProductPage;

