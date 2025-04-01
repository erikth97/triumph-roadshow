import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Iniciar reproducción de video cuando esté listo
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Error al reproducir el video:", error);
            });
        }
    }, []);

    const scrollToRegistration = () => {
        const registrationSection = document.getElementById('registro');
        if (registrationSection) {
            registrationSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative h-screen overflow-hidden">
            {/* Video de fondo */}
            <div className="absolute inset-0">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/videos/triumph-hero.mp4" type="video/mp4" />
                    Tu navegador no soporta videos.
                </video>
                {/* Overlay para mejorar la legibilidad del texto */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            {/* Contenido del hero */}
            <div className="relative z-10 container-custom h-full flex flex-col justify-center items-center text-center text-white">
                <img
                    src="/images/DRS-BLANCO.png"
                    alt="Demo Road Show Triumph"
                    className="w-64 md:w-80 mb-10"
                />

                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    ¡Vive la experiencia Triumph!
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl mb-12 max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Regístrate para el Demo Road Show y prueba las
                    motocicletas más emblemáticas del mundo.
                </motion.p>

                <motion.button
                    onClick={scrollToRegistration}
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <span className="uppercase font-bold text-lg hover:text-[#D11A2A] transition-colors">
                        Regístrate Ahora
                    </span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </motion.div>
                </motion.button>
            </div>
        </section>
    );
};

export default HeroSection;