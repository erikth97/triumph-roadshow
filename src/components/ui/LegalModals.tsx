import React, { useState, useEffect, useCallback } from 'react';

// Interfaces para props
interface LinkProps {
    onClick: () => void;
    className?: string;
}

interface ModalProps {
    onClose: () => void;
}

// Componente para el enlace de Política de Privacidad
export const PrivacyPolicyLink: React.FC<LinkProps> = ({ onClick, className = '' }) => {
    return (
        <button
            className={`text-white hover:text-gray-300 underline cursor-pointer transition-colors focus:outline-none ${className}`}
            onClick={onClick}
        >
            Política de Privacidad
        </button>
    );
};

// Componente para el enlace de Términos y Condiciones
export const TermsAndConditionsLink: React.FC<LinkProps> = ({ onClick, className = '' }) => {
    return (
        <button
            className={`text-white hover:text-gray-300 underline cursor-pointer transition-colors focus:outline-none ${className}`}
            onClick={onClick}
        >
            Términos y Condiciones
        </button>
    );
};

// Modal de Política de Privacidad
export const PrivacyPolicyModal: React.FC<ModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            {/* Backdrop con blur */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Contenido del modal */}
            <div className="relative bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
                {/* Header con logo */}
                <div className="bg-gray-800 flex justify-between items-center p-4 border-b border-gray-700 sticky top-0">
                    <img
                        src="/images/triumph-logo.png"
                        alt="Triumph Logo"
                        className="h-8"
                    />
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-6 text-gray-200">
                    <h2 className="text-2xl font-bold mb-4">Política de Privacidad</h2>

                    <div className="space-y-4">
                        <p>
                            En Triumph de México S.A. de C.V., con domicilio en Pino Suárez 750, Col. Centro, Monterrey, Nuevo León, C.P. 64000, México, estamos comprometidos con la protección de tus datos personales y el respeto a tu privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos la información obtenida a través de nuestro sitio web.
                        </p>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">1. Información que recopilamos</h3>
                            <p>
                                Al navegar en nuestro sitio o interactuar con nuestros formularios, podemos recopilar datos personales como:
                            </p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Nombre completo</li>
                                <li>Número de teléfono</li>
                                <li>Dirección de correo electrónico</li>
                                <li>Código postal o ubicación general</li>
                                <li>Modelo de motocicleta de interés</li>
                                <li>Información que proporciones al contactarnos</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">2. Finalidades del tratamiento</h3>
                            <p>
                                Los datos personales serán utilizados para las siguientes finalidades:
                            </p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Atender solicitudes de contacto, información o cotización</li>
                                <li>Brindar seguimiento a productos o servicios</li>
                                <li>Enviar información relevante sobre promociones, modelos y eventos</li>
                                <li>Mejorar tu experiencia dentro del sitio web</li>
                                <li>Cumplir con obligaciones legales aplicables</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3. Tecnologías de rastreo</h3>
                            <p>
                                En nuestro sitio web utilizamos tecnologías como cookies y herramientas de análisis, incluyendo Google Analytics, con el fin de conocer la actividad de navegación, mejorar nuestro contenido y ofrecerte una mejor experiencia. Puedes desactivarlas desde la configuración de tu navegador si así lo deseas.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">4. Transferencia de datos</h3>
                            <p>
                                Triumph de México no transfiere tus datos personales a terceros fuera del país ni a socios comerciales, salvo en los casos que lo exija la ley o cuando sea necesario para cumplir con las finalidades descritas en este aviso.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">5. Derechos ARCO</h3>
                            <p>
                                Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos personales (Derechos ARCO), conforme a lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
                            </p>
                            <p className="mt-3">
                                Para ejercer estos derechos, puedes enviar una solicitud al correo:
                            </p>
                            <p className="font-medium mt-2 text-white">
                                📩 privacidad@triumph.com.mx
                            </p>

                            <p className="mt-3">Incluye en tu mensaje:</p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Nombre completo</li>
                                <li>Copia de una identificación oficial</li>
                                <li>Descripción clara del derecho que deseas ejercer</li>
                                <li>Medio de contacto para darte seguimiento</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">6. Cambios a esta política</h3>
                            <p>
                                Triumph de México se reserva el derecho de modificar en cualquier momento esta Política de Privacidad. Cualquier cambio será publicado en esta misma sección del sitio web, por lo que te recomendamos consultarla periódicamente.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7. Contacto</h3>
                            <p>
                                Para cualquier duda o comentario sobre esta política, puedes comunicarte con nosotros a través de:
                            </p>
                            <p className="font-medium mt-2 text-white">
                                📧 privacidad@triumph.com.mx
                            </p>
                            <p className="font-medium mt-1 text-white">
                                📍 Pino Suárez 750, Col. Centro, Monterrey, Nuevo León, C.P. 64000, México
                            </p>
                        </section>
                    </div>
                </div>

                {/* Footer con botón de cerrar */}
                <div className="bg-gray-800 border-t border-gray-700 p-4 sticky bottom-0">
                    <button
                        onClick={onClose}
                        className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

// Modal de Términos y Condiciones
export const TermsAndConditionsModal: React.FC<ModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            {/* Backdrop con blur */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Contenido del modal */}
            <div className="relative bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
                {/* Header con logo */}
                <div className="bg-gray-800 flex justify-between items-center p-4 border-b border-gray-700 sticky top-0">
                    <img
                        src="/images/triumph-logo.png"
                        alt="Triumph Logo"
                        className="h-8"
                    />
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-6 text-gray-200">
                    <h2 className="text-2xl font-bold mb-4">Términos y Condiciones del Demo Road Show</h2>

                    <div className="space-y-4">
                        <p>
                            Bienvenido a los Términos y Condiciones del Demo Road Show de Triumph. Al registrarte y participar en este evento, aceptas cumplir con los siguientes términos:
                        </p>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">1. Requisitos de participación</h3>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Ser mayor de 18 años</li>
                                <li>Contar con licencia de conducir vigente y apropiada para motocicletas</li>
                                <li>Utilizar el equipo de protección obligatorio (casco, guantes, chaqueta con protecciones, botas y pantalones adecuados)</li>
                                <li>No presentarse en estado de ebriedad o bajo influencia de sustancias que afecten la capacidad de manejo</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">2. Responsabilidades del participante</h3>
                            <p>
                                Al registrarte para el Demo Road Show, te comprometes a:
                            </p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Seguir todas las instrucciones proporcionadas por el personal de Triumph</li>
                                <li>Conducir de manera responsable y segura durante la prueba</li>
                                <li>Respetar los límites de velocidad y normas de tránsito</li>
                                <li>No realizar maniobras peligrosas o acrobacias</li>
                                <li>Reportar inmediatamente cualquier incidente o fallo mecánico</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3. Limitación de responsabilidad</h3>
                            <p>
                                Triumph no se hace responsable por:
                            </p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Daños o lesiones causados por negligencia del participante</li>
                                <li>Pérdida o daño de objetos personales durante el evento</li>
                                <li>Accidentes derivados del incumplimiento de las normas de seguridad</li>
                            </ul>
                            <p className="mt-3">
                                La participación en el Demo Road Show implica la aceptación de ciertos riesgos inherentes a la conducción de motocicletas. Es responsabilidad del participante evaluar sus propias capacidades y experiencia.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">4. Cancelación y modificaciones</h3>
                            <p>
                                Triumph se reserva el derecho de:
                            </p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li>Modificar las fechas, horarios o ubicaciones del evento</li>
                                <li>Cancelar el evento por condiciones climáticas adversas u otras circunstancias</li>
                                <li>Negar la participación a personas que no cumplan con los requisitos establecidos</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">5. Uso de imagen</h3>
                            <p>
                                Al participar en el Demo Road Show, autorizas a Triumph a utilizar fotografías y videos tomados durante el evento con fines promocionales en redes sociales, sitio web y otros medios de comunicación.
                            </p>
                        </section>
                    </div>
                </div>

                {/* Footer con botón de cerrar */}
                <div className="bg-gray-800 border-t border-gray-700 p-4 sticky bottom-0">
                    <button
                        onClick={onClose}
                        className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente de contexto y utilidad para usar los modales
export const useLegalModals = () => {
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    // Manejador para cerrar modales con la tecla ESC
    const handleKeydown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setShowPrivacyModal(false);
            setShowTermsModal(false);
        }
    }, []);

    // Evitar scroll cuando un modal está abierto
    useEffect(() => {
        if (showPrivacyModal || showTermsModal) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeydown);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [showPrivacyModal, showTermsModal, handleKeydown]);

    return {
        showPrivacyModal,
        showTermsModal,
        openPrivacyModal: () => setShowPrivacyModal(true),
        closePrivacyModal: () => setShowPrivacyModal(false),
        openTermsModal: () => setShowTermsModal(true),
        closeTermsModal: () => setShowTermsModal(false)
    };
};

// Componente contenedor que proporciona modales
export const LegalModalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        showPrivacyModal,
        showTermsModal,
        closePrivacyModal,
        closeTermsModal
    } = useLegalModals();

    return (
        <>
            {children}

            {/* Modales */}
            {showPrivacyModal && <PrivacyPolicyModal onClose={closePrivacyModal} />}
            {showTermsModal && <TermsAndConditionsModal onClose={closeTermsModal} />}
        </>
    );
};

export default useLegalModals;