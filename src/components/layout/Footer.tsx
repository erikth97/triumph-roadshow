import React from 'react';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useLegalModals, PrivacyPolicyModal, TermsAndConditionsModal } from "../ui/LegalModals";

const Footer: React.FC = () => {
    // Hook para manejar los modales legales
    const {
        showPrivacyModal,
        showTermsModal,
        openPrivacyModal,
        openTermsModal,
        closePrivacyModal,
        closeTermsModal
    } = useLegalModals();

    // Función para hacer scroll hacia arriba
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white text-black py-6 md:py-8 mt-16">
            <div className="container mx-auto px-4">
                {/* Grid layout responsivo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 gap-y-10">

                    {/* Logo principal - centrado y clickeable */}
                    <div className="flex justify-center sm:col-span-2 md:col-span-1 md:justify-start">
                        <img
                            src="/Demo_Road_Show.png"
                            alt="Demo Road Show Triumph"
                            className="w-48 md:w-64 cursor-pointer"
                            onClick={scrollToTop}
                        />
                    </div>

                    {/* Información Legal - centrado en móvil, alineado a la izquierda en desktop */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-bold mb-4">Información Legal</h3>
                        <ul className="space-y-3 text-gray-500">
                            <li>
                                <button onClick={openPrivacyModal} className="hover:text-black transition-colors">
                                    Aviso de privacidad
                                </button>
                            </li>
                            <li>
                                <button onClick={openTermsModal} className="hover:text-black transition-colors">
                                    Términos y Condiciones
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Sección ¡En marcha! - navegación interna */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-bold mb-4">¡En marcha!</h3>
                        <ul className="space-y-3 text-gray-500">
                            <li><a href="#cities-section" className="hover:text-black transition-colors">Ciudades Participantes</a></li>
                            <li><a href="#map-triumph" className="hover:text-black transition-colors">Concesionarios</a></li>
                            <li><a href="#faq-section" className="hover:text-black transition-colors">Preguntas Frecuentes</a></li>
                        </ul>
                    </div>

                    {/* Logos adicionales y redes sociales */}
                    <div className="flex flex-col items-center sm:col-span-2 md:col-span-1">
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                            <a href="https://www.grupomotomex.com.mx/" target="_blank" rel="noopener noreferrer">
                                <img src="/Motomex.png" alt="Motomex" className="h-10 sm:h-12" />
                            </a>
                        </div>
                        <div className="flex space-x-6">
                            <a href="https://www.facebook.com/mexico.triumph/?locale=es_LA" className="text-gray-500 hover:text-black transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="w-8 h-8" />
                            </a>
                            <a href="https://www.instagram.com/triumphmexico/" className="text-gray-500 hover:text-black transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="w-8 h-8" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider visual */}
                <div className="border-t border-gray-200 my-6"></div>

                {/* Texto de Copyright */}
                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        Demo Road Show Triumph &copy; 2025 Grupo Motomex. Todos los derechos reservados.
                    </p>
                </div>
            </div>

            {/* Renderizar modales explícitamente */}
            {showPrivacyModal && <PrivacyPolicyModal onClose={closePrivacyModal} />}
            {showTermsModal && <TermsAndConditionsModal onClose={closeTermsModal} />}
        </footer>
    );
};

export default Footer;
