import { motion } from 'framer-motion';

const InfoSection = () => {
    return (
        <section className="relative py-20 bg-black text-white overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido (Título y Descripción) */}
                    <div className="order-2 lg:order-1 lg:pr-12 flex flex-col justify-center lg:pl-8 xl:pl-16">
                        <motion.h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase italic leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            ¡Únete a nosotros en<br />el Demo Road Show<br />de Triumph!
                        </motion.h2>

                        <motion.p
                            className="text-base md:text-lg text-gray-300 max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Si eres un amante de las motocicletas, esta es tu oportunidad de <span className="font-bold text-white">experimentar</span> de primera mano la emoción y el rendimiento de nuestras motocicletas en el asfalto. Nos vamos a varias ciudades para que puedas probar nuestras motos más recientes en un ambiente seguro y controlado. <span className="font-bold italic">¡No te lo puedes perder!</span>
                        </motion.p>
                    </div>

                    {/* Imagen con efecto de recorte */}
                    <motion.div
                        className="order-1 lg:order-2 relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <img
                                src="/images/foto-intro.png"
                                alt="Motociclista Triumph en acción"
                                className="w-full"
                                style={{
                                    clipPath: "polygon(0% 15%, 5% 5%, 15% 0%, 85% 0%, 95% 5%, 100% 15%, 100% 85%, 95% 95%, 85% 100%, 15% 100%, 5% 95%, 0% 85%)",
                                    maskSize: "contain",
                                    WebkitMaskSize: "contain",
                                    maskRepeat: "no-repeat",
                                    WebkitMaskRepeat: "no-repeat",
                                    maskPosition: "center",
                                    WebkitMaskPosition: "center"
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;