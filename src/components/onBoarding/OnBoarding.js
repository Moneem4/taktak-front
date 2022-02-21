import React from 'react';
import Slider from "infinite-react-carousel";

function OnBoarding (props) {
  
    const settings =  {
        autoplay: true,
        dots: true
    };

    return (
        <div className="on-boarding">
            <div className="orbit" data-auto-play="false" role="region" data-orbit data-use-m-u-i="false"> 
                <div className="orbit-wrapper">
                    <div className="orbit-container">
                        <Slider { ...settings }>
                            <div className="is-active orbit-slide zero">
                                <div className="orbit-slide-content">
                                    <div className="slide-content-top">
                                        <div className="slide-image" />
                                        <div className="slide-logo">
                                            <img src="../assets/img/svg/logo-gradient.svg" alt="slide1" />
                                        </div>
                                    </div>
                                    <div className="slide-content-bottom">
                                        <h3 className="slide-title">Ow yeah, Mongi !</h3>
                                        <p className="slide-description">
                                            Vous venez de vous inscrire avec succès 
                                        </p>
                                        <p className="slide-description">sur notre plateforme TAKTAK !</p>
                                    </div>
                                </div>
                            </div>
                            <div className="is-active orbit-slide">
                                <div className="orbit-slide-content">
                                    <div className="slide-content-top">
                                        <img className="slide-image" src="../assets/img/image1.png" alt="slide2"/>
                                        <div className="slide-logo">
                                            <img src="../assets/img/svg/logo-gradient.svg" alt="slide2" />
                                        </div>
                                    </div>
                                    <div className="slide-content-bottom">
                                        <h3 className="slide-title">Lorem ipsum</h3>
                                        <p className="slide-description">
                                            Lorem ipsum dolor sit amet, consetetur 
                                        </p>
                                        <p className="slide-description">sadipscing elitr, sed diam nonumy eirmod tempor</p>
                                    </div>
                                </div>
                            </div>
                            <div className="orbit-slide">
                                <div className="orbit-slide-content">
                                    <div className="slide-content-top">
                                        <img className="slide-image" src="../assets/img/image2.jpg" alt="slide3"/>
                                        <div className="slide-logo">
                                            <img src="../assets/img/svg/logo-gradient.svg" alt="slide3"/>
                                        </div>
                                    </div>
                                    <div className="slide-content-bottom">
                                        <h3 className="slide-title">
                                            Phasellus sollicitudin euau gueut porttitor
                                        </h3>
                                        <p className="slide-description">
                                            In vehicula fermentum ultricies. Duis ac ligula 
                                        </p>
                                        <p className="slide-description">accumsan, molestie metus nec, dignissim elit.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="orbit-slide">
                                <div className="orbit-slide-content">
                                    <div className="slide-content-top">
                                        <img className="slide-image" src="../assets/img/image3.jpg" alt="slide4" />
                                        <div className="slide-logo">
                                            <img src="../assets/img/svg/logo-gradient.svg" alt="slide5"/>
                                        </div>
                                    </div>
                                    <div className="slide-content-bottom">
                                        <h3 className="slide-title">
                                            Sed varius diam quis dui sodales
                                        </h3>
                                        <p className="slide-description">
                                            Nunc interdum eget enim quis convallis. Nulla 
                                        </p>
                                        <p className="slide-description">odio lacus, egestas vel nisi vel, auctor lobortis </p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
            <span className="copyright">All right reserved 2020 . TAKTAK</span>
        </div>
    )
}

export default OnBoarding 
