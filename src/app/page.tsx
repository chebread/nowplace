// 1. 현재 위치 가져오기 -> kakao-map.tsx 에서 가져오기
// 1.1. 위치 실패시 또는 위치 거부시 ip로 현재 위치 가져오기
// 2. 위치를 가져오기 전까지는 로딩 페이지 출력함
// 3. 장소 추가하기는 하단부 클릭시 추가가능 (블링크 처럼)
// 로직 간소화 하기

// 1. 로그인 / 데이터 로드하기 => 로딩화면
// 2. 지도 띄우기
// 2. 현재위치 마커가 돌아가면서 현재위치 구함

'use client';

import KakaoMap from '@/components/kakao-map';
import { Drawer } from 'vaul';
import SvgLogo from '@/assets/icons/logo.svg';
import {
  DrawerContent,
  DrawerContents,
  DrawerHandleBar,
  DrawerModal,
  DrawerOverlay,
  StyledCopyright,
  StyledFooter,
  StyledFooterItem,
  StyledFooterLayout,
  StyledFooterSettingsBtn,
  StyledHeader,
  StyledLogo,
  StyledMain,
  StyledMap,
} from './home.css';
import styled from 'styled-components';
import { DrawerTitle } from '../utils/test/test.css';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export default function Home() {
  const copyright = `© ${new Date().getFullYear()} Cha Haneum`;
  const defaultLevel = 5; // 상수 선언 => 추후 변경값이면 useRef로 Wrapping 하기
  const defaultCenter = { lat: 36.3677, lng: 127.4365 };
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  };
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const [mounted, setMounted] = useState<boolean>();

  const showSuccess = (coords: any) => {
    const { latitude, longitude } = coords;
    setLocation({ lat: latitude, lng: longitude });
  };
  const showError = (error: any) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        toast.error('Geolocation API의 사용이 거부되었습니다.');
        break;
      case error.POSITION_UNAVAILABLE:
        toast.error('가져온 위치 정보를 사용할 수 없습니다.');
        break;
      case error.TIMEOUT:
        toast.error(
          '위치 정보를 가져오기 위한 요청이 허용 시간을 초과했습니다.'
        );
        break;
      default:
        toast.error('위치를 가져오는 과정에서 알 수 없는 오류가 발생했습니다.');
        break;
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => showSuccess(coords),
        error => showError(error),
        geolocationOptions
      );
    } else {
      // geolocation 지원하지 않음
      setLocation(defaultCenter);
    }
  }, []);
  useEffect(() => {
    // Fetch data from API if `location` object is set
    if (location) {
      console.log('onload', location);
      setMounted(true);
      // 이거하기 전까지는 로딩창 띄우기
    }
  }, [location]);

  return mounted ? (
    <StyledMain>
      <StyledMap>
        <KakaoMap
          level={'5' || defaultLevel}
          location={location || defaultCenter}
        ></KakaoMap>
      </StyledMap>
      <StyledFooterLayout>
        <StyledFooter>
          <Drawer.Root shouldScaleBackground>
            {/* shouldScaleBackground */}
            <Drawer.Trigger asChild>
              <StyledFooterItem>
                <StyledFooterSettingsBtn>
                  <StyledLogo>
                    <SvgLogo />
                  </StyledLogo>
                  <StyledCopyright>{copyright}</StyledCopyright>
                </StyledFooterSettingsBtn>
              </StyledFooterItem>
            </Drawer.Trigger>
            <Drawer.Portal>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerModal>
                  <DrawerHandleBar />
                  <DrawerContents>
                    <DrawerTitle>설정</DrawerTitle>
                  </DrawerContents>
                </DrawerModal>
              </DrawerContent>
            </Drawer.Portal>
          </Drawer.Root>
          <StyledFooterItem>hello</StyledFooterItem>
        </StyledFooter>
      </StyledFooterLayout>
    </StyledMain>
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
}
