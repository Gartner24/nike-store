import React from "react";
import './css/CartWindow.css';

const CartWindow = ({ onClose }) => {
    return (
        <div className="cart-window">
            <h2>Carrito de compras</h2>
            <ul className="cart-list">
                <li>Producto 1</li>
                <li>Producto 2</li>
                <li>Producto 3</li>
            </ul>
            <button className = "close-button" onClick={onClose}>Cerrar</button>
        </div>
    );
};

export default CartWindow;