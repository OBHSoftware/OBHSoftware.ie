# Data Structure Documentation

This document describes the JSON-driven data architecture used by the Quantum Harbour website and its subsites.

## Overview

The site uses a manifest-based architecture where all content, configuration, and structure are defined in JSON files. This enables:

- **Content Management**: Update site content without code changes
- **Multi-site Support**: Run multiple product subsites from shared components
- **Future API Integration**: Designed for a future admin portal that fetches these JSONs via API

## File Structure

```
src/data/
├── manifest.json           # Main site manifest (master config)
├── navigation.json         # Navigation menus
├── services.json           # Services section content
├── extendedServices.json   # Additional services
├── pricing.json            # Pricing plans
├── products.json           # Products listing
├── sectors.json            # Industry sectors
├── caseStudies.json        # Case studies
├── testimonials.json       # Customer testimonials
├── partners.json           # Partner companies
├── faqs.json               # FAQ content
├── blog.json               # Blog/insights posts
├── resources.json          # Downloadable resources
├── careers.json            # Job listings
├── about.json              # About section
├── whyUs.json              # Why choose us content
├── clientPortal.json       # Client portal info
├── process.json            # How we work process
└── subsites/
    ├── qmechanic.json      # qMechanic subsite manifest
    ├── qhaul.json          # qHaul subsite manifest
    ├── qmechanic/          # qMechanic page data files
    │   ├── faq.json
    │   ├── features.json
    │   ├── integrations.json
    │   └── testimonials.json
    └── qhaul/              # qHaul page data files
        ├── faq.json
        ├── features.json
        └── roadmap.json
```

## Main Site Manifest

**File**: `src/data/manifest.json`

The master configuration file that defines the entire site structure.

### Structure

```json
{
  "$schema": "./manifest.schema.json",
  "version": "1.0.0",
  "lastUpdated": "2024-11-28T00:00:00Z",

  "site": {
    "id": "quantum-harbour",
    "name": "Quantum Harbour",
    "tagline": "Proactive IT that keeps your business running day and night.",
    "domain": "quantumharbour.ie",
    "locale": "en-IE",
    "timezone": "Europe/Dublin"
  },

  "branding": {
    "logo": {
      "primary": "/logo.svg",
      "light": "/logo-light.svg",
      "dark": "/logo-dark.svg",
      "favicon": "/favicon.ico"
    },
    "colors": {
      "primary": "#072a59",
      "secondary": "#190d4e",
      "accent": "#d9d9d9",
      "success": "#22c55e",
      "warning": "#fbbf24",
      "error": "#ef4444",
      "text": {
        "primary": "#ffffff",
        "secondary": "rgba(255, 255, 255, 0.8)",
        "muted": "rgba(255, 255, 255, 0.6)"
      },
      "background": {
        "primary": "#072a59",
        "secondary": "#190d4e",
        "card": "rgba(255, 255, 255, 0.05)"
      }
    },
    "fonts": {
      "heading": "Space Grotesk",
      "body": "Work Sans"
    }
  },

  "navigation": {
    "dataFile": "navigation.json",
    "mainNav": [...],
    "footerSections": ["quickLinks", "resources", "sectors", "clients"]
  },

  "pages": {
    "home": {
      "path": "/",
      "title": "Quantum Harbour - Managed IT Services",
      "sections": ["hero", "services", "extendedServices", "whyUs", "pricing", "testimonials", "about", "contact"],
      "dataFiles": {
        "services": "services.json",
        "pricing": "pricing.json"
      }
    },
    "products": {
      "path": "/products",
      "title": "Our Products",
      "dataFile": "products.json",
      "detailPath": "/products/:slug",
      "subsitePath": "/products/:slug/site"
    }
  },

  "subsites": [
    {
      "id": "qmechanic",
      "slug": "qmechanic",
      "name": "qMechanic",
      "path": "/products/qmechanic/site",
      "manifestFile": "subsites/qmechanic.json",
      "status": "active"
    }
  ],

  "contact": {...},
  "seo": {...},
  "legal": {...}
}
```

### Key Sections

