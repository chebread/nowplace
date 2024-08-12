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
// - [ ] 위치 추가는 더블 클릭으로 가능.
// - [ ] + 누르면 현재 위치 추가
// - [ ] 아니면 + 누르면 위치 추가할 수 있는 핑 나오기?
// undefined 말고 null로 모두 전환하기 like setDoubleClickedPos(undefined);
// - [ ] 100vh 오류 해결하기
/* show more */
// 1. 데이터 지우기 => Url 다 지우면 됨
// 2. 위치 권한 상태: 거부됨 / 승인됨 / undefined (prompt) => 변경법 알려주는 모달 첨부 (블링크 참조: 도움말)
// 3. 다크모드 변경
// 4. 버전
// 5. 개인정보...
// 6. 문의 => fromhaneum@gmail.com
// - [ ] 모든 바텀 시트 밑에는 copyright 배출하기
// 기본적으로 제공하는 prompt toggle(yes or no)도 고려해보기
/* 장소 검색 */
// 도로명 주소, (지명 이름), 메모에 기반해서 데이터를 찾고, 검색 결과는 리스트 형태로 도로명 주소를 뜨면서 제공함

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Drawer } from 'vaul';
import { toast } from 'sonner';
import KakaoMap from '@/components/kakao-map';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
// svgs
import Loading from '@/components/loading';
import SvgLogo from '@/assets/icons/logo.svg';
import SvgTracking from '@/assets/icons/tracking.svg';
import SvgFilledTracking from '@/assets/icons/filled-tracking.svg';
import SvgReject from '@/assets/icons/reject.svg';
import SvgSpin from '@/assets/icons/spin.svg';
import SvgPlus from '@/assets/icons/plus.svg';
import SvgCurrentPin from '@/assets/icons/current-pin.svg';
import SvgSearch from '@/assets/icons/search.svg';
// css
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
} from './home.css';

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
import { usePathname, useSearchParams } from 'next/navigation';
import { base64ArrayDecoder } from '@/utils/base64ArrayDecoder';
import { base64ArrayEncoder } from '@/utils/base64ArrayEncoder';
import { useRouter } from 'next/navigation';
import generateUUID from '@/lib/generateUUID';
import { isNil } from 'es-toolkit/predicate';

export default function Home() {
  const copyright = `© ${new Date().getFullYear()} Cha Haneum`;
  /* toggle */
  // const [geoPermissionRequestToggle, setGeoPermissionRequestToggle] =
  //   useState(false); // denied 되면 권한을 재요청 해주십시오 라는 바텀시트 올라가는 것을 제어하는 토글
  const [mapMovedToggle, setMapMovedToggle] = useState(false); // 움직임 발생시
  const [fetchDataToggle, setFetchDataToggle] = useState(false);
  const [dataToAddToggle, setDataToAddToggle] = useState(false); // 장소 추가시 바텀시트 작동 Toggle
  /* 데이터 */
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [contentData, setContentData] = useState<string>();
  const dataToAddTextareaRef = useRef<any>(null);
  const [dataToAddPos, setDataToAddPos] = useState<any>();
  const [hasVisited, setHasVisited] = useState(false); // 첫 방문자면 도움말 뜨기 // localStorage 사용
  const [isDataLoading, setIsDataLoading] = useState(false); // data loading // default value = true
  /* 위치 */
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

  const closeDataToAddBottomSheet = () => {
    setDataToAddToggle(false);
    setDataToAddPos(undefined);
  };
  /* 데이터 */
  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key); // 이제 쿼리 문자열이 'bar=2'

      return params.toString();
    },
    [searchParams]
  );
  // Base64 데이터 Fetching
  const fetchDataFromUrl = (key: string) => {
    const params: any = searchParams.get(key); // key is parameter key
    const fetchedData = isNil(params) ? '' : base64ArrayDecoder(params); // decode
    return fetchedData;
  };
  const saveDataToUrl = (key: string, value: string) => {
    router.push(pathname + '?' + createQueryString(key, value));
  };
  // 데이터 저장
  const saveData = (position: any, content: any) => {
    // 데이터 관련은 모두 Data~로 명명함
    // - [ ] 위치를 URL에 저장하기 / 삭제하기 / 조회하기 (조회는 처음 마운트 될때)
    // ?data={UUID(id): { ... }, UUID: { ... }](base64)
    const fetchedData: any = fetchDataFromUrl('data'); // {id: {  ..., position: { lat: ..., lng: ... }, content: ... }, id: { ... }, ... ]
    console.log(fetchedData);
    // const fetchedData = {
    //   // temporay
    //   '2e79a0eb23844800ba8a229a092228ff': {
    //     content: '',
    //     position: { lat: 36.36376506307412, lng: 127.44778680277417 },
    //   },
    // };
    const data = {
      [generateUUID()]: {
        position: {
          lat: position.lat,
          lng: position.lng,
        },
        content: content || '',
      },
    };
    const mergedData: any = { ...fetchedData, ...data }; // fetchData와 병합
    const dataToSave = base64ArrayEncoder(mergedData); // encode
    // saveDataToUrl('data', dataToSave); // 데이터 url에 저장하기
    // 데이터 url에 반영하기
  };
  const addDataToAdd = (pos: any) => {
    setDataToAddToggle(true);
    setDataToAddPos(pos);
  };
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
      // setGeoPermission('prompt'); // 필요하지는 않음 undefined = prompt
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
            addDataToAdd({
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            });
          }}
          // onBoundsChanged={handleBoundsChanged}
          /* 현재 위치 */
          center={centerPos}
          onDragEnd={updateCenterPos}
          onZoomChanged={updateCenterPos}
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
        </KakaoMap>
        {/* 장소 추가 바텀 시트 */}
        <Drawer.Root
          shouldScaleBackground
          open={dataToAddToggle}
          onClose={closeDataToAddBottomSheet}
        >
          <Drawer.Portal>
            <DrawerOverlay onClick={closeDataToAddBottomSheet} />
            <DrawerContent
              onOpenAutoFocus={e => {
                e.preventDefault(); // safari focused 막기
              }}
            >
              <DrawerHeader>
                <DrawerHandlebarWrapper onClick={closeDataToAddBottomSheet}>
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
                      onChange={(event: any) =>
                        setContentData(event.target.value)
                      } // - [ ] 개선하기
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

      {mapMovedToggle && (
        <DataFetcherBtnWrapper>
          <DataFetcherBtn
            onClick={() => {
              setFetchDataToggle(true);
              // test code //
              setTimeout(() => {
                // 데이터 페칭 완료시
                setFetchDataToggle(false);
                setMapMovedToggle(false);
              }, 1000);
            }}
          >
            {fetchDataToggle ? '읽어들이는 중...' : '이 지역 검색'}
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
                    {/* <ul>
                      <li>차한음 @chahaneum</li>
                      <li>프로필 수정</li>
                      <></>
                      <h2>서비스 설정</h2>
                      <li>저장한 장소 모두 삭제</li>
                      <li>위치 권한 상태: {geoPermission}</li>
                      <li>로그아웃</li>
                      <li>계정 삭제</li>
                      <></>
                      <h2>이용 안내</h2>
                      <li>사용법</li>
                      <li>문의하기: fromhaneum@gmail.com</li>
                      <></>
                      <h2>서비스 안내</h2>
                      nested 쓰기 또는 notion 연결하기
                      <li>서비스 이용약관</li>
                      <li>개인정보 취급 방침</li>
                      <></>
                      <li>앱 버전 확인: v1.0.0</li>
                    </ul> */}
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
  );
}
