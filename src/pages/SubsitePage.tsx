import { useParams, Navigate } from 'react-router-dom';
import { BackToTop } from '../components/common';
import {
  SubsiteHeader,
  SubsiteHero,
  SubsiteFeatureSection,
  SubsiteWhyChoose,
  SubsitePricing,
  SubsiteCTA,
  SubsiteFooter,
} from '../components/subsite';

// Import all subsite data
import qhaulData from '../data/subsites/qhaul.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const subsiteMap: Record<string, any> = {
  qhaul: qhaulData,
};

interface FeatureSection {
  id: string;
  title: string;
  subtitle?: string;
  features: { title: string; description: string }[];
}

interface WhyChooseSection {
  title: string;
  subtitle: string;
  subtitleLine2?: string;
  description: string;
  benefits: { icon: string; text: string }[];
}

interface PricingSection {
  title: string;
  subtitle: string;
  subtitleLine2?: string;
  plans: {
    name: string;
    price: string;
    period: string;
    features: string[];
    highlighted?: boolean;
  }[];
}

interface CTASection {
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface FooterSection {
  copyright: string;
  links?: { label: string; href: string }[];
}

interface NavItem {
  label: string;
  href: string;
}

interface SubsiteData {
  site: {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    parentSite: string;
    parentProduct: string;
    status: string;
    launchDate: string;
  };
  branding: {
    logo: {
      primary: string;
      light: string;
      icon: string;
    };
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  navigation: {
    mainNav: NavItem[];
  };
  hero: {
    title: string;
    titleLine2?: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: string;
  };
  featureSections: FeatureSection[];
  whyChoose: WhyChooseSection;
  pricing: PricingSection;
  cta: CTASection;
  footer: FooterSection;
}

export function SubsitePage() {
  const { productSlug } = useParams<{ productSlug: string }>();

  const data = productSlug ? subsiteMap[productSlug] : null;

  if (!data) {
    return <Navigate to="/products" replace />;
  }

  const subsiteData = data as SubsiteData;

  return (
    <main
      style={
        {
          '--color-primary': subsiteData.branding.colors.primary,
          '--color-secondary': subsiteData.branding.colors.secondary,
        } as React.CSSProperties
      }
    >
      <SubsiteHeader
        siteName={subsiteData.site.name}
        siteSlug={subsiteData.site.slug}
        navigation={subsiteData.navigation.mainNav}
        primaryColor={subsiteData.branding.colors.primary}
      />

      <SubsiteHero
        title={subsiteData.hero.title}
        titleLine2={subsiteData.hero.titleLine2}
        description={subsiteData.hero.description}
        ctaText={subsiteData.hero.ctaText}
        ctaLink={subsiteData.hero.ctaLink}
        backgroundImage={subsiteData.hero.backgroundImage}
        primaryColor={subsiteData.branding.colors.primary}
      />

      <div id="features">
        {subsiteData.featureSections.map((section: FeatureSection) => (
          <SubsiteFeatureSection
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            features={section.features}
          />
        ))}
      </div>

      <SubsiteWhyChoose
        title={subsiteData.whyChoose.title}
        subtitle={subsiteData.whyChoose.subtitle}
        subtitleLine2={subsiteData.whyChoose.subtitleLine2}
        description={subsiteData.whyChoose.description}
        benefits={subsiteData.whyChoose.benefits}
      />

      <SubsitePricing
        title={subsiteData.pricing.title}
        subtitle={subsiteData.pricing.subtitle}
        subtitleLine2={subsiteData.pricing.subtitleLine2}
        plans={subsiteData.pricing.plans}
      />

      <SubsiteCTA
        title={subsiteData.cta.title}
        subtitle={subsiteData.cta.subtitle}
        description={subsiteData.cta.description}
        buttonText={subsiteData.cta.buttonText}
        buttonLink={subsiteData.cta.buttonLink}
      />

      <SubsiteFooter
        copyright={subsiteData.footer.copyright}
        links={subsiteData.footer.links}
        primaryColor={subsiteData.branding.colors.primary}
      />

      <BackToTop />
    </main>
  );
}
