// 'use client' 없으면 Server component임

import StyledComponentsRegistry from '@/lib/registry';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from 'next-themes';
import GlobalStyle from '@/style/global.css';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://nowplace.kr/'),
  title: {
    template: '%s | NowPlace',
    default: '장소 저장소, NowPlace',
  },
  description: 'NowPlace는 장소를 저장하고 공유하는 위치 기반 서비스입니다.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="16x16" />
      </head>
      <body suppressHydrationWarning>
        {/* Warning: Extra attributes from the server: cz-shortcut-listen */}
        <>
          {/* ThemeProvider */}
          <StyledComponentsRegistry>
            <GlobalStyle />
            <Toaster
              // theme="system"

              visibleToasts={3}
              position="top-center"
              toastOptions={{ className: 'toaster', duration: 3000 }}
            />
            <div vaul-drawer-wrapper="">{children}</div>
            {/* vaul의 shouldScaleBackground를 사용하기 위해서는 vaul-drawer-wrapper가 필요함 */}
          </StyledComponentsRegistry>
          <Analytics />
        </>
      </body>
    </html>
  );
}
