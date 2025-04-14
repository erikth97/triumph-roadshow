import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

const InfoSection: React.FC = () => {
    // Referencias y estado
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    // Para el efecto de scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transformaciones para la rotación basada en scroll
    const rotateXOnScroll = useTransform(scrollYProgress, [0, 1], [5, -5]);
    const rotateYOnScroll = useTransform(scrollYProgress, [0, 1], [-5, 5]);
    const scaleOnScroll = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

    // Efecto de paralaje para el fondo
    const backgroundYOffset = useTransform(scrollYProgress, [0, 1], [0, -20]);

    // Valores para el efecto de mouse hover
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Transformaciones basadas en la posición del mouse
    const rotateXOnMouse = useTransform(mouseY, [-200, 200], [2, -2]);
    const rotateYOnMouse = useTransform(mouseX, [-200, 200], [-2, 2]);

    // Gestionar evento de mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calcular posición relativa al centro del contenedor
        const x = e.clientX - rect.left - centerX;
        const y = e.clientY - rect.top - centerY;

        mouseX.set(x);
        mouseY.set(y);
    };

    // Resetear posición cuando el mouse sale
    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Detectar cuando el elemento está en vista
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <section className="relative py-20 bg-black text-white overflow-hidden">
            <div className="container-custom mx-0 px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    {/* Contenido (Título y Descripción) */}
                    <div className="order-2 lg:order-1 lg:pr-6 flex flex-col justify-center lg:pl-4 xl:pl-8">
                        <motion.h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 uppercase italic leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            ¡Únete a nosotros en<br />el Demo Road Show<br />de Triumph!
                        </motion.h2>

                        <motion.p
                            className="text-base md:text-lg text-gray-300 max-w-xl mx-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Si eres un amante de las motocicletas, esta es tu oportunidad de <span className="font-bold text-white">experimentar</span> de primera mano la emoción y el rendimiento de nuestras motocicletas en el asfalto. Nos vamos a varias ciudades para que puedas probar nuestras motos más recientes en un ambiente seguro y controlado. <span className="font-bold italic">¡No te lo puedes perder!</span>
                        </motion.p>
                    </div>

                    {/* Imagen con efecto 3D */}
                    <div className="order-1 lg:order-2 relative w-full h-full" style={{ margin: 0, padding: 0 }}>
                        {/* Este contenedor es solo para el efecto 3D y mantiene la proporción */}
                        <motion.div
                            ref={containerRef}
                            className="relative"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                perspective: "1200px",
                                width: "100%",
                                height: "650px",
                                position: "relative",
                                margin: 0,
                                padding: 0
                            }}
                        >
                            {/* Contenedor 3D - sin bordes ni sombras para integrarse mejor */}
                            <motion.div
                                className="relative w-full h-full"
                                style={{
                                    transformStyle: "preserve-3d",
                                    overflow: "hidden",
                                    scale: scaleOnScroll,
                                    rotateX: isInView ? rotateXOnScroll : 0,
                                    rotateY: isInView ? rotateYOnScroll : 0
                                }}
                            >
                                {/* FONDO: Usa object-position para mostrar la parte relevante del fondo */}
                                <motion.div
                                    className="absolute inset-0 w-full h-full"
                                    style={{
                                        y: backgroundYOffset,
                                        zIndex: 0
                                    }}
                                >
                                    <div style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden", margin: 0, padding: 0 }}>
                                        <img
                                            src="/images/IMAGEN INTRO_FONDO.webp"
                                            alt="Fondo Triumph"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain", // Cambiado de "cover" a "contain" para evitar recorte
                                                objectPosition: "center center", // Centrado completo
                                                display: "block",
                                                margin: 0,
                                                padding: 0
                                            }}
                                        />
                                    </div>
                                </motion.div>

                                {/* MOTO: Capa de primer plano con el motociclista */}
                                <motion.div
                                    className="absolute inset-0 w-full h-full"
                                    style={{
                                        zIndex: 1,
                                        x: rotateYOnMouse,
                                        y: rotateXOnMouse
                                    }}
                                >
                                    <img
                                        src="/images/IMAGEN INTRO_CHICA.webp"
                                        alt="Motociclista Triumph en acción"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "center center",
                                            display: "block",
                                            margin: 0,
                                            padding: 0
                                        }}
                                    />
                                </motion.div>

                                {/* Efecto de brillo muy sutil para dar profundidad */}
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        zIndex: 2,
                                        backgroundImage: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 45%, transparent 100%)",
                                        mixBlendMode: "soft-light",
                                        opacity: useTransform(mouseX, [-300, 0, 300], [0.15, 0, 0.15])
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Estilos adicionales para asegurar que todo funcione correctamente */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    /* Ayudar a dispositivos móviles */
                    @media (max-width: 768px) {
                        .order-1.lg\\:order-2 .relative {
                            height: 450px !important;
                        }
                    }
                    
                    /* Hacer que las imágenes se vean correctamente en dispositivos de alta densidad */
                    img {
                        max-width: 100%;
                        height: auto;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    
                    .container-custom {
                        width: 100%;
                        max-width: 100%;
                        margin: 0;
                        padding: 0;
                    }
                    
                    /* Eliminar espacios no deseados */
                    .grid {
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    
                    /* Asegurar que el texto tenga márgenes adecuados */
                    .order-2.lg\\:order-1 {
                        padding-left: 1.5rem; /* Reducido de 3rem a 1.5rem */
                        padding-right: 1.5rem; /* Reducido de 3rem a 1.5rem */
                        margin-bottom: 1.5rem;
                    }

                    /* Opción alternativa para mantener objectFit: "cover" con proporción ajustada (descomentar si es necesario) */
                    /*
                    .relative {
                        aspect-ratio: 16 / 9;
                        height: auto !important;
                    }
                    @media (max-width: 768px) {
                        .order-1.lg\\:order-2 .relative {
                            aspect-ratio: 16 / 9;
                            height: auto !important;
                        }
                    }
                    */
                `
            }} />
        </section>
    );
};

export default InfoSection;