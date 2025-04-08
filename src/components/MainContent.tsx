import { useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { PropagateLoader } from 'react-spinners';
import HomePage from '@/pages/HomePage';
import { motion, AnimatePresence } from 'framer-motion';

const MainContent = () => {
    const { isLoading, setResourceLoaded } = useLoading();

    useEffect(() => {
        setResourceLoaded('initialContent');
    }, [isLoading, setResourceLoaded]);

    // Fondo negro que siempre está presente, incluso durante la transición
    useEffect(() => {
        // Establecer el fondo del body a negro para evitar flashes
        document.body.style.backgroundColor = '#000000';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.8 }
                        }}
                    >
                        <div className="flex flex-col items-center space-y-8">
                            <motion.img
                                src="/images/DRS-BLANCO.png"
                                alt="Demo Road Show Triumph"
                                className="w-64 md:w-80 mb-4"
                                initial={{ y: 0 }}
                                exit={{
                                    y: -40, // Se moverá hacia arriba al salir
                                    transition: { duration: 0.8, ease: "easeInOut" }
                                }}
                            />
                            <PropagateLoader color="#FF0000" size={15} speedMultiplier={1} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="bg-black min-h-screen">
                <AnimatePresence>
                    {!isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <HomePage />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default MainContent;