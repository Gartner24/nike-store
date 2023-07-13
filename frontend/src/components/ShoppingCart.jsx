import React from "react";

const ShoppingCart = ({ cart }) => {
    const removeFromCart = (productID) => {
      setCart((prevCart) => prevCart.filter((item) => item.productID !== productID));
    };
  
    return (
      <div className="shopping-cart">
        <h2>Carrito de compras</h2>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <ul>
            {cart.map((product) => (
              <li key={product.productID}>
                <span>{product.productName}</span>
                <button onClick={() => removeFromCart(product.productID)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default ProductList;