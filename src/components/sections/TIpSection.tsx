import React from 'react';

// Interfaz para la estructura de datos de cada card
interface TipCardData {
    icon: string;
    title: string;
    description: string;
}

// Datos de las cards
const tipsData: TipCardData[] = [
    {
        icon: "/images/tips_icon/Equip_protección.png",
        title: "Equipo de protección:",
        description:
            "Siempre usa casco, guantes, chaqueta con protecciones, botas y pantalones adecuados para la conducción.",
    },
    {
        icon: "/images/tips_icon/Chequeo_previo.png",
        title: "Chequeo previo:",
        description:
            "Asegúrate de que tu estado físico sea adecuado para conducir. Es importante señalar que no se permitirá el acceso a personas que se encuentren en estado de ebriedad. Se realizarán pruebas de alcoholemia antes de permitir la participación en las pruebas de manejo.",
    },
    {
        icon: "/images/tips_icon/Conducción_responsable.png",
        title: "Conducción responsable:",
        description:
            "Recuerda que este evento no es una prueba de velocidad ni un curso de manejo. El objetivo es que disfrutes de una experiencia de conducción segura, probando el rendimiento de las motos en un entorno controlado. Siempre sigue las indicaciones de los guías, respeta las normas del recorrido y mantén una velocidad adecuada a las condiciones del evento.",
    },
];

// Componente TipSection
const TipSection: React.FC = () => {
    return (
        <section className="tip-section bg-black text-white py-16 lg:py-24">
            {/* Contenedor principal sigue igual */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Encabezado de la sección sigue igual */}
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
                        Tips y Recomendaciones de Seguridad
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
                        Para garantizar que disfrutes de una experiencia segura y placentera,
                        es fundamental seguir ciertas recomendaciones antes y durante el evento:
                    </p>
                </div>

                {/* Grid responsiva:
            - Aumentado el gap en lg (lg:gap-12) para separar más las cards (efecto más estrecho).
            - Añadido padding horizontal en lg (lg:px-10) para crear márgenes en las orillas.
        */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 lg:px-10">
                    {tipsData.map((card, index) => (
                        <div
                            key={index}
                            // Card:
                            // - Aumentado el padding (p-8 lg:p-10) para hacerlas más largas.
                            // - Eliminado rounded-lg.
                            // - Añadido cursor-pointer para cambiar el cursor a una mano
                            className="bg-[#292929] p-8 lg:p-10 flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105 h-full"
                        >
                            <img
                                src={card.icon}
                                alt={card.title}
                                // Icono sin cambios
                                className="w-16 h-16 sm:w-20 sm:h-20 mb-6"
                            />
                            {/* Título sin cambios */}
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                                {card.title}
                            </h3>
                            {/* Descripción sin cambios */}
                            <p className="text-[#ABABAB] text-sm sm:text-base">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TipSection;