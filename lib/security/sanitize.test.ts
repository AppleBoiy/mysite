import { describe, it, expect } from 'vitest';
import { sanitizeInput, sanitizeHTML } from './sanitize';

describe('Input Sanitization - Requirements 14.2', () => {
  describe('sanitizeInput', () => {
    it('should strip all HTML tags from input', () => {
      const maliciousInput = '<script>alert("XSS")</script>Hello';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Hello');
      expect(result).not.toContain('<script>');
    });

    it('should remove script tags with various casings', () => {
      const inputs = [
        '<SCRIPT>alert("XSS")</SCRIPT>Test',
        '<ScRiPt>alert("XSS")</ScRiPt>Test',
        '<script>alert("XSS")</script>Test',
      ];
      
      inputs.forEach(input => {
        const result = sanitizeInput(input);
        expect(result).toBe('Test');
        expect(result.toLowerCase()).not.toContain('script');
      });
    });

    it('should remove img tags with onerror handlers', () => {
      const maliciousInput = '<img src=x onerror="alert(\'XSS\')">Text';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Text');
      expect(result).not.toContain('<img');
      expect(result).not.toContain('onerror');
    });

    it('should remove iframe tags', () => {
      const maliciousInput = '<iframe src="evil.com"></iframe>Content';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Content');
      expect(result).not.toContain('<iframe');
    });

    it('should remove event handlers from tags', () => {
      const maliciousInput = '<div onclick="alert(\'XSS\')">Click me</div>';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Click me');
      expect(result).not.toContain('onclick');
    });

    it('should handle multiple XSS attempts in one string', () => {
      const maliciousInput = '<script>alert(1)</script><img src=x onerror=alert(2)><div onclick=alert(3)>Text</div>';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Text');
      expect(result).not.toContain('<');
      expect(result).not.toContain('alert');
    });

    it('should preserve plain text without HTML', () => {
      const plainText = 'Hello, this is a normal message!';
      const result = sanitizeInput(plainText);
      expect(result).toBe(plainText);
    });

    it('should handle empty strings', () => {
      const result = sanitizeInput('');
      expect(result).toBe('');
    });

    it('should handle strings with special characters', () => {
      const input = 'Email: test@example.com & phone: 123-456-7890';
      const result = sanitizeInput(input);
      expect(result).toBe(input);
    });

    it('should remove style tags', () => {
      const maliciousInput = '<style>body{display:none}</style>Text';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Text');
      expect(result).not.toContain('<style');
    });

    it('should remove link tags', () => {
      const maliciousInput = '<link rel="stylesheet" href="evil.css">Text';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Text');
      expect(result).not.toContain('<link');
    });

    it('should handle javascript: protocol in attributes', () => {
      const maliciousInput = '<a href="javascript:alert(\'XSS\')">Click</a>';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Click');
      expect(result).not.toContain('javascript:');
    });

    it('should handle data: protocol attempts', () => {
      const maliciousInput = '<a href="data:text/html,<script>alert(\'XSS\')</script>">Click</a>';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Click');
      expect(result).not.toContain('data:');
    });

    it('should remove object and embed tags', () => {
      const maliciousInput = '<object data="evil.swf"></object><embed src="evil.swf">Text';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Text');
      expect(result).not.toContain('<object');
      expect(result).not.toContain('<embed');
    });

    it('should handle encoded script tags', () => {
      const maliciousInput = '&lt;script&gt;alert("XSS")&lt;/script&gt;Text';
      const result = sanitizeInput(maliciousInput);
      // DOMPurify preserves already-encoded entities (they're safe as text)
      expect(result).toContain('Text');
      // The encoded entities are safe and remain as text
      expect(result).not.toContain('<script>');
    });

    it('should handle contact form name input', () => {
      const validName = 'John Doe';
      const maliciousName = 'John<script>alert("XSS")</script>Doe';
      
      expect(sanitizeInput(validName)).toBe(validName);
      expect(sanitizeInput(maliciousName)).toBe('JohnDoe');
    });

    it('should handle contact form email input', () => {
      const validEmail = 'user@example.com';
      const maliciousEmail = 'user@example.com<script>alert("XSS")</script>';
      
      expect(sanitizeInput(validEmail)).toBe(validEmail);
      expect(sanitizeInput(maliciousEmail)).toBe('user@example.com');
    });

    it('should handle contact form message input', () => {
      const validMessage = 'Hello, I would like to discuss a project.';
      const maliciousMessage = 'Hello<script>alert("XSS")</script>, I would like to discuss a project.';
      
      expect(sanitizeInput(validMessage)).toBe(validMessage);
      expect(sanitizeInput(maliciousMessage)).toBe('Hello, I would like to discuss a project.');
    });

    it('should handle SQL injection attempts (though backend should also validate)', () => {
      const sqlInjection = "'; DROP TABLE users; --";
      const result = sanitizeInput(sqlInjection);
      // Should preserve the text but remove any HTML
      expect(result).toBe(sqlInjection);
    });

    it('should handle very long strings', () => {
      const longString = 'A'.repeat(10000);
      const result = sanitizeInput(longString);
      expect(result).toBe(longString);
      expect(result.length).toBe(10000);
    });

    it('should handle unicode characters', () => {
      const unicodeInput = 'Hello 世界 🌍 مرحبا';
      const result = sanitizeInput(unicodeInput);
      expect(result).toBe(unicodeInput);
    });

    it('should handle newlines and whitespace', () => {
      const input = 'Line 1\nLine 2\n\nLine 3';
      const result = sanitizeInput(input);
      expect(result).toBe(input);
    });
  });

  describe('sanitizeHTML', () => {
    it('should allow safe HTML tags', () => {
      const safeHTML = '<p>This is <strong>bold</strong> and <em>italic</em> text.</p>';
      const result = sanitizeHTML(safeHTML);
      expect(result).toContain('<p>');
      expect(result).toContain('<strong>');
      expect(result).toContain('<em>');
    });

    it('should remove script tags from HTML', () => {
      const maliciousHTML = '<p>Text</p><script>alert("XSS")</script>';
      const result = sanitizeHTML(maliciousHTML);
      expect(result).toContain('<p>');
      expect(result).not.toContain('<script>');
    });

    it('should allow links with safe attributes', () => {
      const htmlWithLink = '<a href="https://example.com" target="_blank" rel="noopener">Link</a>';
      const result = sanitizeHTML(htmlWithLink);
      expect(result).toContain('<a');
      expect(result).toContain('href');
      expect(result).toContain('target');
      expect(result).toContain('rel');
    });

    it('should remove dangerous attributes from allowed tags', () => {
      const maliciousHTML = '<a href="javascript:alert(\'XSS\')" onclick="alert(\'XSS\')">Click</a>';
      const result = sanitizeHTML(maliciousHTML);
      expect(result).not.toContain('javascript:');
      expect(result).not.toContain('onclick');
    });

    it('should allow line breaks', () => {
      const htmlWithBreaks = 'Line 1<br>Line 2<br>Line 3';
      const result = sanitizeHTML(htmlWithBreaks);
      expect(result).toContain('<br>');
    });

    it('should remove disallowed tags', () => {
      const htmlWithDisallowed = '<p>Text</p><div>More text</div><span>Even more</span>';
      const result = sanitizeHTML(htmlWithDisallowed);
      expect(result).toContain('<p>');
      expect(result).not.toContain('<div>');
      expect(result).not.toContain('<span>');
    });
  });

  describe('Integration scenarios', () => {
    it('should handle real-world contact form submission', () => {
      const formData = {
        name: 'John<script>alert("XSS")</script>Doe',
        email: 'john@example.com<img src=x onerror=alert(1)>',
        message: 'I would like to <script>steal()</script> discuss a project.',
      };

      const sanitized = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message),
      };

      expect(sanitized.name).toBe('JohnDoe');
      expect(sanitized.email).toBe('john@example.com');
      expect(sanitized.message).toBe('I would like to  discuss a project.');
      
      // Verify no malicious content remains
      Object.values(sanitized).forEach(value => {
        expect(value).not.toContain('<script');
        expect(value).not.toContain('onerror');
        expect(value).not.toContain('alert');
      });
    });

    it('should handle edge case: only malicious content', () => {
      const onlyMalicious = '<script>alert("XSS")</script>';
      const result = sanitizeInput(onlyMalicious);
      expect(result).toBe('');
    });

    it('should handle mixed content with legitimate HTML entities', () => {
      const input = 'Price: $100 &amp; up';
      const result = sanitizeInput(input);
      expect(result).toContain('$100');
      expect(result).toContain('&');
    });
  });
});
