import React from 'react';
import img1 from '../../img/map1.png';

const Map = () => {
    return (
        <div>
            {/* <h1>Sorry I can't disply dynamic Map. I'm try https://react-leaflet.js.org/. but it's not work properly </h1> */}
            <img style={{width:'100%', height:'600px'}} src={img1} alt="o" />;
        </div>
    );
};

export default Map;