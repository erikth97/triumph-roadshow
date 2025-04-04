// src/components/sections/EventFeaturesCarousel.tsx
import { useEffect } from "react";
// Añadimos una declaración de módulo para evitar el error de TypeScript
declare module '@glidejs/glide';
import Glide from "@glidejs/glide";

// Importamos las imágenes correctamente con rutas relativas
import slide01 from "../../assets/images/features/SLIDE_01.jpg";
import slide02 from "../../assets/images/features/SLIDE_02.jpg";
import slide03 from "../../assets/images/features/SLIDE_03.jpg";
import slide04 from "../../assets/images/features/SLIDE_04.jpg";

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
    useEffect(() => {
        // Asegurarse que el DOM está listo antes de inicializar Glide
        try {
            const slider = new Glide(".features-carousel", {
                type: "carousel",
                focusAt: "center",
                perView: 1,
                autoplay: 4000,
                animationDuration: 700,
                gap: 0,
                classNames: {
                    nav: {
                        active: "[&>*]:bg-red-600",
                    },
                }
            }).mount();

            return () => {
                slider.destroy();
            };
        } catch (error) {
            console.error("Error initializing Glide:", error);
        }
    }, []);

    return (
        <section id="evento" className="w-full bg-black text-white relative">
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">¿Qué incluye el evento?</h2>
            </div>

            {/* Carrusel */}
            <div className="features-carousel relative w-full">
                {/* Slides */}
                <div className="overflow-hidden" data-glide-el="track">
                    <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
                        {carouselItems.map((item) => (
                            <li key={item.id} className="relative w-full h-[70vh]">
                                {/* Imagen de fondo */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay para mejorar legibilidad del texto */}
                                    <div className="absolute inset-0 bg-opacity-50"></div>
                                </div>

                                {/* Contenido - Aseguramos que esté por encima con z-index */}
                                <div className="relative z-10 h-full flex items-center">
                                    <div className="container mx-auto px-4 md:max-w-3xl">
                                        <h3 className="text-3xl md:text-4xl font-bold mb-4">{item.title}</h3>
                                        <p className="text-xl md:text-2xl">{item.description}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Controles - Aseguramos que estén por encima con z-index */}
                <div
                    className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 z-20"
                    data-glide-el="controls"
                >
                    <button
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white bg-black/20 text-white transition duration-300 hover:bg-red-600 hover:border-red-600 focus-visible:outline-none"
                        data-glide-dir="<"
                        aria-label="slide anterior"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <title>slide anterior</title>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>
                    <button
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white bg-black/20 text-white transition duration-300 hover:bg-red-600 hover:border-red-600 focus-visible:outline-none"
                        data-glide-dir=">"
                        aria-label="siguiente slide"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <title>siguiente slide</title>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>

                {/* Indicadores - Aseguramos que estén por encima con z-index */}
                <div
                    className="absolute bottom-8 flex w-full items-center justify-center gap-2 z-20"
                    data-glide-el="controls[nav]"
                >
                    {carouselItems.map((_, index) => (
                        <button
                            key={index}
                            className="group p-2"
                            data-glide-dir={`=${index}`}
                            aria-label={`ir a slide ${index + 1}`}
                        >
                            <span className="block h-3 w-3 rounded-full bg-white/30 ring-1 ring-white transition-colors duration-300 focus:outline-none group-hover:bg-white"></span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventFeaturesCarousel;