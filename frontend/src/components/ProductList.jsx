import React from "react";
import { data } from "../data";

const ProductList = ({onAddToCart}) => {
  const addToCart = (product) => {
    onAddToCart(product);
  };
  return (
    <div className="container-items">
      {data.map(product => (
        <div className="item" key={product.id}>
          <figure>
            <img src={product.img} alt={product.nameProduct} />
          </figure>
          <div className="info-product">
            <h2>{product.nameProduct}</h2>
            <p className='price'>${product.price}</p>
            <button onClick={() => addToCart(product)}>Añadir al carrito</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;


