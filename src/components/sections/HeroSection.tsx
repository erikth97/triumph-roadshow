import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CgArrowDownO } from "react-icons/cg";
import { useLoading } from '@/context/LoadingContext';

const HeroSection = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { setResourceLoaded } = useLoading();

    useEffect(() => {
        if (videoRef.current) {
            console.log("Intentando reproducir video...");
            videoRef.current.play()
                .then(() => {
                    console.log("Video reproduciendo correctamente");
                    setResourceLoaded('video');
                })
                .catch(error => {
                    console.error("Error al reproducir el video:", error);
                    setResourceLoaded('video');
                });
        }
    }, [setResourceLoaded]);

    const scrollToRegistration = () => {
        const registrationSection = document.getElementById('registro');
        if (registrationSection) {
            registrationSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative h-screen overflow-hidden">
            {/* Video de fondo con filtro */}
            <div className="absolute inset-0">
                {/* Video con filtros aplicados */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            filter: 'brightness(0.7) contrast(1.1) saturate(0.9)',
                        }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onLoadedData={() => {
                            console.log("Video cargado correctamente");
                            setResourceLoaded('video');
                        }}
                        onError={(e) => {
                            console.error("Error al cargar el video", e);
                            setResourceLoaded('video');
                        }}
                    >
                        <source src="/videos/triumph-hero.mp4" type="video/mp4" />
                        Tu navegador no soporta videos.
                    </video>
                </div>

                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)',
                        mixBlendMode: 'multiply'
                    }}
                ></div>
            </div>

            {/* Contenido del hero */}
            <div className="relative z-10 container-custom h-full flex flex-col justify-center items-center text-center text-white">
                <img
                    src="/images/DRS-BLANCO.png"
                    alt="Demo Road Show Triumph"
                    className="w-64 md:w-80 mb-6"
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
                    className="text-xl md:text-2xl mb-16 max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Regístrate para el Demo Road Show y prueba las
                    motocicletas más emblemáticas del mundo.
                </motion.p>

                <motion.button
                    onClick={scrollToRegistration}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <span className="uppercase font-bold text-lg tracking-wider mb-1">
                        Regístrate Ahora
                    </span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <CgArrowDownO className="w-8 h-8" />
                    </motion.div>
                </motion.button>
            </div>
        </section>
    );
};

export default HeroSection;