import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import SignaturePrintsPage from './pages/SignaturePrintsPage';
import NavLink from './components/NavLink';
import { useSmoothScroll } from './lib/smoothScroll';
import { useSeo } from './lib/useSeo';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const { scrollTo } = useSmoothScroll();
  useEffect(() => {
    if (!hash) scrollTo(0, { immediate: true });
  }, [pathname, hash, scrollTo]);
  return null;
}

function NotFound() {
  useSeo({ title: 'Page not found — Mangisha', description: 'This page could not be found.', path: '/404' });
  return (
    <main className="notfound container">
      <h1 className="h1">Page not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <NavLink href="/" className="btn btn--solid">Back to home</NavLink>
    </main>
  );
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <ScrollToTop />
      <Header />
      {/* Keyed wrapper replays a short fade/rise on every route change */}
      <div id="main" className="route" key={pathname}>
        <Routes>
          <Route path="/" element={<main><Home /></main>} />
          <Route path="/signature-prints" element={<SignaturePrintsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
