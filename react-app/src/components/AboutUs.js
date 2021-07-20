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
                <div className="about_us_container">
                    <div className="each_person">
                        <img src="/pics/Joshua.png" className="person_pic"></img>
                            <a href="https://github.com/josh-willy91" target="_blank">
                              Joshua Williams
                            </a>
                    <div className="person_desc">
                        <h2>Awesome guy.</h2>
                    </div>
                    </div>
                    <div className="each_person">
                        <img src="/pics/Gary.png" className="person_pic"></img>
                            <a href="https://github.com/babypwant" target="_blank">
                              Gary Rios
                            </a>
                    <div className="person_desc">
                        <h2>Favorite color is green.</h2>
                    </div>
                    </div>
                    <div className="each_person">
                        <img src="/pics/Eb.png" className="person_pic"></img>
                            <a href="https://github.com/ebtayara" target="_blank">
                              Ebrahim Tayara
                            </a>
                    <div className="person_desc">
                        <h2>Sucks at CSS.</h2>
                    </div>
                    </div>
                    <div className="each_person">
                        <img src="/pics/Justin.png" className="person_pic"></img>
                            <a href="https://github.com/justinycho-business" target="_blank">
                              Justin Cho
                            </a>
                    <div className="person_desc">
                        <h2>Enjoys the finer things in life.</h2>
                    </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
  )
}

export default AboutUs
