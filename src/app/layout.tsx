import { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/style/global.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://nowplace.kr/'),
  title: {
    template: '%s | NowPlace',
    default: '장소 저장소 | NowPlace',
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
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <div vaul-drawer-wrapper="">{children}</div>
        </StyledComponentsRegistry>
        <Analytics debug={false} />
      </body>
    </html>
  );
}
