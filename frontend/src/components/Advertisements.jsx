import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './css/Advertisements.css';
import { Carousel } from 'react-responsive-carousel';

/**
 * Advertisements Component
 * Renders a carousel of advertisements.
 */
const Advertisements = () => {
  const images = [
    { src: '../public/advertisements/tenis-1.jpg' },
    { src: '../public/advertisements/tenis-2.jpg' },
    { src: '../public/advertisements/tenis-3.gif' },
  ];

  return (
    <div className='carousel-wrapper'>
      {/* Carousel component */}
      <Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
        {/* Iterate over images and render each image as a slide */}
        {images.map((image, index) => (
          <div key={index}>
            {/* Image slide */}
            <img
              className='carousel-image' // Adds a CSS class for the carousel images
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
