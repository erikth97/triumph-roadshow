import { useState } from 'react';
import { motion } from 'framer-motion';
import { cities } from '@/lib/constants/cityData';
import PulsingDot from '@/components/ui/PulsingDot';
import Countdown from '@/components/ui/Countdown';

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
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Ciudades participantes
                </motion.h2>
                <motion.h5
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Ciudades participantes
                </motion.h5>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Mapa con puntos interactivos */}
                    <div className="relative">
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

                    <div>
                        {/* Calendario de ciudades */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {cities.map((city) => (
                                <button
                                    key={city.id}
                                    className={`text-center p-4 transition-colors ${selectedCity === city.id ? 'bg-white text-black' : 'bg-transparent'
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
                                className="border border-gray-700 p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="text-center mb-6">COMIENZA EN</div>

                                <Countdown targetDate={selectedCityData.date} />

                                <div className="mt-8">
                                    <div className="flex items-start mb-4">
                                        <svg className="w-5 h-5 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <div className="font-bold">{selectedCityData.venue}</div>
                                            <div className="text-gray-400">{selectedCityData.address}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

            {/* Estilos CSS para la animación de pulso */}
            <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(209, 26, 42, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(209, 26, 42, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(209, 26, 42, 0);
          }
        }
      `}</style>
        </section>
    );
};

export default CitiesSection;