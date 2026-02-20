import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { BackToTop, ScrollToTop } from './components/common';
import {
  HomePage,
  CalculatorPage,
  SectorsPage,
  SectorDetailPage,
  ServiceDetailPage,
  PartnersPage,
  PartnerDetailPage,
  ProductsPage,
  ProductDetailPage,
  CaseStudiesPage,
  CaseStudyDetailPage,
  FAQPage,
  ClientPortalPage,
  ResourcesPage,
  BlogPage,
  BlogPostPage,
  ProcessPage,
  CareersPage,
  SubsitePage,
  SubsiteFAQPage,
  SubsiteFeaturesPage,
} from './pages';

// External redirect component for remote support
function ExternalRedirect({ url }: { url: string }) {
  window.location.href = url;
  return null;
}

// Layout wrapper for main site pages
function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <BackToTop />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* External redirect for remote support */}
        <Route path="/remotesupport" element={<ExternalRedirect url="https://pub-ac6387c37e9f4bfb927f8e58fde05092.r2.dev/rustdesk-host%3D65.109.164.224%2Ckey%3DlFHbstKyRQobGxkRCUE96e3KSffrjigXA8lUzin4RPw%3D.exe" />} />

        {/* qMechanic redirect — now on its own domain */}
        <Route path="/products/qmechanic/site/*" element={<ExternalRedirect url="https://qmechanic.autos" />} />
        <Route path="/products/qmechanic/site" element={<ExternalRedirect url="https://qmechanic.autos" />} />

        {/* Product subsites - rendered without main Header/Footer */}
        <Route path="/products/:productSlug/site" element={<SubsitePage />} />
        <Route path="/products/:productSlug/site/faq" element={<SubsiteFAQPage />} />
        <Route path="/products/:productSlug/site/features" element={<SubsiteFeaturesPage />} />

        {/* Main site pages with Header/Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/sectors" element={<SectorsPage />} />
          <Route path="/sectors/:slug" element={<SectorDetailPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/partners/:slug" element={<PartnerDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/client-portal" element={<ClientPortalPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/insights" element={<BlogPage />} />
          <Route path="/insights/:slug" element={<BlogPostPage />} />
          <Route path="/how-we-work" element={<ProcessPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
