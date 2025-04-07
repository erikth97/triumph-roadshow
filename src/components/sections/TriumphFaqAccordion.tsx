export default function TriumphFaqAccordion() {
    return (
        <section className="w-full bg-black text-white py-16">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                    Preguntas Frecuentes
                </h2>

                {/*<!-- Componente: Acordeón para Preguntas Frecuentes --> */}
                <section className="w-full divide-y divide-gray-800 rounded border border-gray-800 bg-black">
                    <details className="group p-4" open>
                        <summary className="relative cursor-pointer list-none pr-8 font-medium text-white transition-colors duration-300 focus-visible:outline-none group-hover:text-gray-300 [&::-webkit-details-marker]:hidden">
                            ¿Necesito tener licencia?
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
                            Sí, es obligatorio contar con licencia de motocicleta vigente para participar en las pruebas de manejo. Deberás presentarla al momento de registrarte en el evento. Esta medida es para garantizar la seguridad de todos los participantes.
                        </p>
                    </details>

                    <details className="group p-4">
                        <summary className="relative cursor-pointer list-none pr-8 font-medium text-white transition-colors duration-300 focus-visible:outline-none group-hover:text-gray-300 [&::-webkit-details-marker]:hidden">
                            ¿Qué necesito llevar?
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
                            Es importante que traigas tu equipo completo de protección: casco, guantes, chaqueta con protecciones, botas y pantalones adecuados para la conducción. Además, no olvides tu identificación oficial y licencia de conducir vigente. Si el clima es caluroso, te recomendamos traer agua para mantenerte hidratado.
                        </p>
                    </details>

                    <details className="group p-4">
                        <summary className="relative cursor-pointer list-none pr-8 font-medium text-white transition-colors duration-300 focus-visible:outline-none group-hover:text-gray-300 [&::-webkit-details-marker]:hidden">
                            ¿Qué incluye la experiencia?
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
                            La experiencia incluye pruebas de manejo de las motocicletas más populares de Triumph, asesoría personalizada por parte de expertos, recorridos diseñados para explorar el máximo potencial de cada moto, y un ambiente seguro y controlado para disfrutar de la experiencia. También tendrás la oportunidad de conocer a otros entusiastas de las motocicletas.
                        </p>
                    </details>

                    <details className="group p-4">
                        <summary className="relative cursor-pointer list-none pr-8 font-medium text-white transition-colors duration-300 focus-visible:outline-none group-hover:text-gray-300 [&::-webkit-details-marker]:hidden">
                            ¿Hay costo?
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
                            El evento es totalmente gratuito, pero requiere registro previo debido a que las plazas son limitadas. Te recomendamos registrarte lo antes posible para asegurar tu lugar en el Demo Road Show de Triumph en tu ciudad.
                        </p>
                    </details>

                    <details className="group p-4">
                        <summary className="relative cursor-pointer list-none pr-8 font-medium text-white transition-colors duration-300 focus-visible:outline-none group-hover:text-gray-300 [&::-webkit-details-marker]:hidden">
                            ¿Puedo llevar acompañantes?
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
                            ¡Por supuesto! Puedes traer acompañantes al evento, aunque solo las personas registradas con licencia válida podrán participar en las pruebas de manejo. En el formulario de registro puedes indicar con cuántas personas vendrás acompañado para que podamos preparar mejor el evento.
                        </p>
                    </details>
                </section>
                {/*<!-- End Acordeón --> */}
            </div>
        </section>
    );
}