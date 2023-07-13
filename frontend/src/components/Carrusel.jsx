import React from "react";
import "react-multi-carousel/lib/styles.css";
import "./css/Carrusel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


function Carrusel() {
    const products = [
      { src: "../public/products/product-1.jpg", alt: "Product 1", description: "Description 1", price: "$10.99" },
      { src: "../public/products/product-2.jpg", alt: "Product 2", description: "Description 2", price: "$15.99" },
      { src: "../public/products/product-3.jpg", alt: "Product 3", description: "Description 3", price: "$12.99" },
      { src: "../public/products/product-4.jpg", alt: "Product 4", description: "Description 4", price: "$9.99" },
      { src: "../public/products/product-5.jpg", alt: "Product 5", description: "Description 5", price: "$14.99" },
      { src: "../public/products/product-6.jpg", alt: "Product 6", description: "Description 6", price: "$11.99" },
      { src: "../public/products/product-7.jpg", alt: "Product 7", description: "Description 7", price: "$8.99" },
      { src: "../public/products/product-8.jpg", alt: "Product 8", description: "Description 8", price: "$13.99" },
    ];
  
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 1, // Número de elementos a desplazar en cada transición
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2, // Número de elementos a desplazar en cada transición
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // Número de elementos a desplazar en cada transición
      },
    };
  
    return (
      <div className="carousel-wrapper">
        <h1 className="title">Choose one:</h1>
        <Carousel responsive={responsive} ssr={true} infinite={true} centerMode={true} keyBoardControl={true}>
          {products.map((product, index) => (
            <div className="slide" key={index}>
              <img src={product.src} alt={product.alt} />
              <div className="description">{product.description}</div>
              <div className="price">{product.price}</div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
  
  export default Carrusel;
  

// //Enlances de los tenis del carrusel
// https://www.nike.com/es/t/air-jordan-1-zoom-cmft-2-zapatillas-CKQv2p/DV1307-100
// https://www.nike.com/es/t/jordan-delta-3-mid-zapatillas-DhVCnZ/DR7614-060
// https://www.nike.com/es/t/air-jordan-1-zoom-air-cmft-2-zapatillas-qn2GdG/DV1305-104
// https://www.nike.com/es/t/air-jordan-11-cmft-low-zapatillas-d27Kv5/DV2629-101
// https://www.nike.com/es/t/air-jordan-5-dj-khaled-zapatillas-6bZCX4/DV4982-641
// https://www.nike.com/es/t/air-jordan-legacy-312-low-zapatillas-bzRR8v
// https://www.nike.com/es/t/luka-1-next-nature-zapatillas-de-baloncesto-CCfKwx/DN1772-676
// https://www.nike.com/es/t/air-jordan-1-mid-zapatillas-h09Nm1