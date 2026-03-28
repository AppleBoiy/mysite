# Security Utilities

This directory contains security-related utilities for the Next.js portfolio application.

## Input Sanitization

The application implements comprehensive input sanitization to prevent XSS (Cross-Site Scripting) attacks, as required by **Requirement 14.2**.

### Implementation

Located in `lib/security/sanitize.ts`, the module provides two sanitization functions using [DOMPurify](https://github.com/cure53/DOMPurify):

#### `sanitizeInput(input: string): string`

Strips **all** HTML tags and attributes from user input. This is the primary function used for form inputs where no HTML should be allowed.

**Use cases:**
- Contact form fields (name, email, message)
- Search inputs
- Any user-provided text that should be plain text only

**Example:**
```typescript
import { sanitizeInput } from '@/lib/security/sanitize';

const userInput = 'John<script>alert("XSS")</script>Doe';
const safe = sanitizeInput(userInput);
// Result: "JohnDoe"
```

#### `sanitizeHTML(html: string): string`

Sanitizes HTML content while allowing only safe tags and attributes. This is used when some HTML formatting is needed.

**Allowed tags:** `b`, `i`, `em`, `strong`, `a`, `p`, `br`  
**Allowed attributes:** `href`, `target`, `rel`

**Use cases:**
- Rich text content
- User-generated content with basic formatting
- Comments or descriptions that allow limited HTML

**Example:**
```typescript
import { sanitizeHTML } from '@/lib/security/sanitize';

const userHTML = '<p>Hello</p><script>alert("XSS")</script>';
const safe = sanitizeHTML(userHTML);
// Result: "<p>Hello</p>"
```

### Current Usage

The sanitization is currently applied in:

1. **Contact Form** (`components/ContactSection.tsx`):
   - All form inputs (name, email, message) are sanitized before submission
   - Sanitization occurs in the `handleSubmit` function before sending data to the API

```typescript
const sanitizedData = {
  name: sanitizeInput(formData.name),
  email: sanitizeInput(formData.email),
  message: sanitizeInput(formData.message),
};
```

### Protection Against

The sanitization protects against various XSS attack vectors:

- ✅ Script injection: `<script>alert('XSS')</script>`
- ✅ Event handlers: `<img src=x onerror="alert('XSS')">`
- ✅ JavaScript protocol: `<a href="javascript:alert('XSS')">Click</a>`
- ✅ Data protocol: `<a href="data:text/html,<script>alert('XSS')</script>">Click</a>`
- ✅ Iframe injection: `<iframe src="evil.com"></iframe>`
- ✅ Object/Embed tags: `<object data="evil.swf"></object>`
- ✅ Style injection: `<style>body{display:none}</style>`
- ✅ Various tag casings: `<SCRIPT>`, `<ScRiPt>`, etc.

### Testing

Comprehensive unit tests are located in `lib/security/sanitize.test.ts` with 31 test cases covering:

- Basic XSS attack vectors
- Multiple attack attempts in one string
- Edge cases (empty strings, unicode, long strings)
- Real-world contact form scenarios
- Integration scenarios

Run tests with:
```bash
npm test
```

### Dependencies

- **isomorphic-dompurify** (v3.7.1): Provides DOMPurify for both browser and Node.js environments
  - Works seamlessly with Next.js SSR
  - Actively maintained and widely trusted
  - Used by major companies and projects

### Best Practices

1. **Always sanitize user input** before:
   - Storing in database
   - Sending to external APIs
   - Displaying to other users

2. **Use `sanitizeInput()` by default** for form fields unless you specifically need to allow HTML

3. **Sanitize on the client side** (as we do) for immediate feedback, but **always validate and sanitize on the server side** as well

4. **Never trust user input**, even if it looks safe

### Future Enhancements

Consider adding:
- Server-side sanitization in API routes
- Rate limiting for form submissions (Requirement 14.4)
- CSRF token validation
- Input length validation
- Email format validation with additional security checks

### Related Requirements

- **Requirement 14.2**: Sanitize user inputs in contact forms ✅
- **Requirement 14.1**: Implement Content Security Policy headers
- **Requirement 14.3**: Use HTTPS for all external resource requests
- **Requirement 14.4**: Implement rate limiting for API routes
- **Requirement 14.5**: Validate environment variables at build time
- **Requirement 14.6**: Prevent clickjacking with X-Frame-Options header
