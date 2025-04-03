import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { agencies } from '../../lib/constants/Agencies';
import customMarkerImg from '../../../public/FAVICON TRIUMPH 64x64.png';
import MapAtribution from '../ui/MapAtribution';
import '../../styles/MapTriumph.css';

const customIcon = L.icon({
  iconUrl: customMarkerImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

L.Marker.prototype.options.icon = customIcon;

const MapTriumph: React.FC = () => {
  const defaultPosition: [number, number] =
    agencies.length > 0
      ? [agencies[0].coordinates.lat, agencies[0].coordinates.lng]
      : [25.6866, -100.3161];

  return (
    <section className="bg-black text-white py-20 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-25">
            <h1 className="text-3xl font-bold mb-8 leading-tight">
              Visita tu tienda <br />
              Triumph más cercana
            </h1>
            <div className="scroll-container pl-5">
              {agencies.map((agency, index) => (
                <div key={index} className="mb-10">
                  <h2 className="text-xl font-semibold">{agency.name}</h2>
                  <p className="text-sm">{agency.address}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-15">
            <MapContainer
              center={defaultPosition}
              zoom={10}
              style={{ minHeight: '35svw', width: '100%' }}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {agencies.map((agency, index) => (
                <Marker
                  key={index}
                  position={[agency.coordinates.lat, agency.coordinates.lng]}
                />
              ))}
              <MapAtribution />
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapTriumph;