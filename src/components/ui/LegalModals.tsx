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

// Modal de Términos y Condiciones (Actualizado)
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
                    <h2 className="text-2xl font-bold mb-4">Términos y Condiciones del Evento</h2>

                    <div className="space-y-4">
                        <p>
                            Bienvenido a los Términos y Condiciones del Evento de Triumph. Al registrarte y participar en este evento, aceptas cumplir con los siguientes términos:
                        </p>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">1. Reconocimiento de riesgos</h3>
                            <p>
                                Entiendo que la prueba de manejo de motocicletas implica ciertos riesgos inherentes, como caídas, accidentes de tránsito, lesiones personales y daños a la propiedad, los cuales pueden ocurrir durante la participación en el evento. Asumo plena responsabilidad por los riesgos mencionados y cualquier otro riesgo asociado con la actividad.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">2. Condiciones físicas y habilidades</h3>
                            <p>
                                Declaro que poseo la capacidad física, la experiencia y las habilidades necesarias para participar en la prueba de manejo. Además, aseguro que no tengo ninguna condición médica que me impida conducir de manera segura o que pueda empeorar debido a la actividad de prueba.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3. Uso de equipo de protección</h3>
                            <p>
                                Acepto utilizar el equipo de protección adecuado, como casco, guantes, chaleco, botas, entre otros, durante toda la duración de la prueba de manejo.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">4. Exoneración de responsabilidad</h3>
                            <p>
                                Liberamos de toda responsabilidad y exoneramos a Triumph Motorcycles y a Grupo Motomex, sus filiales, concesionarios, empleados, representantes y patrocinadores, de cualquier reclamo, demanda o acción legal que surja a raíz de accidentes, lesiones o daños sufridos durante el evento de prueba de manejo.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">5. Exclusión de reclamaciones por daños</h3>
                            <p>
                                Entiendo y acepto que Triumph Motorcycles y Grupo Motomex no serán responsables de ningún daño o pérdida que pueda ocurrir durante la prueba de manejo, ya sea que estos daños sean causados por negligencia o cualquier otro motivo. Acepto que cualquier accidente o daño que se produzca durante la prueba será de mi exclusiva responsabilidad.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">6. Permiso para uso de imagen</h3>
                            <p>
                                Acepto que durante el evento pueden tomarse fotografías y/o videos en los cuales pueda aparecer, y otorgo mi consentimiento para que dichas imágenes sean utilizadas con fines promocionales, publicitarios y comerciales de Triumph Motorcycles y Grupo Motomex sin derecho a compensación económica.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7. Cumplimiento de normas</h3>
                            <p>
                                Me comprometo a seguir todas las normas de seguridad y las instrucciones proporcionadas por los organizadores y responsables del evento durante la prueba de manejo. Asimismo, entiendo que cualquier conducta irresponsable o peligrosa puede resultar en la suspensión inmediata de mi participación en el evento.
                            </p>
                        </section>

                        <section className="mt-8">
                            <p className="italic">
                                Al firmar esta carta, confirmo que he leído, comprendido y aceptado todos los términos y condiciones descritos anteriormente. Acepto participar voluntariamente en la prueba de manejo y asumo todos los riesgos asociados con la actividad.
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