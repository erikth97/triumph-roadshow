import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';

const InfoSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // ScrollY progress para efectos de parallax
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transformaciones basadas en scroll
    const rotateXOnScroll = useTransform(scrollYProgress, [0, 1], [5, -5]);
    const rotateYOnScroll = useTransform(scrollYProgress, [0, 1], [-5, 5]);
    const scaleOnScroll = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
    const backgroundYOffset = useTransform(scrollYProgress, [0, 1], [0, -20]);

    // Valores para efecto de mouse hover
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Transformaciones basadas en posición del mouse
    const rotateXOnMouse = useTransform(mouseY, [-200, 200], [2, -2]);
    const rotateYOnMouse = useTransform(mouseX, [-200, 200], [-2, 2]);

    // Manejadores de eventos de mouse
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || prefersReducedMotion) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        mouseX.set(e.clientX - rect.left - centerX);
        mouseY.set(e.clientY - rect.top - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Efecto para detectar cuando el componente está en el viewport
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, { threshold: 0.2 });

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    // Efecto para precargar imágenes
    useEffect(() => {
        const imageUrls = [
            '/images/IMAGEN INTRO_FONDO.webp',
            '/images/IMAGEN INTRO_CHICA.webp'
        ];

        const loadImages = async () => {
            try {
                const promises = imageUrls.map(url => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = url;
                        img.onload = () => resolve(url);
                        img.onerror = () => reject(`Failed to load image: ${url}`);
                    });
                });

                await Promise.all(promises);
                setImagesLoaded(true);
            } catch (error) {
                console.warn('Error cargando imágenes:', error);
                // Aún si hay error, mostramos lo que se pueda cargar
                setImagesLoaded(true);
            }
        };

        loadImages();
    }, []);

    return (
        <section
            className="relative py-12 md:py-20 bg-black text-white overflow-hidden w-full"
            aria-labelledby="info-section-title"
        >
            {/* Título móvil que aparece arriba de la imagen */}
            <div className="block lg:hidden px-6 mb-6 w-full">
                <motion.h2
                    id="info-section-title-mobile"
                    className="text-3xl md:text-4xl font-bold uppercase italic leading-tight text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    ¡Únete a nosotros en<br />el Demo Road Show<br />de Triumph!
                </motion.h2>
            </div>

            <div className="flex flex-col lg:flex-row w-full">
                {/* Texto para desktop - incluye título y descripción */}
                <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-8 lg:pl-24 lg:pr-12">
                    <motion.h2
                        id="info-section-title"
                        className="text-4xl lg:text-5xl font-bold mb-8 uppercase italic leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        ¡Únete a nosotros en<br />el Demo Road Show<br />de Triumph!
                    </motion.h2>

                    <motion.p
                        className="text-base md:text-lg text-gray-300 max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Si eres un amante de las motocicletas, esta es tu oportunidad de <span className="font-bold text-white">experimentar</span> de primera mano la emoción y el rendimiento de nuestras motocicletas en el asfalto. Nos vamos a varias ciudades para que puedas probar nuestras motos más recientes en un ambiente seguro y controlado. <span className="font-bold italic">¡No te lo puedes perder!</span>
                    </motion.p>
                </div>

                {/* Imagen pegada al borde para ambas versiones */}
                <div className="w-full lg:w-1/2 h-full overflow-hidden m-0 p-0">
                    <motion.div
                        ref={containerRef}
                        className="relative w-full h-[400px] md:h-[500px] lg:h-[650px] xl:h-[700px] 2xl:h-[800px] m-0 p-0 bg-black"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ perspective: "1200px" }}
                        aria-hidden={prefersReducedMotion ? false : true}
                    >
                        {imagesLoaded ? (
                            <motion.div
                                className="relative w-full h-full"
                                style={{
                                    transformStyle: "preserve-3d",
                                    overflow: "hidden",
                                    scale: prefersReducedMotion ? 1 : scaleOnScroll,
                                    rotateX: prefersReducedMotion ? 0 : (isInView ? rotateXOnScroll : 0),
                                    rotateY: prefersReducedMotion ? 0 : (isInView ? rotateYOnScroll : 0)
                                }}
                            >
                                <motion.img
                                    src="/images/IMAGEN INTRO_FONDO.webp"
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover"
                                    style={{
                                        y: prefersReducedMotion ? 0 : backgroundYOffset
                                    }}
                                    loading="lazy"
                                />

                                <motion.img
                                    src="/images/IMAGEN INTRO_CHICA.webp"
                                    alt="Motociclista de Triumph en acción"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    style={{
                                        x: prefersReducedMotion ? 0 : rotateYOnMouse,
                                        y: prefersReducedMotion ? 0 : rotateXOnMouse
                                    }}
                                    loading="lazy"
                                />
                            </motion.div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Descripción móvil que aparece debajo de la imagen */}
            <div className="block lg:hidden px-6 mt-6 w-full">
                <motion.p
                    className="text-base text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Si eres un amante de las motocicletas, esta es tu oportunidad de <span className="font-bold text-white">experimentar</span> de primera mano la emoción y el rendimiento de nuestras motocicletas en el asfalto. Nos vamos a varias ciudades para que puedas probar nuestras motos más recientes en un ambiente seguro y controlado. <span className="font-bold italic">¡No te lo puedes perder!</span>
                </motion.p>
            </div>
        </section>
    );
};

export default InfoSection;