import React from "react";
import Slide from "./Slide";

function SlideShow({ sliderList }) {
    return (
        <div className="section slideshow">
            <div className="container">
                <div className="tiva-slideshow-wrapper">
                    <div className="nivoSlider">
                        {
                            sliderList.map(item => (
                                <Slide slider={item} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideShow;