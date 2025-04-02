import CitiesSection from '@/components/sections/CitiesSection';
import EventFeaturesCarousel from '@/components/sections/EventFeaturesCarousel';
import HeroSection from '@/components/sections/HeroSection';
import InfoSection from '@/components/sections/InfoSection';

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <InfoSection />
            <CitiesSection />
            <EventFeaturesCarousel />
        </>
    );
};

export default HomePage;