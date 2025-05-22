import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import confetti from "canvas-confetti";

// Declaración de tipos para Google Analytics
declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

// Tipos para los datos del formulario
type FormInputs = {
    nombreCompleto: string;
    edad: string;
    telefono: string;
    correoElectronico: string;
    tieneMotocicleta: string;
    marcaModelo: string;
    cilindrada: string;
    tipoMotocicleta: string;
    modeloInteres: string;
    enteradoPor: string[];
    otroMedio?: string;
    ciudad: string;
    aceptaTerminos: boolean;
    aceptaComunicaciones: boolean;
    fechaRegistro: string;
};

// Opciones para los selects
const ciudadesOptions = [
    { value: 'Puebla', label: 'Puebla' },
    { value: 'Querétaro', label: 'Querétaro' },
    { value: 'León', label: 'León' },
    { value: 'Morelia', label: 'Morelia' },
    { value: 'Guadalajara', label: 'Guadalajara' },
    { value: 'Monterrey', label: 'Monterrey' },
    { value: 'Cuernavaca', label: 'Cuernavaca' },
    { value: 'Aguascalientes', label: 'Aguascalientes' },
];

const cilindradasOptions = [
    { value: '150-300', label: '150-300' },
    { value: '300-450', label: '300-450' },
    { value: '450-600', label: '450-600' },
    { value: '600-800', label: '600-800' },
    { value: '800-1200', label: '800-1200' },
];

const RegistrationForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormInputs>({
        mode: 'onChange',
        defaultValues: {
            tieneMotocicleta: '',
            enteradoPor: []
        }
    });

    const [showTermsModal, setShowTermsModal] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Usar watch para observar valores específicos
    const tieneMotocicleta = watch('tieneMotocicleta');
    const enteradoPor = watch('enteradoPor', []);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setIsSubmitting(true);

        // --- INICIO: Código para Google Analytics ---
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'click', {
                'event_category': 'Formulario Registro Demo Road',
                'event_label': 'Clic Boton Enviar Formulario',
                // Opcional: puedes añadir más datos relevantes aquí, por ejemplo:
                // 'ciudad_seleccionada': data.ciudad 
            });
            console.log("Evento GA 'Clic Boton Enviar Formulario' enviado.");
        } else {
            console.warn("gtag no está disponible para enviar el evento de GA.");
        }
        // --- FIN: Código para Google Analytics ---

        try {
            // Crear fecha y hora actual formateada
            const now = new Date();
            const formatoHora = now.toLocaleTimeString('es-MX', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            const formatoFecha = now.toLocaleDateString('es-MX', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const fechaRegistro = `${formatoHora} - ${formatoFecha}`;

            // Añadir la fecha formateada a los datos del formulario
            const datosConFecha = {
                ...data,
                fechaRegistro
            };

            // Enviar los datos con la fecha incluida
            await fetch('https://hook.us2.make.com/3on83gxcig6s4pdea4dojp4glhb4r76o', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosConFecha),
            });

            // Mostrar modal de éxito
            setShowSuccessModal(true);

            // Aquí puedes manejar la respuesta del servidor si es necesario
            console.log('Formulario enviado con éxito:', datosConFecha);

            // Lanzar el confetti después de que el modal aparezca
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff']
                });
            }, 300);

            // Resetear formulario
            reset();
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="registro" className="py-16 relative bg-black">
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">¡Regístrate al Demo Road Show!</h2>

                {/* Card del formulario */}
                <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-2xl relative"
                    style={{
                        backgroundImage: 'url("/images/FONDO_FORMULARIO.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="text-white relative z-10">
                        {/* Nombre Completo */}
                        <div className="mb-8">
                            <div className="relative">
                                <input
                                    id="nombreCompleto"
                                    type="text"
                                    placeholder="Nombre Completo"
                                    className={`peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all bg-transparent autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_transparent] ${errors.nombreCompleto ? 'border-red-500' : 'focus:border-gray-400'}`}
                                    {...register('nombreCompleto', { required: true })}
                                />
                                <label
                                    htmlFor="nombreCompleto"
                                    className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-transparent before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-400 ${errors.nombreCompleto ? 'text-red-500 peer-focus:text-red-500' : ''}`}
                                >
                                    Nombre Completo *
                                </label>
                            </div>
                            {errors.nombreCompleto && <p className="mt-1 text-red-500 text-xs">Este campo es requerido</p>}
                        </div>

                        {/* Fila: Edad y Teléfono */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Edad */}
                            <div className="relative">
                                <input
                                    id="edad"
                                    type="number"
                                    placeholder="Edad"
                                    className={`peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all bg-transparent autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_transparent] ${errors.edad ? 'border-red-500' : 'focus:border-gray-400'}`}
                                    {...register('edad', { required: true, min: 18, max: 99 })}
                                />
                                <label
                                    htmlFor="edad"
                                    className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-transparent before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-400 ${errors.edad ? 'text-red-500 peer-focus:text-red-500' : ''}`}
                                >
                                    Edad *
                                </label>
                                {errors.edad && <p className="mt-1 text-red-500 text-xs">Por favor ingresa una edad válida (+18)</p>}
                            </div>

                            {/* Teléfono */}
                            <div className="relative">
                                <input
                                    id="telefono"
                                    type="tel"
                                    placeholder="Teléfono"
                                    className={`peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all bg-transparent autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_transparent] ${errors.telefono ? 'border-red-500' : 'focus:border-gray-400'}`}
                                    {...register('telefono', {
                                        required: true,
                                        pattern: /^[0-9]{10}$/
                                    })}
                                />
                                <label
                                    htmlFor="telefono"
                                    className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-transparent before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-400 ${errors.telefono ? 'text-red-500 peer-focus:text-red-500' : ''}`}
                                >
                                    Teléfono *
                                </label>
                                {errors.telefono && <p className="mt-1 text-red-500 text-xs">Por favor ingresa un número valido</p>}
                            </div>
                        </div>

                        {/* Correo electrónico */}
                        <div className="mb-8 mt-6">
                            <div className="relative">
                                <input
                                    id="correoElectronico"
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    className={`peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all bg-transparent autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_transparent] ${errors.correoElectronico ? 'border-red-500' : 'focus:border-gray-400'}`}
                                    {...register('correoElectronico', {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                                    })}
                                />
                                <label
                                    htmlFor="correoElectronico"
                                    className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-transparent before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-400 ${errors.correoElectronico ? 'text-red-500 peer-focus:text-red-500' : ''}`}
                                >
                                    Correo Electrónico *
                                </label>
                            </div>
                            {errors.correoElectronico && <p className="mt-1 text-red-500 text-xs">Por favor ingresa un correo electrónico válido</p>}
                        </div>

                        {/* ¿Tienes motocicleta propia? */}
                        <div className="mb-8">
                            <p className="mb-3">¿Tienes motocicleta propia?</p>
                            <div className="flex gap-8">
                                <div className="relative flex items-center">
                                    <input
                                        className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-gray-400 checked:bg-gray-400"
                                        type="radio"
                                        id="moto-si"
                                        value="si"
                                        {...register('tieneMotocicleta', { required: true })}
                                    />
                                    <label className="pl-2 cursor-pointer" htmlFor="moto-si">Sí</label>
                                    <svg className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="4" />
                                    </svg>
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-gray-400 checked:bg-gray-400"
                                        type="radio"
                                        id="moto-no"
                                        value="no"
                                        {...register('tieneMotocicleta', { required: true })}
                                    />
                                    <label className="pl-2 cursor-pointer" htmlFor="moto-no">No</label>
                                    <svg className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="4" />
                                    </svg>
                                </div>
                            </div>
                            {errors.tieneMotocicleta && <p className="mt-1 text-red-500 text-xs">Por favor selecciona una opción</p>}
                        </div>

                        {/* Marca y modelo - Condicional */}
                        {tieneMotocicleta === 'si' && (
                            <div className="mb-8">
                                <div className="relative">
                                    <input
                                        id="marcaModelo"
                                        type="text"
                                        placeholder="Marca y modelo"
                                        className="peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all bg-transparent autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_transparent] focus:border-gray-400"
                                        {...register('marcaModelo')}
                                    />
                                    <label
                                        htmlFor="marcaModelo"
                                        className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-transparent before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-400"
                                    >
                                        Marca y modelo (si aplica)
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Cilindrada - Select */}
                        {tieneMotocicleta === 'si' && (
                            <div className="mb-8">
                                <div className="relative">
                                    <select
                                        id="cilindrada"
                                        className="peer relative h-10 w-full appearance-none border-b border-white bg-transparent px-4 text-sm text-white outline-none transition-all focus:border-gray-400"
                                        defaultValue=""
                                        {...register('cilindrada', { required: true })}
                                    >
                                        <option value="" disabled>Selecciona una cilindrada</option>
                                        {cilindradasOptions.map(option => (
                                            <option key={option.value} value={option.value} className="bg-black">{option.label}</option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="cilindrada"
                                        className="absolute left-2 -top-2 z-[1] px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-transparent before:transition-all peer-focus:text-gray-400"
                                    >
                                        ¿Qué cilindrada manejas? *
                                    </label>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-white transition-all peer-focus:fill-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                {errors.cilindrada && <p className="mt-1 text-red-500 text-xs">Por favor selecciona una cilindrada</p>}
                            </div>
                        )}

                        {/* ¿Qué tipo de motocicleta te interesa probar? */}
                        <div className="mb-8">
                            <p className="mb-3">¿Qué tipo de motocicleta te interesa probar?</p>
                            <div className="flex flex-wrap gap-8">
                                <div className="relative flex items-center">
                                    <input
                                        className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-gray-400 checked:bg-gray-400"
                                        type="radio"
                                        id="tipo-adventure"
                                        value="Adventure"
                                        {...register('tipoMotocicleta', { required: true })}
                                    />
                                    <label className="pl-2 cursor-pointer" htmlFor="tipo-adventure">Adventure</label>
                                    <svg className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="4" />
                                    </svg>
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-gray-400 checked:bg-gray-400"
                                        type="radio"
                                        id="tipo-classic"
                                        value="Modern Classic"
                                        {...register('tipoMotocicleta', { required: true })}
                                    />
                                    <label className="pl-2 cursor-pointer" htmlFor="tipo-classic">Modern Classic</label>
                                    <svg className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="4" />
                                    </svg>
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-gray-400 checked:bg-gray-400"
                                        type="radio"
                                        id="tipo-roadster"
                                        value="Roadsters"
                                        {...register('tipoMotocicleta', { required: true })}
                                    />
                                    <label className="pl-2 cursor-pointer" htmlFor="tipo-roadster">Roadsters</label>
                                    <svg className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="4" />
                                    </svg>
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-gray-400 checked:bg-gray-400"
                                        type="radio"
                                        id="tipo-sport"
                                        value="Sport"
                                        {...register('tipoMotocicleta', { required: true })}
                                    />
                                    <label className="pl-2 cursor-pointer" htmlFor="tipo-sport">Sport</label>
                                    <svg className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="4" />
                                    </svg>
                                </div>
                            </div>
                            {errors.tipoMotocicleta && <p className="mt-1 text-red-500 text-xs">Por favor selecciona un tipo de motocicleta</p>}
                        </div>

                        {/* ¿Cómo te enteraste de nuestro evento? */}
                        <div className="mb-8">
                            <p className="mb-3">¿Cómo te enteraste de nuestro evento?</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative flex items-center">
                                    <input
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-gray-400 checked:bg-gray-400"
                                        type="checkbox"
                                        id="medio-redes"
                                        value="Redes sociales Triumph Mexico"
                                        {...register('enteradoPor')}
                                    />
                                    <label
                                        className="cursor-pointer pl-2"
                                        htmlFor="medio-redes"
                                    >
                                        Redes sociales Triumph Mexico
                                    </label>
                                    <svg
                                        className="pointer-events-none absolute left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                                        />
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-gray-400 checked:bg-gray-400"
                                        type="checkbox"
                                        id="medio-influencer"
                                        value="Influencer"
                                        {...register('enteradoPor')}
                                    />
                                    <label
                                        className="cursor-pointer pl-2"
                                        htmlFor="medio-influencer"
                                    >
                                        Influencer
                                    </label>
                                    <svg
                                        className="pointer-events-none absolute left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                                        />
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-gray-400 checked:bg-gray-400"
                                        type="checkbox"
                                        id="medio-distribuidor"
                                        value="Distribuidor Triumph"
                                        {...register('enteradoPor')}
                                    />
                                    <label
                                        className="cursor-pointer pl-2"
                                        htmlFor="medio-distribuidor"
                                    >
                                        Distribuidor Triumph
                                    </label>
                                    <svg
                                        className="pointer-events-none absolute left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                                        />
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-gray-400 checked:bg-gray-400"
                                        type="checkbox"
                                        id="medio-redesDist"
                                        value="Redes sociales de distribuidor Triumph"
                                        {...register('enteradoPor')}
                                    />
                                    <label
                                        className="cursor-pointer pl-2"
                                        htmlFor="medio-redesDist"
                                    >
                                        Redes sociales de distribuidor Triumph
                                    </label>
                                    <svg
                                        className="pointer-events-none absolute left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                                        />
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-gray-400 checked:bg-gray-400"
                                        type="checkbox"
                                        id="medio-amigo"
                                        value="Un amigo"
                                        {...register('enteradoPor')}
                                    />
                                    <label
                                        className="cursor-pointer pl-2"
                                        htmlFor="medio-amigo"
                                    >
                                        Un amigo
                                    </label>
                                    <svg
                                        className="pointer-events-none absolute left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                                        />
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-gray-400 checked:bg-gray-400"
                                        type="checkbox"
                                        id="medio-google"
                                        value="Google"
                                        {...register('enteradoPor')}
                                    />
                                    <label
                                        className="cursor-pointer pl-2"
                                        htmlFor="medio-google"
                                    >
                                        Google
                                    </label>
                                    <svg
                                        className="pointer-events-none absolute left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                                        />
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-gray-400 checked:bg-gray-400"
                                        type="checkbox"
                                        id="medio-youtube"
                                        value="Youtube"
                                        {...register('enteradoPor')}
                                    />
                                    <label
                                        className="cursor-pointer pl-2"
                                        htmlFor="medio-youtube"
                                    >
                                        Youtube
                                    </label>
                                    <svg
                                        className="pointer-events-none absolute left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                                        />
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-gray-400 checked:bg-gray-400"
                                        type="checkbox"
                                        id="medio-otro"
                                        value="Otro"
                                        {...register('enteradoPor')}
                                    />
                                    <label
                                        className="cursor-pointer pl-2"
                                        htmlFor="medio-otro"
                                    >
                                        Otro
                                    </label>
                                    <svg
                                        className="pointer-events-none absolute left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Campo para "Otro" */}
                            {enteradoPor.includes('Otro') && (
                                <div className="mt-4">
                                    <div className="relative">
                                        <input
                                            id="otroMedio"
                                            type="text"
                                            placeholder="Especificar"
                                            className="peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all bg-transparent autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_transparent] focus:border-gray-400"
                                            {...register('otroMedio')}
                                        />
                                        <label
                                            htmlFor="otroMedio"
                                            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-transparent before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-400"
                                        >
                                            Especificar
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Ciudad de preferencia */}
                        <div className="mb-8">
                            <div className="relative">
                                <select
                                    id="ciudad"
                                    className="peer relative h-10 w-full appearance-none border-b border-white bg-transparent px-4 text-sm text-white outline-none transition-all focus:border-gray-400"
                                    defaultValue=""
                                    {...register('ciudad', { required: true })}
                                >
                                    <option value="" disabled>Selecciona una ciudad</option>
                                    {ciudadesOptions.map(option => (
                                        <option key={option.value} value={option.value} className="bg-black">{option.label}</option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="ciudad"
                                    className="absolute left-2 -top-2 z-[1] px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-transparent before:transition-all peer-focus:text-gray-400"
                                >
                                    Ciudad de preferencia para asistir *
                                </label>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-white transition-all peer-focus:fill-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            {errors.ciudad && <p className="mt-1 text-red-500 text-xs">Por favor selecciona una ciudad</p>}
                        </div>

                        {/* Términos y condiciones */}
                        <div className="mb-8">
                            <p className="font-medium mb-2">Aceptación de Condiciones</p>
                            <div className="space-y-3">
                                <div className="relative flex items-center">
                                    <input
                                        className="peer h-5 w-5 md:h-4 md:w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-gray-400 checked:bg-gray-400"
                                        type="checkbox"
                                        id="terminos"
                                        {...register('aceptaTerminos', { required: true })}
                                    />
                                    <label
                                        className="cursor-pointer pl-2"
                                        htmlFor="terminos"
                                    >
                                        Acepto los <span
                                            className="text-white underline hover:text-gray-300 cursor-pointer"
                                            onClick={() => setShowTermsModal(true)}
                                        >términos y condiciones</span> del evento.
                                    </label>
                                    <svg
                                        className="pointer-events-none absolute left-0 h-5 w-5 md:h-4 md:w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                                        />
                                    </svg>
                                </div>
                                {errors.aceptaTerminos && <p className="text-red-500 text-xs">Debes aceptar los términos y condiciones</p>}

                                <div className="relative flex items-center">
                                    <input
                                        className="peer h-5 w-5 md:h-4 md:w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-gray-400 checked:bg-gray-400"
                                        type="checkbox"
                                        id="comunicaciones"
                                        {...register('aceptaComunicaciones')}
                                    />
                                    <label
                                        className="cursor-pointer pl-2"
                                        htmlFor="comunicaciones"
                                    >
                                        Acepto recibir promociones y futuras oportunidades.
                                    </label>
                                    <svg
                                        className="pointer-events-none absolute left-0 h-5 w-5 md:h-4 md:w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 italic mb-4">
                            * Solo se permite un registro por persona.
                        </p>
                    </form>
                </div>

                {/* Botón de envío (fuera de la card como solicitado) */}
                <div className="flex justify-center mt-10">
                    <ShimmerButton
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        className="w-auto px-8 py-3 mx-auto text-white bg-gradient-to-br from-red-600 to-red-800 text-base font-medium uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </ShimmerButton>
                </div>
            </div>

            {/* Modal de éxito - Rediseñado */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-all"
                        onClick={() => setShowSuccessModal(false)}
                    ></div>
                    <div className="relative bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md w-full text-center shadow-2xl transform transition-all">
                        <div className="mb-6 flex justify-center">
                            <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white">
                                <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="absolute w-full h-full rounded-full bg-green-400 opacity-50 animate-ping"></span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-white">¡Registro Exitoso!</h3>
                        <p className="mb-8 text-gray-200">Gracias por registrarte al Demo Road Show de Triumph. Te contactaremos pronto con más detalles sobre el evento.</p>
                        <button
                            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-red-500/20 hover:scale-105"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {showTermsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
                    {/* Backdrop con blur */}
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowTermsModal(false)}
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
                                onClick={() => setShowTermsModal(false)}
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
                                onClick={() => setShowTermsModal(false)}
                                className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default RegistrationForm;