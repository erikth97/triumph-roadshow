import React, { useState, useCallback } from 'react';
import { experienceGalleryImages } from '../../lib/constants/galleryData';
import { preloadImageBatch } from '../../lib/utils/imageUtils';
import { GalleryImage } from '../../lib/constants/galleryData';

const TriumphExperienceGallery: React.FC = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [showAllImages, setShowAllImages] = useState(false);

    // YouTube video ID
    const youtubeVideoId = '2LyKT-TtBhI';
    const youtubeThumbnail = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

    const initialImages = experienceGalleryImages.slice(0, 6);
    const imagesToShow = showAllImages ? experienceGalleryImages : initialImages;

    const handleVideoToggle = () => {
        setIsVideoOpen(!isVideoOpen);
    };

    const handleImageClick = (image: GalleryImage) => {
        setSelectedImage(image);
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
    };

    const handleShowAllImages = () => {
        const remainingImageUrls = experienceGalleryImages.slice(6).map(img => img.src);
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
                    >
                        <div className="w-20 h-20 rounded-full bg-white bg-opacity-80 flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
                            <div className="border-t-8 border-b-8 border-l-[16px] border-t-transparent border-b-transparent border-l-black ml-2"></div>
                        </div>
                    </div>

                    <img
                        className="w-full h-full object-cover"
                        src={youtubeThumbnail}
                        alt="Experiencia Triumph video thumbnail"
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
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Gallery */}
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                {/* Grid con tamaños fijos y gaps exactos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
                    {imagesToShow.map((image) => (
                        <div
                            key={image.id}
                            className="relative cursor-pointer rounded-md overflow-hidden w-full"
                            style={{
                                height: "280px",
                                aspectRatio: "16/9"
                            }}
                            onClick={() => handleImageClick(image)}
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

            {/* Image modal with navigation */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-85 backdrop-blur-[8px]"
                        onClick={handleCloseImage}
                    />
                    <div className="relative z-10 w-auto max-w-[95vw] max-h-[85vh] flex items-center justify-center">
                        {/* Previous button */}
                        <button
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 text-white text-4xl hover:text-gray-300 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                            onClick={() => navigateImage('prev')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Image container with close button */}
                        <div className="relative">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-w-full max-h-[85vh] object-contain"
                            />

                            {/* Close button repositioned to top-right corner of the image */}
                            <button
                                className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                onClick={handleCloseImage}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Next button */}
                        <button
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 text-white text-4xl hover:text-gray-300 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                            onClick={() => navigateImage('next')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TriumphExperienceGallery;