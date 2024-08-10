// - [ ] 위치 실패시 또는 위치 거부시 ip로 현재 위치 가져오기 => default 값 사용하기
// - [ ] data loading 추가하기
// - [ ] 모든 bottomsheet 아래에는 copyright 표시하기
// - [ ] bottomsheet 정형화하기
// - [ ] in mobile bottom sheet의 주소창 까지 검정되는거 막기
// modal시 ?edit=true 이런 사이트도 존재.
// 모바일에서 실행하기 위해서는 https 필수 (ios safari)
// - [ ] 장소 추가 버튼 클릭시 add place 모달 with map 이 뜸
// - [ ] 모달에서 스크롤 가능하게 하기 (vaul github 참고하기)
// - [ ] 장소 추가 모달에서 스크롤 막고, 상단부만 클릭시 스크롤 되게 하기
// - [ ] 첫 feed에서는 장소만 불러오기
// 거부는 언제든지 일어날 수 있음
// (저장한 장소에는 도로명 주소가 뜸)
// (feed 상단에 검색창 만들기) => 저장한 장소의 메모에 기반하여 검색 가능! => 그 저장한 장소의 검색 결과는 bottomsheet 위의 지도에 띄워짐
// 일단은 모달 먼저하자 그리고 나서 위치 추가 모달 만들고, 위치 추가 해보자 (정 안되면 더블 클릭으로 하기)
// 걍, long press 로 하지말고, double click 으로 하자
// 한번에 다 로드하지 말고, 그냥 인스타 처럼, spothouse 처럼 그렇게 구성할 까?
// => 그러면 도대체 어떤 기준에 있어서 장소를 로드 해야 하지?
// 지금 보여지는 특정 구역내의 위치만을 가져오는 방법이 무엇이지?
// => bound 쓰면 돼!
// - [ ] svgr url-loader 사용하기
// - [ ] 마커는 url에 저장함 ([ { lat: ..., lng: ..., memo: .... }, { ... } ]) => 이거를 url로 저장
// 주의, 한글도 저장가능하게 하기.
// 현재 위치는 다만 저장하지 않음
// 아니면 idb로 저장하기
// 이미 불러온 마커는 나두기.
// 그리고 spothouse 처럼 버튼 누르면 마커 로드 하기
// 그리고 로드를 다시 새로고침 하면 기존에 불러온 마커는 지움 (아니면 기존에 불러온 마커는 내비두기)
// 일단 현재 위치 기준으로 마커 불러오기
// default 기준으로 마커 불러오기 (로딩중일때는 불러오지 않고, denied 상태이면 default 기준으로 마커 불러오기)
// - [ ] 만약 아예 권한조차 허락받지 않은 사용자라면 버튼으로하여금 허락을 요청하기 => 메뉴얼
// - [ ] 길게 누르면 장소 추가 기능 만들기
// - [ ] 장소 클릭시 bottomsheet에서 메모 뜸

'use client';

import { useEffect, useState } from 'react';
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
  StyledFooterBtnWrapper,
  StyledFooterButton,
  StyledFooterLoadingSpinnerButton,
  StyledShowMoreBtn,
  StyledLogo,
  StyledMain,
  StyledMap,
  DrawerTitle,
  DrawerDescription,
} from './home.css';

