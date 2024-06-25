import localFont from 'next/font/local';
import { headers } from 'next/headers';

import { wagmiConfig } from '~/lib/viem';

import type { Metadata } from 'next';
import { cookieToInitialState } from 'wagmi';
import { Web3Provider } from '~/providers';
import '~/styles/globals.css';

import { Toaster } from '~/components/ui/sonner';

const sfPro = localFont({
  src: '../../public/sfPro.ttf',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'PiperPay',
  description:
    'PiperPay: Streamline Invoicing & Payments. Accept crypto (native tokens, ERC-20), fiat, or payment streams. Swap tokens on the fly. ',
  icons: [{ rel: 'icon', url: '/logo.svg' }],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get('cookie')
  );

  return (
    <html lang='en'>
      <body className={`font-sans ${sfPro.variable}`}>
        <Web3Provider initialState={initialState}>{children}</Web3Provider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
