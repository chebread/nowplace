// 1. 현재 위치 가져오기 -> kakao-map.tsx 에서 가져오기
// 1.1. 위치 실패시 또는 위치 거부시 ip로 현재 위치 가져오기
// 2. 위치를 가져오기 전까지는 로딩 페이지 출력함
// 3. 장소 추가하기는 하단부 클릭시 추가가능 (블링크 처럼)

'use client';

import KakaoMap from '@/components/kakao-map';
import { Drawer } from 'vaul';
import SvgLogo from '@/assets/icons/logo.svg';
import {
  StyledCopyright,
  StyledFooter,
  StyledFooterItem,
  StyledFooterLayout,
  StyledHeader,
  StyledLogo,
  StyledMain,
  StyledMap,
} from './home.css';

export default function Home() {
  const copyright = `© ${new Date().getFullYear()} Cha Haneum`;

  return (
    <StyledMain>
      {/* <StyledHeader>
        <SvgLogo />
      </StyledHeader> */}
      <StyledMap>
        <KakaoMap></KakaoMap>
      </StyledMap>
      <StyledFooterLayout>
        <StyledFooter>
          <StyledFooterItem>
            <StyledLogo>
              <SvgLogo />
            </StyledLogo>
            <StyledCopyright>{copyright}</StyledCopyright>
          </StyledFooterItem>
          <StyledFooterItem>hello</StyledFooterItem>
        </StyledFooter>
      </StyledFooterLayout>
    </StyledMain>
  );
}