| Section | Purpose |
|---------|---------|
| `site` | Core site identity (name, domain, locale) |
| `branding` | Logos, color palette, typography |
| `navigation` | Menu structure and data file reference |
| `pages` | All pages with paths, titles, and data file locations |
| `subsites` | Product microsites with their manifest locations |
| `contact` | Contact information and social links |
| `seo` | Default SEO metadata |
| `legal` | Company registration and legal page paths |

## Navigation Data

**File**: `src/data/navigation.json`

Defines all navigation menus including dropdown support.

```json
{
  "mainNav": [
    { "label": "Services", "href": "/#services" },
    { "label": "Pricing", "href": "/#pricing" },
    {
      "label": "Resources",
      "href": "/resources",
      "dropdown": [
        { "label": "Case Studies", "href": "/case-studies" },
        { "label": "Insights", "href": "/insights" },
        { "label": "FAQ", "href": "/faq" }
      ]
    },
    { "label": "Contact", "href": "/#contact" }
  ],
  "footerLinks": {
    "quickLinks": [...],
    "resources": [...],
    "sectors": [...],
    "clients": [...]
  }
}
```

### Navigation Item Types

- **Anchor links**: `/#section` - Scrolls to section on home page
- **Page links**: `/page` - Navigates to a page
- **Dropdown items**: Include `dropdown` array for sub-items

## Subsite Manifests

**Files**: `src/data/subsites/*.json`

Each product subsite has its own manifest defining its complete configuration, including navigation, pages, and references to data files.

### Structure

```json
{
  "$schema": "../subsite.schema.json",
  "version": "1.1.0",
  "lastUpdated": "2024-11-28T00:00:00Z",

  "site": {
    "id": "qmechanic",
    "slug": "qmechanic",
    "name": "qMechanic",
    "tagline": "HGV Inspection & Job Card Platform",
    "parentSite": "quantum-harbour",
    "parentProduct": "qmechanic",
    "status": "available",
    "launchDate": "2024-01-01"
  },

  "branding": {
    "logo": {
      "primary": "/products/qmechanic/logo.svg",
      "light": "/products/qmechanic/logo-light.svg",
      "icon": "/products/qmechanic/icon.svg"
    },
    "colors": {
      "primary": "#072a59",
      "secondary": "#190d4e",
      "accent": "#d9d9d9"
    }
  },

  "seo": {
    "title": "qMechanic - HGV Inspection & Job Card Platform",
    "description": "...",
    "keywords": [...]
  },

  "navigation": {
    "mainNav": [
      { "label": "Features", "href": "#features" },
      { "label": "Pricing", "href": "#pricing" },
      { "label": "FAQ", "href": "/faq" },
      { "label": "Contact", "href": "#contact" }
    ]
  },

  "pages": {
    "home": {
      "path": "/",
      "title": "qMechanic - HGV Inspection & Job Card Platform",
      "sections": ["hero", "features", "whyChoose", "pricing", "testimonials", "cta"]
    },
    "faq": {
      "path": "/faq",
      "title": "Frequently Asked Questions",
      "dataFile": "faq.json"
    },
    "features": {
      "path": "/features",
      "title": "Features",
      "dataFile": "features.json"
    },
    "integrations": {
      "path": "/integrations",
      "title": "Integrations",
      "dataFile": "integrations.json"
    }
  },

  "dataFiles": {
    "faq": "qmechanic/faq.json",
    "features": "qmechanic/features.json",
    "integrations": "qmechanic/integrations.json",
    "testimonials": "qmechanic/testimonials.json"
  },

  "hero": {
    "title": "Streamline your transport operations —",
    "titleLine2": "inspections and job cards in one place.",
    "description": "...",
    "ctaText": "Get Started Free",
    "ctaLink": "#pricing",
    "backgroundImage": "https://..."
  },

  "featureSections": [...],
  "whyChoose": {...},
  "pricing": {...},
  "cta": {...},
  "footer": {...},
  "contact": {...},
  "externalLinks": {...}
}
```

### Key Subsite Sections

