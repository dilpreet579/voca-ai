import { Inter, Poppins } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

// Load Special Gothic Expanded One as a local font
export const specialGothic = localFont({
  src: '../../public/fonts/SpecialGothicExpandedOne.woff2',
  variable: '--font-special-gothic',
  display: 'swap',
});
