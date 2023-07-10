import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = ({onClick}) => {
    return (
        <div className="cart-icon" onClick={onClick}>
            <FaShoppingCart />
        </div>
    );
};

export default CartIcon;