import { useEffect, useState } from "react";
declare module '@glidejs/glide';
import Glide from "@glidejs/glide";
import { motion } from "framer-motion";
import slide01 from "../../assets/images/features/SLIDE_01.webp";
import slide02 from "../../assets/images/features/SLIDE_02.webp";
import slide03 from "../../assets/images/features/SLIDE_03.webp";
import slide04 from "../../assets/images/features/SLIDE_04.webp";

// Datos del carrusel
const carouselItems = [
    {
        id: 1,
        title: "Pruebas de manejo de las motocicletas más populares de Triumph.",
        description: "Siente la potencia y el rendimiento de nuestras motocicletas en un ambiente controlado.",
        image: slide01
    },
    {
        id: 2,
        title: "Asesoría y acompañamiento de expertos para una experiencia única.",
        description: "Nuestros especialistas te guiarán para aprovechar al máximo cada modelo.",
        image: slide02
    },
    {
        id: 3,
        title: "Recorridos diseñados para explorar el máximo potencial de cada moto.",
        description: "Circuitos especialmente creados para que disfrutes las capacidades de nuestras motocicletas.",
        image: slide03
    },
    {
        id: 4,
        title: "Un ambiente seguro, cómodo y lleno de adrenalina.",
        description: "Todas las medidas de seguridad para que tu única preocupación sea disfrutar.",
        image: slide04
    }
];

const EventFeaturesCarousel = () => {
    // Estado para controlar la precarga de imágenes
    const [imagesPreloaded, setImagesPreloaded] = useState(false);

    useEffect(() => {
        // Precarga de imágenes para evitar saltos visuales
        const preloadImages = async () => {
            const promises = carouselItems.map((item) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = item.image;
                    img.onload = () => resolve(true);
                    img.onerror = () => resolve(false);
                });
            });

            await Promise.all(promises);
            setImagesPreloaded(true);
        };

        preloadImages();

        // Solo inicializar el slider después de precargar las imágenes
        if (imagesPreloaded) {
            try {
                // Agregar estilos CSS personalizados para los bullets
                const style = document.createElement('style');
                style.textContent = `
                    .glide__bullet--active span {
                        background-color: white !important;
                    }
                `;
                document.head.appendChild(style);

                const slider = new Glide(".features-carousel", {
                    type: "carousel",
                    focusAt: "center",
                    perView: 1,
                    autoplay: window.innerWidth < 768 ? 5000 : 4000,
                    animationDuration: window.innerWidth < 768 ? 500 : 700,
                    gap: 0,
                    swipeThreshold: 50,
                    dragThreshold: 100
                }).mount();

                return () => {
                    slider.destroy();
                    document.head.removeChild(style);
                };
            } catch (error) {
                console.error("Error initializing Glide:", error);
            }
        }
    }, [imagesPreloaded]);

    return (
        <section id="evento" className="w-full bg-black text-white relative -mt-16">
            <div className="container mx-auto px-4 py-2 md:py-6">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 md:mb-4 -mt-2">¿Qué incluye el evento?</h2>
            </div>

            {/* Carrusel */}
            <div className="features-carousel relative w-full cursor-grab active:cursor-grabbing">
                {/* Slides */}
                <div className="overflow-hidden cursor-grab active:cursor-grabbing" data-glide-el="track">
                    <ul className="relative flex w-full overflow-hidden p-0 cursor-grab active:cursor-grabbing">
                        {carouselItems.map((item) => (
                            <li key={item.id} className="relative w-full h-[60vh] md:h-[70vh] cursor-grab active:cursor-grabbing">
                                {/* Imagen de fondo con degradado corregido */}
                                <div className="absolute inset-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 md:to-transparent"></div>
                                </div>

                                {/* Contenido con fade-in animación - Usando el mismo key para todas las slides para evitar recargas parciales */}
                                <motion.div
                                    key="slide-content"
                                    className="relative z-10 h-full flex items-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="container mx-auto px-4 py-4 md:py-0 md:max-w-3xl">
                                        <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                                            {item.title}
                                        </h3>
                                        <p className="text-base md:text-xl">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Navegación del carrusel */}
                <div
                    className="absolute bottom-4 md:bottom-8 flex w-full items-center justify-center gap-4 z-20"
                    data-glide-el="controls[nav]"
                >
                    {carouselItems.map((_, index) => (
                        <button
                            key={index}
                            className="group p-1 glide__bullet cursor-pointer"
                            data-glide-dir={`=${index}`}
                            aria-label={`ir a slide ${index + 1}`}
                        >
                            <span className="block h-3 w-3 rounded-full bg-gray-500 transition-colors duration-300 group-hover:bg-white"></span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventFeaturesCarousel;