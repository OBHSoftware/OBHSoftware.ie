import {
  Hero,
  Services,
  WhyUs,
  Pricing,
  ExtendedServices,
  About,
  Contact,
} from '../components/sections';

export function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <Pricing />
      <ExtendedServices />
      <About />
      <Contact />
    </main>
  );
}
