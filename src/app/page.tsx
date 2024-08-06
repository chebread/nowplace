// -- 1. 현재 위치 가져오기 -> kakao-map.tsx 에서 가져오기
// -- 1.1. 위치 실패시 또는 위치 거부시 ip로 현재 위치 가져오기 => default 값 사용하기
// 2. 위치를 가져오기 전까지는 로딩 페이지 출력함
// 3. 장소 추가하기는 하단부 클릭시 추가가능 (블링크 처럼)
// 로직 간소화 하기

// 1. 로그인 / 데이터 로드하기 => 로딩화면
// 2. 지도 띄우기
// 2. 현재위치 마커가 돌아가면서 현재위치 구함
// map load 되기 전까지는 maploading 페이지 보여주기
// 현재 위치 icon 추가하기
// - [ ] data loading 추가하기

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
  StyledShowMoreBtn,
  StyledHeader,
  StyledLogo,
  StyledMain,
  StyledMap,
  StyledTrackingBtn,
  StyledFooterBtnWrapper,
} from './home.css';
import { toast } from 'sonner';
import { useEffect, useMemo, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import Loading from '@/components/loading';
import SvgNavigation from '@/assets/icons/navigation.svg';
import SvgFilledNavigation from '@/assets/icons/filled-navigation.svg';
import _ from 'lodash';
import BottomSheet from '@/components/bottom-sheet/bottom-sheet';

export default function Home() {
  const copyright = `© ${new Date().getFullYear()} Cha Haneum`;
  const defaultCenter = { lat: 37.575857, lng: 126.976805 };
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  };
  const [curPos, setCurPos] = useState<any>(); // current location
  const [centerPos, setCenterPos] = useState<any>();
  const [isCurPosFetched, setIsCurPosFetched] = useState(false);
  const [hasVisited, setHasVisited] = useState(false); // 첫 방문자면 도움말 뜨기 // localStorage 사용
  const [isDataLoading, setIsDataLoading] = useState(false); // data loading // default value = true
  // const [isGeoDenied, setIsGeoDenied] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // user log in // localstorage에 저장하기 또는 다른 방법 강구
  const [isTracking, setIsTracking] = useState(false);
  const [geoPermission, setGeoPermission] = useState(''); // 모든 지도의 권한을 설정함
  let watchId: any = null;

  const updateCenterPos = useMemo(
    () =>
      _.debounce((map: kakao.maps.Map) => {
        setCenterPos({
          lat: map.getCenter().getLat(),
          lng: map.getCenter().getLng(),
        });
      }, 500),
    []
  );
  const handleMotionDetected = () => {
    setIsTracking(false);
  };
  // geolocation
  const handleGeoError = (error: any) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        //   // 거부는 언제든지 일어날 수 있음
        console.log('hge: Geolocation API의 사용이 거부되었습니다.');
        //   setIsGeoDenied(true);
        //   setCurPos(undefined); // init
        //   setIsCurPosFetched(false); // init
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('hge: 가져온 위치 정보를 사용할 수 없습니다.');
        break;
      case error.TIMEOUT:
        console.log(
          'hge: 위치 정보를 가져오기 위한 요청이 허용 시간을 초과했습니다.'
        );
        break;
      default:
        console.log(
          'hge: 위치를 가져오는 과정에서 알 수 없는 오류가 발생했습니다.'
        );
        break;
    }
  };
  const startWatchingPosition = () => {
    if (watchId === null) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          console.log('get current pos');
          console.log('현재 위치:', latitude, longitude);
          setCurPos({ lat: latitude, lng: longitude });
          setCenterPos({ lat: latitude, lng: longitude });
        },
        error => {}, // handleGeoError(error) 추가시 막 여러개로 toast 뜸
        geolocationOptions
      );
      watchId = navigator.geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          console.log('watch pos');
          console.log('현재 위치:', latitude, longitude);
          setCurPos({ lat: latitude, lng: longitude });
        },
        error => handleGeoError(error),
        geolocationOptions
      );
      console.log('위치 추적을 시작했습니다.');
    }
  };
  const stopWatchingPosition = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
      console.log('위치 추적을 중지했습니다.');
      setCurPos(undefined);
      setIsCurPosFetched(false);
    }
  };
  const changeGeoPermission = (state: any) => {
    if (state === 'granted') {
      setGeoPermission('granted');
      console.log('위치 액세스가 이미 허용되어 있습니다.');
      startWatchingPosition();
    }
    if (state === 'prompt') {
      console.log('위치 액세스 권한을 요청할 수 있습니다.');
      // 위치 권한을 요청하고 사용자 응답에 따라 처리
      navigator.geolocation.getCurrentPosition(
        position => {
          setGeoPermission('granted');
          console.log('위치 액세스가 허용되었습니다.');
          startWatchingPosition();
        },
        error => {
          setGeoPermission('denied');
          console.log('위치 액세스가 거부되었습니다.');
          stopWatchingPosition();
        }
      );
    }
    if (state === 'denied') {
      setGeoPermission('denied');
      console.log('위치 액세스가 거부되었습니다.');
      stopWatchingPosition();
    }
  };
  const checkGeoPermission = () => {
    navigator.permissions.query({ name: 'geolocation' }).then(result => {
      changeGeoPermission(result.state);
      // 권한 상태 변경 감지
      result.onchange = () => {
        console.log('위치 권한 상태가 변경되었습니다:', result.state);
        changeGeoPermission(result.state);
      };
    });
  };

  useEffect(() => {
    // Geolocation 권한
    // 거부시 모든 것을 초기화. 그러나 현 위치는 초기화 하지는 않음
    // 다시 승인시 다시 위치 정보를 받기.
    // 요청할 수 있을시 모달을 띄우기. 승인 요청을 해달라는 문구.
  }, []);

  useEffect(() => {
    // - [ ] 왜 초기에 2번 코드가 실행되는지 모르겠음
    if (!('geolocation' in navigator)) {
      checkGeoPermission();
    } else {
      setCenterPos(defaultCenter);
      setGeoPermission('denied'); // 사실은 거부됨이 아니라 지원을 안하는 것임
      // 아래의  if (curPos && !isCurPosFetched) { ... } 실행되게 됨
    }
    return () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    if (curPos && !isCurPosFetched) {
      // && !isCurPosFetched 코드가 없으면 watchPosition시에 이 코드가 또 실행되게 됨
      // isCurPos가 false일때만
      console.log('onload');
      setIsCurPosFetched(true); // 현재위치 불러옴
    }
  }, [curPos]);

  return isDataLoading ? (
    <Loading />
  ) : (
    <StyledMain>
      <StyledMap>
        <KakaoMap
          level={'5'}
          center={centerPos}
          onCenterChanged={(map: kakao.maps.Map) => {
            updateCenterPos(map);
          }}
          // onZoomStart={handleMotionDetected} // - [ ] isTracking 시에는 zoom 하면 center 좌표를 중심으로 zoom 되기 기능 만들기
          onDragStart={handleMotionDetected}
        >
          {curPos && <MapMarker position={curPos} />}
        </KakaoMap>
      </StyledMap>
      <StyledFooterLayout>
        <StyledFooter>
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
              <StyledFooterItem>
                <StyledShowMoreBtn>
                  <StyledLogo>
                    <SvgLogo />
                  </StyledLogo>
                  <StyledCopyright>{copyright}</StyledCopyright>
                </StyledShowMoreBtn>
              </StyledFooterItem>
            </Drawer.Trigger>
            <Drawer.Portal>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerModal>
                  <DrawerHandleBar />
                  <DrawerContents></DrawerContents>
                </DrawerModal>
              </DrawerContent>
            </Drawer.Portal>
          </Drawer.Root>
          <StyledFooterItem>
            <StyledFooterBtnWrapper>
              {isCurPosFetched ? (
                <StyledTrackingBtn
                  onClick={() => {
                    setCenterPos(curPos);
                    setIsTracking(true);
                  }}
                >
                  {isTracking ? <SvgFilledNavigation /> : <SvgNavigation />}
                </StyledTrackingBtn>
              ) : geoPermission === 'denied' ? (
                '위치 거부됨'
              ) : (
                '현재 위치 불러오는 중'
              )}
            </StyledFooterBtnWrapper>
          </StyledFooterItem>
        </StyledFooter>
      </StyledFooterLayout>
    </StyledMain>
  );
}
