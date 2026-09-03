import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { useColors } from './theme/ThemeContext';

// Lazy-loaded pages for performance
const Home = lazy(() => import('./pages/Home'));
const Research = lazy(() => import('./pages/Research'));
const Products = lazy(() => import('./pages/Products'));
const UseCases = lazy(() => import('./pages/UseCases'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  const colors = useColors();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        backgroundColor: colors.ink,
      }}
    >
      <CircularProgress size={24} sx={{ color: colors.accent }} />
    </Box>
  );
}

// Page transition wrapper
function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function Layout() {
  const colors = useColors();
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: colors.ink }}>
      <Navbar />
      <PageTransition>
        <Box sx={{ flex: 1 }}>
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/research" element={<Research />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/alta-tokenizer" element={<Navigate to="/products?product=tokenizer" replace />} />
              <Route path="/products/alta-model" element={<Navigate to="/products?product=model" replace />} />
              <Route path="/use-cases" element={<UseCases />} />
              <Route path="/company/about-us" element={<About />} />
              <Route path="/company/our-team" element={<Team />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Box>
        <Footer />
      </PageTransition>
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
