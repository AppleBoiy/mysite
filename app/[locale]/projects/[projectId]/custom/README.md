# Custom Project Pages

This directory contains fully custom project pages that provide maximum creative freedom while maintaining consistent site structure.

## Why Custom Pages?

Every project has a unique story. Custom pages let you:

- **Full Content Control**: Design any content layout without template constraints
- **Consistent Structure**: Navbar, breadcrumbs, header, and action buttons maintained automatically
- **Custom Animations**: Use Framer Motion, GSAP, or any animation library
- **Interactive Elements**: Add 3D graphics, interactive demos, videos
- **No i18n Constraints**: Use any content structure you want in the content area
- **Unique Storytelling**: Tell your project's story your way
- **Performance Optimization**: Optimize specifically for that project

## How to Create a Custom Page

### 1. Create Your Component

Create a new file in this directory and use the `CustomPageLayout` wrapper:

```tsx
// app/[locale]/projects/[projectId]/custom/MyProjectPage.tsx
'use client';

import type { CustomProjectPageProps } from '../custom-pages';
import CustomPageLayout from './CustomPageLayout';

export default function MyProjectPage({ locale, projectId }: CustomProjectPageProps) {
  return (
    <CustomPageLayout locale={locale} projectId={projectId}>
      {/* Your custom content here - full creative freedom! */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-6">My Custom Section</h2>
        <p>Your unique content...</p>
      </section>
    </CustomPageLayout>
  );
}
```

### 2. Register in custom-pages.ts

```typescript
// app/[locale]/projects/[projectId]/custom-pages.ts
import MyProjectPage from './custom/MyProjectPage';

export const customProjectPages: Record<string, React.ComponentType<CustomProjectPageProps>> = {
  'myproject': MyProjectPage,
  // Add more custom pages here
};
```

### 3. That's it!

Visit `/en/projects/myproject` and your custom page will render with:
- ✅ Navbar with theme toggle and language switcher
- ✅ Breadcrumbs navigation
- ✅ Project header with title, subtitle, metadata
- ✅ View Code and Live Demo buttons
- ✅ Table of contents sidebar (if tocSections provided)
- ✅ Your custom content area

## Table of Contents

Add a table of contents sidebar to your custom page:

```tsx
export default function MyProjectPage({ locale, projectId }: CustomProjectPageProps) {
  // Define TOC sections - must match section IDs in your content
  const tocSections = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'features', title: 'Features', level: 1 },
    { id: 'installation', title: 'Installation', level: 1 },
    { id: 'usage', title: 'Usage', level: 1 },
  ];

  return (
    <CustomPageLayout locale={locale} projectId={projectId} tocSections={tocSections}>
      <section id="overview" className="py-12 scroll-mt-24">
        <h2>Overview</h2>
        {/* Content */}
      </section>
      
      <section id="features" className="py-12 scroll-mt-24">
        <h2>Features</h2>
        {/* Content */}
      </section>
      
      {/* More sections... */}
    </CustomPageLayout>
  );
}
```

**Important:**
- Add `id` attribute to each section that matches the TOC section id
- Add `scroll-mt-24` class to account for fixed header
- TOC automatically tracks active section and shows reading progress
- TOC is hidden on mobile/tablet, visible on xl screens

## CustomPageLayout Props

```typescript
interface TOCSection {
  id: string;      // Must match the section id in your HTML
  title: string;   // Display name in TOC
  level: number;   // 1 for main sections, 2 for subsections
}

interface CustomPageLayoutProps {
  locale: Locale;              // Current language
  projectId: string;           // Project ID from URL
  children: ReactNode;         // Your custom content
  hideHeader?: boolean;        // Optional: hide the default header
  customBreadcrumbLabel?: string; // Optional: override breadcrumb text
  tocSections?: TOCSection[];  // Optional: table of contents sections
}
```

## What You Get Automatically

