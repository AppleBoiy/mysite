/**
 * Custom Project Pages Registry
 * 
 * Map project IDs to custom page components for full layout control.
 * If a project has a custom page, it will be used instead of the default template.
 * 
 * Benefits:
 * - Full creative freedom per project
 * - Custom layouts, animations, interactions
 * - No i18n constraints (can use any content structure)
 * - Can use any React/Next.js features
 * - Still benefits from routing and SEO
 */

import { Locale } from '@/lib/i18n/settings';
import PortfolioCustomPage from './custom/PortfolioCustomPage';
import DemoCustomPage from './custom/DemoCustomPage';

export interface CustomProjectPageProps {
  locale: Locale;
  projectId: string;
}

/**
 * Custom Project Page Component Type
 * 
 * Custom pages receive locale and projectId props.
 * They should use CustomPageLayout wrapper to maintain consistent structure
 * with navbar, breadcrumbs, and project header.
 * 
 * Example:
 * ```tsx
 * export default function MyCustomPage({ locale, projectId }: CustomProjectPageProps) {
 *   return (
 *     <CustomPageLayout locale={locale} projectId={projectId}>
 *       {/* Your custom content here *\/}
 *     </CustomPageLayout>
 *   );
 * }
 * ```
 */

// Registry of custom pages
export const customProjectPages: Record<string, React.ComponentType<CustomProjectPageProps>> = {
  // Custom portfolio page with unique layout
  'portfolio': PortfolioCustomPage,
  
  // Demo page showcasing maximum flexibility
  'demoProject': DemoCustomPage,
  
  // Add your custom pages here:
  // 'myproject': MyProjectCustomPage,
};

// Check if a project has a custom page
export function hasCustomPage(projectId: string): boolean {
  return projectId in customProjectPages;
}

// Get custom page component
export function getCustomPage(projectId: string): React.ComponentType<CustomProjectPageProps> | null {
  return customProjectPages[projectId] || null;
}
