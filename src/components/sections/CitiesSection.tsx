import { useState } from 'react';
import { motion } from 'framer-motion';
import { cities } from '@/lib/constants/cityData';
import PulsingDot from '@/components/ui/PulsingDot';
import Countdown from '@/components/ui/Countdown';
import '@/styles/pulse.css';

const CitiesSection = () => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const selectedCityData = selectedCity
        ? cities.find(city => city.id === selectedCity)
        : null;

    const getMonthName = (date: Date) => {
        const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
            'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
        return months[date.getMonth()];
    };

    const formatDate = (date: Date) => {
        return date.getDate().toString().padStart(2, '0');
    };

    // Función para abrir la URL de Google Maps en una nueva pestaña
    const openGoogleMaps = (mapUrl?: string) => {
        if (mapUrl) {
            window.open(mapUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <section id="cities-section" className="pt-12 pb-20 bg-black text-white">
            <div className="container-custom">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-6 text-center -mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Ciudades participantes
                </motion.h2>

                {/* Subtítulo visible solo en desktop */}
                <motion.h3
                    className="text-xl md:text-2xl font-medium mb-10 text-center hidden lg:block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Selecciona tu ciudad
                </motion.h3>

                <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center gap-10 lg:gap-16">
                    {/* Mapa con puntos interactivos - Ajustado para subir ligeramente la imagen */}
                    <div className="relative w-full lg:w-1/2 flex justify-center mt-0 lg:mt-0 px-2 lg:px-4">
                        <div className="w-full max-w-lg md:max-w-xl lg:max-w-3xl cursor-pointer">
                            <img
                                src="/images/mexico-map.png"
                                alt="Mapa de México"
                                className="w-full cursor-pointer transform -translate-y-8"
                            />

                            {/* Puntos interactivos */}
                            {cities.map((city) => (
                                <PulsingDot
                                    key={city.id}
                                    x={city.coordinates.x}
                                    y={city.coordinates.y}
                                    selected={selectedCity === city.id}
                                    onClick={() => setSelectedCity(city.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Subtítulo visible solo en mobile, debajo del mapa */}
                    <motion.h3
                        className="text-xl md:text-2xl font-medium my-4 text-center w-full lg:hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Selecciona tu ciudad
                    </motion.h3>

                    {/* Área del lado derecho con calendario y countdown */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
                        <div className="w-full px-2 sm:px-0" style={{ maxWidth: "580px" }}>
                            {/* Grid actualizado para 4 ciudades por fila */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 w-full mt-4">
                                {cities.map((city) => (
                                    <button
                                        key={city.id}
                                        className={`text-center p-2 sm:p-3 md:p-4 transition-all duration-300 cursor-pointer ${selectedCity === city.id
                                            ? 'bg-white text-black'
                                            : 'bg-transparent border border-gray-700 hover:bg-gray-800 hover:scale-105'
                                            }`}
                                        onClick={() => setSelectedCity(city.id)}
                                    >
                                        <div className="text-xs sm:text-sm font-medium truncate">{city.name}</div>
                                        <div className="text-xs sm:text-sm text-gray-400">{getMonthName(city.date)}</div>
                                        {/* Si es Cuernavaca, mostramos "24-25" en lugar de solo un día */}
                                        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                                            {city.id === 'cuernavaca' ? '24-25' : formatDate(city.date)}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Countdown con espacio reservado y animación */}
                            <div className="w-full mt-8 min-h-[280px]">
                                {selectedCityData && (
                                    <motion.div
                                        className="border border-gray-700 p-4 md:p-6 w-full bg-transparent cursor-pointer"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="text-center mb-4 md:mb-6 text-base md:text-lg uppercase font-medium">COMIENZA EN</div>

                                        <Countdown targetDate={selectedCityData.date} />

                                        <div className="mt-6 md:mt-8">
                                            {/* Ubicación con link a Google Maps si hay mapUrl */}
                                            <div
                                                className={`flex items-center mb-4 ${selectedCityData.mapUrl ?
                                                    'cursor-pointer group transition-all duration-300 hover:bg-gray-800 p-2 -mx-2 rounded' : ''}`}
                                                onClick={() => openGoogleMaps(selectedCityData.mapUrl)}
                                            >
                                                <svg
                                                    className={`w-5 h-5 mt-1 mr-2 flex-shrink-0 ${selectedCityData.mapUrl ? 'text-red-500 group-hover:animate-bounce' : ''
                                                        }`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                <div className={`min-w-0 w-full ${selectedCityData.mapUrl ? 'group-hover:text-white' : ''}`}>
                                                    <div className="font-bold text-base md:text-lg truncate">
                                                        {selectedCityData.venue}
                                                        {selectedCityData.mapUrl && (
                                                            <span className="ml-2 text-xs font-normal text-blue-400 group-hover:underline">
                                                                Ver en Maps
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-gray-400 text-sm break-words group-hover:text-gray-300">
                                                        {selectedCityData.address}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div className="text-sm">{selectedCityData.schedule}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CitiesSection;