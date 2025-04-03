import { useState, useEffect, RefObject } from 'react';

/**
 * Hook personalizado para precargar una imagen individual
 * @param imageUrl URL de la imagen a precargar
 * @returns boolean que indica si la imagen se ha cargado
 */
export const useImagePreload = (imageUrl: string): boolean => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!imageUrl) return;

        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            setLoaded(true);
        };

        return () => {
            img.onload = null;
        };
    }, [imageUrl]);

    return loaded;
};

/**
 * Función para precargar un lote de imágenes en paralelo
 * Carga las imágenes en lotes pequeños para no saturar la red
 * @param imageUrls Array de URLs de imágenes a precargar
 * @param batchSize Tamaño del lote (cantidad de imágenes a cargar en paralelo)
 * @returns Promise que se resuelve cuando todas las imágenes se han cargado
 */
export const preloadImageBatch = (imageUrls: string[], batchSize: number = 3): Promise<void> => {
    return new Promise((resolve) => {
        let loadedCount = 0;
        const totalImages = imageUrls.length;

        // No hay imágenes para cargar
        if (totalImages === 0) {
            resolve();
            return;
        }

        // Dividir el array en lotes
        const batches: string[][] = [];
        for (let i = 0; i < totalImages; i += batchSize) {
            batches.push(imageUrls.slice(i, i + batchSize));
        }

        // Función para cargar un lote
        const loadBatch = (batchIndex: number) => {
            if (batchIndex >= batches.length) {
                resolve();
                return;
            }

            const batch = batches[batchIndex];
            const batchPromises = batch.map((url: string) => {
                return new Promise<void>((resolveImage) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => {
                        loadedCount++;
                        resolveImage();
                    };
                    img.onerror = () => {
                        loadedCount++;
                        resolveImage();
                    };
                });
            });

            Promise.all(batchPromises).then(() => {
                loadBatch(batchIndex + 1);
            });
        };

        // Iniciar la carga del primer lote
        loadBatch(0);
    });
};

/**
 * Hook para implementar lazy loading con IntersectionObserver
 * @param elementRef Referencia al elemento que queremos observar
 * @param options Opciones para el IntersectionObserver
 * @returns boolean que indica si el elemento es visible
 */
export const useLazyLoad = (
    elementRef: RefObject<Element>,
    options: IntersectionObserverInit = { rootMargin: '200px' }
): boolean => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || isVisible) return;

        // Verificar si IntersectionObserver está disponible en el navegador
        if (!('IntersectionObserver' in window)) {
            // Si no está disponible, consideramos el elemento como visible
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, options);

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [elementRef, options, isVisible]);

    return isVisible;
};

/**
 * Genera una cadena srcset para imágenes responsivas
 * @param imagePath Ruta base de la imagen
 * @param widths Array de anchos para generar las diferentes versiones
 * @returns String con el formato adecuado para el atributo srcset
 */
export const generateSrcSet = (
    imagePath: string,
    widths: number[] = [320, 640, 960, 1280, 1920]
): string => {
    // Si la ruta no tiene extensión, no se puede generar el srcset
    if (!imagePath.includes('.')) {
        return imagePath;
    }

    const extension = imagePath.split('.').pop();
    const basePath = imagePath.substring(0, imagePath.lastIndexOf('.'));

    return widths
        .map(width => `${basePath}-${width}w.${extension} ${width}w`)
        .join(', ');
};

/**
 * Función para obtener las dimensiones reales de una imagen
 * @param imageUrl URL de la imagen
 * @returns Promise con las dimensiones {width, height}
 */
export const getImageDimensions = (imageUrl: string): Promise<{ width: number, height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve({
                width: img.width,
                height: img.height
            });
        };
        img.onerror = () => {
            reject(new Error(`Failed to load image: ${imageUrl}`));
        };
        img.src = imageUrl;
    });
};

/**
 * Función para verificar si una imagen existe (está accesible)
 * @param imageUrl URL de la imagen a verificar
 * @returns Promise<boolean> que indica si la imagen existe
 */
export const checkImageExists = (imageUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imageUrl;
    });
};