import React from 'react';
import "./css/cartMenu.css";
import axios from 'axios';


  // Aquí puedes agregar la lógica para obtener los elementos del carrito

  // Supongamos que tienes una variable `cartItems` que representa los elementos del carrito
  // const cartItems = [
  //   { id: 1, name: "Item 1", cant: 10, price: '$100' },
  //   { id: 2, name: "Item 2", cant: 25, price: '$120'  },
  //   { id: 3, name: "Item 3", cant: 28, price: '$900' },
  // ];

  const CartMenu = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
      const fetchCartItems = async () => {
        try{
          const response = await axios.get("https://nike-fake-store.onrender.com/api/cart");
          setCartItems(response.data.cartItems);
        }catch(error){
          console.log(error);
        }
      };

      fetchCartItems();
    }, []);

  return (
    <div className="cart-menu">
      <ul>
        {cartItems.map((item) => (
          <li key={item.cartID}>
            <span>{item.productName}</span>
            <button className="cart-menu-button">-</button>
            <span>{item.quantity}</span>
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
