import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './app/store';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Problem from './components/Problem';
import Solution from './components/Solution';
import ROI from './components/ROI';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ContactUs from './pages/ContactUs';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import RecruiterLanding from './components/RecruiterLanding';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { hydrateAuth, fetchCurrentUser } from './features/auth/authSlice';
import { tokenStorage } from './services/auth.service';

function Home() {
    const location = useLocation();
    const isRecruiterView = new URLSearchParams(location.search).get('product') === 'recruiter';

    if (isRecruiterView) {
        return (
            <div className="min-h-screen bg-white">
                <Navigation />
                <RecruiterLanding />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <Hero />
            <About />
            <Problem />
            <Solution />
            <ROI />
            <HowItWorks />
            <CTA />
            <Footer />
        </div>
    );
}

export function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const token = tokenStorage.getAccessToken();
        if (token) {
            dispatch(hydrateAuth());
            dispatch(fetchCurrentUser());
        }
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/blog" element={<Blog />} />

                {/* Protected routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;