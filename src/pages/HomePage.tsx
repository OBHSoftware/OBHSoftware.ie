import {
  Hero,
  Proof,
  Platforms,
  Services,
  Work,
  About,
  Contact,
} from '../components/sections';

export function HomePage() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <main id="main">
        {/* Two doors: hire us to build, or buy what we've already built. */}
        <Hero />
        <Proof />
        <Platforms />
        <Services />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
