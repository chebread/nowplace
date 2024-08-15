// - [ ] 거부 했다가 다시 승인하면 이게 바로 반영이 안되는 이슈가 있지만, 이 지역 검색은 잘 뜨기는 함. 일단 보류 해놓기
// - [ ] 지금이 어디 위치인지 표시하는 기능 일단은 보류하기. 일단은 "이 지역 검색하기" 라는 말만 "{현재 행정동} 검색하기"로 변경하기
// - [ ] 임시 코드 언젠간 handleBounds...로 변경하기
// - [ ] 더보기 꾸미기
// - [ ] 모든 바텀 시트 밑에는 copyright 배출하기
// - [ ] mobile 100vh 안되는 거 수정하기
// - [ ] 서비스 약관 관련은 nested 쓰기 또는 notion 연결하기
// - [ ] 특정 마커 클릭시 장소 공유 기능 => url 공유 인데, 그냥 그 장소만을 내포하는 url임
// - [ ] svgr url-loader 사용하기
// - [ ] toast 내가 만들거나 sonner 꾸미기
// - [ ] manual page 만들기
// - [ ] PWA 만들기
// - [ ] 검색 기능 만들기 => 1. 저장한 장소 검색 기능: 저장한 장소의 메모와 도로명 주소, 지번 주소에 기반해서 검색이 됨. 찾은 장소 클릭시 바로 장소 더보기가 실행됨
// 2. 장소 찾기 기능: 맛집 같은 것을 검색할 수 있음. 카카오맵에서 제공하는 검색 기능과 흡사. 찾은 장소를 클릭시 바로 지도의 마커가 생기게 됨.
// - [ ] 첫 방문자 기능 만들기

'use client';

/* components */
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Drawer } from 'vaul';
import { toast } from 'sonner';
import KakaoMap from '@/components/kakao-map';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import CopyToClipboard from 'react-copy-to-clipboard';
/* utils */
import { isNil, isNotNil } from 'es-toolkit/predicate';
import { omit } from 'es-toolkit';
import { base64ArrayDecoder } from '@/utils/base64ArrayDecoder';
import { base64ArrayEncoder } from '@/utils/base64ArrayEncoder';
import getAllUrl from '@/utils/getAllUrls';
import generateUUID from '@/utils/generateUUID';
/* svgs */
import Loading from '@/components/loading';
import SvgLogo from '@/assets/icons/logo.svg';
import SvgTracking from '@/assets/icons/tracking.svg';
import SvgFilledTracking from '@/assets/icons/filled-tracking.svg';
import SvgReject from '@/assets/icons/reject.svg';
import SvgSpin from '@/assets/icons/spin.svg';
import SvgCurrentPin from '@/assets/icons/current-pin.svg';
import SvgSearch from '@/assets/icons/search.svg';
import SvgPlacePin from '@/assets/icons/place-pin.svg';
/* css */
import {
  DrawerContent,
  DrawerContents,
  DrawerModal,
  DrawerOverlay,
  DrawerHeader,
  DrawerHandlebarWrapper,
  DrawerHandlebar,
  DrawerTitle,
  DrawerDescription,
} from '@/components/bottom-sheet/bottom-sheet.css';
import {
  StyledCopyright,
  StyledFooter,
  StyledFooterItem,
  StyledFooterLayout,
  StyledFooterBtnWrapper,
  StyledFooterBtn,
  StyledFooterLoadingSpinnerButton,
  StyledShowMoreBtn,
  StyledLogo,
  StyledMain,
  StyledMap,
  CurPosMarkerBtn,
  DataToAddDrawerModal,
  DataToAddDrawerContents,
  DataToAddTextareaWrapper,
  DataToAddTextarea,
  DataToAddFooterWrapper,
  DataToAddFooter,
  DataToAddFooterGradient,
  DataToAddFooterBtn,
  DataFetcherBtn,
  DataFetcherBtnWrapper,
  PlaceMarker,
} from './home.css';
import transformNestedObjectToArray from '@/utils/transformNestedObjectToArray';

