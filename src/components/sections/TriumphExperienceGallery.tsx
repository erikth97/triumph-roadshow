import React, { useState, useCallback, useEffect } from 'react';
import { experienceGalleryImages } from '../../lib/constants/galleryData';
import { preloadImageBatch } from '../../lib/utils/imageUtils';
import { GalleryImage } from '../../lib/constants/galleryData';

const TriumphExperienceGallery: React.FC = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [showAllImages, setShowAllImages] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // YouTube video ID
    const youtubeVideoId = '2LyKT-TtBhI';
    // Imagen personalizada para la portada del video
    const customVideoThumbnail = "/images/triumph-experience-video-cover.webp";

    // Check if device is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const initialImages = experienceGalleryImages.slice(0, 6);
    const imagesToShow = showAllImages ? experienceGalleryImages : initialImages;

    const handleVideoToggle = () => {
        setIsVideoOpen(!isVideoOpen);

        // When closing the video, ensure the iframe is removed from DOM
        if (isVideoOpen) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    };

    const handleImageClick = (image: GalleryImage) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const handleShowAllImages = () => {
        // Start loading animation before images are loaded
        const remainingImageUrls = experienceGalleryImages.slice(6).map(img => img.src);

        // Show loading state
        const button = document.getElementById('load-more-button');
        if (button) {
            button.innerHTML = '<span class="flex items-center">Cargando...</span>';
            button.classList.add('opacity-70');
        }

        preloadImageBatch(remainingImageUrls, 3).then(() => {
            setShowAllImages(true);
        });
    };

    // Función para navegar entre imágenes
    const navigateImage = useCallback((direction: 'next' | 'prev') => {
        if (!selectedImage) return;

        const currentIndex = experienceGalleryImages.findIndex(img => img.id === selectedImage.id);
        if (currentIndex === -1) return;

        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % experienceGalleryImages.length;
        } else {
            newIndex = (currentIndex - 1 + experienceGalleryImages.length) % experienceGalleryImages.length;
        }

        setSelectedImage(experienceGalleryImages[newIndex]);
    }, [selectedImage]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedImage) return;

            if (e.key === 'ArrowRight') {
                navigateImage('next');
            } else if (e.key === 'ArrowLeft') {
                navigateImage('prev');
            } else if (e.key === 'Escape') {
                handleCloseImage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, navigateImage]);

    return (
        <section className="w-full bg-black text-white py-12">
            {/* Video component */}
            <div className="container mx-auto px-6 md:px-12 mb-12 max-w-7xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                    Así se vive la <span className="italic">#EXPERIENCIATRIUMPH</span>
                </h2>

                <div className="relative w-full mx-auto aspect-video overflow-hidden rounded-lg cursor-pointer group">
                    <div
                        className="absolute inset-0 flex items-center justify-center z-10 bg-opacity-40 group-hover:bg-opacity-20 transition-all"
                        onClick={handleVideoToggle}
                        role="button"
                        aria-label="Reproducir video"
                        tabIndex={0}
                    >
                        <div className="w-20 h-20 rounded-full bg-white bg-opacity-80 flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
                            <div className="border-t-8 border-b-8 border-l-[16px] border-t-transparent border-b-transparent border-l-black ml-2"></div>
                        </div>
                    </div>

                    <img
                        className="w-full h-full object-cover"
                        src={customVideoThumbnail}
                        alt="Experiencia Triumph video cover"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* YouTube Video modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
                        onClick={handleVideoToggle}
                    />
                    <div className="relative z-10 w-11/12 md:w-4/5 lg:w-3/4 max-w-5xl aspect-video">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                            title="Experiencia Triumph"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button
                            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center"
                            onClick={handleVideoToggle}
                            aria-label="Cerrar video"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Gallery */}
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                {/* Grid modificado: 2 columnas en móvil, 3 en md y mayores */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
                    {imagesToShow.map((image) => (
                        <div
                            key={image.id}
                            className="relative cursor-pointer rounded-md overflow-hidden w-full"
                            style={{
                                height: "280px",
                                aspectRatio: "16/9"
                            }}
                            onClick={() => handleImageClick(image)}
                            role="button"
                            aria-label={`Ver imagen: ${image.alt}`}
                            tabIndex={0}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {/* View more button */}
                {!showAllImages && (
                    <div className="relative h-40 mt-2">
                        <div
                            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black to-transparent opacity-90"
                            style={{ top: '-150px', height: '200px' }}
                        />
                        <div
                            className="absolute inset-x-0 bottom-0 backdrop-blur-[1px]"
                            style={{ top: '-130px', height: '180px' }}
                        />
                        <div className="absolute inset-x-0 bottom-0 pt-8 flex justify-center items-center">
                            <button
                                id="load-more-button"
                                className="px-8 py-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                                onClick={handleShowAllImages}
                                aria-label="Ver más imágenes"
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

            {/* Image modal with navigation - Optimized for mobile */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-85 backdrop-blur-[8px]"
                        onClick={handleCloseImage}
                    />

                    {/* Image container with improved mobile navigation */}
                    <div className="relative z-10 w-auto max-w-[95vw] max-h-[85vh] flex items-center justify-center">
                        {/* Image with close button */}
                        <div className="relative">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-w-full max-h-[85vh] object-contain"
                            />

                            {/* Close button repositioned to top-right corner */}
                            <button
                                className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 hover:bg-opacity-70 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                onClick={handleCloseImage}
                                aria-label="Cerrar imagen"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Desktop navigation buttons */}
                        {!isMobile && (
                            <>
                                {/* Previous button */}
                                <button
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 text-white text-4xl hover:text-gray-300 w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-black bg-opacity-50 hover:bg-opacity-70"
                                    onClick={() => navigateImage('prev')}
                                    aria-label="Imagen anterior"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {/* Next button */}
                                <button
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 text-white text-4xl hover:text-gray-300 w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-black bg-opacity-50 hover:bg-opacity-70"
                                    onClick={() => navigateImage('next')}
                                    aria-label="Siguiente imagen"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile navigation buttons positioned at bottom of screen */}
                    {isMobile && (
                        <div className="fixed bottom-8 left-0 right-0 z-20 flex justify-center space-x-8">
                            <button
                                className="text-white text-4xl w-16 h-16 rounded-full flex items-center justify-center bg-black bg-opacity-70 hover:bg-opacity-90 border border-white/30"
                                onClick={() => navigateImage('prev')}
                                aria-label="Imagen anterior"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                className="text-white text-4xl w-16 h-16 rounded-full flex items-center justify-center bg-black bg-opacity-70 hover:bg-opacity-90 border border-white/30"
                                onClick={() => navigateImage('next')}
                                aria-label="Siguiente imagen"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Image counter */}
                    <div className="fixed bottom-2 left-0 right-0 z-20 flex justify-center">
                        <div className="px-4 py-1 bg-black bg-opacity-70 rounded-full text-white text-sm">
                            {experienceGalleryImages.findIndex(img => img.id === selectedImage.id) + 1} / {experienceGalleryImages.length}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default React.memo(TriumphExperienceGallery);