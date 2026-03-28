import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes user input by stripping all HTML tags and attributes
 * Used for form inputs where no HTML should be allowed
 */
export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Strip all HTML
    ALLOWED_ATTR: []
  });
}

/**
 * Sanitizes HTML content allowing only safe tags
 * Used when some HTML formatting is needed
 */
export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
}