| Section | Purpose |
|---------|---------|
| `site` | Subsite identity and relationship to parent |
| `branding` | Logos and color scheme (can override parent) |
| `seo` | SEO metadata for the subsite |
| `navigation` | Subsite-specific navigation menu |
| `pages` | Page definitions with paths and data file references |
| `dataFiles` | Map of data file locations for each page type |
| `hero`, `featureSections`, etc. | Home page content sections |
| `footer` | Subsite footer with copyright and links |
| `contact` | Contact emails and demo booking URLs |
| `externalLinks` | Links to app stores, web app, documentation |

### Subsite Status Values

| Status | Description |
|--------|-------------|
| `available` | Product is live and available |
| `coming-soon` | Product is in development |

### Subsite Routes

Subsites are mounted under `/products/:slug/site/` with the following route structure:

| Route | Component | Description |
|-------|-----------|-------------|
| `/products/:slug/site` | SubsitePage | Home page with all sections |
| `/products/:slug/site/faq` | SubsiteFAQPage | FAQ page from `faq.json` |
| `/products/:slug/site/features` | SubsiteFeaturesPage | Features page from `features.json` |

### Subsite Navigation

Each subsite has its own fixed header with navigation. The `SubsiteHeader` component:
- Displays the Quantum Harbour logo linking to the main site
- Shows the subsite name linking to the subsite home
- Renders navigation items from `navigation.mainNav` in the manifest
- Supports anchor links (`#section`) that scroll on the subsite home page
- Supports page links (`/faq`) that navigate to subsite sub-pages
- Includes mobile hamburger menu for responsive design
- Uses the subsite's primary color for styling

## Subsite Data Files

Each subsite can have its own data files for dedicated pages. These are stored in `src/data/subsites/{subsite-slug}/`.

### Subsite FAQ (`{slug}/faq.json`)

```json
{
  "title": "Frequently Asked Questions",
  "subtitle": "Everything you need to know about qMechanic",
  "categories": [
    {
      "name": "Getting Started",
      "faqs": [
        {
          "question": "How do I get started?",
          "answer": "Getting started is easy. Sign up for a free trial..."
        }
      ]
    },
    {
      "name": "Pricing & Support",
      "faqs": [...]
    }
  ]
}
```

### Subsite Features (`{slug}/features.json`)

```json
{
  "title": "Features",
  "subtitle": "Everything you need to manage operations",
  "hero": {
    "title": "Powerful Features for Modern Workshops",
    "description": "Explore our comprehensive feature set..."
  },
  "featureCategories": [
    {
      "id": "inspections",
      "title": "Inspections",
      "icon": "clipboard",
      "description": "Complete digital inspection system",
      "features": [
        {
          "title": "Walk Around Checks",
          "description": "Quick daily vehicle checks...",
          "details": [
            "Configurable check items",
            "Mandatory photo requirements",
            "GPS location stamping"
          ]
        }
      ]
    }
  ]
}
```

### Subsite Integrations (`{slug}/integrations.json`)

```json
{
  "title": "Integrations",
  "subtitle": "Connect with your existing systems",
  "hero": {
    "title": "Works With Your Existing Tools",
    "description": "..."
  },
  "categories": [
    {
      "id": "accounting",
      "title": "Accounting & Invoicing",
      "description": "Sync with your accounting software",
      "integrations": [
        {
          "name": "Sage",
          "logo": "/integrations/sage.svg",
          "description": "Export invoices and sync customer data...",
          "features": ["Invoice export", "Customer sync"],
          "status": "available"
        }
      ]
    }
  ],
  "api": {
    "title": "Developer API",
    "description": "Build custom integrations...",
    "features": [...],
    "documentationUrl": "https://docs.example.com/api"
  }
}
```

### Subsite Roadmap (`{slug}/roadmap.json`)

For "coming-soon" products, a roadmap shows development progress:

