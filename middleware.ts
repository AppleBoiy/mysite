import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './lib/i18n/settings';

function getLocale(request: NextRequest): string {
  // Check cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "en-US,en;q=0.9,ja;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().split('-')[0]);
    
    for (const lang of languages) {
      if (locales.includes(lang as any)) {
        return lang;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect locale from headers or cookies
  const locale = getLocale(request);
  
  // Redirect to localized path
  const response = NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
  
  // Set locale cookie for persistence
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
