import React, { useEffect, useState } from 'react';
import axios from "axios";
import * as CONFIG from '../../../constants/config';
import { Link } from 'react-router-dom';

function Slider() {

    const [sliderList, setSliderList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/get-slider').then(res => {
            if (res.status === 200) {
                setSliderList(res.data.sliders);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div id="page-preloader">
            <div className="page-loading">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>;
    }

    return (
        sliderList.map((slider, index) => {
            return (
                <div key={slider.id} className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                    <Link to={slider.url}>
                        <img className="d-block w-100" src={CONFIG.BASE_URL + `${slider.image}`} alt={slider.name} />
                    </Link>
                </div>
            )
        })
    )
}

export default Slider;