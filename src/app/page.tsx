// - [v] 거부 했다가 다시 승인하면 이게 바로 반영이 안되는 이슈가 있지만, 이 지역 검색은 잘 뜨기는 함. 일단 보류 해놓기
// - [x] 지금이 어디 위치인지 표시하는 기능 일단은 보류하기. 일단은 "이 지역 검색하기" 라는 말만 "{현재 행정동} 검색하기"로 변경하기
// - [ ] 임시 코드 언젠간 handleBounds...로 변경하기
// - [ ] 더보기 꾸미기
// - [ ] 모든 바텀 시트 밑에는 copyright 배출하기
// - [ ] mobile 100vh 안되는 거 수정하기
// - [v] 서비스 약관 관련은 nested 쓰기 또는 notion 연결하기
// - [v] 특정 마커 클릭시 장소 공유 기능 => url 공유 인데, 그냥 그 장소만을 내포하는 url임
// - [ ] svgr url-loader 사용하기
// - [ ] toast 내가 만들거나 sonner 꾸미기
// - [x] manual page 만들기
// - [ ] PWA 만들기
// - [v] 검색 기능 만들기 => 1. 저장한 장소 검색 기능: 저장한 장소의 메모와 도로명 주소, 지번 주소에 기반해서 검색이 됨. 찾은 장소 클릭시 바로 장소 더보기가 실행됨
// 2. 장소 찾기 기능: 맛집 같은 것을 검색할 수 있음. 카카오맵에서 제공하는 검색 기능과 흡사. 찾은 장소를 클릭시 바로 지도의 마커가 생기게 됨.
// - [x] 첫 방문자 바텀 시트 만들기 (hasVisited) => localstorage를 사용. hasVisited, hasvisitedbottomsheet
// - [x] isTracking 시에는 zoom 하면 center 좌표를 중심으로 zoom 되기 기능 만들기
// - [v] permission 에서 prompt => granted 될때 기존의 데이터가 바로 안보이게 되는 오류가 있다.
// - [ ] nested root에서는 open={...}을 사용하면 그 축소시에 부모 root가 축소가 안된다. 클릭해줘야 축소가 된다.
// - [v] http 상에서 복사하는 기능 만들기
// - [ ] contentData 수정 기능 만들기
// - [ ] 공유한 장소는 ?share= 로 저장하고, 그 장소만 포커싱하기 => 맞을까..
// bottom sheet와 drawer는 동의어임
// - [ ] 앱 언어 설정 기능 만들기
// - [ ] vaul 요소는 focus 될때 css 초기화하기 및 tabIndex 적용 방지하기
// - [ ] 모바일 대응하기
// - [ ] husky 적용하기

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Drawer } from 'vaul';
import KakaoMap from '@/components/kakao-map';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import Fuse from 'fuse.js';
/* utils */
import { size } from 'es-toolkit/compat';
import { isNil, isNotNil } from 'es-toolkit/predicate';
import { omit } from 'es-toolkit';
import { base64ArrayDecoder } from '@/utils/base64-array-decoder';
import { base64ArrayEncoder } from '@/utils/base64-array-encoder';
import getAllUrl from '@/utils/get-all-url';
import generateUUID from '@/utils/generate-UUID';
import transformNestedObjectToArray from '@/utils/transform-nested-object-to-array';
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
  DrawerOverlay,
  DrawerHeader,
  DrawerHandlebarWrapper,
  DrawerHandlebar,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerFooterGradient,
  DrawerFooterWrapper,
  DrawerFooterBtn,
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
  DataFetcherBtn,
  DataFetcherBtnWrapper,
  PlaceMarker,
  ShowMoreDrawerModal,
  ShowMoreDrawerContents,
  ShowMoreDrawerCategory,
  ShowMoreDrawerBtn,
  ShowMoreDrawerLink,
  ShowMoreDrawerItem,
  ShowMoreDrawerDetailedBtn,
  ShowMoreDrawerGeoPermStatusInd,
  ShowMoreDrawerRemoveAllPlacesBtn,
  PermReqDrawerModal,
  PermReqDrawerContents,
  PermReqDrawerTitle,
  PermReqDrawerMessage,
  SearchDrawerModal,
  SearchDrawerContents,
  PlaceMoreDrawerModal,
  PlaceMoreDrawerContents,
  PlaceMoreDrawerContentData,
  PlaceMoreDrawerAddress,
  PlaceMoreDrawerAddressName,
  PlaceMoreDrawerBtn,
  PlaceMoreDrawerRemovePlaceBtn,
  SearchDrawerInput,
  SearchDrawerInputBox,
  SearchDrawerResultItem,
  SearchDrawerNoResultsFound,
  SearchDrawerResultList,
  ShowMoreDrawerList,
} from './home.css';
import transformToNestedObject from '@/utils/transform-to-nested-object';
import copyToClipboard from '@/utils/copy-to-clipboard';

