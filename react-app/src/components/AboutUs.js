import React from 'react';
import './styles/AboutUs.css';

const AboutUs = () => {
  return(
    <div>
        <div className="title_container">
            <h1 className="title">We want to help you help yourself.</h1>
        </div>
        <div className="about_us_outer_container">
            <div className="about_us_inner_container">
                <a href="https://github.com/josh-willy91" target="_blank">
                    <div className="each_person">
                        <img src="/public/pics/Joshua.png" className="person_pic"></img>
                    </div>
                </a>
                <a href="https://github.com/babypwant" target="_blank">
                    <div className="each_person">
                        <img src="/public/pics/Gary.png" className="person_pic"></img>
                    </div>
                </a>
                <a href="https://github.com/ebtayara" target="_blank">
                    <div className="each_person">
                        <img src="/public/pics/Eb.png" className="person_pic"></img>
                    </div>
                </a>
                <a href="https://github.com/justinycho-business" target="_blank">
                    <div className="each_person">
                        <img src="/public/pics/Justin.png" className="person_pic"></img>
                    </div>
                </a>
                </div>
            </div>
        </div>
  )
}

export default AboutUs
