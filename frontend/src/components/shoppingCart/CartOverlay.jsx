import React, {useState} from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartWindow from "./CartWindow";
import '../css/CartIcon.css';

const CartOverlay = () => {
    const [cartOpen, setCartOpen] = useState(false);

    const handleCartOpen = () => {
        setCartOpen(!cartOpen);
    };

    const handleCartClose = () => {
        setCartOpen(false);
    };

    return (
        <div className="cart-overlay">
            <FaShoppingCart className="cart-icon" onClick={handleCartOpen}/>
            {cartOpen && <CartWindow onClose={handleCartClose}/>}
        </div>
    );
};

export default CartOverlay;

