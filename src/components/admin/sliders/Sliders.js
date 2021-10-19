import React from 'react';
import * as CONFIG from '../../../constants/config';
import { Link } from 'react-router-dom';

const Sliders = ({ sliderList, loading, deleteSlider }) => {

    if (loading) {
        return <tr><td><h4>Loading Slider List...</h4></td></tr>;
    }

    return (
        sliderList.map(slider => (
            <tr key={slider.id}>
                <td className="text-center">{slider.id}</td>
                <td>{slider.name}</td>
                <td className="text-center">{slider.url}</td>
                <td className="text-center">
                    {slider.status === 0 ?
                    <label className="btn2 btn2-success btn2-lg w-75">Active</label> :
                    <label className="btn2 btn2-warning2 btn2-lg w-75">Deactive</label>}
                </td>
                <td className="text-center"><img src={CONFIG.BASE_URL + `${slider.image}`} width="70px" alt={slider.name} /></td>
                <td className="text-center">
                    <Link to={`edit-slider/${slider.id}`} className="btn2 btn2-primary2 btn2-lg mr-3" style={{ width: '70px' }}>Edit</Link>
                    <button type="button" onClick={(e) => deleteSlider(e, slider.id)} className="btn2 btn2-danger2 btn2-lg" style={{ width: '70px' }}>Delete</button>
                </td>
            </tr>
        ))
    )
}

export default Sliders;