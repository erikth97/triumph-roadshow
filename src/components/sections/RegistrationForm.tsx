import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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
};

// Opciones para los selects
const ciudadesOptions = [
    { value: 'Puebla', label: 'Puebla' },
    { value: 'Querétaro', label: 'Querétaro' },
    { value: 'León', label: 'León' },
    { value: 'Morelia', label: 'Morelia' },
    { value: 'Guadalajara', label: 'Guadalajara' },
    { value: 'Monterrey', label: 'Monterrey' },
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Usar watch para observar valores específicos
    const tieneMotocicleta = watch('tieneMotocicleta');
    const enteradoPor = watch('enteradoPor', []);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setIsSubmitting(true);

        try {
            // Aquí enviarías los datos a tu backend
            console.log('Datos del formulario:', data);

            // Simular envío
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mostrar modal de éxito
            setShowSuccessModal(true);

            // Resetear formulario
            reset();
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="registro" className="py-16 bg-black text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">¡Regístrate al Demo Road Show!</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-black/80 p-8 rounded-lg backdrop-blur-sm">
                    {/* Nombre Completo */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                id="nombreCompleto"
                                type="text"
                                placeholder="Nombre Completo"
                                className={`peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all autofill:bg-black/0 ${errors.nombreCompleto ? 'border-red-500' : 'focus:border-yellow-500'}`}
                                {...register('nombreCompleto', { required: true })}
                            />
                            <label
                                htmlFor="nombreCompleto"
                                className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-yellow-500 ${errors.nombreCompleto ? 'text-red-500 peer-focus:text-red-500' : ''}`}
                            >
                                Nombre Completo *
                            </label>
                        </div>
                        {errors.nombreCompleto && <p className="mt-1 text-red-500 text-xs">Este campo es requerido</p>}
                    </div>

                    {/* Fila: Edad y Teléfono */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Edad */}
                        <div className="relative">
                            <input
                                id="edad"
                                type="number"
                                placeholder="Edad"
                                className={`peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all autofill:bg-black/0 ${errors.edad ? 'border-red-500' : 'focus:border-yellow-500'}`}
                                {...register('edad', { required: true, min: 18, max: 99 })}
                            />
                            <label
                                htmlFor="edad"
                                className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-yellow-500 ${errors.edad ? 'text-red-500 peer-focus:text-red-500' : ''}`}
                            >
                                Edad *
                            </label>
                            {errors.edad && <p className="mt-1 text-red-500 text-xs">Por favor ingresa una edad válida (18-99)</p>}
                        </div>

                        {/* Teléfono */}
                        <div className="relative">
                            <input
                                id="telefono"
                                type="tel"
                                placeholder="Teléfono"
                                className={`peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all autofill:bg-black/0 ${errors.telefono ? 'border-red-500' : 'focus:border-yellow-500'}`}
                                {...register('telefono', {
                                    required: true,
                                    pattern: /^[0-9]{10}$/
                                })}
                            />
                            <label
                                htmlFor="telefono"
                                className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-yellow-500 ${errors.telefono ? 'text-red-500 peer-focus:text-red-500' : ''}`}
                            >
                                Teléfono *
                            </label>
                            {errors.telefono && <p className="mt-1 text-red-500 text-xs">Por favor ingresa un número de 10 dígitos</p>}
                        </div>
                    </div>

                    {/* Correo electrónico */}
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                id="correoElectronico"
                                type="email"
                                placeholder="Correo Electrónico"
                                className={`peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all autofill:bg-black/0 ${errors.correoElectronico ? 'border-red-500' : 'focus:border-yellow-500'}`}
                                {...register('correoElectronico', {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                                })}
                            />
                            <label
                                htmlFor="correoElectronico"
                                className={`absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-yellow-500 ${errors.correoElectronico ? 'text-red-500 peer-focus:text-red-500' : ''}`}
                            >
                                Correo Electrónico *
                            </label>
                        </div>
                        {errors.correoElectronico && <p className="mt-1 text-red-500 text-xs">Por favor ingresa un correo electrónico válido</p>}
                    </div>

                    {/* ¿Tienes motocicleta propia? */}
                    <div className="mb-6">
                        <p className="mb-3">¿Tienes motocicleta propia?</p>
                        <div className="flex gap-8">
                            <div className="relative flex items-center">
                                <input
                                    className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-yellow-500 checked:bg-yellow-500"
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
                                    className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-yellow-500 checked:bg-yellow-500"
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
                        <div className="mb-6">
                            <div className="relative">
                                <input
                                    id="marcaModelo"
                                    type="text"
                                    placeholder="Marca y modelo"
                                    className="peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all autofill:bg-black/0 focus:border-yellow-500"
                                    {...register('marcaModelo')}
                                />
                                <label
                                    htmlFor="marcaModelo"
                                    className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-yellow-500"
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
                                className="peer relative h-10 w-full appearance-none border-b border-white bg-transparent px-4 text-sm text-white outline-none transition-all focus:border-yellow-500"
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
                                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-focus:text-yellow-500"
                            >
                                ¿Qué cilindrada manejas? *
                            </label>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-white transition-all peer-focus:fill-yellow-500"
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
                                    className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-yellow-500 checked:bg-yellow-500"
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
                                    className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-yellow-500 checked:bg-yellow-500"
                                    type="radio"
                                    id="tipo-classic"
                                    value="Modern Classics"
                                    {...register('tipoMotocicleta', { required: true })}
                                />
                                <label className="pl-2 cursor-pointer" htmlFor="tipo-classic">Modern Classics</label>
                                <svg className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="8" cy="8" r="4" />
                                </svg>
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-yellow-500 checked:bg-yellow-500"
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
                                    className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-yellow-500 checked:bg-yellow-500"
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
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-yellow-500 checked:bg-yellow-500"
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
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-yellow-500 checked:bg-yellow-500"
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
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-yellow-500 checked:bg-yellow-500"
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
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-yellow-500 checked:bg-yellow-500"
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
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-yellow-500 checked:bg-yellow-500"
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
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-yellow-500 checked:bg-yellow-500"
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
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-yellow-500 checked:bg-yellow-500"
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
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-yellow-500 checked:bg-yellow-500"
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
                                        className="peer relative h-10 w-full border-b border-white px-4 text-sm text-white placeholder-transparent outline-none transition-all autofill:bg-black/0 focus:border-yellow-500"
                                        {...register('otroMedio')}
                                    />
                                    <label
                                        htmlFor="otroMedio"
                                        className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-yellow-500"
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
                                className="peer relative h-10 w-full appearance-none border-b border-white bg-transparent px-4 text-sm text-white outline-none transition-all focus:border-yellow-500"
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
                                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-white/70 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-focus:text-yellow-500"
                            >
                                Ciudad de preferencia para asistir *
                            </label>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-white transition-all peer-focus:fill-yellow-500"
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
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-yellow-500 checked:bg-yellow-500"
                                    type="checkbox"
                                    id="terminos"
                                    {...register('aceptaTerminos', { required: true })}
                                />
                                <label
                                    className="cursor-pointer pl-2"
                                    htmlFor="terminos"
                                >
                                    Acepto los términos y condiciones del evento.
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
                            {errors.aceptaTerminos && <p className="text-red-500 text-xs">Debes aceptar los términos y condiciones</p>}

                            <div className="relative flex items-center">
                                <input
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-colors checked:border-yellow-500 checked:bg-yellow-500"
                                    type="checkbox"
                                    id="comunicaciones"
                                    {...register('aceptaComunicaciones')}
                                />
                                <label
                                    className="cursor-pointer pl-2"
                                    htmlFor="comunicaciones"
                                >
                                    Acepto recibir comunicaciones sobre el evento, promociones y futuras oportunidades.
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
                    </div>

                    {/* Botón de envío */}
                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            className="px-10 py-3 bg-transparent border-2 border-white text-white text-lg font-medium rounded-sm hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Enviando...' : 'Enviar'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal de éxito */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black bg-opacity-75" onClick={() => setShowSuccessModal(false)}></div>
                    <div className="relative bg-black border border-white rounded-lg p-8 max-w-md w-full text-center">
                        <svg className="mx-auto h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <h3 className="text-2xl font-bold mb-4">¡Registro Exitoso!</h3>
                        <p className="mb-6">Gracias por registrarte al Demo Road Show de Triumph. Te contactaremos pronto con más detalles sobre el evento.</p>
                        <button
                            className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-sm hover:bg-white hover:text-black transition-colors duration-300"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default RegistrationForm