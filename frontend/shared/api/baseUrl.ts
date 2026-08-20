const isProd = process.env.NODE_ENV === 'production';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || (isProd ? '' : 'http://localhost:5000');
