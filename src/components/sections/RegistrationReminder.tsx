import { useRef, useEffect, useState, useCallback, ReactNode } from "react";

// Definición de tipos para las props del componente FadeInElement
interface FadeInElementProps {
    children: ReactNode;
    isVisible: boolean;
    delay?: number;
    yOffset?: number;
    className?: string;
}

// Componente reutilizable para animaciones de entrada
const FadeInElement = ({
    children,
    isVisible,
    delay = 0,
    yOffset = 5,
    className = ""
}: FadeInElementProps) => (
    <div
        className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : `opacity-0 translate-y-${yOffset}`
            } ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
    >
        {children}
    </div>
);

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

    // Optimizado con useCallback para evitar recreaciones innecesarias
    const scrollToForm = useCallback(() => {
        // Scroll hacia la sección del formulario usando el ID existente "registro"
        const formElement = document.getElementById('registro');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <section
            className="w-full bg-black text-white py-16 overflow-hidden"
            ref={sectionRef}
            aria-labelledby="registration-reminder-title"
        >
            <div className="container px-6 m-auto max-w-6xl">
                <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                    <div className="col-span-4 md:col-span-8 lg:col-span-12 text-center">
                        <FadeInElement
                            isVisible={isVisible}
                            delay={100}
                            yOffset={-5}
                            className="mb-6"
                        >
                            <h2
                                id="registration-reminder-title"
                                className="text-3xl md:text-4xl font-bold"
                            >
                                ¡NO PIERDAS LA OPORTUNIDAD!
                            </h2>
                        </FadeInElement>

                        <FadeInElement isVisible={isVisible} delay={300} className="mb-2">
                            <span className="text-xl md:text-2xl" onClick={scrollToForm}>
                                <span
                                    className="underline cursor-pointer hover:text-red-500 transition-colors"
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Ir al formulario de registro"
                                    onKeyDown={(e) => e.key === 'Enter' && scrollToForm()}
                                >
                                    Regístrate ahora
                                </span>
                                {" "}para asegurar tu lugar en el Demo Road Show Triumph en tu ciudad.
                            </span>
                        </FadeInElement>

                        <FadeInElement isVisible={isVisible} delay={500} className="mb-6">
                            <p className="text-xl md:text-2xl">
                                Las plazas son limitadas, ¡así que no esperes más!
                            </p>
                        </FadeInElement>

                        <FadeInElement isVisible={isVisible} delay={700} className="mb-10">
                            <p className="text-sm text-gray-400 italic">
                                Máximo 1 registro por persona.
                            </p>
                        </FadeInElement>

                        <FadeInElement
                            isVisible={isVisible}
                            delay={900}
                            yOffset={10}
                        >
                            <p
                                ref={textRef}
                                className="text-xl md:text-2xl font-medium relative"
                                style={{
                                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                            >
                                ¡Nos vemos en el Demo Road Show!
                            </p>
                        </FadeInElement>
                    </div>
                </div>
            </div>
        </section>
    );
}