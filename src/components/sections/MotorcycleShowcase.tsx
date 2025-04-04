// src/components/sections/MotorcycleShowcase.tsx
import React, { useState, useEffect } from 'react';

// Datos de las motocicletas
const motorcycles = [
    {
        id: 1,
        name: "Speed 400",
        image: "/images/motorcycles/Speed 400_MY24_Caspian Blue_RHS_1200px-Climit.png",
        specs: {
            tipo: "Monocilíndrico con refrigeración líquida, 4 válvulas y doble árbol de levas en cabeza (DOHC)",
            cilindrada: "398,15 cc",
            parMaximo: "37,5 Nm a 6.500 rpm",
            cajaCambios: "6 velocidades",
            consumo: "3.5L/100km (80.7 mpg)"
        }
    },
    {
        id: 2,
        name: "Scrambler 400 X",
        image: "/images/motorcycles/Scrambler 400 X_MY24_Matt Khaki Green_RHS_1200px-Climit.png",
        specs: {
            tipo: "Monocilíndrico con refrigeración líquida, 4 válvulas y doble árbol de levas en cabeza (DOHC)",
            cilindrada: "398,15 cc",
            parMaximo: "37,5 Nm a 6.500 rpm",
            cajaCambios: "6 velocidades",
            consumo: "3.5L/100km (80.7 mpg)"
        }
    },
    {
        id: 3,
        name: "Trident 660 2024",
        image: "/images/motorcycles/Trident_MY24_Sapphire Black_RHS_1200px-Climit.png",
        specs: {
            tipo: "Triple en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "660 cc",
            parMaximo: "64 Nm a 6.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "4.5L/100km (62.8 mpg)"
        }
    },
    {
        id: 4,
        name: "Trident 660 2025",
        image: "/images/motorcycles/Trident 660_MY25_Cosmic Yellow_RHS_1200px-Climit.png",
        specs: {
            tipo: "Triple en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "660 cc",
            parMaximo: "64 Nm a 6.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "4.5L/100km (62.8 mpg)"
        }
    },
    {
        id: 5,
        name: "Daytona 660",
        image: "/images/motorcycles/Daytona 660_MY24_Snowdonia White_RHS_1200px-Climit.png",
        specs: {
            tipo: "Triple en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "660 cc",
            parMaximo: "69 Nm a 8.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "4.3L/100km (65.7 mpg)"
        }
    },
    {
        id: 6,
        name: "Tiger Sport 660",
        image: "/images/motorcycles/Tiger Sport_MY24_Snowdonia White-Jet Black_RHS_1200px-Climit.png",
        specs: {
            tipo: "Triple en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "660 cc",
            parMaximo: "64 Nm a 6.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "4.5L/100km (62.8 mpg)"
        }
    },
    {
        id: 7,
        name: "Bonneville T120",
        image: "/images/motorcycles/Bonneville T120_MY24_Jet Black-Fusion White_RHS_1200px-Climit.png",
        specs: {
            tipo: "Bicilíndrico paralelo con refrigeración líquida, 8 válvulas y SOHC",
            cilindrada: "1.200 cc",
            parMaximo: "105 Nm a 3.500 rpm",
            cajaCambios: "6 velocidades",
            consumo: "4.7L/100km (60.1 mpg)"
        }
    },
    {
        id: 8,
        name: "Speed Twin 900",
        image: "/images/motorcycles/Speed Twin 900_MY24_Jet Black_RHS_1200px-Climit.png",
        specs: {
            tipo: "Bicilíndrico paralelo con refrigeración líquida, 8 válvulas y SOHC",
            cilindrada: "900 cc",
            parMaximo: "80 Nm a 3.800 rpm",
            cajaCambios: "5 velocidades",
            consumo: "4.2L/100km (67.3 mpg)"
        }
    },
    {
        id: 9,
        name: "Rocket 3 Storm GT",
        image: "/images/motorcycles/Rocket 3 GT_MY24_Carnival Red_RHS_1200px-Climit.png",
        specs: {
            tipo: "Tricilíndrico en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "2.458 cc",
            parMaximo: "221 Nm a 4.000 rpm",
            cajaCambios: "6 velocidades",
            consumo: "6.8L/100km (41.5 mpg)"
        }
    },
    {
        id: 10,
        name: "Tiger 900 GT Pro",
        image: "/images/motorcycles/Tiger 900 GT Pro_MY24_Carnival Red_RHS_1200px-Climit.png",
        specs: {
            tipo: "Tricilíndrico en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "888 cc",
            parMaximo: "87 Nm a 7.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "5.2L/100km (54.3 mpg)"
        }
    },
    {
        id: 11,
        name: "Tiger 900 Rally Pro",
        image: "/images/motorcycles/Tiger 900 Rally Pro_MY24_Ash Grey_RHS_1200px-Climit.png",
        specs: {
            tipo: "Tricilíndrico en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "888 cc",
            parMaximo: "87 Nm a 7.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "5.2L/100km (54.3 mpg)"
        }
    }
];

const MotorcycleShowcase: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(3);

    const selectMotorcycle = (index: number) => {
        if (index >= 0 && index < motorcycles.length) setSelectedIndex(index);
    };

    const goToPrevious = () => selectedIndex > 0 && selectMotorcycle(selectedIndex - 1);

    const goToNext = () => selectedIndex < motorcycles.length - 1 && selectMotorcycle(selectedIndex + 1);

    // Obtener índices visibles para mostrar siempre 3 elementos (anterior, actual, siguiente)
    const getVisibleIndices = () => {
        const indices = [];

        // Anterior
        if (selectedIndex > 0) {
            indices.push(selectedIndex - 1);
        }

        // Actual
        indices.push(selectedIndex);

        // Siguiente
        if (selectedIndex < motorcycles.length - 1) {
            indices.push(selectedIndex + 1);
        }

        return indices;
    };

    const visibleIndices = getVisibleIndices();

    const getTitleClass = (index: number) => {
        if (index === selectedIndex) {
            return "text-white text-2xl md:text-3xl font-bold";
        } else if (index === selectedIndex - 1 || index === selectedIndex + 1) {
            return "text-gray-500 text-lg md:text-xl";
        }
        return "hidden";
    };

    useEffect(() => {
        const interval = setInterval(() => {
            selectMotorcycle((selectedIndex + 1) % motorcycles.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [selectedIndex]);

    return (
        <section id="motorcycles" className="py-12 md:py-20 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Título principal */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 italic">
                    ¡DESCÚBRELAS EN EL DEMO ROAD SHOW!
                </h2>

                {/* Slider de nombres de motocicletas - solo 3 visibles */}
                <div className="relative mb-16">
                    <div className="flex justify-center items-center text-center">
                        {/* En móvil, mostrar solo el nombre actual */}
                        <div className="block md:hidden w-full text-center">
                            <div className="text-white text-2xl font-bold">
                                {motorcycles[selectedIndex].name}
                                <div className="h-1 bg-white w-24 mx-auto mt-2"></div>
                            </div>
                        </div>

                        {/* En desktop, mostrar los 3 nombres (anterior, actual, siguiente) */}
                        <div className="hidden md:flex justify-center items-center lg:space-x-6 w-full relative">
                            {motorcycles.map((moto, index) => (
                                <div
                                    key={moto.id}
                                    className={`cursor-pointer transition-all duration-500 px-2 ${getTitleClass(index)}`}
                                    onClick={() => selectMotorcycle(index)}
                                    style={{
                                        display: visibleIndices.includes(index) ? 'block' : 'none',
                                        opacity: index === selectedIndex ? 1 : 0.5,
                                        transform: `translateX(${(index - selectedIndex) * 150}px)`
                                    }}
                                >
                                    {moto.name}
                                    {index === selectedIndex && (
                                        <div className="h-1 bg-white w-full mt-2"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Carrusel principal */}
                <div className="relative h-[600px] overflow-hidden">
                    {motorcycles.map((moto, index) => {
                        const position = index - selectedIndex;
                        const isActive = position === 0;
                        const styles = {
                            transform: `translateX(${position * 80}%) scale(${isActive ? 1 : 0.8})`,
                            opacity: isActive ? 1 : 0.4,
                            zIndex: isActive ? 30 : 20,
                            filter: isActive ? 'brightness(1)' : 'brightness(0.6)',
                            boxShadow: isActive ? '0 10px 30px rgba(255, 255, 255, 0.1)' : 'none'
                        };

                        return (
                            <div
                                key={moto.id}
                                className="absolute top-0 left-1/2 transition-all duration-700 ease-in-out"
                                style={{
                                    ...styles,
                                    width: '800px',
                                    marginLeft: '-400px',
                                    pointerEvents: isActive ? 'auto' : 'none'
                                }}
                            >
                                {/* Card sin bordes redondeados */}
                                <div className="h-full bg-gradient-to-r from-[#2b2b2b] via-[#3c3c3c] to-[#2b2b2b] overflow-hidden p-4 shadow-lg">
                                    <div className="flex flex-col md:flex-row h-full items-center">
                                        {/* Lado izquierdo - Imagen destacada (invertido) */}
                                        <div className="w-full md:w-3/4 flex items-center justify-center order-1 -ml-6 -mr-6">
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                {/* Efecto de brillo sutil detrás de la imagen */}
                                                <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none"></div>

                                                <img
                                                    src={moto.image}
                                                    alt={moto.name}
                                                    className="w-full h-auto object-contain max-h-[350px] md:max-h-[550px]"
                                                    style={{ transform: "scale(1.2)" }}
                                                />
                                            </div>
                                        </div>

                                        {/* Lado derecho - Especificaciones técnicas (invertido) */}
                                        <div className="w-full md:w-1/4 space-y-4 order-2 mt-4 md:mt-0 md:pl-6">
                                            <div>
                                                <span className="font-semibold text-white">Tipo:</span>{' '}
                                                <span className="text-gray-300 text-sm">{moto.specs.tipo}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-white">Cilindrada:</span>{' '}
                                                <span className="text-gray-300 text-sm">{moto.specs.cilindrada}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-white">Par máximo CE:</span>{' '}
                                                <span className="text-gray-300 text-sm">{moto.specs.parMaximo}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-white">Caja de cambios:</span>{' '}
                                                <span className="text-gray-300 text-sm">{moto.specs.cajaCambios}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-white">Consumo de combustible:</span>{' '}
                                                <span className="text-gray-300 text-sm">{moto.specs.consumo}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Botones de navegación */}
                    <button
                        onClick={goToPrevious}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 text-white transition-all duration-300 ${selectedIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100 hover:scale-110'
                            }`}
                        aria-label="Anterior motocicleta"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 text-white transition-all duration-300 ${selectedIndex === motorcycles.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100 hover:scale-110'
                            }`}
                        aria-label="Siguiente motocicleta"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Estilos adicionales para el gradiente radial */}
            <style>
                {`
        .bg-radial-gradient {
          background: radial-gradient(circle, rgba(30, 41, 59, 0.5) 0%, rgba(0, 0, 0, 0) 70%);
        }
        `}
            </style>
        </section>
    );
};

export default MotorcycleShowcase;