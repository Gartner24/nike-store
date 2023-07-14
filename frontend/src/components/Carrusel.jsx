import React, { useState, useEffect } from 'react';
import 'react-multi-carousel/lib/styles.css';
import './css/Carrusel.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { urlProducts, urlImages } from '../helpers/urls';
import { useNavigate } from 'react-router-dom';
import getData from '../helpers/getData';

function Carrusel() {
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const getImage = async (id) => {
    const data = await getData(urlImages + id).then((data) => data[0].imageURL);
    return data;
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getData(urlProducts);
      setProducts(productsData);
      const urls = await Promise.all(productsData.map((product) => getImage(product.productID)));
      setImageUrls(urls);
    };
    fetchProducts();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const navigate = useNavigate();

  const handleClick = (index) => {
    const id = products[index].id;
    navigate(`/product/${id}`);
  };

  return (
    <div className="carousel-wrapper">
      <h1 className="title">Choose one:</h1>
      <Carousel responsive={responsive} ssr infinite centerMode keyBoardControl>
        {products.map((product, index) => (
          <div className="slide" key={index}>
            <img src={imageUrls[index]} alt={product.nameProduct} onClick={() => handleClick(index)} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Carrusel;