export default function Home() {
  const copyright = `© ${new Date().getFullYear()} Cha Haneum`;
  /* data */
  const [fetchDataToggle, setFetchDataToggle] = useState(false);
  const [dataToAddToggle, setDataToAddToggle] = useState(false); // 장소 추가시 바텀시트 작동 Toggle
  const [allUrl, setAllUrl] = useState('');
  const [curAdminDongAddr, setCurAdminDongAddr] = useState(); // 현재 행정동 위치를 담는 값
  const [selectedMarkerToggle, setSelectedMarkerToggle] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState<any>(); // clickedMarker
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [contentData, setContentData] = useState<string>();
  const dataToAddTextareaRef = useRef<any>(null);
  const [dataToAddPos, setDataToAddPos] = useState<any>();
  const [hasVisited, setHasVisited] = useState(false); // 첫 방문자면 도움말 뜨기 // localStorage 사용
  const [isDataLoading, setIsDataLoading] = useState(true); // data loading // default value = true
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  /* places */
  const [mapMovedToggle, setMapMovedToggle] = useState(false); // 움직임 발생시
  const [mapRef, setMapRef] = useState<any>();
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

  /* data */
  // 데이터 추가 바텀 시트 최소화
  const closeDataToAddBottomSheet = () => {
    setDataToAddToggle(false);
    setDataToAddPos(undefined);
    setContentData(undefined);
  };
  // 데이터 추가
  const addDataToAdd = (pos: any) => {
    setDataToAddPos(pos);
    setDataToAddToggle(true);
  };
  // QueryString 추가
  const createQueryString = useCallback(
    // querystring 라는 것을 추가하여 문자열로 반환하는 코드임
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      return params.toString();
    },
    [searchParams]
  );
  // 특정 QueryString 제거 / 다른 말로는 모든 data값 초기화
  const deleteQueryString = useCallback(
    // ?data= 라는 것을 전체를 삭제한 값을 문자열로 반환하는 코드임
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key); // 이제 쿼리 문자열이 'bar=2'

      return params.toString();
    },
    [searchParams]
  );
  // Base64 데이터 가져오기 / 손상된 데이터(빈 값도 포함)가 발생시 null 반환함
  const fetchDataFromUrl = (key: string) => {
    // - [ ] 지금 오류는 saveData에서만 일어남. 일단 임시로 fetchDataFromUrl을 saveData에서 handleBounds할때 쓰는게 아니고, 일단 saveData에서 생성한 데이터를 가지고 handBoudns에서 사용하도록 함
    // const searchParams = new URLSearchParams(window.location.search);
    // console.log('xxx', searchParams); // - [ ] 이게 useState같은 거라서 바로 반영이 안됨. 렌더링 한다음에 반영해야함.
    let returnValue = null;
    const params: any = searchParams.get(key); // key is parameter key
    try {
      const fetchedData: any =
        isNil(params) || params === '' // null or undefined or '' (선언안됨) 이면 null로 처리함
          ? null
          : base64ArrayDecoder(params); // decode
      returnValue = fetchedData;
    } catch (error) {
      returnValue = null;
    }
    return returnValue;
  };
  // URL에 Base64 데이터 저장하기
  const saveDataToUrl = (key: string, value: string) => {
    router.push(pathname + '?' + createQueryString(key, value));
  };
  // 마커 데이터 저장
  const saveData = (position: any, content: any) => {
    // 도로명 주소 저장
    let lotAddr: any; // 지번 주소
    let roadAddr: any; // 도로명 주소
    // 이미 지도를 불러오고 이 모든 앱을 실행시키기 때문에 new kakao.maps는 자유롭게 사용해도 괜찮음
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      position.lng,
      position.lat,
      (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          lotAddr = result[0]?.address?.address_name; // 지번 주소
          roadAddr = result[0]?.road_address?.address_name; // 도로명 주소
        }
        // 순차적으로 실행되기 위하여 callback 내부에 작성함
        const fetchedData: any = fetchDataFromUrl('data');
        // 이거는 isNil 처리 안해도 됨. { ...fetchedData } = { } 로 처리됨
        const data = {
          // data는 축약값 표현 사용하지 않음
          [generateUUID()]: {
            position: {
              lat: position.lat,
              lng: position.lng,
            },
            content: content || '',
            address: {
              landLotAddress: isNil(lotAddr) ? null : lotAddr,
              roadNameAddress: isNil(roadAddr) ? null : roadAddr,
            },
          },
        };
        const mergedData: any = { ...fetchedData, ...data }; // fetchData와 병합
        const dataToSave = base64ArrayEncoder(mergedData); // encode
        saveDataToUrl('data', dataToSave); // 데이터 url에 저장하기 // 바로 즉각 반영이 느림
        // handleBoundsChanged(); // - [ ] 데이터 없을때 저장시에 이게 실행이 안됨
        /* 임시 코드 */ // - [ ] get querystring이 한 번 늦게 반영되는 문제.
        // 아니 근데, 늦게 반영되던 말던, saveData에서는 handleBoundsChanged() 함수는 너무 비효율적임. 임시코드가 더 효율적임.
        const fetchedMarkers = transformNestedObjectToArray(mergedData);
        const map: kakao.maps.Map = mapRef;
        const bounds = map.getBounds();
        const visible: any = fetchedMarkers.filter((marker: any) => {
          const position = new kakao.maps.LatLng(
            marker.position.lat,
            marker.position.lng
          );
          return bounds.contain(position);
        });
        setVisibleMarkers(visible);
      }
    );
  };
  // 마커 데이터 삭제
  const removeData = (ids: string[]) => {
    // 여러 id도 가능
    // 모든 장소를 삭제해도 남는 JTdCJTdE의 의미는 {}임.
    const fetchedData: any = fetchDataFromUrl('data');
    if (isNil(fetchedData)) return; // 데이터 손상시 함수 종료
    // removeDataToUrl(fetchedData, ids); // 새로고침 때문에 이거 안쓰는게 더 나을듯.
    const removedData: any = omit(fetchedData, ids); // 지울 key가 없으면 원본 반환
    const dataToSave: any = base64ArrayEncoder(removedData); // 재저장
    saveDataToUrl('data', dataToSave);
    // URL에 특정 데이터 제거
    // 새로고침
    // handleBoundsChanged();
    /* 임시 코드 */
    const fetchedMarkers = transformNestedObjectToArray(removedData);
    const map: kakao.maps.Map = mapRef;
    const bounds = map.getBounds();
    const visible: any = fetchedMarkers.filter((marker: any) => {
      const position = new kakao.maps.LatLng(
        marker.position.lat,
        marker.position.lng
      );
      return bounds.contain(position);
    });
    setVisibleMarkers(visible);
  };
  // 행정동 주소 변경
  const updateAdminDongAddr = (position: any) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(position.lng, position.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          // - [ ] 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
            const adminDongAddr: any = result[i].address_name;
            // console.log('행정동', adminDongAddr);
            setCurAdminDongAddr(adminDongAddr);
            break;
          }
        }
      }
    });
  };
  /* useEffect */
  // 특정 지역 내에서만 데이터 불러오기
  const handleBoundsChanged = () => {
    const fetchedData: any = fetchDataFromUrl('data');
    if (isNil(fetchedData)) {
      // 손상되어 값을 읽을 수 없거나, 데이터에 아무런 값이 없음
      setFetchDataToggle(false); // 읽어들이는 중... 그거 없엠
      setMapMovedToggle(false);
      return;
    }
    const fetchedMarkers = transformNestedObjectToArray(fetchedData);
    const map: kakao.maps.Map = mapRef;
    const bounds = map.getBounds();
    const visible: any = fetchedMarkers.filter((marker: any) => {
      const position = new kakao.maps.LatLng(
        marker.position.lat,
        marker.position.lng
      );
      return bounds.contain(position);
    });
    setVisibleMarkers(visible);
    // - [ ] 지금 보이는 데이터는 다시 그 반영을 안하나? 그 렌더링?
    // 근데 유의할 점은, 이미 로드한 데이터도, 현재 보이는 지역을 벗어나서 새로고침을 하면 다시 로드해야함 (약간 성능 부과될 수 있다...)
    setFetchDataToggle(false);
    setMapMovedToggle(false);
  };
  // 처음 로드시 현재 위치의 데이터 불러오기
  useEffect(() => {
    // - [*] 심각한 버그. prompt에서 denined이면 잘 표시가 됨. 그러나 태초부터 denied이면 아예 실행이 안됨. 계속 로딩 페이지에 머물러 있음.
    // - [*] 이유는 mapRef의 값이 변경이 즉각 되지 않아서임. 근데 이게 왜 그런지는 모름. 그래서 그냥 이 코드는 onCreate 내부에 위치했음
    // - [*] onCreate 내부 위치도 그렇지 좋지는 않음. 값이 계속 바뀌기 때문에.
    // - [*] mapRef는 setMapRefState(map)이라는 코드가 onCreate에 존재시 동작함, window.kakao도 되기는 함. 그냥 useEffect의 의존성에는 ref값을 넣지 말자.
    // 일단 mapRef가 kakao.map => 일단 임시로 useRef가 아니라 useState를 사용하자.
    // 지도가 처음 로드된 후 이 코드가 실행됩니다 / 지도가 로드된 처음만 실행되므로 if절 내의 코드는 한번만 실행됩니다
    if (mapRef) {
      //  kakao.maps.Map 사용 가능 지역
      handleBoundsChanged(); // 근데 footer가 4rem 차지해서, 그 부분에 마커가 있으면 로드가 되긴 함. 어쩔 수 없음.
      setIsDataLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef]);
  // 초기 행정동 불러오기 및
  // 위치 변동 사항 확인시 행정동 다시 불러옴
  useEffect(() => {
    if (mapRef) {
      // centerPos가 불러와지면 centerPos로 행정동 불러옴. 그렇지 않으면 defaultCenter의 행정동 불러옴
      updateAdminDongAddr(isNil(centerPos) ? defaultCenter : centerPos);
    }
  }, [mapRef, centerPos]);

  /* 현재 위치 */
  const updateCenterPos = (map: kakao.maps.Map) => {
    setMapMovedToggle(true);
    setCenterPos({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
  };
  const handleMotionDetected = () => {
    setIsTracking(false);
  };
  const onCurPosTracking = () => {
    // 중복 처리 방지
    if (!isTracking) {
      setCenterPos(curPos);
      setIsTracking(true);
      setMapMovedToggle(true); // 이동됨을 알림
    }
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
          setCurPos({ lat: latitude, lng: longitude });
          setCenterPos({ lat: latitude, lng: longitude });
        },
        error => handleGeoError(error),
        geolocationOptions
      );
      watchId = navigator.geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          // console.log('watch pos');
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
      setGeoPermission('prompt');
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

  /* useEffect */
  // 처음 앱 접근시 위치 가져옴
  useEffect(() => {
    // - [ ] 왜 초기에 2번 코드가 실행되는지 모르겠음
    setAllUrl(getAllUrl());
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
  // 위치 추적 기능
  useEffect(() => {
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

  return (
    <>
      {isDataLoading && (
        /* 로딩 */
        <Loading />
      )}
      <StyledMain>
        <StyledMap>
          <KakaoMap
            onCreate={(map: any) => {
              // mapRef.current = map;
              setMapRef(map);
            }}
            level={5}
            /* 장소 추가 */
            onDoubleClick={(_: any, mouseEvent: any) => {
              const latlng = mouseEvent.latLng;
              addDataToAdd({
                lat: latlng.getLat(),
                lng: latlng.getLng(),
              });
            }}
            /* 현재 위치 */
            center={centerPos}
            onDragEnd={updateCenterPos}
            onZoomChanged={updateCenterPos}
            onZoomStart={handleMotionDetected} // - [ *** ] isTracking 시에는 zoom 하면 center 좌표를 중심으로 zoom 되기 기능 만들기
            onDragStart={handleMotionDetected}
          >
            {/* 현재 위치 마커 */}
            {curPos && (
              <>
                <CustomOverlayMap position={curPos}>
                  <CurPosMarkerBtn onClick={onCurPosTracking}>
                    <SvgCurrentPin />
                  </CurPosMarkerBtn>
                  {/* <CurPosMarker onClick={onCurPosTracking} /> */}
                </CustomOverlayMap>
              </>
            )}

            {/* 장소 마커 */}
            {visibleMarkers.map((marker: any) => (
              <CustomOverlayMap key={marker.id} position={marker.position}>
                <PlaceMarker
                  onClick={() => {
                    const { position, content, id } = marker;
                    setCenterPos(position);
                    setIsTracking(false);
                    setSelectedMarkerToggle(true);
                    setSelectedMarkerData(marker);
                    setMapMovedToggle(true);
                  }}
                >
                  <SvgPlacePin />
                </PlaceMarker>
              </CustomOverlayMap>
            ))}
          </KakaoMap>
          {/* 장소 마커 바텀 시트 */}
          <Drawer.Root
            shouldScaleBackground
            open={selectedMarkerToggle}
            onClose={() => {
              setSelectedMarkerToggle(false);
              setSelectedMarkerData(undefined);
            }}
          >
            <Drawer.Portal>
              <DrawerOverlay
                onClick={() => {
                  setSelectedMarkerToggle(false);
                  setSelectedMarkerData(undefined);
                }}
              />

              <DrawerContent
                onOpenAutoFocus={e => {
                  e.preventDefault();
                }}
              >
                <DrawerHeader>
                  <DrawerHandlebarWrapper
                    onClick={() => {
                      setSelectedMarkerToggle(false);
                      setSelectedMarkerData(undefined);
                    }}
                  >
                    <DrawerHandlebar></DrawerHandlebar>
                  </DrawerHandlebarWrapper>
                </DrawerHeader>
                <DrawerModal>
                  <DrawerTitle />
                  <DrawerDescription />
                  {selectedMarkerToggle && (
                    <DrawerContents>
                      <h1>
                        {isNotNil(selectedMarkerData.address.roadNameAddress)
                          ? `도로명 주소: ${selectedMarkerData.address.roadNameAddress}`
                          : isNotNil(selectedMarkerData.address.landLotAddress)
                          ? `지번 주소: ${selectedMarkerData.address.landLotAddress}`
                          : `해당 장소는 주소명이 부여되지 않았습니다`}
                      </h1>
                      {/* 도로명 주소가 없으면 지번 주소가 표시됨. 우선은 일단 도로명 주소만 표시. 없으면 지번 주소 표시. 둘 다 같이 표시하지는 않음. 그리고 둘다 null인 경우는 해당 장소는 주소명이 없습니다 표시. */}
                      <p>{selectedMarkerData.content}</p>
                      <button
                        onClick={() => {
                          removeData([selectedMarkerData.id]); // - [ ] 바로 반영이 안됨
                          setSelectedMarkerToggle(false);
                          setSelectedMarkerData(undefined);
                        }}
                      >
                        장소 삭제하기
                      </button>
                    </DrawerContents>
                  )}
                </DrawerModal>
              </DrawerContent>
            </Drawer.Portal>
          </Drawer.Root>

          {/* 장소 추가 바텀 시트 */}
          <Drawer.Root
            shouldScaleBackground
            open={dataToAddToggle}
            onClose={() => {
              closeDataToAddBottomSheet();
            }}
          >
            <Drawer.Portal>
              <DrawerOverlay
                /* - [ ] 모바일에서 이거 때문에 계속 close... 함수 실행됨. 아니 근데 왜 Drawer.Root이게 화면상에서 없어지지 아니하는가? */
                onClick={() => {
                  closeDataToAddBottomSheet();
                }}
              />

              <DrawerContent
                onOpenAutoFocus={e => {
                  e.preventDefault(); // safari focused 막기
                }}
              >
                <DrawerHeader>
                  <DrawerHandlebarWrapper
                    onClick={() => {
                      closeDataToAddBottomSheet();
                    }}
                  >
                    <DrawerHandlebar></DrawerHandlebar>
                  </DrawerHandlebarWrapper>
                </DrawerHeader>
                <DataToAddDrawerModal
                  onClick={() => {
                    if (dataToAddTextareaRef.current !== null) {
                      // dataToAddTextareaRef.current.disabled = false;
                      dataToAddTextareaRef.current.focus();
                    }
                  }}
                >
                  <DataToAddDrawerContents>
                    <DrawerTitle />
                    <DrawerDescription />
                    <DataToAddTextareaWrapper
                      onClick={event => {
                        // focus 이벤트 적용하지 않기
                        event.stopPropagation();
                      }}
                    >
                      <DataToAddTextarea
                        ref={dataToAddTextareaRef}
                        autoFocus
                        maxLength={150}
                        rows={6}
                        defaultValue=""
                        value={contentData}
                        onChange={(event: any) => {
                          const {
                            target: { value },
                          } = event;
                          setContentData(value); // 굳이 html로 바꿔서 저장안해도 됨. jsx는 string만 출력을 허용함. \n도 자동적으로 인식하는 듯?
                        }} // - [ ] 개선하기
                        placeholder="저장할 장소에 메모를 추가하세요."
                      />
                    </DataToAddTextareaWrapper>
                    <DataToAddFooter>
                      <DataToAddFooterGradient></DataToAddFooterGradient>
                      <DataToAddFooterWrapper
                        onClick={(event: any) => {
                          event.stopPropagation();
                        }}
                      >
                        <DataToAddFooterBtn
                          onClick={() => {
                            saveData(dataToAddPos, contentData);
                            closeDataToAddBottomSheet();
                          }}
                        >
                          장소 저장하기
                        </DataToAddFooterBtn>
                      </DataToAddFooterWrapper>
                    </DataToAddFooter>
                  </DataToAddDrawerContents>
                </DataToAddDrawerModal>
              </DrawerContent>
            </Drawer.Portal>
          </Drawer.Root>
        </StyledMap>

        {/* 마커 로드 버튼 */}
        {mapMovedToggle && (
          <DataFetcherBtnWrapper>
            <DataFetcherBtn
              onClick={() => {
                setFetchDataToggle(true); // - [ ] mapMovedToggle랑 fetchDataToggle랑 똑같은 기능 아님? => 아님. click하면 fetchingDataToggle이 true가 됨 (읽어들이는 중)
                handleBoundsChanged();
              }}
            >
              {fetchDataToggle
                ? '읽어들이는 중...'
                : `${curAdminDongAddr} 검색`}
            </DataFetcherBtn>
          </DataFetcherBtnWrapper>
        )}

        <StyledFooterLayout>
          <StyledFooter>
            {/* 더보기 바텀 시트 */}
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
                  <DrawerHeader>
                    <DrawerHandlebarWrapper>
                      <DrawerHandlebar></DrawerHandlebar>
                    </DrawerHandlebarWrapper>
                  </DrawerHeader>
                  <DrawerModal>
                    <DrawerContents>
                      <DrawerTitle />
                      <DrawerDescription />

                      <h2>서비스 설정</h2>
                      <li>
                        <CopyToClipboard
                          text={allUrl}
                          onCopy={() => alert('장소가 모두 저장되었습니다')}
                        >
                          <button>장소 모두 저장하기</button>
                        </CopyToClipboard>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            if (
                              window.confirm('장소를 모두 삭제하시겠습니까?')
                            ) {
                              router.push(
                                pathname + '?' + deleteQueryString('data')
                              );
                              // 새로고침
                              // handleBoundsChanged(); // - [ ] 아니 왜 안되는가?
                              /* 임시 코드 */
                              setVisibleMarkers([]);
                            }
                          }}
                        >
                          장소 모두 삭제하기
                        </button>
                      </li>
                      <li>
                        위치 권한 상태:
                        {(() => {
                          switch (geoPermission) {
                            case 'granted':
                              return '승인됨';
                            case 'prompt':
                              return '요청중';
                            case 'denied':
                              return '거부됨';
                            default:
                              return '알 수 없음';
                          }
                        })()}
                      </li>

                      <h2>이용 안내</h2>
                      <li>
                        <Link href="usage-guide">사용법</Link>
                      </li>
                      <li>
                        <Link href="mailto:fromhaneum">
                          문의하기: fromhaneum@gmail.com
                        </Link>
                      </li>

                      <h2>서비스 안내</h2>
                      <li>서비스 이용 약관</li>
                      <li>개인정보 취급 방침</li>
                    </DrawerContents>
                  </DrawerModal>
                </DrawerContent>
              </Drawer.Portal>
            </Drawer.Root>
            <StyledFooterItem>
              <StyledFooterBtnWrapper>
                {/* 장소 검색 => 저장된 도로명 주소, 메모에 기반해서! */}
                <Drawer.Root shouldScaleBackground>
                  <Drawer.Trigger asChild>
                    <StyledFooterBtn>
                      <SvgSearch />
                    </StyledFooterBtn>
                  </Drawer.Trigger>
                  <Drawer.Portal>
                    <DrawerOverlay />
                    <DrawerContent
                      onOpenAutoFocus={e => {
                        e.preventDefault();
                      }}
                    >
                      <DrawerHeader>
                        <DrawerHandlebarWrapper>
                          <DrawerHandlebar></DrawerHandlebar>
                        </DrawerHandlebarWrapper>
                      </DrawerHeader>
                      <DrawerModal>
                        <DrawerContents>
                          <DrawerTitle />
                          <DrawerDescription />
                          <h1>검색</h1>
                        </DrawerContents>
                      </DrawerModal>
                    </DrawerContent>
                  </Drawer.Portal>
                </Drawer.Root>
                {/* 현재 위치 */}
                {isCurPosFetched ? (
                  <StyledFooterBtn
                    onClick={() => {
                      onCurPosTracking();
                    }}
                  >
                    {isTracking ? <SvgFilledTracking /> : <SvgTracking />}
                  </StyledFooterBtn>
                ) : geoPermission === 'denied' ? (
                  <>
                    {/* 위치 권한 요청 바텀 시트 */}
                    <Drawer.Root shouldScaleBackground>
                      <Drawer.Trigger asChild>
                        <StyledFooterBtn>
                          <SvgReject />
                        </StyledFooterBtn>
                      </Drawer.Trigger>
                      <Drawer.Portal>
                        <DrawerOverlay />
                        <DrawerContent
                          onOpenAutoFocus={e => {
                            e.preventDefault();
                          }}
                        >
                          <DrawerHeader>
                            <DrawerHandlebarWrapper>
                              <DrawerHandlebar></DrawerHandlebar>
                            </DrawerHandlebarWrapper>
                          </DrawerHeader>
                          <DrawerModal>
                            <DrawerContents>
                              <DrawerTitle />
                              <DrawerDescription />
                              <h1>위치 권한이 거부되었습니다</h1>
                            </DrawerContents>
                          </DrawerModal>
                        </DrawerContent>
                      </Drawer.Portal>
                    </Drawer.Root>
                  </>
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
    </>
  );
}
