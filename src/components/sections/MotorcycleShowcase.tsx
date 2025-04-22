import React, { useState, useEffect, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";
import { motorcycles } from '@/lib/constants/motorcycleData';

const MotorcycleShowcase: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [fadeTransition, setFadeTransition] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const selectMotorcycle = (index: number) => {
        if (fadeTransition || index === current) return;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setFadeTransition(true);
        const newIndex = ((index % motorcycles.length) + motorcycles.length) % motorcycles.length;

        setTimeout(() => {
            setCurrent(newIndex);
            setFadeTransition(false);
            if (!isDragging) {
                startAutoplay();
            }
        }, 300);
    };

    const startAutoplay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setFadeTransition(true);
            const newIndex = ((current + 1) % motorcycles.length + motorcycles.length) % motorcycles.length;
            setTimeout(() => {
                setCurrent(newIndex);
                setFadeTransition(false);
            }, 300);
        }, 5000);
    };

    useEffect(() => {
        if (!isDragging) {
            startAutoplay();
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [current, isDragging]);

    // Función para manejar el inicio del arrastre
    const handleDragStart = () => {
        setIsDragging(true);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Añadir clase para indicar al usuario que está arrastrando
        document.body.classList.add('grabbing');
    };

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsDragging(false);

        // Remover clase cuando termina el arrastre
        document.body.classList.remove('grabbing');

        const swipeThreshold = 50;
        const velocityThreshold = 150;
        const offset = info.offset.y;
        const velocity = info.velocity.y;

        if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > velocityThreshold) {
            if (offset < -swipeThreshold || velocity < -velocityThreshold) {
                selectMotorcycle(current + 1);
            } else if (offset > swipeThreshold || velocity > velocityThreshold) {
                selectMotorcycle(current - 1);
            }
        } else {
            startAutoplay(); // Reiniciar si no fue un swipe válido
        }
    };

    return (
        <section id="motorcycles" className="py-24 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Título principal con espacio reducido */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 md:mb-10">
                    ¡DESCÚBRELAS EN EL DEMO ROAD SHOW!
                </h2>

                {/* Versión móvil - Nueva estructura */}
                <div className="block lg:hidden">
                    <div className="flex flex-col min-h-[600px]">
                        {/* Título de la motocicleta arriba en móvil */}
                        <div className="w-full text-center mb-4">
                            <div className={`transition-opacity duration-300 ${fadeTransition ? 'opacity-0' : 'opacity-100'}`}>
                                <h3 className="text-3xl font-bold">
                                    {motorcycles[current].name.toUpperCase()}
                                </h3>
                            </div>
                        </div>

                        {/* Contenedor para imagen y navegación */}
                        <div className="relative mb-6">
                            <motion.div
                                className="relative flex items-center justify-center cursor-grab active:cursor-grabbing h-[300px] w-full"
                                drag="y"
                                dragConstraints={{ top: 0, bottom: 0 }}
                                dragElastic={0.1}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                style={{ userSelect: 'none' }}
                            >
                                <div className={`w-full h-full flex items-center justify-center relative transition-opacity duration-300 ${fadeTransition ? 'opacity-0' : 'opacity-100'}`}>
                                    {/* Flecha Arriba */}
                                    <button
                                        onClick={() => selectMotorcycle(current - 1)}
                                        className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-4 z-20 text-white hover:text-gray-300 transition-colors"
                                        aria-label="Modelo anterior"
                                    >
                                        <BsArrowUpSquare size={32} />
                                    </button>

                                    {/* Contenedor para efectos de luz y sombra */}
                                    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                                        {/* Efectos similares al original */}
                                        <div className="absolute w-full h-full rounded-full bg-gradient-radial from-white/5 via-transparent to-transparent opacity-70"></div>
                                        <div className="absolute bottom-4 w-3/4 h-4 bg-black/50 rounded-full blur-md transform scale-x-110 opacity-70"></div>

                                        {/* Imagen de la motocicleta */}
                                        <motion.div
                                            className="relative z-10"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <motion.img
                                                key={current}
                                                src={motorcycles[current].image}
                                                alt={`Imagen de la motocicleta ${motorcycles[current].name}`}
                                                className="w-auto object-contain max-h-[260px] px-4 drop-shadow-2xl"
                                                style={{
                                                    pointerEvents: 'none',
                                                    filter: 'drop-shadow(0 15px 15px rgba(0, 0, 0, 0.5))'
                                                }}
                                                draggable="false"
                                                animate={{
                                                    y: [0, -4, 0],
                                                    scale: [1, 1.01, 1]
                                                }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 3,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        </motion.div>

                                        <div className="absolute w-full h-full bg-gradient-to-t from-white/5 to-transparent opacity-30 pointer-events-none z-20"></div>
                                    </div>

                                    {/* Flecha Abajo */}
                                    <button
                                        onClick={() => selectMotorcycle(current + 1)}
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 z-20 text-white hover:text-gray-300 transition-colors"
                                        aria-label="Siguiente modelo"
                                    >
                                        <BsArrowDownSquare size={32} />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Indicadores de puntos verticales a la derecha */}
                            <div
                                className="absolute z-30 flex flex-col space-y-4 right-2 top-1/2 transform -translate-y-1/2"
                                style={{ pointerEvents: 'auto' }}
                            >
                                {motorcycles.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => selectMotorcycle(index)}
                                        className={`rounded-full transition-all duration-300 focus:outline-none focus:ring focus:ring-white/30
                                        h-3 w-3 border border-white/70
                                        ${current === index ? 'bg-white scale-110' : 'bg-gray-600/80 hover:bg-gray-400/80'}
                                      `}
                                        aria-label={`Ver ${motorcycles[index].name}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Descripción debajo de la imagen */}
                        <div className="w-full text-center">
                            <div className={`transition-opacity duration-300 ${fadeTransition ? 'opacity-0' : 'opacity-100'}`}>
                                <div className="space-y-4 text-sm max-w-md mx-auto">
                                    <div>
                                        <p className="font-bold text-white">Tipo:</p>
                                        <p className="text-gray-300">{motorcycles[current].specs.tipo}</p>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div>
                                            <span className="font-bold text-white">Cilindrada:</span>
                                            <span className="text-gray-300 ml-2">{motorcycles[current].specs.cilindrada}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-white">Par máximo CE:</span>
                                            <span className="text-gray-300 ml-2">{motorcycles[current].specs.parMaximo}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-bold text-white">Caja de cambios:</span>
                                        <span className="text-gray-300 ml-2">{motorcycles[current].specs.cajaCambios}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold text-white">Consumo de combustible:</span>
                                        <span className="text-gray-300 ml-2">{motorcycles[current].specs.consumo}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Versión desktop - Manteniendo la estructura original exactamente como estaba */}
                <div className="hidden lg:block">
                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-center min-h-[500px] md:min-h-[550px] lg:min-h-[600px]">
                        {/* --- Área de información de la motocicleta (izquierda) --- */}
                        <div className="w-full lg:w-[42%] px-4 order-2 lg:order-1 mt-8 lg:mt-0 lg:px-8 lg:py-4">
                            <div className={`transition-opacity duration-300 ${fadeTransition ? 'opacity-0' : 'opacity-100'}`}>
                                {/* Título alineado a la izquierda en vez de al centro */}
                                <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center lg:text-left">
                                    {motorcycles[current].name.toUpperCase()}
                                </h3>

                                <div className="space-y-5 md:space-y-7 text-sm md:text-base text-center lg:text-left max-w-md mx-auto lg:mx-0">
                                    <div>
                                        <p className="font-bold text-white">Tipo:</p>
                                        <p className="text-gray-300">{motorcycles[current].specs.tipo}</p>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4 justify-center lg:justify-start">
                                        <div className="mb-2 md:mb-0">
                                            <span className="font-bold text-white">Cilindrada:</span>
                                            <span className="text-gray-300 ml-2">{motorcycles[current].specs.cilindrada}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-white">Par máximo CE:</span>
                                            <span className="text-gray-300 ml-2">{motorcycles[current].specs.parMaximo}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-bold text-white">Caja de cambios:</span>
                                        <span className="text-gray-300 ml-2">{motorcycles[current].specs.cajaCambios}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold text-white">Consumo de combustible:</span>
                                        <span className="text-gray-300 ml-2">{motorcycles[current].specs.consumo}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- Área de visualización de la motocicleta (derecha) --- */}
                        {/* Swipe limitado solo a este componente */}
                        <motion.div
                            className="w-full lg:w-[52%] relative flex items-center justify-center lg:justify-end order-1 lg:order-2 h-[340px] md:h-[400px] lg:h-[520px] cursor-grab active:cursor-grabbing overflow-visible"
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.1}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            style={{ userSelect: 'none' }}
                        >
                            <div className={`w-full h-full flex items-center justify-center relative transition-opacity duration-300 ${fadeTransition ? 'opacity-0' : 'opacity-100'}`}>
                                {/* Flecha Arriba - posición ajustada para bajarla */}
                                <button
                                    onClick={() => selectMotorcycle(current - 1)}
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-4 z-20 text-white hover:text-gray-300 transition-colors"
                                    aria-label="Modelo anterior"
                                >
                                    <BsArrowUpSquare size={32} />
                                </button>

                                {/* Contenedor para efectos de luz y sombra */}
                                <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                                    {/* Efecto de luz gradiente detrás de la moto */}
                                    <div className="absolute w-full h-full rounded-full bg-gradient-radial from-white/5 via-transparent to-transparent opacity-70"></div>

                                    {/* Sombra debajo de la moto */}
                                    <div className="absolute bottom-4 w-3/4 h-4 bg-black/50 rounded-full blur-md transform scale-x-110 opacity-70"></div>

                                    {/* Imagen de la motocicleta con animación y efectos */}
                                    <motion.div
                                        className="relative z-10"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeOut"
                                        }}
                                    >
                                        <motion.img
                                            key={current}
                                            src={motorcycles[current].image}
                                            alt={`Imagen de la motocicleta ${motorcycles[current].name}`}
                                            className="w-auto object-contain max-h-[330px] md:max-h-[380px] lg:max-h-[520px] px-4 drop-shadow-2xl"
                                            style={{
                                                pointerEvents: 'none',
                                                filter: 'drop-shadow(0 15px 15px rgba(0, 0, 0, 0.5))'
                                            }}
                                            draggable="false"
                                            animate={{
                                                y: [0, -4, 0],
                                                scale: [1, 1.01, 1]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 3,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </motion.div>

                                    {/* Efecto de brillo delante de la moto */}
                                    <div className="absolute w-full h-full bg-gradient-to-t from-white/5 to-transparent opacity-30 pointer-events-none z-20"></div>
                                </div>

                                {/* Flecha Abajo */}
                                <button
                                    onClick={() => selectMotorcycle(current + 1)}
                                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 z-20 text-white hover:text-gray-300 transition-colors"
                                    aria-label="Siguiente modelo"
                                >
                                    <BsArrowDownSquare size={32} />
                                </button>
                            </div>
                        </motion.div>

                        {/* --- Indicadores de puntos --- Usando las clases originales --- */}
                        <div
                            className="absolute z-30 flex flex-row space-x-3 bottom-4 left-1/2 transform -translate-x-1/2 lg:flex-col lg:space-y-4 lg:space-x-0 lg:top-1/2 lg:left-[calc(50%-1.5rem)] lg:bottom-auto lg:-translate-y-1/2"
                            style={{ pointerEvents: 'auto' }}
                        >
                            {motorcycles.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => selectMotorcycle(index)}
                                    className={`rounded-full transition-all duration-300 focus:outline-none focus:ring focus:ring-white/30
                                h-3 w-3 border border-white/70
                                ${current === index ? 'bg-white scale-110' : 'bg-gray-600/80 hover:bg-gray-400/80'}
                              `}
                                    aria-label={`Ver ${motorcycles[index].name}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MotorcycleShowcase;