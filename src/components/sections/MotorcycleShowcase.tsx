// src/components/sections/MotorcycleShowcase.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// Datos de las motocicletas
const motorcycles = [
    {
        id: 1,
        name: "Speed 400",
        image: "/images/motorcycles/Speed 400_MY24_Caspian Blue_RHS_1200px-Climit.webp",
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
        image: "/images/motorcycles/Scrambler 400 X_MY24_Matt Khaki Green_RHS_1200px-Climit.webp",
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
        image: "/images/motorcycles/Trident_MY24_Sapphire Black_RHS_1200px-Climit.webp",
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
        image: "/images/motorcycles/Trident 660_MY25_Cosmic Yellow_RHS_1200px-Climit.webp",
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
        image: "/images/motorcycles/Daytona 660_MY24_Snowdonia White_RHS_1200px-Climit.webp",
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
        image: "/images/motorcycles/Tiger Sport_MY24_Snowdonia White-Jet Black_RHS_1200px-Climit.webp",
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
        image: "/images/motorcycles/Bonneville T120_MY24_Jet Black-Fusion White_RHS_1200px-Climit.webp",
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
        image: "/images/motorcycles/Speed Twin 900_MY24_Jet Black_RHS_1200px-Climit.webp",
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
        image: "/images/motorcycles/Rocket 3 GT_MY24_Carnival Red_RHS_1200px-Climit.webp",
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
        image: "/images/motorcycles/Tiger 900 GT Pro_MY24_Carnival Red_RHS_1200px-Climit.webp",
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
        image: "/images/motorcycles/Tiger 900 Rally Pro_MY24_Ash Grey_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Tricilíndrico en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "888 cc",
            parMaximo: "87 Nm a 7.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "5.2L/100km (54.3 mpg)"
        }
    }
];
const radialGradientStyle: React.CSSProperties = {
    background: 'radial-gradient(circle at center, rgba(75, 75, 75, 0.7) 0%, rgba(0, 0, 0, 0) 70%)'
};

const spotlightEffect: React.CSSProperties = {
    filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.15))'
};

const MotorcycleShowcase: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [fadeTransition, setFadeTransition] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const selectMotorcycle = (index: number) => {
        setFadeTransition(true);
        let newIndex = index < 0 ? motorcycles.length - 1 : index >= motorcycles.length ? 0 : index;
        setTimeout(() => {
            setSelectedIndex(newIndex);
            setFadeTransition(false);
        }, 300);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            selectMotorcycle(selectedIndex + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, [selectedIndex]);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) selectMotorcycle(selectedIndex + 1);
        else if (distance < -minSwipeDistance) selectMotorcycle(selectedIndex - 1);
    };

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setCurrentX(e.clientX);
        e.preventDefault();
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setCurrentX(e.clientX);
    };

    const onMouseUp = () => {
        if (!isDragging) return;
        const distance = startX - currentX;
        if (distance > minSwipeDistance) selectMotorcycle(selectedIndex + 1);
        else if (distance < -minSwipeDistance) selectMotorcycle(selectedIndex - 1);
        setIsDragging(false);
    };

    const onMouseLeave = () => {
        if (isDragging) onMouseUp();
    };

    const getVisibleDotIndices = () => {
        const indices = [selectedIndex];
        for (let i = 1; i <= 3; i++) indices.push((selectedIndex + i) % motorcycles.length);
        indices.push((selectedIndex + 4) % motorcycles.length);
        return indices;
    };

    const visibleDotIndices = getVisibleDotIndices();
    const isDotSmall = (index: number) => index === visibleDotIndices[visibleDotIndices.length - 1];

    return (
        <section id="motorcycles" className="py-12 md:py-20 bg-black text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20">
                    ¡DESCÚBRELAS EN EL DEMO ROAD SHOW!
                </h2>

                <div
                    ref={carouselRef}
                    className="relative cursor-grab"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                >
                    <div className={`transition-opacity duration-300 ${fadeTransition ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="flex flex-col lg:flex-row lg:items-center">
                            <div className="lg:hidden w-full text-center mb-6">
                                <h3 className="text-2xl md:text-3xl font-bold">
                                    {motorcycles[selectedIndex].name.toUpperCase()}
                                </h3>
                            </div>

                            <div className="w-full lg:w-3/5 relative flex justify-center">
                                <div className="w-full h-full flex items-center justify-center py-4 lg:py-0">
                                    <div className="absolute inset-0 rounded-full opacity-70" style={radialGradientStyle}></div>
                                    <div style={spotlightEffect}>
                                        <motion.img
                                            src={motorcycles[selectedIndex].image}
                                            alt={`Imagen de la motocicleta ${motorcycles[selectedIndex].name}`}
                                            className="w-full h-auto object-contain max-h-[280px] md:max-h-[480px]"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </div>
                                </div>

                                {/* Flechas navegación */}
                                <button onClick={() => selectMotorcycle(selectedIndex - 1)} className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20">
                                    <ChevronLeftIcon className="w-8 h-8 text-white hover:text-red-600" />
                                </button>
                                <button onClick={() => selectMotorcycle(selectedIndex + 1)} className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20">
                                    <ChevronRightIcon className="w-8 h-8 text-white hover:text-red-600" />
                                </button>
                            </div>

                            <div className="w-full lg:w-2/5 mt-6 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:pl-12 lg:pr-6">
                                <h3 className="hidden lg:block text-2xl md:text-3xl font-bold mb-10">
                                    {motorcycles[selectedIndex].name.toUpperCase()}
                                </h3>
                                <div className="space-y-4 lg:space-y-7">
                                    <div><span className="font-semibold text-white">Tipo:</span> <span className="text-gray-300">{motorcycles[selectedIndex].specs.tipo}</span></div>
                                    <div><span className="font-semibold text-white">Cilindrada:</span> <span className="text-gray-300">{motorcycles[selectedIndex].specs.cilindrada}</span></div>
                                    <div><span className="font-semibold text-white">Par máximo CE:</span> <span className="text-gray-300">{motorcycles[selectedIndex].specs.parMaximo}</span></div>
                                    <div><span className="font-semibold text-white">Caja de cambios:</span> <span className="text-gray-300">{motorcycles[selectedIndex].specs.cajaCambios}</span></div>
                                    <div><span className="font-semibold text-white">Consumo de combustible:</span> <span className="text-gray-300">{motorcycles[selectedIndex].specs.consumo}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8 space-x-3">
                        {visibleDotIndices.map((dotIndex) => (
                            <button
                                key={dotIndex}
                                onClick={() => selectMotorcycle(dotIndex)}
                                className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ring-offset-1
                                    ${isDotSmall(dotIndex) ? 'h-2 w-2' : 'h-2.5 w-2.5'}
                                    ${selectedIndex === dotIndex ? 'bg-white' : 'bg-gray-500 hover:bg-white'}
                                `}
                                aria-label={`Ver motocicleta ${dotIndex + 1}`}
                                role="button"
                                aria-pressed={selectedIndex === dotIndex}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MotorcycleShowcase;