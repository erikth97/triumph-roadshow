import { forwardRef, RefObject } from 'react';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import CitiesSection from '@/components/sections/CitiesSection';
import EventFeaturesCarousel from '@/components/sections/EventFeaturesCarousel';
import HeroSection from '@/components/sections/HeroSection';
import InfoSection from '@/components/sections/InfoSection';
import MapTriumph from '@/components/sections/MapTriumph';
import MotorcycleShowcase from '@/components/sections/MotorcycleShowcase';
import RegistrationForm from '@/components/sections/RegistrationForm';
import TriumphFaqAccordion from '@/components/sections/TriumphFaqAccordion';
import TriumphExperienceGallery from '@/components/sections/TriumphExperienceGallery';
import TipSection from '@/components/sections/TipSection';
import Footer from '@/components/layout/Footer';
import RegistrationReminder from '@/components/sections/RegistrationReminder';

interface HomePageProps {
    logoRef?: RefObject<HTMLDivElement | null>;
}

const HomePage = forwardRef<HTMLElement, HomePageProps>(({ logoRef }) => {
    return (
        <>
            <ScrollProgressBar />
            <HeroSection logoRef={logoRef as RefObject<HTMLDivElement>} />
            <InfoSection />
            <CitiesSection />
            <EventFeaturesCarousel />
            <MotorcycleShowcase />
            <TriumphExperienceGallery />
            <MapTriumph />
            <RegistrationForm />
            <TriumphFaqAccordion />
            <TipSection />
            <RegistrationReminder />
            <Footer />
        </>
    );
});

HomePage.displayName = 'HomePage';

export default HomePage;