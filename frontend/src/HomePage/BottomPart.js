import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

import './BottomPart.css';



const BottomPart = () => {
  const position = [-38.0507295, 145.1176978]; // Approximate coordinates of Longbeach Place Inc
  
  useEffect(() => { 
      delete L.Icon.Default.prototype._getIconUrl; 
      L.Icon.Default.mergeOptions({
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      });
  }, []);

  return (
    <div className="BottomPart">
      {/* <h2>Contact Us</h2> */}
      <div style={{ height: '300px', width: '100%', marginBottom: '20px', borderRadius: '15px', overflow: 'hidden' }}>
        <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Longbeach Place Inc
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default BottomPart;
