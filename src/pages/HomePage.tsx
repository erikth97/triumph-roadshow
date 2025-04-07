import CitiesSection from '@/components/sections/CitiesSection';
import EventFeaturesCarousel from '@/components/sections/EventFeaturesCarousel';
import HeroSection from '@/components/sections/HeroSection';
import InfoSection from '@/components/sections/InfoSection';
import MapTriumph from '@/components/sections/MapTriumph';
import MotorcycleShowcase from '@/components/sections/MotorcycleShowcase';
import RegistrationForm from '@/components/sections/RegistrationForm';
import TriumphExperienceGallery from '@/components/sections/TriumphExperienceGallery';
import TipSection from '@/components/sections/TIpSection';
import Footer from '@/components/layout/Footer';
import CtaSection from '@/components/sections/CtaSection';

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <InfoSection />
            <CitiesSection />
            <EventFeaturesCarousel />
            <MotorcycleShowcase />
            <TriumphExperienceGallery />
            <MapTriumph />
            <RegistrationForm />
            <TipSection />
            <CtaSection />
            <Footer />
        </>
    );
};

export default HomePage;