import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['tr', 'en', 'ar'],

    // Used when no locale matches
    defaultLocale: 'tr',

    // Detect locale from browser specificities
    localeDetection: false
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(tr|en|ar)/:path*']
};
