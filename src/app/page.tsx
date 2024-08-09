'use client';

import { useEffect, useMemo, useState } from 'react';
import { Drawer } from 'vaul';
import { toast } from 'sonner';
import _ from 'lodash';
import KakaoMap from '@/components/kakao-map';
import { MapMarker } from 'react-kakao-maps-sdk';
// svgs
import Loading from '@/components/loading';
import SvgLogo from '@/assets/icons/logo.svg';
import SvgTracking from '@/assets/icons/tracking.svg';
import SvgFilledTracking from '@/assets/icons/filled-tracking.svg';
import SvgReject from '@/assets/icons/reject.svg';
import SvgSpin from '@/assets/icons/spin.svg';
import SvgPlus from '@/assets/icons/plus.svg';
// css
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
  StyledLogo,
  StyledMain,
  StyledMap,
  StyledFooterBtnWrapper,
  StyledFooterButton,
  StyledFooterLoadingSpinnerButton,
  DrawerTitle,
  DrawerDescription,
} from './home.css';

export default function Home() {
  let watchId: any = null;
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
  // const [hasVisited, setHasVisited] = useState(false); // 첫 방문자면 도움말 뜨기 // localStorage 사용
  const [isDataLoading, setIsDataLoading] = useState(false); // data loading // default value = true
  // const [isGeoDenied, setIsGeoDenied] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // user log in // localstorage에 저장하기 또는 다른 방법 강구
  const [isTracking, setIsTracking] = useState(false);
  const [geoPermission, setGeoPermission] = useState(''); // 모든 지도의 권한을 설정함

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
  const onCurPosTracking = () => {
    setCenterPos(curPos);
    setIsTracking(true);
  };
  // geolocation
  const handleGeoError = (error: any) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('hge: Geolocation API의 사용이 거부되었습니다.');
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
        error => handleGeoError(error), // handleGeoError(error) 추가시 막 여러개로 toast 뜸
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
    setTimeout(() => {
      setIsDataLoading(true);
    }, 1000);
  }, []);

  useEffect(() => {
    // - [ ] 왜 초기에 2번 코드가 실행되는지 모르겠음
    if ('geolocation' in navigator && 'permissions' in navigator) {
      checkGeoPermission();
    } else {
      setCenterPos(defaultCenter);
      setGeoPermission('denied'); // 사실은 거부됨이 아니라 지원을 안하는 것임
      // 아래의 if (curPos && !isCurPosFetched) { ... } 실행되게 됨 => x
    }
    return () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    if (curPos && isCurPosFetched && isTracking) {
      // 현재 위치 불러왔음
      // tracking 모드일때는 현재 위치를 따라가게됨
      setCenterPos(curPos);
    }
    if (curPos && !isCurPosFetched) {
      // && !isCurPosFetched 코드가 없으면 watchPosition시에 이 코드가 또 실행되게 됨
      // isCurPos가 false일때만
      console.log('onload');
      setIsCurPosFetched(true); // 현재위치 불러옴
      setIsTracking(true); // 현재 위치 tracking 중
    }
  }, [curPos]);

  const [visibleMarkers, setVisibleMarkers] = useState([]);
  console.log(visibleMarkers);

  const markers = [
    { position: { lat: 33.450701, lng: 126.570667 }, content: 'Marker 1' },
    { position: { lat: 33.450936, lng: 126.569477 }, content: 'Marker 2' },
    { position: { lat: 33.451, lng: 126.572 }, content: 'Marker 3' },
  ];
  const handleBoundsChanged = (map: any) => {
    const bounds = map.getBounds();
    const visible: any = markers.filter(marker => {
      const position = new kakao.maps.LatLng(
        marker.position.lat,
        marker.position.lng
      );

      return bounds.contain(position);
    });
    setVisibleMarkers(visible);
  };

  return !isDataLoading ? (
    <Loading />
  ) : (
    <StyledMain>
      <StyledMap>
        <KakaoMap
          level={5}
          center={centerPos}
          onDragEnd={(map: kakao.maps.Map) => {
            updateCenterPos(map);
          }}
          onZoomStart={handleMotionDetected} // - [ *** ] isTracking 시에는 zoom 하면 center 좌표를 중심으로 zoom 되기 기능 만들기
          onDragStart={handleMotionDetected}
          /* 장소 추가 */
          onDoubleClick={(_: any, mouseEvent: any) => {
            const latlng = mouseEvent.latLng;
            console.table({
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            });
          }}
          onBoundsChanged={handleBoundsChanged}
        >
          {curPos && <MapMarker onClick={onCurPosTracking} position={curPos} />}

          {visibleMarkers.map((marker: any, index: any) => (
            <MapMarker key={index} position={marker.position}>
              <div style={{ padding: '5px', color: '#000' }}>
                {marker.content}
              </div>
            </MapMarker>
          ))}
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
              <DrawerContent
                onOpenAutoFocus={e => {
                  // safari focused 막기
                  e.preventDefault();
                }}
              >
                <DrawerModal>
                  <DrawerHandleBar />
                  <DrawerContents>
                    <DrawerTitle>hello</DrawerTitle>
                    <DrawerDescription>lorem</DrawerDescription>
                  </DrawerContents>
                </DrawerModal>
              </DrawerContent>
            </Drawer.Portal>
          </Drawer.Root>
          <StyledFooterItem>
            <StyledFooterBtnWrapper>
              <StyledFooterButton>
                <SvgPlus />
              </StyledFooterButton>
              {isCurPosFetched ? (
                <StyledFooterButton onClick={onCurPosTracking}>
                  {isTracking ? <SvgFilledTracking /> : <SvgTracking />}
                </StyledFooterButton>
              ) : geoPermission === 'denied' ? (
                <StyledFooterButton
                  onClick={() => {
                    // 권한 설정 방법 모달 뜸
                    // 근데 일단은 toast로 대체함
                    toast.warning('위치 권한이 거부 되었습니다.');
                  }}
                >
                  <SvgReject />
                </StyledFooterButton>
              ) : (
                <StyledFooterLoadingSpinnerButton>
                  <SvgSpin />
                </StyledFooterLoadingSpinnerButton>
              )}
            </StyledFooterBtnWrapper>
          </StyledFooterItem>
        </StyledFooter>
      </StyledFooterLayout>
    </StyledMain>
  );
}