### Standard Layout Elements
- Navbar with theme toggle, language switcher, and navigation
- Breadcrumbs (Home > Projects > Your Project)
- Project header with:
  - Title and subtitle from translations
  - Private project badge (if applicable)
  - Period/date metadata
  - Organization and role
  - View Code button (links to GitHub/Gist/etc)
  - Live Demo button (if demo URL exists)

### What You Customize
Everything inside the `<CustomPageLayout>` wrapper is yours to design:
- Content sections
- Images and galleries
- Code blocks and terminal output
- Tables and data visualizations
- Math equations
- Interactive demos
- Animations and transitions
- Any React components you want

## Examples

### Basic Custom Content
```tsx
<CustomPageLayout locale={locale} projectId={projectId}>
  <section className="py-12">
    <h2 className="text-3xl font-bold mb-6">Overview</h2>
    <p className="text-muted-foreground">Your content...</p>
  </section>
</CustomPageLayout>
```

### Hide Default Header
```tsx
<CustomPageLayout locale={locale} projectId={projectId} hideHeader>
  {/* Completely custom header and content */}
  <div className="py-12">
    <h1 className="text-6xl">My Custom Header</h1>
  </div>
</CustomPageLayout>
```

### Split Layout with Image
```tsx
<CustomPageLayout locale={locale} projectId={projectId}>
  <div className="grid lg:grid-cols-2 gap-12 py-12">
    <div>
      <h2 className="text-3xl font-bold mb-4">Features</h2>
      <p>Description...</p>
    </div>
    <div className="relative aspect-video">
      <Image src="/demo.png" alt="Demo" fill />
    </div>
  </div>
</CustomPageLayout>
```

### Custom Tables
```tsx
<CustomPageLayout locale={locale} projectId={projectId}>
  <section className="py-12">
    <h2 className="text-3xl font-bold mb-6">Performance</h2>
    <table className="w-full">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Build Time</td>
          <td>2.3s</td>
        </tr>
      </tbody>
    </table>
  </section>
</CustomPageLayout>
```

### Math Equations
```tsx
<CustomPageLayout locale={locale} projectId={projectId}>
  <section className="py-12">
    <h2 className="text-3xl font-bold mb-6">Algorithm</h2>
    <div className="bg-muted rounded-xl p-6 font-mono text-center">
      x = (-b ± √(b² - 4ac)) / 2a
    </div>
  </section>
</CustomPageLayout>
```

## Real Examples

- `PortfolioCustomPage.tsx` - Portfolio page with features grid and screenshots
- `DemoCustomPage.tsx` - Comprehensive showcase with:
  - Images positioned anywhere (split layouts, galleries)
  - Math equations (LaTeX-style formatting)
  - Custom tables (performance comparisons, feature matrices)
  - Code blocks with syntax highlighting
  - Terminal output examples
  - Mixed content layouts
  - Animations and interactions

Visit `/en/projects/demoProject` to see the demo page in action!

## Best Practices

1. **Use the Layout Wrapper**: Always wrap your content in `CustomPageLayout` for consistency
2. **Keep it Fast**: Optimize images, lazy load heavy components
3. **Mobile First**: Design for mobile, enhance for desktop
4. **Accessibility**: Add proper ARIA labels and keyboard navigation
5. **SEO**: Use proper heading hierarchy (h2, h3, etc.) in your content
6. **Fallback**: Keep project data in `data/projects.ts` for cards/lists

## When to Use Custom vs Template

**Use Custom Page When:**
- Project needs unique visual storytelling
- Want to showcase interactive demos
- Need custom animations or effects
- Want to experiment with new layouts
- Project is a major portfolio piece

**Use Default Template When:**
- Standard project documentation is sufficient
- Want consistency across projects
- Need quick setup
- i18n is important for that project

## Tips

- Start with the template, customize when needed
- Reuse components from `/components` directory
- Share common custom components in this directory
- Test on multiple devices and browsers
- Consider loading performance
- The layout handles navbar, breadcrumbs, and header - focus on your content!
