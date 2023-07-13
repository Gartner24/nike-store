import React, { useState, useEffect } from 'react';
import "react-multi-carousel/lib/styles.css";
import "./css/Carrusel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import getData from '../helpers/getData';
import { urlProducts, urlImages } from '../helpers/urls';
import { useNavigate } from 'react-router-dom';



function Carrusel() {
  const [products, setProducts] = useState([]);
	const [imageUrls, setImageUrls] = useState([]);

	const getImage = async (id) => {
		const data = await getData(urlImages + id).then(
			(data) => data[0].imageURL
		);
		return data;
	};

	useEffect(() => {
		getData(urlProducts).then((data) => {
			setProducts(data);
			const urls = data.map((product) => getImage(product.productID));
			Promise.all(urls).then((urls) => setImageUrls(urls));
		});
	}, []);
  
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 2, // Número de elementos a desplazar en cada transición
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

    const navigate = useNavigate();

  const handleClick = (product) => {
    const id = product.id
    navigate(`/product/${id}`);
  };

  return (
    <div className="carousel-wrapper">
      <h1 className="title">Choose one:</h1>
      <Carousel responsive={responsive} ssr={true} infinite={true} centerMode={true} keyBoardControl={true}>
        {products.map((product, index) => (
          <div className="slide" key={index}>
            <img src={imageUrls[index]} alt={product.nameProduct} onClick={(product) => handleClick(product)} />
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