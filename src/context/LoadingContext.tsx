import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    setResourceLoaded: (resourceName: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("LoadingProvider: Iniciando temporizador...");

        const preloadAssets = async () => {
            const logoImg = new Image();
            logoImg.src = '/images/DRS-BLANCO.png';
        };

        preloadAssets();

        const timer = setTimeout(() => {
            console.log("LoadingProvider: Tiempo completado, cambiando a isLoading=false");
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Esta función ahora incluye logs pero mantiene la lógica simple
    const setResourceLoaded = (resourceName: string) => {
        console.log(`Recurso cargado: ${resourceName}`);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setResourceLoaded }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};