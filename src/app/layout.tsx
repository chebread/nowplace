// 'use client' 없으면 Server component임

import { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/style/global.css';

export const viewport: Viewport = {
  themeColor: [
    // vaul 사용시 이거를 지정하지 않아서 주소창의 색상이 바뀌는 오류가 있음
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

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
          <Analytics debug={false} />
        </>
      </body>
    </html>
  );
}
