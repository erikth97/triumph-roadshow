import { useState, useEffect, useCallback } from 'react';

const ScrollProgressBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);

    // Función para calcular el progreso del scroll
    const calculateScrollProgress = useCallback(() => {
        // Marcar que ya no es el renderizado inicial
        if (isInitialRender) {
            setIsInitialRender(false);
        }

        // Altura total de la página que se puede desplazar
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Posición actual del scroll
        const scrollPosition = window.scrollY;

        // Calcular el progreso como porcentaje
        const progress = Math.min(100, Math.max(0, (scrollPosition / totalHeight) * 100));

        // Actualizar el estado con el progreso calculado
        setScrollProgress(progress);

        // Detectar si se ha pasado de la HeroSection
        // Puedes ajustar este valor según la altura real de tu HeroSection
        const heroSectionHeight = window.innerHeight * 0.7; // 70% de la altura de la ventana
        setIsVisible(scrollPosition > heroSectionHeight);
    }, [isInitialRender]);

    // Añadir event listener para el scroll
    useEffect(() => {
        // Calcular el progreso inicial
        calculateScrollProgress();

        // Usar requestAnimationFrame para optimizar el rendimiento
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    calculateScrollProgress();
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', calculateScrollProgress, { passive: true });

        // Limpiar los event listeners cuando el componente se desmonte
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', calculateScrollProgress);
        };
    }, [calculateScrollProgress]);

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 pointer-events-none transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            style={{
                height: '4px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)', // Para Safari
                backgroundColor: 'rgba(200, 200, 200, 0.15)',
            }}
            aria-hidden="true"
        >
            <div
                className="h-full relative"
                style={{
                    width: `${scrollProgress}%`,
                    background: 'linear-gradient(to right, rgba(230, 230, 230, 0.4), rgba(255, 255, 255, 0.7))',
                    borderRadius: '0 2px 2px 0',
                    transition: isInitialRender ? 'none' : 'width 0.2s ease-out',
                }}
            >
                {/* Efecto de brillo en el borde derecho */}
                <div
                    className="absolute right-0 top-0 h-full w-2"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.5)',
                        borderRadius: '50%',
                        filter: 'blur(1px)',
                    }}
                />
            </div>
        </div>
    );
};

export default ScrollProgressBar;