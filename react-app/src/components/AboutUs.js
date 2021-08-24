import React from 'react';
import './styles/AboutUs.css';

const AboutUs = () => {
    return (
        <div>
            <div className="title_container">
                <h1 className="title-about-us">Meet the team</h1>
            </div>
            <div className="about_us_outer_container">
                <div className="about_us_inner_container">
                    <div className="about_us_container">
                        <div className="each_person">
                            <img src="/pics/Gary.png" className="person_pic"></img>
                            <a href="https://github.com/babypwant" target="_blank">
                                <div className="github_icon_ container">
                                    <div className="github_icon">
                                        <i class="fab fa-github"></i>
                                    </div>
                                </div>
                            </a>
                            <div className="person_desc">
                                <h3>Gary Rios</h3>
                                <h2>
                                    eSports Player-manager / Video editor / Software Engineer
                                </h2>

                            </div>
                        </div>
                        <div className="each_person">
                            <img src="/pics/Justin.png" className="person_pic"></img>
                            <a href="https://github.com/justinycho-business" target="_blank">
                                <div className="github_icon_ container">
                                    <div className="github_icon">
                                        <i class="fab fa-github"></i>
                                    </div>
                                </div>
                            </a>
                            <div className="person_desc">
                                <h3>Justin Cho.</h3>
                                <h2>
                                    "You can always improve your mind, body, or spirit. There is no time for complacency." -Justin Cho | I seek challenges and learn every day. Go higher, always.
                                </h2>
                            </div>
                        </div>
                        <div className="each_person">
                            <img src="/pics/Joshua.png" className="person_pic"></img>
                            <a href="https://github.com/josh-willy91" target="_blank">
                                <div className="github_icon_ container">
                                    <div className="github_icon">
                                        <i class="fab fa-github"></i>
                                    </div>
                                </div>
                            </a>
                            <div className="person_desc">
                                <h3>Josh Williams</h3>
                            </div>
                        </div>
                        <div className="each_person">
                            <img src="/pics/Eb.png" className="person_pic"></img>
                            <a href="https://github.com/ebtayara" target="_blank">
                                <div className="github_icon_ container">
                                    <div className="github_icon">
                                        <i class="fab fa-github"></i>
                                    </div>
                                </div>
                            </a>
                            <div className="person_desc">
                                <h3>Ebrahim Tayara</h3>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
