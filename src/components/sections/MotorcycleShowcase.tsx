import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, PanInfo, AnimatePresence } from 'framer-motion';
import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";
import { motorcycles } from '@/lib/constants/motorcycleData';

// Componente de partículas
const Particles: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const particleCount = 20;
    const particles = Array.from({ length: particleCount }, (_, i) => i);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        scale: 0,
                        opacity: 0
                    }}
                    animate={isActive ? {
                        x: [null, Math.random() * 100 + "%"],
                        y: [null, Math.random() * 100 + "%"],
                        scale: [0, Math.random() * 0.5 + 0.3, 0],
                        opacity: [0, 0.6, 0]
                    } : {
                        scale: 0,
                        opacity: 0
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

// Componente de imagen con lazy loading
const LazyImage: React.FC<{
    src: string;
    alt: string;
    className: string;
    style?: React.CSSProperties;
    onLoad?: () => void;
}> = ({ src, alt, className, style, onLoad }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    return (
        <div ref={imgRef} className={`relative ${className}`}>
            {isInView && (
                <motion.img
                    src={src}
                    alt={alt}
                    className={className}
                    style={style}
                    onLoad={handleLoad}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    draggable="false"
                />
            )}
            {!isLoaded && isInView && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

const MotorcycleShowcase: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [fadeTransition, setFadeTransition] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null);
    const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
    const [isAnimating, setIsAnimating] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Preload de imágenes
    const preloadImage = useCallback((src: string) => {
        if (preloadedImages.has(src)) return;
        
        const img = new Image();
        img.onload = () => {
            setPreloadedImages(prev => new Set(prev).add(src));
        };
        img.src = src;
    }, [preloadedImages]);

    // Preload de imágenes adyacentes
    useEffect(() => {
        const preloadAdjacentImages = () => {
            const nextIndex = (current + 1) % motorcycles.length;
            const prevIndex = (current - 1 + motorcycles.length) % motorcycles.length;
            
            preloadImage(motorcycles[nextIndex].image);
            preloadImage(motorcycles[prevIndex].image);
            preloadImage(motorcycles[nextIndex].logoPath);
            preloadImage(motorcycles[prevIndex].logoPath);
        };

        preloadAdjacentImages();
    }, [current, preloadImage]);

    // Preload inicial
    useEffect(() => {
        motorcycles.forEach(motorcycle => {
            preloadImage(motorcycle.image);
            preloadImage(motorcycle.logoPath);
        });
    }, [preloadImage]);

    const selectMotorcycle = (index: number) => {
        if (fadeTransition || index === current || isAnimating) return;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setIsAnimating(true);
        setFadeTransition(true);
        const newIndex = ((index % motorcycles.length) + motorcycles.length) % motorcycles.length;

        setTimeout(() => {
            setCurrent(newIndex);
            setFadeTransition(false);
            if (!isDragging) {
                startAutoplay();
            }
            setIsAnimating(false);
        }, 400);
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
        setDragDirection(null);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Añadir clase para indicar al usuario que está arrastrando
        document.body.classList.add('grabbing');
    };

    const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const offset = info.offset.y;
        if (Math.abs(offset) > 20) {
            setDragDirection(offset > 0 ? 'down' : 'up');
        }
    };

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsDragging(false);
        setDragDirection(null);

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
                        {/* Logo de la motocicleta arriba en móvil (reemplazando el título) */}
                        <motion.div 
                            className="w-full text-center mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="flex justify-center items-center h-24"
                                >
                                    <LazyImage
                                        src={motorcycles[current].logoPath}
                                        alt={`Logo de ${motorcycles[current].name}`}
                                        className={`h-full ${motorcycles[current].needsSpecialSize ? 'w-72 scale-110' : 'w-64'} object-contain`}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* Contenedor para imagen y navegación */}
                        <div className="relative mb-6">
                            <motion.div
                                className={`relative flex items-center justify-center h-[300px] w-full transition-all duration-200 ${
                                    isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'
                                } ${
                                    dragDirection === 'up' ? 'bg-gradient-to-t from-blue-500/10 to-transparent' : 
                                    dragDirection === 'down' ? 'bg-gradient-to-b from-blue-500/10 to-transparent' : ''
                                }`}
                                drag="y"
                                dragConstraints={{ top: 0, bottom: 0 }}
                                dragElastic={0.1}
                                onDragStart={handleDragStart}
                                onDrag={handleDrag}
                                onDragEnd={handleDragEnd}
                                style={{ userSelect: 'none' }}
                                whileDrag={{ scale: 1.02 }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={current}
                                        initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="w-full h-full flex items-center justify-center relative"
                                    >
                                        {/* Flecha Arriba */}
                                        <motion.button
                                            onClick={() => selectMotorcycle(current - 1)}
                                            className={`absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-4 z-20 text-white transition-all duration-200 ${
                                                dragDirection === 'up' ? 'text-blue-400 scale-110' : 'hover:text-gray-300'
                                            }`}
                                            aria-label="Modelo anterior"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.3 }}
                                        >
                                            <BsArrowUpSquare size={32} />
                                        </motion.button>

                                        {/* Contenedor para efectos de luz y sombra */}
                                        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                                            {/* Partículas */}
                                            <Particles isActive={!isDragging} />
                                            
                                            {/* Efectos similares al original */}
                                            <motion.div 
                                                className="absolute w-full h-full rounded-full bg-gradient-radial from-white/5 via-transparent to-transparent opacity-70"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 0.7 }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                            />
                                            <motion.div 
                                                className="absolute bottom-4 w-3/4 h-4 bg-black/50 rounded-full blur-md transform scale-x-110 opacity-70"
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 0.7 }}
                                                transition={{ delay: 0.4, duration: 0.5 }}
                                            />

                                            {/* Imagen de la motocicleta */}
                                            <motion.div
                                                className="relative z-10"
                                                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                                            >
                                                <motion.div
                                                    animate={{
                                                        y: [0, -4, 0],
                                                        scale: [1, 1.01, 1]
                                                    }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 3,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    <LazyImage
                                                        src={motorcycles[current].image}
                                                        alt={`Imagen de la motocicleta ${motorcycles[current].name}`}
                                                        className="w-auto object-contain max-h-[260px] px-4 drop-shadow-2xl"
                                                        style={{
                                                            pointerEvents: 'none',
                                                            filter: 'drop-shadow(0 15px 15px rgba(0, 0, 0, 0.5))'
                                                        }}
                                                    />
                                                </motion.div>
                                            </motion.div>

                                            <motion.div 
                                                className="absolute w-full h-full bg-gradient-to-t from-white/5 to-transparent opacity-30 pointer-events-none z-20"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 0.3 }}
                                                transition={{ delay: 0.5, duration: 0.5 }}
                                            />
                                        </div>

                                        {/* Flecha Abajo */}
                                        <motion.button
                                            onClick={() => selectMotorcycle(current + 1)}
                                            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 z-20 text-white transition-all duration-200 ${
                                                dragDirection === 'down' ? 'text-blue-400 scale-110' : 'hover:text-gray-300'
                                            }`}
                                            aria-label="Siguiente modelo"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.3 }}
                                        >
                                            <BsArrowDownSquare size={32} />
                                        </motion.button>
                                    </motion.div>
                                </AnimatePresence>
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
                                        h-3 w-3
                                        ${current === index ? 'bg-white scale-110' : 'bg-gray-600/80 hover:bg-gray-400/80'}
                                      `}
                                        aria-label={`Ver ${motorcycles[index].name}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Descripción debajo de la imagen */}
                        <motion.div 
                            className="w-full text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="space-y-4 text-sm max-w-md mx-auto"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1, duration: 0.3 }}
                                    >
                                        <p className="font-bold text-white">Peso:</p>
                                        <p className="text-gray-300">{motorcycles[current].specs.peso}</p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2, duration: 0.3 }}
                                    >
                                        <p className="font-bold text-white">Altura del asiento:</p>
                                        <p className="text-gray-300">{motorcycles[current].specs.alturaAsiento}</p>
                                    </motion.div>
                                    <motion.div 
                                        className="flex flex-col items-center space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.3 }}
                                    >
                                        <div>
                                            <span className="font-bold text-white">Motor:</span>
                                            <span className="text-gray-300 ml-2">{motorcycles[current].specs.motor}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-white">Torque:</span>
                                            <span className="text-gray-300 ml-2">{motorcycles[current].specs.torque}</span>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.3 }}
                                    >
                                        <span className="font-bold text-white">Potencia:</span>
                                        <span className="text-gray-300 ml-2">{motorcycles[current].specs.potencia}</span>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* Versión desktop - Actualizando para mostrar logo en vez de texto */}
                <div className="hidden lg:block">
                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-center min-h-[500px] md:min-h-[550px] lg:min-h-[600px]">
                        {/* --- Área de información de la motocicleta (izquierda) --- */}
                        <motion.div 
                            className="w-full lg:w-[42%] px-4 order-2 lg:order-1 mt-8 lg:mt-0 lg:px-8 lg:py-4"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    {/* Logo reemplazando al título de texto */}
                                    <motion.div 
                                        className="mb-8 text-center lg:text-center"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                    >
                                        <LazyImage
                                            src={motorcycles[current].logoPath}
                                            alt={`Logo de ${motorcycles[current].name}`}
                                            className={`h-24 ${motorcycles[current].needsSpecialSize ? 'w-72 scale-110' : 'w-64'} object-contain mx-auto`}
                                        />
                                    </motion.div>

                                    <div className="space-y-5 md:space-y-7 text-sm md:text-base text-center lg:text-left max-w-md mx-auto lg:mx-0">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.3 }}
                                        >
                                            <p className="font-bold text-white">Peso:</p>
                                            <p className="text-gray-300">{motorcycles[current].specs.peso}</p>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4, duration: 0.3 }}
                                        >
                                            <p className="font-bold text-white">Altura del asiento:</p>
                                            <p className="text-gray-300">{motorcycles[current].specs.alturaAsiento}</p>
                                        </motion.div>
                                        <motion.div 
                                            className="flex flex-col md:flex-row md:items-baseline md:space-x-4 justify-center lg:justify-start"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5, duration: 0.3 }}
                                        >
                                            <div className="mb-2 md:mb-0">
                                                <span className="font-bold text-white">Motor:</span>
                                                <span className="text-gray-300 ml-2">{motorcycles[current].specs.motor}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-white">Torque:</span>
                                                <span className="text-gray-300 ml-2">{motorcycles[current].specs.torque}</span>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6, duration: 0.3 }}
                                        >
                                            <span className="font-bold text-white">Potencia:</span>
                                            <span className="text-gray-300 ml-2">{motorcycles[current].specs.potencia}</span>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* --- Área de visualización de la motocicleta (derecha) --- */}
                        {/* Swipe limitado solo a este componente */}
                        <motion.div
                            className={`w-full lg:w-[52%] relative flex items-center justify-center lg:justify-end order-1 lg:order-2 h-[340px] md:h-[400px] lg:h-[520px] overflow-visible transition-all duration-200 ${
                                isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'
                            } ${
                                dragDirection === 'up' ? 'bg-gradient-to-t from-blue-500/10 to-transparent' : 
                                dragDirection === 'down' ? 'bg-gradient-to-b from-blue-500/10 to-transparent' : ''
                            }`}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.1}
                            onDragStart={handleDragStart}
                            onDrag={handleDrag}
                            onDragEnd={handleDragEnd}
                            style={{ userSelect: 'none' }}
                            whileDrag={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="w-full h-full flex items-center justify-center relative"
                                >
                                    {/* Flecha Arriba - posición ajustada para bajarla */}
                                    <motion.button
                                        onClick={() => selectMotorcycle(current - 1)}
                                        className={`absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-4 z-20 text-white transition-all duration-200 ${
                                            dragDirection === 'up' ? 'text-blue-400 scale-110' : 'hover:text-gray-300'
                                        }`}
                                        aria-label="Modelo anterior"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.3 }}
                                    >
                                        <BsArrowUpSquare size={32} />
                                    </motion.button>

                                    {/* Contenedor para efectos de luz y sombra */}
                                    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                                        {/* Partículas */}
                                        <Particles isActive={!isDragging} />
                                        
                                        {/* Efecto de luz gradiente detrás de la moto */}
                                        <motion.div 
                                            className="absolute w-full h-full rounded-full bg-gradient-radial from-white/5 via-transparent to-transparent opacity-70"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 0.7 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                        />

                                        {/* Sombra debajo de la moto */}
                                        <motion.div 
                                            className="absolute bottom-4 w-3/4 h-4 bg-black/50 rounded-full blur-md transform scale-x-110 opacity-70"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 0.7 }}
                                            transition={{ delay: 0.5, duration: 0.5 }}
                                        />

                                        {/* Imagen de la motocicleta con animación y efectos */}
                                        <motion.div
                                            className="relative z-10"
                                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                                        >
                                            <motion.div
                                                animate={{
                                                    y: [0, -4, 0],
                                                    scale: [1, 1.01, 1]
                                                }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 3,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <LazyImage
                                                    src={motorcycles[current].image}
                                                    alt={`Imagen de la motocicleta ${motorcycles[current].name}`}
                                                    className="w-auto object-contain max-h-[330px] md:max-h-[380px] lg:max-h-[520px] px-4 drop-shadow-2xl"
                                                    style={{
                                                        pointerEvents: 'none',
                                                        filter: 'drop-shadow(0 15px 15px rgba(0, 0, 0, 0.5))'
                                                    }}
                                                />
                                            </motion.div>
                                        </motion.div>

                                        {/* Efecto de brillo delante de la moto */}
                                        <motion.div 
                                            className="absolute w-full h-full bg-gradient-to-t from-white/5 to-transparent opacity-30 pointer-events-none z-20"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.3 }}
                                            transition={{ delay: 0.6, duration: 0.5 }}
                                        />
                                    </div>

                                    {/* Flecha Abajo */}
                                    <motion.button
                                        onClick={() => selectMotorcycle(current + 1)}
                                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 z-20 text-white transition-all duration-200 ${
                                            dragDirection === 'down' ? 'text-blue-400 scale-110' : 'hover:text-gray-300'
                                        }`}
                                        aria-label="Siguiente modelo"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.3 }}
                                    >
                                        <BsArrowDownSquare size={32} />
                                    </motion.button>
                                </motion.div>
                            </AnimatePresence>
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
                                h-3 w-3
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