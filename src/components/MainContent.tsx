import { useEffect, useRef, useState } from 'react';
import { useLoading } from '@/context/LoadingContext';
import HomePage from '@/pages/HomePage';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleRipple from '@/components/SimpleRipple';

const MainContent = () => {
    const { isLoading, setResourceLoaded } = useLoading();
    const [heroLogoPosition, setHeroLogoPosition] = useState({ top: 0, left: 0 });
    const logoHeroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setResourceLoaded('initialContent');
    }, [isLoading, setResourceLoaded]);

    // Fondo negro que siempre está presente
    useEffect(() => {
        document.body.style.backgroundColor = '#000000';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    // Efecto para calcular la posición del logo en el hero una vez cargado
    useEffect(() => {
        if (!isLoading && logoHeroRef.current) {
            // Pequeño retraso para asegurar que el DOM esté actualizado
            setTimeout(() => {
                const heroRect = logoHeroRef.current?.getBoundingClientRect();
                if (heroRect) {
                    setHeroLogoPosition({
                        top: heroRect.top,
                        left: heroRect.left
                    });
                }
            }, 100);
        }
    }, [isLoading]);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.8, delay: 0.2 }
                        }}
                    >
                        {/* Contenedor para Ripple y Logo */}
                        <div className="relative h-screen w-full flex items-center justify-center">
                            {/* Contenedor del efecto Ripple */}
                            <div className="relative h-[600px] w-[600px]">
                                <SimpleRipple />
                            </div>

                            {/* Logo centrado sobre el efecto Ripple */}
                            <motion.div
                                className="absolute z-10"
                                initial={{ y: 0 }}
                                animate={{
                                    y: [0, -5, 0], // Movimiento muy sutil
                                    transition: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                exit={{
                                    y: heroLogoPosition.top > 0 ? heroLogoPosition.top - window.innerHeight / 2 : -100,
                                    x: heroLogoPosition.left > 0 ? heroLogoPosition.left - window.innerWidth / 2 : 0,
                                    scale: 0.8,
                                    transition: {
                                        duration: 1,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                <img
                                    src="/images/DRS-BLANCO.png"
                                    alt="Demo Road Show Triumph"
                                    className="w-64 md:w-80"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-black min-h-screen">
                <AnimatePresence>
                    {!isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <HomePage logoRef={logoHeroRef} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default MainContent;