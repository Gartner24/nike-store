import React from "react";
import "./css/About.css";

const About = () => {
    return (
      <div className="About">
        <div className="container">
        <h1 className="About-title">
          <strong>ABOUT US</strong>
        </h1>
  
        <div className="About-body">
          <h2 className="text">VISION</h2>
          <p className="About-vision-text">
            To be recognized as the leading brand in the world of tennis, offering products of the highest quality and innovative design that inspire and enhance the performance of athletes, both professionals and enthusiasts, at every step of their journey towards success.
          </p>
  
          <h2 className="text">OBJECTIVE</h2>
          <p className="About-objective-text">
            Our goal is to be the preferred choice of tennis players worldwide, providing an exceptional experience through our products. We strive to be the brand chosen by the world's top athletes, collaborating closely with them to develop products that meet their needs and exceed their expectations. Additionally, we aim to expand our reach to new markets and consumer segments, fostering growth and passion for tennis across all ages and skill levels. Through excellence in quality, constant innovation, and an unwavering commitment to customer satisfaction, we endeavor to make every player feel more confident, comfortable, and competitive on the court.
          </p>
        </div>
        </div>
      </div>
    );
  }
  
  export default About;
  