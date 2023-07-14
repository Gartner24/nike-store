import React from 'react';
import "./css/cartMenu.css";

const CartMenu = () => {
  // Aquí puedes agregar la lógica para obtener los elementos del carrito

  // Supongamos que tienes una variable `cartItems` que representa los elementos del carrito
  const cartItems = [
    { id: 1, name: "Item 1", cant: 10, price: 10 },
    { id: 2, name: "Item 2", cant: 25, price: 10  },
    { id: 3, name: "Item 3", cant: 28, price: 10 },
  ];

  return (
    <div className="cart-menu">
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <button className="cart-menu-button">-</button>
            <span>{item.cant}</span>
            <button className="cart-menu-button">+</button>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
      <button className="checkout-button">Buy Now!</button>
    </div>
  );
}; 


export default CartMenu;