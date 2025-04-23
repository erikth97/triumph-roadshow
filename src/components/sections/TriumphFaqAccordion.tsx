import { useState } from 'react';

export default function TriumphFaqAccordion() {
    // Estado para controlar cuál acordeón está abierto
    // Inicialmente, el primer acordeón está abierto (índice 0)
    const [openAccordion, setOpenAccordion] = useState(0);

    // Datos de las preguntas y respuestas
    const faqItems = [
        {
            question: "¿Necesito tener licencia?",
            answer: "Sí, es obligatorio contar con licencia de motocicleta vigente para participar en las pruebas de manejo. Deberás presentarla al momento de registrarte en el evento. Esta medida es para garantizar la seguridad de todos los participantes."
        },
        {
            question: "¿Qué necesito llevar?",
            answer: "Es importante que traigas tu equipo completo de protección: casco, guantes, chaqueta con protecciones, botas y pantalones adecuados para la conducción. Además, no olvides tu identificación oficial y licencia de conducir vigente. Si el clima es caluroso, te recomendamos traer agua para mantenerte hidratado."
        },
        {
            question: "¿Qué incluye la experiencia?",
            answer: "La experiencia incluye pruebas de manejo de las motocicletas más populares de Triumph, asesoría personalizada por parte de expertos, recorridos diseñados para explorar el máximo potencial de cada moto, y un ambiente seguro y controlado para disfrutar de la experiencia. También tendrás la oportunidad de conocer a otros entusiastas de las motocicletas."
        },
        {
            question: "¿Hay costo?",
            answer: "El evento es totalmente gratuito, pero requiere registro previo debido a que las plazas son limitadas. Te recomendamos registrarte lo antes posible para asegurar tu lugar en el Demo Road Show de Triumph en tu ciudad."
        },
        {
            question: "¿Puedo llevar acompañantes?",
            answer: "¡Por supuesto! Puedes traer acompañantes al evento, aunque solo las personas registradas con licencia válida podrán participar en las pruebas de manejo. En el formulario de registro puedes indicar con cuántas personas vendrás acompañado para que podamos preparar mejor el evento."
        }
    ];

    // Función para manejar el clic en un acordeón
    const handleAccordionClick = (index: number) => {
        // Si el acordeón ya está abierto, lo cerramos (estableciendo un índice inválido)
        // De lo contrario, abrimos el acordeón seleccionado
        setOpenAccordion(openAccordion === index ? -1 : index);
    };

    return (
        <section id="faq-section" className="w-full bg-black text-white py-16">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                    Preguntas Frecuentes
                </h2>

                {/*<!-- Componente: Acordeón para Preguntas Frecuentes --> */}
                <section className="w-full divide-y divide-gray-800 rounded border border-gray-800 bg-black">
                    {faqItems.map((item, index) => (
                        <details
                            key={index}
                            className="group p-4"
                            open={openAccordion === index}
                            onClick={(e) => {
                                // Evitamos el comportamiento por defecto para controlar manualmente el estado
                                e.preventDefault();
                                handleAccordionClick(index);
                            }}
                        >
                            <summary className="relative cursor-pointer list-none pr-8 font-medium text-white transition-colors duration-300 focus-visible:outline-none group-hover:text-gray-300 [&::-webkit-details-marker]:hidden">
                                {item.question}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-white transition duration-300 group-open:rotate-45"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </summary>
                            <p className="mt-4 text-gray-400">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </section>
                {/*<!-- End Acordeón --> */}
            </div>
        </section>
    );
}