import React, { useState, useRef } from 'react';
import { experienceGalleryImages, videoPath, videoPosterPath } from '../../lib/constants/galleryData';
import { preloadImageBatch } from '../../lib/utils/imageUtils';
import { GalleryImage } from '../../lib/constants/galleryData';

const TriumphExperienceGallery: React.FC = () => {
    // Estado para el video modal
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // Estado para la imagen seleccionada
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    // Estado para mostrar todas las imágenes
    const [showAllImages, setShowAllImages] = useState(false);

    // Referencia al video
    const videoRef = useRef<HTMLVideoElement>(null);

    // Imágenes iniciales (mostrar primeras 6, que ahora serán 2 filas completas de 3)
    const initialImages = experienceGalleryImages.slice(0, 6);

    // Imágenes a mostrar basadas en el estado
    const imagesToShow = showAllImages ? experienceGalleryImages : initialImages;

    // Manejador para abrir/cerrar el video
    const handleVideoToggle = () => {
        setIsVideoOpen(!isVideoOpen);
        if (!isVideoOpen && videoRef.current) {
            videoRef.current.play();
        } else if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset video position cuando se cierra
        }
    };

    // Manejador para seleccionar una imagen
    const handleImageClick = (image: GalleryImage) => {
        setSelectedImage(image);
    };

    // Manejador para cerrar la imagen expandida
    const handleCloseImage = () => {
        setSelectedImage(null);
    };

    // Manejador para mostrar todas las imágenes
    const handleShowAllImages = () => {
        // Precargar las imágenes restantes antes de mostrarlas
        const remainingImageUrls = experienceGalleryImages.slice(6).map(img => img.src);
        preloadImageBatch(remainingImageUrls, 3).then(() => {
            setShowAllImages(true);
        });
    };

    return (
        <section className="w-full bg-black text-white py-12">
            {/* Componente de video */}
            <div className="container mx-auto px-6 md:px-12 mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                    Así se vive la <span className="italic">#EXPERIENCIATRIUMPH</span>
                </h2>

                <div className="relative w-full max-w-6xl mx-auto aspect-video overflow-hidden rounded-lg cursor-pointer group">
                    {/* Overlay para el video con botón de play - mejorado con efectos de grupo */}
                    <div
                        className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all"
                        onClick={handleVideoToggle}
                    >
                        <div className="w-20 h-20 rounded-full bg-white bg-opacity-80 flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
                            <div className="border-t-8 border-b-8 border-l-[16px] border-t-transparent border-b-transparent border-l-black ml-2"></div>
                        </div>
                    </div>

                    {/* Video base (sin expandir) */}
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        src={videoPath}
                        poster={videoPosterPath}
                        muted
                        loop
                    />
                </div>
            </div>

            {/* Modal de video expandido */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center modal-animation-enter">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
                        onClick={handleVideoToggle}
                    />
                    <div className="relative z-10 w-11/12 md:w-4/5 lg:w-3/4 max-w-5xl aspect-video modal-content-enter">
                        <video
                            className="w-full h-full object-contain"
                            src={videoPath}
                            autoPlay
                            controls
                        />
                        <button
                            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center"
                            onClick={handleVideoToggle}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Componente de galería */}
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                {/* Grid de 3 columnas manteniendo las alturas anteriores */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[350px]">
                    {imagesToShow.map((image) => (
                        <div
                            key={image.id}
                            className="relative overflow-hidden cursor-pointer rounded-md"
                            onClick={() => handleImageClick(image)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {/* Botón "Ver más" con efectos visuales ajustados según la imagen de referencia */}
                {!showAllImages && (
                    <div className="relative">
                        {/* Degradado con blur similar a la imagen de referencia */}
                        <div
                            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black to-transparent opacity-90"
                            style={{ top: '-150px', height: '200px' }}
                        />
                        {/* Overlay de blur separado para mejor control */}
                        <div
                            className="absolute inset-x-0 bottom-0 backdrop-blur-[1px]"
                            style={{ top: '-130px', height: '180px' }}
                        />
                        <div className="flex justify-center items-center relative z-10 pt-8 pb-12">
                            <button
                                className="px-8 py-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                                onClick={handleShowAllImages}
                            >
                                <span className="flex items-center">
                                    Ver más
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal para imagen expandida mejorado con mayor desenfoque */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-85 backdrop-blur-[8px]"
                        onClick={handleCloseImage}
                    />
                    <div className="relative z-10 w-auto h-auto max-w-[95vw] max-h-[85vh] p-2 animate-zoom-in">
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-[85vh] object-contain"
                        />
                        <button
                            className="absolute top-2 right-2 text-white text-2xl bg-gray-500 bg-opacity-25 backdrop-blur-sm hover:bg-opacity-40 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            onClick={handleCloseImage}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TriumphExperienceGallery;