```json
{
  "title": "Product Roadmap",
  "subtitle": "Our development timeline",
  "hero": {
    "title": "Building the Future",
    "description": "..."
  },
  "currentPhase": "beta",
  "phases": [
    {
      "id": "alpha",
      "name": "Alpha Development",
      "status": "completed",
      "dateRange": "Q3 2024",
      "description": "Core platform development",
      "milestones": [
        {
          "title": "Core Job Management",
          "description": "Basic job booking and tracking",
          "status": "completed"
        }
      ]
    },
    {
      "id": "beta",
      "name": "Beta Testing",
      "status": "in-progress",
      "dateRange": "Q1 2025",
      "milestones": [...]
    }
  ],
  "requestFeature": {
    "title": "Have a Feature Request?",
    "description": "...",
    "ctaText": "Submit Feature Request",
    "ctaLink": "/#contact"
  }
}
```

### Subsite Testimonials (`{slug}/testimonials.json`)

```json
{
  "title": "What Our Customers Say",
  "subtitle": "Trusted by companies across Ireland",
  "testimonials": [
    {
      "quote": "This has transformed how we manage inspections...",
      "author": "Michael O'Brien",
      "role": "Fleet Manager",
      "company": "O'Brien Transport Ltd",
      "location": "Cork",
      "image": "/testimonials/michael-obrien.jpg",
      "stats": {
        "vehicles": "45",
        "timeSaved": "15 hours/week"
      }
    }
  ],
  "stats": {
    "title": "Trusted Across Ireland",
    "items": [
      { "value": "500+", "label": "Companies" },
      { "value": "99.9%", "label": "Uptime" }
    ]
  }
}
```

## Main Site Page Data Files

Each page type has its own data file structure:

### Services (`services.json`)

```json
{
  "title": "Our Services",
  "subtitle": "What we offer",
  "services": [
    {
      "icon": "shield",
      "title": "Cybersecurity",
      "description": "...",
      "link": "/services/cybersecurity"
    }
  ]
}
```

### Pricing (`pricing.json`)

```json
{
  "title": "Transparent Pricing",
  "plans": [
    {
      "name": "Starter",
      "price": "€499",
      "period": "/month",
      "features": [...],
      "highlighted": true,
      "ctaText": "Get Started",
      "ctaLink": "/#contact"
    }
  ]
}
```

### Products (`products.json`)

```json
{
  "title": "Our Products",
  "products": [
    {
      "id": "qmechanic",
      "name": "qMechanic",
      "slug": "qmechanic",
      "tagline": "HGV Inspection & Job Card Platform",
      "status": "available",
      "description": "...",
      "features": [...],
      "benefits": [...],
      "stats": [
        { "value": "500+", "label": "Vehicles Inspected" }
      ]
    }
  ]
}
```

### Blog/Insights (`blog.json`)

```json
{
  "title": "Insights & Articles",
  "posts": [
    {
      "id": "1",
      "slug": "cybersecurity-trends-2024",
      "title": "Cybersecurity Trends for 2024",
      "excerpt": "...",
      "content": "Full markdown content...",
      "author": "John Smith",
      "date": "2024-01-15",
      "readTime": "5 min",
      "category": "Cybersecurity",
      "image": "/blog/cybersecurity-trends.jpg"
    }
  ]
}
```

## How Components Consume Data

### Direct Import

Components import JSON files directly:

```tsx
import servicesData from '../data/services.json';

export function ServicesSection() {
  return (
    <Section>
      <SectionHeader title={servicesData.title} />
      {servicesData.services.map(service => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </Section>
  );
}
```

### Dynamic Routing

Pages with dynamic routes use URL parameters to find data:

```tsx
import productsData from '../data/products.json';

export function ProductDetailPage() {
  const { slug } = useParams();
  const product = productsData.products.find(p => p.slug === slug);

  if (!product) return <Navigate to="/products" />;

  return <ProductDetail product={product} />;
}
```

### Subsite Rendering

Subsites are rendered from their manifest files. The home page uses inline content from the manifest:

```tsx
import qmechanicData from '../data/subsites/qmechanic.json';
import qhaulData from '../data/subsites/qhaul.json';

const subsiteMap = {
  qmechanic: qmechanicData,
  qhaul: qhaulData,
};

export function SubsitePage() {
  const { productSlug } = useParams();
  const data = subsiteMap[productSlug];

  return (
    <main>
      <SubsiteHero {...data.hero} siteName={data.site.name} />
      {data.featureSections.map(section => (
        <SubsiteFeatureSection key={section.id} {...section} />
      ))}
    </main>
  );
}
```

