import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './css/Advertisements.css';
import { Carousel } from 'react-responsive-carousel';

const Advertisements = () => {
  const images = [
    { src: '../public/advertisements/tenis-1.jpg' },
    { src: '../public/advertisements/tenis-2.jpg' },
    { src: '../public/advertisements/tenis-3.gif' },
  ];

  return (
    <div className='carousel-wrapper'>
      <Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              className='carousel-image' // Agrega una clase CSS para las imágenes del carrusel
              src={image.src}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Advertisements;
