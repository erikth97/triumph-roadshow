import { useState } from 'react';
import { motion } from 'framer-motion';
import { cities } from '@/lib/constants/cityData';
import PulsingDot from '@/components/ui/PulsingDot';
import Countdown from '@/components/ui/Countdown';
import '@/styles/pulse.css'; // Corregido el path de importación

const CitiesSection = () => {
    // Sin selección inicial - el usuario debe elegir una ciudad
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
                    className="text-xl md:text-2xl font-medium mb-12 text-center lg:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Selecciona tu ciudad
                </motion.h3>

                <div className={`flex flex-col lg:flex-row ${selectedCity ? 'items-start' : 'items-center'} lg:justify-between gap-8 lg:gap-12`}>
                    {/* Mapa con puntos interactivos */}
                    <div className="relative lg:w-1/2 flex justify-center">
                        <div className="w-full max-w-md lg:max-w-none">
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

                    {/* Subtítulo en móvil - aparece después del mapa */}
                    <motion.h3
                        className="text-xl font-medium my-6 text-center lg:hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Selecciona tu ciudad
                    </motion.h3>

                    <div className="lg:w-1/2 flex flex-col items-center">
                        {/* Calendario de ciudades */}
                        <div className={`grid grid-cols-3 gap-4 mb-8 w-full max-w-lg ${selectedCity ? 'lg:mb-12' : ''}`}>
                            {cities.map((city) => (
                                <button
                                    key={city.id}
                                    className={`text-center p-4 transition-colors ${selectedCity === city.id ? 'bg-white text-black' : 'bg-transparent border border-gray-700'
                                        }`}
                                    onClick={() => setSelectedCity(city.id)}
                                >
                                    <div className="text-sm">{getMonthName(city.date)}</div>
                                    <div className="text-3xl font-bold">{formatDate(city.date)}</div>
                                    <div className="text-sm">{city.name}</div>
                                </button>
                            ))}
                        </div>

                        {/* Información de la ciudad seleccionada */}
                        {selectedCityData && (
                            <motion.div
                                className="border border-gray-700 p-6 w-full max-w-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="text-center mb-6 text-lg uppercase font-medium">Comienza en</div>

                                <Countdown targetDate={selectedCityData.date} />

                                <div className="mt-8">
                                    <div className="flex items-start mb-4">
                                        <svg className="w-5 h-5 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <div className="font-bold text-lg">{selectedCityData.venue}</div>
                                            <div className="text-gray-400">{selectedCityData.address}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>{selectedCityData.schedule}</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CitiesSection;