import React from "react";
import { data } from "../data";

export const ProductList = () => {
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
            <button>Añadir al carrito</button>
          </div>
        </div>
      ))}
    </div>
  );
};
