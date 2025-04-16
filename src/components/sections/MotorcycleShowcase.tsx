// src/components/sections/MotorcycleShowcase.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";
import { motorcycles } from '@/lib/constants/motorcycleData'; // Corregir la ruta de importación

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
                {/* 1. Reducir espacio después del título */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-12">
                    ¡DESCÚBRELAS EN EL DEMO ROAD SHOW!
                </h2>

                <motion.div
                    className="relative cursor-grab"
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.1}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    style={{ userSelect: 'none' }}
                >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center min-h-[500px] md:min-h-[550px] lg:min-h-[600px]">

                        {/* --- Área de información de la motocicleta (izquierda) --- */}
                        {/* 3. Aumentar levemente ancho de contenedor */}
                        <div className="w-full lg:w-[45%] px-4 order-2 lg:order-1 mt-8 lg:mt-0 cursor-grab active:cursor-grabbing">
                            <div className={`transition-opacity duration-300 ${fadeTransition ? 'opacity-0' : 'opacity-100'}`}>
                                {/* 2. Centrar título de la moto */}
                                <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                                    {motorcycles[current].name.toUpperCase()}
                                </h3>

                                <div className="space-y-4 md:space-y-6 text-sm md:text-base text-center lg:text-left max-w-md mx-auto lg:mx-0">
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
                        {/* 3. Aumentar levemente ancho y altura de contenedor */}
                        <div className="w-full lg:w-[45%] relative flex items-center justify-center lg:justify-end order-1 lg:order-2 h-[300px] md:h-[350px] lg:h-[480px] cursor-grab active:cursor-grabbing">
                            <div className={`w-full h-full flex items-center justify-center relative transition-opacity duration-300 ${fadeTransition ? 'opacity-0' : 'opacity-100'}`}>
                                {/* Flecha Arriba */}
                                <button
                                    onClick={() => selectMotorcycle(current - 1)}
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 z-10 text-white hover:text-gray-300 transition-colors"
                                    aria-label="Modelo anterior"
                                >
                                    <BsArrowUpSquare size={28} />
                                </button>

                                {/* Imagen de la motocicleta */}
                                <motion.img
                                    key={current}
                                    src={motorcycles[current].image}
                                    alt={`Imagen de la motocicleta ${motorcycles[current].name}`}
                                    className="w-auto h-auto object-contain max-h-[300px] md:max-h-[350px] lg:max-h-[480px]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ pointerEvents: 'none' }}
                                    draggable="false"
                                />

                                {/* Flecha Abajo */}
                                <button
                                    onClick={() => selectMotorcycle(current + 1)}
                                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 z-10 text-white hover:text-gray-300 transition-colors"
                                    aria-label="Siguiente modelo"
                                >
                                    <BsArrowDownSquare size={28} />
                                </button>
                            </div>
                        </div>

                        {/* --- Indicadores de puntos --- */}
                        {/* Ajustado levemente left por cambio de ancho de columna */}
                        <div className="absolute z-10 flex flex-row space-x-3 bottom-4 left-1/2 transform -translate-x-1/2 lg:flex-col lg:space-y-4 lg:space-x-0 lg:top-1/2 lg:left-[calc(50%-1.5rem)] lg:bottom-auto lg:-translate-y-1/2">
                            {motorcycles.map((_, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => selectMotorcycle(index)}
                                    className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white
                    h-2.5 w-2.5
                    ${current === index ? 'bg-white scale-110' : 'bg-gray-600 hover:bg-gray-400'}
                  `}
                                    aria-label={`Ver ${motorcycles[index].name}`}
                                />
                            ))}
                        </div>

                    </div> {/* Fin flex row/col */}
                </motion.div> {/* Fin motion wrapper para drag */}
            </div> {/* Fin container mx-auto */}
        </section>
    );
};

export default MotorcycleShowcase;