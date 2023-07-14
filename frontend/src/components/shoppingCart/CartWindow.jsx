import React, { useState } from "react";
import '../css/CartWindow.css';

const CartWindow = ({ onClose }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    return (
        <div className="cart-window">
            <h3>El carrito está vacío</h3>
            <ul className="cart-list">
                {cartItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button className="close-button" onClick={onClose}>
                Cerrar
            </button>
        </div>
    );
};

export default CartWindow;

