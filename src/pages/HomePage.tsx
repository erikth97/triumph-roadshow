import CitiesSection from '@/components/sections/CitiesSection';
import EventFeaturesCarousel from '@/components/sections/EventFeaturesCarousel';
import HeroSection from '@/components/sections/HeroSection';
import InfoSection from '@/components/sections/InfoSection';
import MapTriumph from '@/components/sections/MapTriumph';
import MotorcycleShowcase from '@/components/sections/MotorcycleShowcase';
import TriumphExperienceGallery from '@/components/sections/TriumphExperienceGallery';

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <InfoSection />
            <CitiesSection />
            <EventFeaturesCarousel />
            <MotorcycleShowcase />
            <TriumphExperienceGallery />
            <MapTriumph     />
        </>
    );
};

export default HomePage;