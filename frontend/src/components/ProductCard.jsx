import React from 'react';
import './css/product.css';

const ProductCard = ({image, name, description, price}) => {
  return (
    <div className='contenedor-cartaproducto'>
      <img
        className='imagen-cartaproducto'
        src={image}
        alt={name}
      />
      <div className='contenedor-texto-cartaproducto'>
        <p className='nombre-cartaproducto'>{name}</p>
        <p className='descripcion-cartaproducto'>{description}</p>
        <p className='precio-cartaproducto'>${price} USD</p>
      </div>
    </div>
  );
}

export default ProductCard;