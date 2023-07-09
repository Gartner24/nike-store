import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./css/carrusel.css";
import { Carousel } from 'react-responsive-carousel';


export default function CarouselComponent() {
    return (
        <div class="carousel-wrapper">
            <Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
                <div>
                    <img src="../public/tenis-1.jpg" />
                </div>
                <div>
                    <img src="../public/tenis-2.jpg" />
                </div>
                <div>
                    <img src="../public/tenis-3.gif" />
                </div>
            </Carousel>
        </div>
    );
}