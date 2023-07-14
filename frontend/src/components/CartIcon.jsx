import React from 'react';
import "./css/navbar.css";
import { FaShoppingCart } from 'react-icons/fa';
import "./css/cartIcon.css"

const CartIcon = ({ itemCount, onClick }) => {
  return (
    <div className="cart-icon" onClick={onClick}>
      {/* cart icon with the same icon size than login_icon */}
      <FaShoppingCart size={20} />
      {itemCount > 0 && <span className="item-count">{itemCount}</span>}
    </div>
  );
};

export default CartIcon;