export default function Home() {
  const copyright = `© ${new Date().getFullYear()} Cha Haneum`;
  const [permReqToggle, setPermReqToggle] = useState(false);
  const [showMoreToggle, setShowMoreToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  /* search */
  const searchRef = useRef<any>(null); // DOM 요소를 searchElement에 할당
  const [searchValue, setSearchValue] = useState<string>();
  const [searchResult, setSearchResult] = useState<any>();
  /* data */
  const [fetchDataToggle, setFetchDataToggle] = useState(false);
  const [dataToAddToggle, setDataToAddToggle] = useState(false); // 장소 추가시 바텀시트 작동 Toggle
  const [curAdminDongAddr, setCurAdminDongAddr] = useState(); // 현재 행정동 위치를 담는 값
  const [selectedMarkerToggle, setSelectedMarkerToggle] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState<any>(); // clickedMarker
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [contentData, setContentData] = useState<string>();
  const dataToAddTextareaRef = useRef<any>(null);
  const [dataToAddPos, setDataToAddPos] = useState<any>();
  const [isDataLoading, setIsDataLoading] = useState(true); // data loading // default value = true
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  /* geolocation */
  const [mapRef, setMapRef] = useState<any>(); // 값이 즉각 반영은 안되지만 useEffect가 추적할 수 있음
  const [mapMovedToggle, setMapMovedToggle] = useState(false); // 움직임 발생시
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
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  /* search */
  const handleSearchEnter = (event: any) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if ((event.key === 'Enter' || event.keyCode === 13) && !event.isComposing) {
      if (!isSearchVisible) {
        setIsSearchVisible(true);
      }
      searchRef.current.blur(); // focus 제거
      event.target.blur(); // 모바일 키보드 닫기
      const data = visibleMarkers;
      const index = Fuse.createIndex(
        ['address.landLotAddress', 'address.roadNameAddress', 'content'],
        data
      );
      // searchValue == '' 도 같이 처리함
      const fuse = new Fuse(data, undefined, index);
      const result =
        isNil(searchValue) || searchValue.trim().length === 0
          ? null
          : fuse.search(searchValue);
      setSearchResult(
        result === null || size(result) === 0 ? null : extractItems(result)
      );
      if (isNil(result)) setIsSearchVisible(false); // 일치하는 결과가 없으면
    }
  };

  const closeSearchBottomSheet = () => {
    setSearchValue(undefined);
    setSearchResult(undefined);
    setSearchToggle(false);
    setIsSearchVisible(false);
  };
  const extractItems = (array: any) => {
    return array.map(({ item }: any) => ({ ...item }));
  };
  /* data */
  // 모든 데이터 삭제
  const removeAllData = () => {
    if (window.confirm('장소를 모두 삭제하시겠습니까?')) {
      router.push(pathname + '?' + deleteQueryString('data'));
      /* 새로고침 임시 코드 */
      setVisibleMarkers([]);
    }
  };
  // 모든 데이터 저장
  const saveAllData = () => {
    const allUrl = getAllUrl();
    copyToClipboard(
      allUrl,
      () => {
        alert('클립보드에 저장되었습니다');
      },
      () => {
        alert('클립보드에 저장중 에러가 발생했습니다');
      }
    );
  };
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
  // QueryString 제거 / 다른 말로는 모든 data값 초기화
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
        /* 새로고침 임시 코드 */ // - [ ] get querystring이 한 번 늦게 반영되는 문제.
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
    /* 새로고침 임시 코드 */
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

  /* geolocation */
  // 특정 장소 삭제하기
  const removePlace = () => {
    if (window.confirm('장소를 삭제하시겠습니까?')) {
      removeData([selectedMarkerData.id]);
      setSelectedMarkerToggle(false);
      setSelectedMarkerData(undefined);
    }
  };
  // 특정 장소 공유하기
  const sharePlace = () => {
    // selectedMarkerData를 기반으로 새로운 url 생성
    // selectedMarkerData = { id: ..., position: ..., content: ..., address: ...} => { id: { position: ..., content: ..., address: ... }}
    const data: any = transformToNestedObject(selectedMarkerData);
    const dataToSave = base64ArrayEncoder(data);
    const urlToShare =
      window.location.origin +
      pathname +
      '?' +
      createQueryString('data', dataToSave);
    copyToClipboard(
      urlToShare,
      () => {
        alert('클립보드에 저장되었습니다');
      },
      () => {
        alert('클립보드에 저장중 에러가 발생했습니다');
      }
    );
  };
  // 현재 위치 권한 상태 가져오기
  const getCurGeoPermission = () => {
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
  };
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
      // 승인시 위치 권한 요청 바텀 시트를 끔
      setPermReqToggle(false);
    }
    if (state === 'prompt') {
      setGeoPermission('prompt');
      // console.log('위치 액세스 권한을 요청할 수 있습니다.');
      navigator.geolocation.getCurrentPosition(
        position => {
          setGeoPermission('granted');
          // console.log('위치 액세스가 허용되었습니다.');
          startWatchingPosition();
          // setMapMovedToggle(true); // - [ ] "위치 권한이 prompt => granted 될때 데이터 불러오기" 에러의 임시방편 처리 => 아래 코드 참조
          // 승인시 위치 권한 요청 바텀 시트를 끔
          setPermReqToggle(false);
        },
        error => {
          setGeoPermission('denied');
          // console.log('위치 액세스가 거부되었습니다.');
          stopWatchingPosition();
          // 거부시 위치 권한 요청 바텀 시트를 실행함
          setPermReqToggle(true);
        }
      );
    }
    if (state === 'denied') {
      setGeoPermission('denied');
      // console.log('위치 액세스가 거부되었습니다.');
      stopWatchingPosition();
      // 거부시 위치 권한 요청 바텀 시트를 실행함
      setPermReqToggle(true);
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

  /* useEffect data */
  // 처음 로드시 현재 위치의 데이터 불러오기
  // - [v] 위치 권한이 prompt => granted 될때 데이터 불러오기 => 임시방편으로 처리함 => 아래 코드 참조
  // - [v] 현재 위치 로딩이 길어지면 이게 반영이 안됨 => 그냥 이렇게 전역으로 설정하는게 아니라. 어떤게 끝나면 그냥 새로고침 하기 그렇게 할까? => 아래 코드 참조
  // useEffect(() => {
  // - [*] 심각한 버그. prompt에서 denined이면 잘 표시가 됨. 그러나 태초부터 denied이면 아예 실행이 안됨. 계속 로딩 페이지에 머물러 있음.
  // - [*] 이유는 mapRef의 값이 변경이 즉각 되지 않아서임. 근데 이게 왜 그런지는 모름. 그래서 그냥 이 코드는 onCreate 내부에 위치했음
  // - [*] onCreate 내부 위치도 그렇지 좋지는 않음. 값이 계속 바뀌기 때문에.
  // - [*] mapRef는 setMapRefState(map)이라는 코드가 onCreate에 존재시 동작함, window.kakao도 되기는 함. 그냥 useEffect의 의존성에는 ref값을 넣지 말자.
  // - [*] 일단 mapRef가 kakao.map => 일단 임시로 useRef가 아니라 useState를 사용하자.
  // 지도가 처음 로드된 후 이 코드가 실행됩니다 / 지도가 로드된 처음만 실행되므로 if절 내의 코드는 한번만 실행됩니다
  // if (mapRef) {
  // handleBoundsChanged(); // 근데 footer가 4rem 차지해서, 그 부분에 마커가 있으면 로드가 되긴 함. 어쩔 수 없음.
  // setIsDataLoading(false);
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [mapRef]);

  // 초기 데이터 가져오기 / 처음 로드시 데이터를 불러오는 방식은 안좋음. 권한이 재정립되고, 현재위치나 거부까지 완전히 받아올때 데이터를 로드함
  useEffect(() => {
    if (mapRef) {
      // 지도 불러올시 (mapRef 접근 가능할시)
      // ***prompt 선택 전까지 로딩 화면을 출력함
      if (geoPermission === 'granted') {
        // 현재 위치 권한 승락시
        // 거부에서 승락으로 가도 이것이 적용
        // 그리고 현 위치 데이터를 일단 안받아도 지도를 출력함
        setIsDataLoading(false); // 로딩 화면은 없엠
        if (isCurPosFetched) {
          // console.log('gratned load');
          // 현재 위치를 불러오면 데이터를 불러옴
          handleBoundsChanged();
        }
      }
      if (geoPermission === 'denied') {
        // 현재 위치 권한 비승락시는 그냥 바로 지도와 데이터를 불러옴
        // console.log('denied load');
        setIsDataLoading(false);
        handleBoundsChanged();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoPermission, isCurPosFetched, mapRef]);

  // 초기 행정동 불러오기 및
  // 위치 변동 사항 확인시 행정동 다시 불러옴
  useEffect(() => {
    if (mapRef) {
      // centerPos가 불러와지면 centerPos로 행정동 불러옴. 그렇지 않으면 defaultCenter의 행정동 불러옴
      updateAdminDongAddr(isNil(centerPos) ? defaultCenter : centerPos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef, centerPos]);

  /* useEffect geolocation */
  // 처음 앱 접근시 위치 가져옴
  useEffect(() => {
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
      <StyledMain>
        {isDataLoading && <Loading />}
        <StyledMap>
          <KakaoMap
            onCreate={(map: kakao.maps.Map) => {
              setMapRef(map);
            }}
            level={5}
            center={centerPos}
            onDragEnd={updateCenterPos}
            onZoomChanged={updateCenterPos}
            onZoomStart={handleMotionDetected}
            onDragStart={handleMotionDetected}
            onDoubleClick={(_: any, mouseEvent: any) => {
              const latlng = mouseEvent.latLng;
              addDataToAdd({
                lat: latlng.getLat(),
                lng: latlng.getLng(),
              });
            }}
          >
            {/* 현재 위치 마커 */}
            {curPos && (
              <CustomOverlayMap position={curPos}>
                <CurPosMarkerBtn onClick={onCurPosTracking}>
                  <SvgCurrentPin />
                </CurPosMarkerBtn>
                {/* <CurPosMarker onClick={onCurPosTracking} /> */}
              </CustomOverlayMap>
            )}
            {/* 장소 마커 */}
            {visibleMarkers.map((marker: any) => (
              <CustomOverlayMap key={marker.id} position={marker.position}>
                <PlaceMarker
                  onClick={() => {
                    setCenterPos(marker.position);
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
        </StyledMap>
        {/* 마커 로드 버튼 */}
        {mapMovedToggle && (
          <DataFetcherBtnWrapper>
            <DataFetcherBtn
              onClick={() => {
                setFetchDataToggle(true);
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
            {/* 더보기 버튼 */}
            <StyledFooterItem
              onClick={() => {
                setShowMoreToggle(true);
              }}
            >
              <StyledShowMoreBtn>
                <StyledLogo>
                  <SvgLogo />
                </StyledLogo>
                <StyledCopyright>{copyright}</StyledCopyright>
              </StyledShowMoreBtn>
            </StyledFooterItem>
            <StyledFooterItem>
              <StyledFooterBtnWrapper>
                {/* 검색 버튼 */}
                <StyledFooterBtn
                  onClick={() => {
                    setSearchToggle(true);
                  }}
                >
                  <SvgSearch />
                </StyledFooterBtn>
                {/* 현재 위치 버튼 */}
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
                    {/*  위치 권한 요청 버튼 */}
                    <StyledFooterBtn
                      onClick={() => {
                        setPermReqToggle(true);
                      }}
                    >
                      <SvgReject />
                    </StyledFooterBtn>
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

      {/* 바텀 시트 */}

      {/* 장소 더보기 바텀 시트 */}
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
            <PlaceMoreDrawerModal>
              <DrawerTitle />
              <DrawerDescription />
              {selectedMarkerToggle && (
                <PlaceMoreDrawerContents>
                  <PlaceMoreDrawerContentData>
                    {selectedMarkerData.content}
                  </PlaceMoreDrawerContentData>

                  {isNotNil(selectedMarkerData.address.roadNameAddress) ? (
                    <PlaceMoreDrawerAddress
                      onClick={() => {
                        copyToClipboard(
                          selectedMarkerData.address.roadNameAddress,
                          () => {
                            alert('클립보드에 복사되었습니다');
                          },
                          () => {
                            alert('클립보드에 복사중 에러가 발생했습니다');
                          }
                        );
                      }}
                    >
                      <p>도로명 주소</p>
                      <PlaceMoreDrawerAddressName>
                        {selectedMarkerData.address.roadNameAddress}
                      </PlaceMoreDrawerAddressName>
                    </PlaceMoreDrawerAddress>
                  ) : isNotNil(selectedMarkerData.address.landLotAddress) ? (
                    <PlaceMoreDrawerAddress
                      onClick={() => {
                        copyToClipboard(
                          selectedMarkerData.address.landLotAddress,
                          () => {
                            alert('클립보드에 복사되었습니다.');
                          },
                          () => {
                            alert('클립보드에 복사중 에러가 발생했습니다.');
                          }
                        );
                      }}
                    >
                      <p>지번 주소</p>
                      <PlaceMoreDrawerAddressName>
                        {selectedMarkerData.address.landLotAddress}
                      </PlaceMoreDrawerAddressName>
                    </PlaceMoreDrawerAddress>
                  ) : (
                    <PlaceMoreDrawerAddress>
                      <p>해당 장소는 주소명이 부여되지 않았습니다</p>
                    </PlaceMoreDrawerAddress>
                  )}

                  <PlaceMoreDrawerBtn
                    onClick={() => {
                      sharePlace();
                    }}
                  >
                    장소 공유하기
                  </PlaceMoreDrawerBtn>
                  <PlaceMoreDrawerRemovePlaceBtn
                    onClick={() => {
                      removePlace();
                    }}
                  >
                    장소 삭제하기
                  </PlaceMoreDrawerRemovePlaceBtn>
                </PlaceMoreDrawerContents>
              )}
            </PlaceMoreDrawerModal>
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
          // onClick={() => {
          //   closeDataToAddBottomSheet();
          // }}
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
                      setContentData(value);
                    }}
                    placeholder="저장할 장소에 메모를 추가하세요"
                  />
                </DataToAddTextareaWrapper>
                <DrawerFooter>
                  <DrawerFooterGradient></DrawerFooterGradient>
                  <DrawerFooterWrapper
                    onClick={(event: any) => {
                      event.stopPropagation();
                    }}
                  >
                    <DrawerFooterBtn
                      onClick={() => {
                        saveData(dataToAddPos, contentData);
                        closeDataToAddBottomSheet();
                      }}
                    >
                      장소 저장하기
                    </DrawerFooterBtn>
                  </DrawerFooterWrapper>
                </DrawerFooter>
              </DataToAddDrawerContents>
            </DataToAddDrawerModal>
          </DrawerContent>
        </Drawer.Portal>
      </Drawer.Root>

      {/* 더보기 바텀 시트 */}
      <Drawer.Root
        shouldScaleBackground
        open={showMoreToggle}
        onClose={() => {
          setShowMoreToggle(false);
        }}
      >
        <Drawer.Portal>
          <DrawerOverlay
            onClick={() => {
              setShowMoreToggle(false);
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
                  setShowMoreToggle(false);
                }}
              >
                <DrawerHandlebar></DrawerHandlebar>
              </DrawerHandlebarWrapper>
            </DrawerHeader>
            <ShowMoreDrawerModal>
              <ShowMoreDrawerContents>
                <DrawerTitle />
                <DrawerDescription />

                <ShowMoreDrawerList>
                  <ShowMoreDrawerCategory>서비스 설정</ShowMoreDrawerCategory>
                  <ShowMoreDrawerItem>
                    <ShowMoreDrawerDetailedBtn
                      style={{
                        cursor: 'default',
                      }}
                    >
                      <p>위치 권한 상태</p>
                      <ShowMoreDrawerGeoPermStatusInd>
                        {getCurGeoPermission()}
                      </ShowMoreDrawerGeoPermStatusInd>
                    </ShowMoreDrawerDetailedBtn>
                  </ShowMoreDrawerItem>
                  <ShowMoreDrawerItem>
                    <ShowMoreDrawerBtn onClick={saveAllData}>
                      모든 장소 저장하기
                    </ShowMoreDrawerBtn>
                  </ShowMoreDrawerItem>
                  <ShowMoreDrawerItem>
                    <ShowMoreDrawerRemoveAllPlacesBtn onClick={removeAllData}>
                      모든 장소 삭제하기
                    </ShowMoreDrawerRemoveAllPlacesBtn>
                  </ShowMoreDrawerItem>

                  <ShowMoreDrawerCategory>이용 안내</ShowMoreDrawerCategory>
                  <ShowMoreDrawerItem>
                    <ShowMoreDrawerLink href="https://haneum.notion.site/5eeb4157e5674225a385b0f242b8109d?pvs=4">
                      사용 방법
                    </ShowMoreDrawerLink>
                  </ShowMoreDrawerItem>
                  <ShowMoreDrawerItem>
                    <ShowMoreDrawerLink href="https://haneum.notion.site/7f9e4f0160fa46f5a7b4ed6821c9dc1b?pvs=4">
                      문의하기
                    </ShowMoreDrawerLink>
                  </ShowMoreDrawerItem>

                  <ShowMoreDrawerCategory>서비스 안내</ShowMoreDrawerCategory>
                  <ShowMoreDrawerItem>
                    <ShowMoreDrawerLink href="https://haneum.notion.site/2dfa69d6a9c84af3bf2ccaff2aab2ab9?pvs=4">
                      서비스 이용 약관
                    </ShowMoreDrawerLink>
                  </ShowMoreDrawerItem>
                  <ShowMoreDrawerItem>
                    <ShowMoreDrawerLink href="https://haneum.notion.site/3abb28d6b73b4b2d96e7c1450f4637fc?pvs=4">
                      개인정보 처리 방침
                    </ShowMoreDrawerLink>
                  </ShowMoreDrawerItem>
                </ShowMoreDrawerList>
              </ShowMoreDrawerContents>
            </ShowMoreDrawerModal>
          </DrawerContent>
        </Drawer.Portal>
      </Drawer.Root>

      {/* 검색 바텀 시트 */}
      <Drawer.Root
        shouldScaleBackground
        open={searchToggle}
        onClose={() => {
          closeSearchBottomSheet();
        }}
      >
        <Drawer.Portal>
          <DrawerOverlay
            onClick={() => {
              closeSearchBottomSheet();
            }}
          />
          <DrawerContent
            tabIndex={-1}
            onOpenAutoFocus={e => {
              e.preventDefault();
            }}
          >
            <DrawerHeader>
              <DrawerHandlebarWrapper
                onClick={() => {
                  closeSearchBottomSheet();
                }}
              >
                <DrawerHandlebar></DrawerHandlebar>
              </DrawerHandlebarWrapper>
            </DrawerHeader>
            <SearchDrawerModal>
              <SearchDrawerContents>
                <DrawerTitle />
                <DrawerDescription />

                <SearchDrawerInputBox>
                  <SearchDrawerInput
                    ref={searchRef}
                    autoFocus
                    value={searchValue || ''}
                    onChange={(event: any) => {
                      setSearchValue(event.target.value);
                    }}
                    onKeyDown={(event: any) => handleSearchEnter(event)}
                    placeholder={`${curAdminDongAddr} 검색`}
                  ></SearchDrawerInput>
                </SearchDrawerInputBox>

                {isSearchVisible && (
                  <SearchDrawerResultList>
                    {isNil(searchResult) ? (
                      <SearchDrawerNoResultsFound>
                        일치하는 결과가 없습니다
                      </SearchDrawerNoResultsFound>
                    ) : (
                      searchResult?.map((item: any) => (
                        <SearchDrawerResultItem
                          key={item.id}
                          onClick={() => {
                            closeSearchBottomSheet();
                            setCenterPos(item.position);
                          }}
                        >
                          {isNil(item.address.roadNameAddress) &&
                          isNil(item.address.landLotAddress)
                            ? item.content // 저장한 장소의 장소명이 제공되지 않으면 content를 내보내기
                            : item.address.roadNameAddress ||
                              item.address.landLotAddress}
                        </SearchDrawerResultItem>
                      ))
                    )}
                  </SearchDrawerResultList>
                )}
              </SearchDrawerContents>
            </SearchDrawerModal>
          </DrawerContent>
        </Drawer.Portal>
      </Drawer.Root>

      {/* 위치 권한 요청 바텀 시트 */}
      <Drawer.Root
        shouldScaleBackground
        open={permReqToggle}
        onClose={() => {
          setPermReqToggle(false);
        }}
      >
        <Drawer.Portal>
          <DrawerOverlay
            onClick={() => {
              setPermReqToggle(false);
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
                  setPermReqToggle(false);
                }}
              >
                <DrawerHandlebar></DrawerHandlebar>
              </DrawerHandlebarWrapper>
            </DrawerHeader>
            <PermReqDrawerModal>
              <PermReqDrawerContents>
                <DrawerTitle />
                <DrawerDescription />

                <PermReqDrawerTitle>
                  위치 권한이 거부되었습니다
                </PermReqDrawerTitle>
                <PermReqDrawerMessage>
                  위치 권한이 거부되면 현재 위치와 관련된 기능을 사용할 수
                  없습니다.웹 브라우저의 설정에서 위치 권한을 허용해주세요.
                </PermReqDrawerMessage>

                <DrawerFooter>
                  <DrawerFooterGradient></DrawerFooterGradient>
                  <DrawerFooterWrapper>
                    <DrawerFooterBtn
                      onClick={() => {
                        setPermReqToggle(false);
                      }}
                    >
                      확인하기
                    </DrawerFooterBtn>
                  </DrawerFooterWrapper>
                </DrawerFooter>
              </PermReqDrawerContents>
            </PermReqDrawerModal>
          </DrawerContent>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