Subsite sub-pages import both the manifest and page-specific data files:

```tsx
// Import manifests and page data
import qmechanicManifest from '../../data/subsites/qmechanic.json';
import qhaulManifest from '../../data/subsites/qhaul.json';
import qmechanicFaq from '../../data/subsites/qmechanic/faq.json';
import qhaulFaq from '../../data/subsites/qhaul/faq.json';

const subsiteMap = {
  qmechanic: { manifest: qmechanicManifest, faq: qmechanicFaq },
  qhaul: { manifest: qhaulManifest, faq: qhaulFaq },
};

export function SubsiteFAQPage() {
  const { productSlug } = useParams();
  const data = subsiteMap[productSlug];
  const { manifest, faq } = data;

  return (
    <main style={{ '--color-primary': manifest.branding.colors.primary }}>
      <Section>
        <h1>{faq.title}</h1>
        {faq.categories.map(category => (
          <FAQCategory key={category.name} {...category} />
        ))}
      </Section>
      <SubsiteFooter {...manifest.footer} />
    </main>
  );
}
```

## Future API Integration

The manifest structure is designed for future admin portal integration:

1. **Fetch Main Manifest**: Get site structure and discover all data files
2. **Fetch Page Data**: Load individual data files as needed
3. **Fetch Subsite Manifests**: Load product microsites independently
4. **Update Content**: POST changes back to update JSONs

### Example API Flow

```
GET /api/manifest
  → Returns main manifest with all data file locations

GET /api/data/services
  → Returns services.json content

GET /api/subsites/qmechanic
  → Returns qmechanic subsite manifest

PUT /api/data/services
  → Updates services.json with new content
```

## Adding New Content

### Adding a New Page

1. Create data file: `src/data/newpage.json`
2. Add page to manifest: `manifest.json → pages.newPage`
3. Create page component that imports the data
4. Add route to `App.tsx`

### Adding a New Subsite

1. Create manifest: `src/data/subsites/newproduct.json`
   - Include `site`, `branding`, `seo`, `navigation`, `pages`, `dataFiles` sections
   - Define home page content: `hero`, `featureSections`, `whyChoose`, `pricing`, `cta`, `footer`
2. Create data files directory: `src/data/subsites/newproduct/`
   - Add page data files: `faq.json`, `features.json`, etc.
3. Add to main manifest: `manifest.json → subsites[]`
4. Import in `SubsitePage.tsx` and add to `subsiteMap`
5. Import data files in subsite page components (e.g., `SubsiteFAQPage.tsx`)
6. Add product to `products.json` for listing page

### Adding a New Subsite Page Type

1. Create data file in subsite directory: `src/data/subsites/{slug}/newpage.json`
2. Add page to subsite manifest: `pages.newPage` and `dataFiles.newPage`
3. Create page component: `src/pages/subsite/SubsiteNewPage.tsx`
4. Export from `src/pages/subsite/index.ts`
5. Add route to `App.tsx`: `/products/:productSlug/site/newpage`
6. Import the data file and add to the page's `subsiteMap`

### Adding Navigation Items

Edit `navigation.json`:

```json
{
  "mainNav": [
    { "label": "New Page", "href": "/new-page" },
    {
      "label": "Dropdown",
      "href": "/dropdown",
      "dropdown": [
        { "label": "Sub Item", "href": "/dropdown/sub" }
      ]
    }
  ]
}
```

## Best Practices

1. **Version Control**: Always increment `version` when making significant changes
2. **Update Timestamps**: Set `lastUpdated` when modifying manifests
3. **Consistent IDs**: Use slug-style IDs (lowercase, hyphenated)
4. **Status Tracking**: Use `status` field for feature availability
5. **SEO Completeness**: Always include full SEO metadata
6. **Link Validation**: Ensure all `href` values point to valid routes
