import Product from "../components/ProductCard";

import React from "react";
import "./css/ProductPage.css";
import ProductCard from "../components/ProductCard";
import Carrusel from "../components/Carrusel";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const products = [
    {
      name: "Nike Jordan",
      image: "../../public/products/product-1.jpg",
      description: `Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors`,
      price: "100",
      count: "0",
    },
    {
      name: "Adidas Superstar",
      image: "../../public/products/product-2.jpg",
      description:
        "Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors.",
      price: "80",
      count: "0",
    },
    // Agrega aquí los demás productos...
    {
      name: "Puma Suede",
      image: "../../public/products/product-3.jpg",
      description:
        "Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors.",
      price: "75",
      count: "0",
    },
    {
      name: "Nike Jordan",
      image: "../../public/products/product-4.jpg",
      description: `Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors`,
      price: "100",
      count: "0",
    },
    {
      name: "Nike Jordan",
      image: "../../public/products/product-5.jpg",
      description: `Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors`,
      price: "100",
      count: "0",
    },
    {
      name: "Nike Jordan",
      image: "../../public/products/product-6.jpg",
      description: `Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors`,
      price: "100",
      count: "0",
    },
    {
      name: "Nike Jordan",
      image: "../../public/products/product-7.jpg",
      description: `Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors`,
      price: "100",
      count: "0",
    },
    {
      name: "Nike Jordan",
      image: "../../public/products/product-8.jpg",
      description: `Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors`,
      price: "100",
      count: "0",
    },
    {
      name: "Nike Jordan",
      image: "../../public/products/product-1.jpg",
      description: `Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors`,
      price: "100",
      count: "0",
    },
    {
      name: "Nike Jordan",
      image: "../../public/products/product-2.jpg",
      description: `Classic sneakers with a timeless design. The Adidas Superstar is an iconic shoe that has been popular for decades. It features a rubber shell toe, leather upper, and signature three stripes. Available in various colors`,
      price: "100",
      count: "0",
    },
  ];

  return (
    <Link to="/product">
      <div>
        <Carrusel />
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-4" key={index}>
              <ProductCard
                name={product.name}
                image={product.image}
                description={product.description}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductPage;
