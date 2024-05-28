import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { L, Icon} from 'leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';

//import data from '../data/bngb2.json';

function BngbMap() {
    const [geojsonData, setGeojsonData] = useState(null);
    const position = [-15.8, -55.88];
    const customIcon = new Icon({
       iconUrl: '../imgs/icone_hidrografia.png',
       iconSize: [30, 30],

    });

    useEffect(() => {
        fetch("http://localhost:3000/data/bngb.json")
          .then(response => response.json())
          .then(data => setGeojsonData(data));
      }, []);

      const geojsonStyle = {
        pointToLayer: (feature, latlng) => {
            if (geojsonData !== null) {
                console.log(feature.latitude,feature.longitude, customIcon)
                return L.marker([feature.latitude,feature.longitude], {marker: customIcon})
            }
        },
        onEachFeature: (feature, layer) => {
            let popupContent = `<h6>Nome: ${feature.properties.name}</h6>`
            popupContent += `<a href="">link</a>`
            layer.bindPopup(popupContent)
        }
      };
    
      if (!geojsonData) {
        return <div>Loading...</div>;
      }
  
   
      return (
        <MapContainer center={position} zoom={5}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>"
          />
          {/*geojsonData !== null && <GeoJSON data={geojsonData} style={geojsonStyle} />*/}
          {geojsonData.features.map(marker =>(
              <Marker position={[marker.properties.latitude,marker.properties.longitude]}
              icon= {customIcon} key={marker.properties.idNomebngb}></Marker>
          ))}
            
        </MapContainer>
      );
};
    
export default BngbMap;