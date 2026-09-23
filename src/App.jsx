import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { useColors } from './theme/ThemeContext';
import { queryClient } from './lib/queryClient';
import { useSiteContent } from './content/useContent';

// Lazy-loaded pages for performance
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// The admin lives in its own chunk - nothing on the public site links to it.
const AdminApp = lazy(() => import('./admin/AdminApp'));

function PageLoader({ fullScreen = false }) {
  const colors = useColors();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: fullScreen ? '100vh' : '40vh',
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

function PublicLayout() {
  const colors = useColors();
  const location = useLocation();
  // Content is fetched once for the whole site; pages fall back to code
  // defaults if the request fails, so only the first load is gated.
  const { isPending } = useSiteContent();

  // Scroll to top on route change (pages with a #hash scroll to it themselves).
  React.useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);

  if (isPending) return <PageLoader fullScreen />;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: colors.ink }}>
      <Navbar />
      <PageTransition>
        <Box sx={{ flex: 1 }}>
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              {/* Legacy product URLs */}
              <Route path="/products/alta-model" element={<Navigate to="/products#model" replace />} />
              <Route path="/products/altascribe" element={<Navigate to="/products#scribe" replace />} />
              <Route path="/products/alta-foundry" element={<Navigate to="/products#foundry" replace />} />
              <Route path="/products/*" element={<Navigate to="/products" replace />} />
              <Route path="/research" element={<Navigate to="/" replace />} />
              <Route path="/use-cases" element={<Navigate to="/products" replace />} />
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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<PageLoader fullScreen />}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route path="*" element={<PublicLayout />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
