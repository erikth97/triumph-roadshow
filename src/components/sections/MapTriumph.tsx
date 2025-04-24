import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { agencies } from '../../lib/constants/Agencies';
import customMarkerImg from '/FAVICON TRIUMPH 64x64.png';
import MapAtribution from '../ui/MapAtribution';
import '../../styles/MapTriumph.css';

// Move icon creation outside of component to prevent recreation on each render
const customIcon = L.icon({
  iconUrl: customMarkerImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Set default icon outside component
const MapTriumph = () => {
  // Calculate default position once with proper type annotation
  const defaultPosition: [number, number] = agencies.length > 0
    ? [agencies[0].coordinates.lat, agencies[0].coordinates.lng]
    : [25.6866, -100.3161];

  // Set the default icon once when component mounts
  useEffect(() => {
    L.Marker.prototype.options.icon = customIcon;
  }, []);

  return (
    <section id="map-triumph" className="bg-black text-white py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Título que solo aparece en móvil, arriba del mapa */}
        <div className="block md:hidden mb-4 text-center">
          <h1 className="text-2xl font-bold leading-tight">
            Visita tu tienda <br />
            Triumph más cercana
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contenido de agencias - sin título en móvil */}
          <div className="p-4 md:p-6 lg:p-8 order-2 md:order-1">
            {/* Título solo visible en tablet/desktop */}
            <h1 className="hidden md:block text-2xl md:text-3xl font-bold mb-6 md:mb-8 leading-tight">
              Visita tu tienda <br />
              Triumph más cercana
            </h1>

            {/* Aumentar la altura mínima en móvil para mostrar al menos 3 elementos */}
            <div className="scroll-container pl-0 md:pl-5 min-h-[350px] max-h-[450px] md:max-h-[500px] overflow-y-auto pr-2 mb-6 md:mb-0">
              {agencies.map((agency, index) => (
                <div key={index} className="mb-6 md:mb-10">
                  <h2 className="text-lg md:text-xl font-semibold">{agency.name}</h2>
                  <p className="text-xs md:text-sm mb-2">{agency.address}</p>
                  <a
                    href={agency.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs md:text-sm text-gray-400 hover:text-gray-200 transition-colors duration-300"
                    aria-label={`Ver ${agency.name} en Google Maps`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
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

          {/* Mapa - ahora centrado mejor en desktop y con margen adecuado */}
          <div className="p-4 md:p-6 lg:p-8 order-1 md:order-2 flex justify-center">
            <div className="w-full md:w-11/12 lg:w-10/12">
              <MapContainer
                center={defaultPosition}
                zoom={10}
                style={{
                  height: '380px',
                  width: '100%',
                  borderRadius: '8px'
                }}
                attributionControl={false}
                className="shadow-lg"
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  // Add browser caching for tiles
                  tileSize={256}
                  zoomOffset={0}
                />
                {agencies.map((agency, index) => (
                  <Marker
                    key={index}
                    position={[agency.coordinates.lat, agency.coordinates.lng] as [number, number]}
                    title={agency.name}
                  />
                ))}
                <MapAtribution />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MapTriumph);