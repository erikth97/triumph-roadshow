import { useEffect, useRef, forwardRef, RefObject } from 'react';
import { motion } from 'framer-motion';
import { CgArrowDownO } from "react-icons/cg";
import { useLoading } from '@/context/LoadingContext';

interface HeroSectionProps {
    logoRef?: RefObject<HTMLDivElement>;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(({ logoRef }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { setResourceLoaded } = useLoading();

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // función para manejar la carga exitosa
        const handleVideoLoaded = () => {
            setResourceLoaded('video');
        };

        const handleVideoError = (error?: Error) => {

            console.warn('Error al cargar el video:', error?.message || 'Error desconocido');
            setResourceLoaded('video'); // Marcar como cargado aún en error para no bloquear la UI
        };

        video.addEventListener('loadeddata', handleVideoLoaded);
        video.addEventListener('error', () => handleVideoError());

        //  reproducir respetando políticas de autoplay
        const playVideo = async () => {
            try {

                if (video.paused) {
                    await video.play();
                }
            } catch (err) {
                handleVideoError(err as Error);
            }
        };

        playVideo();

        // Limpiar event listeners
        return () => {
            video.removeEventListener('loadeddata', handleVideoLoaded);
            video.removeEventListener('error', () => handleVideoError());
        };
    }, [setResourceLoaded]);

    const scrollToRegistration = () => {
        const registrationSection = document.getElementById('registro');
        if (registrationSection) {
            registrationSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section ref={ref} className="relative h-screen overflow-hidden bg-black">
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
                        preload="metadata"
                        poster="/images/PORTADA_TRIUMP_DRS.webp"
                        aria-hidden="true"
                    >
                        <source src="/videos/triumph-hero.webm" type="video/webm" />
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
                    aria-hidden="true"
                ></div>
            </div>

            {/* Contenido del hero */}
            <div className="relative z-10 container-custom h-full flex flex-col justify-center items-center text-center text-white px-4">
                {/* Imagen con la referencia para la animación de transición */}
                <motion.div ref={logoRef}>
                    <img
                        src="/images/DRS-BLANCO.png"
                        alt="Demo Road Show Triumph"
                        className="w-64 md:w-80 mb-6 max-w-full"
                        width="320"
                        height="160"
                    />
                </motion.div>

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
                    className="flex flex-col items-center hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-md p-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    aria-label="Ir a formulario de registro"
                >
                    <span className="uppercase font-bold text-lg tracking-wider mb-1">
                        Regístrate Ahora
                    </span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="cursor-pointer"
                        aria-hidden="true"
                    >
                        <CgArrowDownO className="w-8 h-8" />
                    </motion.div>
                </motion.button>

                {/* Gradiente suave de transición al final de la sección */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black pointer-events-none"
                    aria-hidden="true"
                ></div>
            </div>
        </section>
    );
});

// displayName para cumplir con las buenas prácticas de React
HeroSection.displayName = 'HeroSection';

export default HeroSection;