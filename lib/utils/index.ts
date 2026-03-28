/**
 * Create a URL-friendly page path from a page name
 * @param pageName - The page name to convert
 * @returns URL path with spaces replaced by hyphens
 * @example createPageUrl("My Page") => "/my-page"
 */
export function createPageUrl(pageName: string): string {
  return '/' + pageName.replace(/ /g, '-');
}
