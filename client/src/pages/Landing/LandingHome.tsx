
import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import TrustedBy from '../../components/landing/TrustedBy';
import DemoSection from '../../components/landing/DemoSection';
import Features from '../../components/landing/Features';
import Pricing from '../../components/landing/Pricing';
import FAQ from '../../components/landing/FAQ';
import Footer from '../../components/landing/Footer';

const LandingHome = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white font-sans">
            <Navbar />
            <Hero />
            <TrustedBy />
            <DemoSection />
            <Features />
            <Pricing />
            <FAQ />
            <Footer />
        </div>
    );
};

export default LandingHome;
