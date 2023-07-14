import React, { useState } from 'react';
import './css/productcard.css';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({id,image, name, description, price}) => {


 const navigate = useNavigate();

 const handleClick = () => {

 navigate(`/product/${id}`)

 }

  return (
    <div className='contenedor-cartaproducto' onClick={handleClick}>
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