import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';

const StarRating = (props) => {
    const { rating, setRating } = props;
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label key={i}>
                        <input 
                            type="radio" 
                            name="rating" 
                            style={{display: 'none'}} 
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)} 
                        />
                        <FaStar 
                            className="rate-star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}

export default StarRating;