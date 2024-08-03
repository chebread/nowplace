import StyledComponentsRegistry from '@/lib/registry';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from 'next-themes';
import GlobalStyle from '@/components/global-style';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://nowplace.kr/'),
  title: {
    template: '%s | NowPlace',
    default: '장소 저장소, NowPlace',
  },
  description: 'NowPlace는 장소를 저장하고 공유하는 위치 기반 서비스입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <StyledComponentsRegistry>
            <GlobalStyle />
            {children}
          </StyledComponentsRegistry>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
