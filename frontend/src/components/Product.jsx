import React, { useState } from "react";
import "./css/product.css";
import Carrusel from "./Carrusel";

const Product = ({ image, name, description, price }) => {
  // console.log(props.image)
  // console.log(`../assets/${props.image}.png`)
  const [count, setCount] = useState(0);
  const product = {
    name: "Adidas Superstar",
    image: "../../public/products/product-2.jpg",
    description:
      "Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors.",
    price: "80",
    count: "0",
  };
  return (
	<>
    <div className="Product">
      <img src={`../../public/products/product-2.jpg`} alt={name} />
      <div className="ProductInfo">
        <h2>{`Jordan Air Force 1`}</h2>
        <p>{`${1000}$`}</p>
        <p>{`Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors.`}</p>
        <div className="AddToCart">
          <div className="AddToCartCont">
            <span>{0}</span>
            <button onClick={() => setCount(count - 1)} disabled={count === 0}>
              -
            </button>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <button
            className="AddToCartButton"
            onClick={() => {
              console.log("Added to cart");
              setCount(count + 1);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
	<Carrusel />
	</>
  );
};

export default Product;
