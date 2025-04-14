// src/components/sections/MotorcycleShowcase.tsx
import React, { useState, useEffect, useRef } from 'react';

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

// Estilos CSS para el gradiente radial
const radialGradientStyle: React.CSSProperties = {
    background: 'radial-gradient(circle at center, rgba(75, 75, 75, 0.7) 0%, rgba(0, 0, 0, 0) 70%)'
};

// Estilo para el efecto de reflector (solo sombras, sin cuadro)
const spotlightEffect: React.CSSProperties = {
    filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.15))'
};

const MotorcycleShowcase: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [fadeTransition, setFadeTransition] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Estado para seguir el gesto de deslizamiento
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Configuración de sensibilidad - ajustar según necesidad
    const minSwipeDistance = 50;

    // Función para seleccionar una motocicleta
    const selectMotorcycle = (index: number) => {
        setFadeTransition(true);

        // Manejar el loop (circular)
        let newIndex = index;
        if (newIndex < 0) {
            newIndex = motorcycles.length - 1;
        } else if (newIndex >= motorcycles.length) {
            newIndex = 0;
        }

        // Pequeño retraso para la animación de fade
        setTimeout(() => {
            setSelectedIndex(newIndex);
            setFadeTransition(false);
        }, 300);
    };

    // Iniciar autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            selectMotorcycle(selectedIndex + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedIndex]);

    // Gestión de eventos táctiles
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
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            selectMotorcycle(selectedIndex + 1);
        } else if (isRightSwipe) {
            selectMotorcycle(selectedIndex - 1);
        }
    };

    // Gestión de eventos de mouse
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setCurrentX(e.clientX);

        // Prevenir selección de texto durante el arrastre
        e.preventDefault();
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setCurrentX(e.clientX);
    };

    const onMouseUp = () => {
        if (!isDragging) return;

        const distance = startX - currentX;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            selectMotorcycle(selectedIndex + 1);
        } else if (isRightSwipe) {
            selectMotorcycle(selectedIndex - 1);
        }

        setIsDragging(false);
    };

    const onMouseLeave = () => {
        if (isDragging) {
            onMouseUp();
        }
    };

    // Función para obtener los índices visibles para la navegación por puntos
    const getVisibleDotIndices = () => {
        // Ahora mostramos 5 puntos: el actual, 3 siguientes y 1 pequeño
        const indices = [];

        // Punto actual
        indices.push(selectedIndex);

        // Siguientes 3 puntos
        for (let i = 1; i <= 3; i++) {
            const nextIndex = (selectedIndex + i) % motorcycles.length;
            indices.push(nextIndex);
        }

        // Último punto (más pequeño)
        const lastDotIndex = (selectedIndex + 4) % motorcycles.length;
        indices.push(lastDotIndex);

        return indices;
    };

    const visibleDotIndices = getVisibleDotIndices();

    // Determinar si un punto debe ser pequeño (el último visible)
    const isDotSmall = (index: number) => {
        return index === visibleDotIndices[visibleDotIndices.length - 1];
    };

    return (
        <section id="motorcycles" className="py-12 md:py-20 bg-black text-white">
            <div className="container mx-auto px-4">
                {/* Título principal */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20">
                    ¡DESCÚBRELAS EN EL DEMO ROAD SHOW!
                </h2>

                {/* Carrusel principal */}
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
                    <div
                        className={`transition-opacity duration-300 ${fadeTransition ? 'opacity-0' : 'opacity-100'}`}
                    >
                        {/* Estructura distinta para móvil y desktop */}
                        <div className="flex flex-col lg:flex-row lg:items-center">
                            {/* Versión móvil: Nombre de la moto arriba (visible solo en móvil/tablet) */}
                            <div className="lg:hidden w-full text-center mb-6">
                                <h3 className="text-2xl md:text-3xl font-bold">
                                    {motorcycles[selectedIndex].name.toUpperCase()}
                                </h3>
                            </div>

                            {/* Imagen de la moto (centrada) */}
                            <div className="w-full lg:w-3/5 relative flex justify-center">
                                <div className="w-full h-full flex items-center justify-center py-4 lg:py-0">
                                    {/* Efecto de iluminación detrás de la moto */}
                                    <div className="absolute inset-0 rounded-full opacity-70" style={radialGradientStyle}></div>

                                    {/* Imagen de la moto con efecto de sombra sutil, sin cuadro */}
                                    <div style={spotlightEffect}>
                                        <img
                                            src={motorcycles[selectedIndex].image}
                                            alt={motorcycles[selectedIndex].name}
                                            className="w-full h-auto object-contain max-h-[280px] md:max-h-[480px]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Especificaciones técnicas */}
                            <div className="w-full lg:w-2/5 mt-6 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:pl-12 lg:pr-6">
                                {/* Nombre de la moto - Solo visible en desktop */}
                                <h3 className="hidden lg:block text-2xl md:text-3xl font-bold mb-10">
                                    {motorcycles[selectedIndex].name.toUpperCase()}
                                </h3>

                                {/* Especificaciones */}
                                <div className="space-y-4 lg:space-y-7">
                                    <div>
                                        <span className="font-semibold text-white">Tipo:</span>{' '}
                                        <span className="text-gray-300">{motorcycles[selectedIndex].specs.tipo}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white">Cilindrada:</span>{' '}
                                        <span className="text-gray-300">{motorcycles[selectedIndex].specs.cilindrada}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white">Par máximo CE:</span>{' '}
                                        <span className="text-gray-300">{motorcycles[selectedIndex].specs.parMaximo}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white">Caja de cambios:</span>{' '}
                                        <span className="text-gray-300">{motorcycles[selectedIndex].specs.cajaCambios}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white">Consumo de combustible:</span>{' '}
                                        <span className="text-gray-300">{motorcycles[selectedIndex].specs.consumo}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Indicadores de navegación (5 puntos visibles, último pequeño) */}
                    <div className="flex justify-center mt-8 space-x-3">
                        {visibleDotIndices.map((dotIndex) => (
                            <button
                                key={dotIndex}
                                onClick={() => selectMotorcycle(dotIndex)}
                                className={`rounded-full transition-all duration-300 focus:outline-none flex items-center justify-center
                                    ${isDotSmall(dotIndex) ? 'h-2 w-2' : 'h-2.5 w-2.5'}
                                    ${selectedIndex === dotIndex ? 'bg-white' : 'bg-gray-500'}
                                `}
                                aria-label={`Ver motocicleta ${dotIndex + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MotorcycleShowcase;