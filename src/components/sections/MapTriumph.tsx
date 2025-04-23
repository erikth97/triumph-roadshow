import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { agencies } from '../../lib/constants/Agencies';
import customMarkerImg from '/FAVICON TRIUMPH 64x64.png';
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
    <section id="map-triumph" className="bg-black text-white py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Título que solo aparece en móvil, arriba del mapa */}
        <div className="block md:hidden mb-4">
          <h1 className="text-2xl font-bold leading-tight">
            Visita tu tienda <br />
            Triumph más cercana
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
          {/* Contenido de agencias - sin título en móvil */}
          <div className="p-4 md:p-6 lg:p-8 order-2 md:order-1">
            {/* Título solo visible en tablet/desktop */}
            <h1 className="hidden md:block text-2xl md:text-3xl font-bold mb-6 md:mb-8 leading-tight">
              Visita tu tienda <br />
              Triumph más cercana
            </h1>

            {/* Contenedor de scroll con altura máxima en móvil */}
            <div className="scroll-container pl-0 md:pl-5 max-h-[300px] md:max-h-[450px] overflow-y-auto pr-2 mb-6 md:mb-0">
              {agencies.map((agency, index) => (
                <div key={index} className="mb-6 md:mb-10">
                  <h2 className="text-lg md:text-xl font-semibold">{agency.name}</h2>
                  <p className="text-xs md:text-sm mb-2">{agency.address}</p>
                  <a
                    href={agency.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs md:text-sm text-gray-400 hover:text-gray-200 transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ver en Google Maps
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa - ahora aparece segundo en móvil pero tiene mayor altura */}
          <div className="p-4 md:p-6 lg:p-8 order-1 md:order-2">
            <MapContainer
              center={defaultPosition}
              zoom={10}
              style={{
                height: '350px',
                width: '100%',
                borderRadius: '8px'
              }}
              attributionControl={false}
              className="shadow-lg"
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