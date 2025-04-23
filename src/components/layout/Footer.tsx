import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useLegalModals, PrivacyPolicyModal, TermsAndConditionsModal } from "../ui/LegalModals";

const Footer = () => {
    // Usar el hook para manejar los modales
    const {
        showPrivacyModal,
        showTermsModal,
        openPrivacyModal,
        openTermsModal,
        closePrivacyModal,
        closeTermsModal
    } = useLegalModals();

    // Función para desplazarse hacia la sección HeroSection
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-white text-black py-5 px-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Columna 1 - 25% */}
                <div className="col-span-1 flex justify-center">
                    <a onClick={scrollToTop} className="cursor-pointer">
                        <img
                            src="/Demo_Road_Show.png"
                            alt="Evento Triumph Demo Road Show"
                            className="w-64 h-auto object-contain"
                        />
                    </a>
                </div>

                {/* Columna 2 - 25% */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold mb-4">Información Legal</h3>
                    <ul className="text-gray-400 text-sm space-y-2">
                        <li>
                            <button
                                onClick={openPrivacyModal}
                                className="hover:text-black text-left cursor-pointer"
                            >
                                Aviso de privacidad
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={openTermsModal}
                                className="hover:text-black text-left cursor-pointer"
                            >
                                Términos y Condiciones
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Columna 3 - 25% */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold mb-4">¡En marcha!</h3>
                    <ul className="text-gray-400 text-sm space-y-2">
                        <li><a href="#cities-section" className="hover:text-black">Ciudades Participantes</a></li>
                        <li><a href="#map-triumph" className="hover:text-black">Concesionarios</a></li>
                        <li><a href="#faq-section" className="hover:text-black">Preguntas Frecuentes</a></li>
                    </ul>
                </div>

                {/* Columna 4 - 25% */}
                <div className="col-span-1 text-center">
                    <a
                        href="https://www.grupomotomex.com.mx/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/Motomex.png"
                            alt="Contact Us"
                            className="w-60 h-auto object-contain mx-auto"
                        />
                    </a>
                    <div className="flex justify-end space-x-4 mt-4">
                        <a href="https://www.facebook.com/mexico.triumph/?locale=es_LA" className="text-gray-400 hover:text-black" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="w-8 h-8 rounded-full" />
                        </a>
                        <a href="https://www.instagram.com/triumphmexico/" className="text-gray-400 hover:text-black" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="w-8 h-8 rounded-full" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Renderizar los modales explícitamente */}
            {showPrivacyModal && <PrivacyPolicyModal onClose={closePrivacyModal} />}
            {showTermsModal && <TermsAndConditionsModal onClose={closeTermsModal} />}
        </footer>
    );
}

export default Footer;