import React from "react";
import "./css/About.css";
import video from "../assets/AboutVideo.mp4"
import NikeGirl from "../assets/NikeGirl.jpg"

/**
 * About Component
 * Renders information about the Nike Store, including vision and mission statements.
 */
const About = () => {
  return (
    <>
      <div className="about-main-container">

        {/* Video section */}
        <div className='about-video-container'>
          <video id="video" autoPlay muted loop className='about-video'>
            <source src={video} type='video/mp4'  />
          </video>
          <div className="about-title">  
            BRING <br />
            INSPIRATION<br />
            AND<br />
            INNOVATION<br />
          </div>  
          <div class="about-video-overlay"></div>
        </div>

        {/* Vision section */}
        <div className="about-vision fade-in-left ">
          <div className="about-vision-tittle">VISION</div>
          <div className="about-vision-body">
            The vision of the Nike Store is to inspire and innovate, empowering athletes and sports enthusiasts around the world to reach their full potential. We strive to be the leading athletic brand globally, committed to delivering superior products and experiences that enhance performance and inspire a sense of greatness.
          </div>
        </div>

        {/* Image section */}
        <img src={NikeGirl} alt="Nike girl photo" className="photoGirl" />

        {/* Mission section */}
        <div className="about-mission fade-in-right">
          <div className="about-mission-body">                  
            The mission of the Nike Store is to inspire and innovate, empowering athletes and sports enthusiasts around the world to reach their full potential. We strive to be the leading athletic brand globally, committed to delivering superior products and experiences that enhance performance and inspire a sense of greatness.
          </div>
          <div className="about-mission-tittle">MISSION</div>
        </div>
      </div>
    </>
  );
}

export default About;
