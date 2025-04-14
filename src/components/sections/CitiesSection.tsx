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

    return (
        <section className="py-20 bg-black text-white">
            <div className="container-custom">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Ciudades participantes
                </motion.h2>

                <motion.h3
                    className="text-xl md:text-2xl font-medium mb-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Selecciona tu ciudad
                </motion.h3>

                <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-between gap-10 lg:gap-12">
                    {/* Mapa con puntos interactivos */}
                    <div className="relative w-full lg:w-1/2 flex justify-center mt-2 lg:mt-4">
                        <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl">
                            <img
                                src="/images/mexico-map.png"
                                alt="Mapa de México"
                                className="w-full"
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

                    {/* Área del lado derecho con calendario y countdown */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-start">
                        <div className="w-full px-2 sm:px-0" style={{ maxWidth: "520px" }}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                                {cities.map((city) => (
                                    <button
                                        key={city.id}
                                        className={`text-center p-3 sm:p-4 md:p-5 transition-all duration-300 ${selectedCity === city.id ? 'bg-white text-black' : 'bg-transparent border border-gray-700 hover:bg-gray-800 hover:scale-105'}`}
                                        onClick={() => setSelectedCity(city.id)}
                                    >
                                        <div className="text-xs sm:text-sm font-medium truncate">{city.name}</div>
                                        <div className="text-xs sm:text-sm text-gray-400">{getMonthName(city.date)}</div>
                                        <div className="text-2xl sm:text-3xl font-bold">{formatDate(city.date)}</div>
                                    </button>
                                ))}
                            </div>

                            {/* Countdown con espacio reservado y animación */}
                            <div className="w-full mt-10 min-h-[280px]">
                                {selectedCityData && (
                                    <motion.div
                                        className="border border-gray-700 p-5 md:p-6 w-full"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="text-center mb-5 md:mb-6 text-base md:text-lg uppercase font-medium">COMIENZA EN</div>

                                        <Countdown targetDate={selectedCityData.date} />

                                        <div className="mt-6 md:mt-8">
                                            <div className="flex items-center mb-4">
                                                <svg className="w-5 h-5 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div className="min-w-0 w-full">
                                                    <div className="font-bold text-base md:text-lg truncate">{selectedCityData.venue}</div>
                                                    <div className="text-gray-400 text-sm break-words">{selectedCityData.address}</div>
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
