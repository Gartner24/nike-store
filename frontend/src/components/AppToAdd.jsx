import React, { useState } from 'react';
import ProductList from './ProductList';
import CartOverlay from './CartOverlay';

const AppToAdd = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAddToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    const updatedTotal = total + product.price;
    setCartItems(updatedCartItems);
    setTotal(updatedTotal);
  };

  return (
    <div>
      <ProductList onAddToCart={handleAddToCart} />
      <CartOverlay cartItems={cartItems} total={total} />
    </div>
  );
};

export default AppToAdd;