export default function Home() {
  const copyright = `© ${new Date().getFullYear()} Cha Haneum`;
  /* 데이터 */
  const [hasVisited, setHasVisited] = useState(false); // 첫 방문자면 도움말 뜨기 // localStorage 사용
  const [isDataLoading, setIsDataLoading] = useState(false); // data loading // default value = true
  /* 현재 위치 */
  let watchId: any = null;
  const defaultCenter = { lat: 37.575857, lng: 126.976805 };
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  };
  const [curPos, setCurPos] = useState<any>(); // current location
  const [centerPos, setCenterPos] = useState<any>();
  const [isCurPosFetched, setIsCurPosFetched] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [geoPermission, setGeoPermission] = useState(''); // 모든 지도의 권한을 설정함

  /* 데이터 */
  // const [visibleMarkers, setVisibleMarkers] = useState([]);
  // const markers = [
  //   { position: { lat: 33.450701, lng: 126.570667 }, content: 'Marker 1' },
  //   { position: { lat: 33.450936, lng: 126.569477 }, content: 'Marker 2' },
  //   { position: { lat: 33.451, lng: 126.572 }, content: 'Marker 3' },
  // ];
  // const handleBoundsChanged = (map: any) => {
  //   const bounds = map.getBounds();
  //   const visible: any = markers.filter(marker => {
  //     const position = new kakao.maps.LatLng(
  //       marker.position.lat,
  //       marker.position.lng
  //     );
  //     return bounds.contain(position);
  //   });
  //   setVisibleMarkers(visible);
  // };
  /* 현재 위치 */
  const updateCenterPos = (map: kakao.maps.Map) => {
    console.log(1);
    setCenterPos({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
  };
  const handleMotionDetected = () => {
    setIsTracking(false);
  };
  const onCurPosTracking = () => {
    setCenterPos(curPos);
    setIsTracking(true);
  };
  const handleGeoError = (error: any) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        // console.log('hge: Geolocation API의 사용이 거부되었습니다.');
        break;
      case error.POSITION_UNAVAILABLE:
        // console.log('hge: 가져온 위치 정보를 사용할 수 없습니다.');
        break;
      case error.TIMEOUT:
        // console.log(
        //   'hge: 위치 정보를 가져오기 위한 요청이 허용 시간을 초과했습니다.'
        // );
        break;
      default:
        // console.log(
        //   'hge: 위치를 가져오는 과정에서 알 수 없는 오류가 발생했습니다.'
        // );
        break;
    }
  };
  const startWatchingPosition = () => {
    if (watchId === null) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          // console.log('get current pos');
          // console.log('현재 위치:', latitude, longitude);
          setCurPos({ lat: latitude, lng: longitude });
          setCenterPos({ lat: latitude, lng: longitude });
        },
        error => handleGeoError(error), // handleGeoError(error) 추가시 막 여러개로 toast 뜸
        geolocationOptions
      );
      watchId = navigator.geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          // console.log('watch pos');
          // console.log('현재 위치:', latitude, longitude);
          setCurPos({ lat: latitude, lng: longitude });
        },
        error => handleGeoError(error),
        geolocationOptions
      );
      // console.log('위치 추적을 시작했습니다.');
    }
  };
  const stopWatchingPosition = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
      // console.log('위치 추적을 중지했습니다.');
      setCurPos(undefined);
      setIsCurPosFetched(false);
    }
  };
  const changeGeoPermission = (state: any) => {
    if (state === 'granted') {
      setGeoPermission('granted');
      // console.log('위치 액세스가 이미 허용되어 있습니다.');
      startWatchingPosition();
    }
    if (state === 'prompt') {
      // console.log('위치 액세스 권한을 요청할 수 있습니다.');
      navigator.geolocation.getCurrentPosition(
        position => {
          setGeoPermission('granted');
          // console.log('위치 액세스가 허용되었습니다.');
          startWatchingPosition();
        },
        error => {
          setGeoPermission('denied');
          // console.log('위치 액세스가 거부되었습니다.');
          stopWatchingPosition();
        }
      );
    }
    if (state === 'denied') {
      setGeoPermission('denied');
      // console.log('위치 액세스가 거부되었습니다.');
      stopWatchingPosition();
    }
  };
  const checkGeoPermission = () => {
    navigator.permissions.query({ name: 'geolocation' }).then(result => {
      changeGeoPermission(result.state);
      result.onchange = () => {
        // console.log('위치 권한 상태가 변경되었습니다:', result.state);
        changeGeoPermission(result.state);
      };
    });
  };
  useEffect(() => {
    /* 처음 앱 접근시 */
    // - [ ] 왜 초기에 2번 코드가 실행되는지 모르겠음
    if ('geolocation' in navigator && 'permissions' in navigator) {
      checkGeoPermission();
    } else {
      setCenterPos(defaultCenter);
      setGeoPermission('denied'); // 사실은 거부됨이 아니라 지원을 안하는 것임. 아래의 'geolocation' in navigator는 실행이 되지 않음
    }
    return () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    /* curPos 값 변동시 */
    if (curPos && isCurPosFetched && isTracking) {
      // 현재 위치 불러온 후에 tracking 모드일때는 현재 위치를 따라가게됨
      setCenterPos(curPos);
    }
    if (curPos && !isCurPosFetched) {
      // && !isCurPosFetched 코드가 없으면 watchPosition시에 이 코드가 또 실행되게 됨
      // 최초로 현재 위치 불러옴
      setIsCurPosFetched(true); // 현재위치 불러옴
      setIsTracking(true); // 현재 위치 tracking 중
      // console.log('onload');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPos]);

  return isDataLoading ? (
    /* 로딩 */
    <Loading />
  ) : (
    <StyledMain>
      <StyledMap>
        <KakaoMap
          level={5}
          /* 장소 추가 */
          onDoubleClick={(_: any, mouseEvent: any) => {
            const latlng = mouseEvent.latLng;
            console.table({
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            });
          }}
          // onBoundsChanged={handleBoundsChanged}
          /* 현재 위치 */
          center={centerPos}
          onDragEnd={updateCenterPos}
          onZoomStart={handleMotionDetected} // - [ *** ] isTracking 시에는 zoom 하면 center 좌표를 중심으로 zoom 되기 기능 만들기
          onDragStart={handleMotionDetected}
        >
          {/* 장소 마커 */}
          {/* {visibleMarkers.map((marker: any, index: any) => (
            <MapMarker key={index} position={marker.position}>
              <div style={{ padding: '5px', color: '#000' }}>
                {marker.content}
              </div>
            </MapMarker>
          ))} */}
          {/* 현재 위치 마커 */}
          {curPos && <MapMarker onClick={onCurPosTracking} position={curPos} />}
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
                  e.preventDefault(); // safari focused 막기
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
              {/* 장소 추가 */}
              <StyledFooterButton>
                <SvgPlus />
              </StyledFooterButton>
              {/* 현재 위치 */}
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
