import { useRef, useEffect, useState } from "react";

export default function RegistrationReminder() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    // Configurar Intersection Observer para detectar cuando la sección es visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Una vez que se ha mostrado, podemos dejar de observar
                    if (sectionRef.current) {
                        observer.unobserve(sectionRef.current);
                    }
                }
            },
            {
                root: null, // viewport
                threshold: 0.1, // Cuando al menos 10% del elemento es visible
                rootMargin: "0px 0px -50px 0px" // Ajustar el margen para activar un poco antes
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const scrollToForm = () => {
        // Scroll hacia la sección del formulario usando el ID existente "registro"
        const formElement = document.getElementById('registro');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-black text-white py-16 overflow-hidden" ref={sectionRef}>
            <div className="container px-6 m-auto max-w-6xl">
                <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                    <div className="col-span-4 md:col-span-8 lg:col-span-12 text-center">
                        <h2
                            className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
                            style={{ transitionDelay: '100ms' }}
                        >
                            ¡NO PIERDAS LA OPORTUNIDAD!
                        </h2>

                        <div
                            className={`mb-2 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                            style={{ transitionDelay: '300ms' }}
                        >
                            <span
                                className="text-xl md:text-2xl cursor-pointer hover:text-red-500 transition-colors"
                                onClick={scrollToForm}
                            >
                                <span className="underline">Regístrate ahora</span> para asegurar tu lugar en el Demo Road Show Triumph en tu ciudad.
                            </span>
                        </div>

                        <p
                            className={`text-xl md:text-2xl mb-6 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                            style={{ transitionDelay: '500ms' }}
                        >
                            Las plazas son limitadas, ¡así que no esperes más!
                        </p>

                        <p
                            className={`text-sm text-gray-400 italic mb-10 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                            style={{ transitionDelay: '700ms' }}
                        >
                            Máximo 1 registro por persona.
                        </p>

                        <p
                            ref={textRef}
                            className={`text-xl md:text-2xl font-medium relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{
                                transitionDelay: '900ms',
                                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            ¡Nos vemos en el Demo Road Show!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}