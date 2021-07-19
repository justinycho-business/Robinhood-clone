import React from 'react';
import './styles/AboutUs.css';

const AboutUs = () => {
  return(
    <div>
        <div className="title_container">
          <h1 className="title">We want to help you help yourself.</h1>
        </div>
        <div className="about_us_container">
            <a href="https://github.com/josh-willy91" target="_blank">
                <div className="each_person">
                    <img src="" className="person_pic"></img>
                </div>
            </a>
            <a href="https://github.com/babypwant" target="_blank">
                <div className="each_person">
                    <img src="" className="person_pic"></img>
                </div>
            </a>
            <a href="https://github.com/ebtayara" target="_blank" id="github_link">
                <div className="each_person">
                    <img src="" className="person_pic"></img>
                </div>
            </a>
            <a href="https://github.com/justinycho-business" target="_blank">
                <div className="each_person">
                    <img src="" className="person_pic"></img>
                </div>
            </a>
            </div>
        </div>
  )
}

export default AboutUs
