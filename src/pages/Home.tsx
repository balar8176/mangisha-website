import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import BuyerSelector from '../components/BuyerSelector';
import Statistics from '../components/Statistics';
import Collection from '../components/Collection';
import SignaturePrints from '../components/SignaturePrints';
import Applications from '../components/Applications';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Shortlist from '../components/Shortlist';
import QuoteForm from '../components/QuoteForm';
import Contact from '../components/Contact';
import { useSeo } from '../lib/useSeo';
import { useSmoothScroll } from '../lib/smoothScroll';

// Section order: edit here to reorder the homepage.
export default function Home() {
  useSeo({
    title: 'Mangisha — A House of Knit Fabrics',
    description: 'Mangisha is a house of knit fabrics: single jersey, rib, interlock, fleece and six signature prints for garment makers and brands. Request a quote.',
    path: '/',
  });

  const { hash } = useLocation();
  const { scrollTo } = useSmoothScroll();
  // Arriving from another route (e.g. /signature-prints → /#quote): scroll to the section once it exists.
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => scrollTo(hash), 120);
    return () => clearTimeout(t);
  }, [hash, scrollTo]);

  return (
    <>
      <Hero />
      <BuyerSelector />
      <Statistics />
      <Collection />
      <SignaturePrints />
      <Applications />
      <About />
      <WhyChooseUs />
      <Shortlist />
      <QuoteForm />
      <Contact />
    </>
  );
}
