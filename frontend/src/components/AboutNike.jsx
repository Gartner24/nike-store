import React from "react";
import "./css/About.css";
import video from "../assets/AboutVideo.mp4"
import video2 from "../assets/NIKE-Background.mp4"

const About = () => {
    return (
      <>

      <div className="about-main-container">

                <div className='about-video-container'>

                        <video id="video" autoPlay muted loop className='about-video'>
                            <source src={video} type='video/mp4'  />
                        </video>

                    <div className="about-tittle"> ABOUT US </div>  
                    <div class="about-video-overlay"></div>
                </div>

                

                <div className="about-vision">
                    <div className="about-vision-tittle">VISION</div>
                    <div className="about-vision-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid exercitationem hic illum, praesentium consectetur incidunt doloribus explicabo voluptatibus soluta labore, architecto officia sint doloremque, eligendi ut ipsa aperiam vero illo?
                    </div>
                </div>
                


                <div className='about-video-container'>
                        <video id="video2" autoPlay muted loop className='about-video'>
                            <source src={video2} type='video/mp4' />
                        </video>
                    <div class="about-video-overlay"></div>
                </div>



                <div className="about-mission">
                    <div className="about-mission-body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid exercitationem hic illum, praesentium consectetur incidunt doloribus explicabo voluptatibus soluta labore, architecto officia sint doloremque, eligendi ut ipsa aperiam vero illo?
                    </div>
                    <div className="about-mission-tittle">MISION</div>
                </div>


        </div>

       </>
    );
  }
  
  export default About;
  