import React, { useEffect } from 'react';

interface SimpleRippleProps {
    className?: string;
}

const SimpleRipple: React.FC<SimpleRippleProps> = ({ className = "" }) => {
    // Añadimos las reglas de keyframes para un efecto de pulso
    useEffect(() => {
        // Crear una etiqueta de estilo y añadirla al head
        const style = document.createElement('style');
        style.innerHTML = `
      @keyframes pulseEffect {
        0%, 100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.3;
        }
        50% {
          transform: translate(-50%, -50%) scale(0.9);
          opacity: 0.2;
        }
      }
    `;
        document.head.appendChild(style);

        // Limpiar al desmontar
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Creamos varios círculos concéntricos estáticos con diferentes tamaños
    const staticCircles = Array.from({ length: 8 }).map((_, i) => {
        const size = 280 * (1 + i * 0.1);
        const opacity = 0.2 / (i + 1);

        return (
            <div
                key={`static-${i}`}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: '#333',
                    opacity: opacity,
                    transform: 'translate(-50%, -50%)',
                }}
            />
        );
    });

    // Círculo principal con animación de pulso
    const mainCircle = (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 270,
                height: 270,
                borderRadius: '50%',
                backgroundColor: '#333',
                opacity: 0.3,
                transform: 'translate(-50%, -50%)',
                animation: 'pulseEffect 2s ease-in-out infinite',
            }}
        />
    );

    return (
        <div
            className={`relative w-full h-full ${className}`}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {staticCircles}
            {mainCircle}
        </div>
    );
};

export default SimpleRipple;