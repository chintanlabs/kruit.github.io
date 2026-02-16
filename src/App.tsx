import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import ROI from './components/ROI';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';

export function App() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <Hero />
            <Problem />
            <Solution />
            <ROI />
            <HowItWorks />
            <CTA />
            <Footer />
        </div>
    );
}

export default App;