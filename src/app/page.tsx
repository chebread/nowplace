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
// 데이터 관련은 모두 Data~로 명명함
// - [ ] 위치를 URL에 저장하기 / 삭제하기 / 조회하기 (조회는 처음 마운트 될때)
// - [ ] fetchedData에서 특정 id 객체를 삭제하는 코드 작성하기
// 그리고 데이터 로딩은 항상 Url에 반영시키는 것임. url이 그냥 state고 storage임. 모든 것은 url storage를 사용함
// - [ ] 버그. 만약 Url이 손상되어 버리면 데이터 로드가 절대 안됨 => 그냥 오류 나면 ''로 처리하자!!
// - [ ] 장소를 추가하면 다시 handle... 그거 마커 로드 하는 코드 실행하기
// - [ ] 장소 추가하면 왜 handle... 그거 왜 실행됨?
// const saveData = (position: any, content: any) => {
//   // ?data={UUID(id): { ... }, UUID: { ... }](base64)
//   const fetchedData: any = fetchDataFromUrl('data');
// 이 코드 때문에 그럼 그러므로 saveData 하고 바로 밑에 handle그거 하자!!
// 로드 된 이후에 주소창에서 데이터 삭제해도 일단은 새로고침 이전까지는 남아있다
// - [v] 심각한 문제: querystring의 값이 즉각적으로 반영이 안되고 있다. => 임시 방편으로 해결 완료
// - [v] 마커 클릭시 content, delete 모달 만들기
// - [ ] 더보기 꾸미기
// - [v] Loading 창 안 곂치는 거 수정하기
// - [ ] 현재 위치 저장시 도로명 주소도 함께 저장하기
// - [v] 마커 꾸미기
// - [ ] mobile 100vh 안되는 거 수정하기
// - [v] 모든 데이터 삭제 기능
// - [v] 모바일에서 이거 때문에 계속 close... 함수 실행됨. 아니 근데 왜 Drawer.Root이게 화면상에서 없어지지 아니하는가? */ => 일시적 오류 였나봄
// - [ ] 서비스 약관 관련은 nested 쓰기 또는 notion 연결하기
// - [ ] 특정 마커 클릭시 장소 공유 기능 => url 공유 인데, 그냥 그 장소만을 내포하는 url임
// - [ ] 저장한 모든 장소 공유하기 => 지금 현재 url을 복사함
// - [ ] 거부 했다가 다시 승인하면 이게 바로 반영이 안되는 이슈가 있지만, 이 지역 검색은 잘 뜨기는 함. 일단 보류 해놓기

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
import SvgCurrentPin from '@/assets/icons/current-pin.svg';
import SvgSearch from '@/assets/icons/search.svg';
import SvgPlacePin from '@/assets/icons/place-pin.svg';
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
  PlaceMarker,
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
import { isNil, isNotNil } from 'es-toolkit/predicate';
import { omit } from 'es-toolkit';
import Link from 'next/link';
import CopyToClipboard from 'react-copy-to-clipboard';
import getAllUrl from '@/utils/getAllUrls';

export default function Home() {
  const [allUrl, setAllUrl] = useState('');
  const copyright = `© ${new Date().getFullYear()} Cha Haneum`;
  /* toggle */
  const [mapMovedToggle, setMapMovedToggle] = useState(false); // 움직임 발생시
  const [fetchDataToggle, setFetchDataToggle] = useState(false);
  const [dataToAddToggle, setDataToAddToggle] = useState(false); // 장소 추가시 바텀시트 작동 Toggle
  /* 데이터 */
  const [curAdminDongAddr, setCurAdminDongAddr] = useState(); // 현재 행정동 위치를 담는 값
  const [selectedMarkerToggle, setSelectedMarkerToggle] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState<any>(); // clickedMarker
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [contentData, setContentData] = useState<string>();
  const dataToAddTextareaRef = useRef<any>(null);
  const [dataToAddPos, setDataToAddPos] = useState<any>();
  // const [hasVisited, setHasVisited] = useState(false); // 첫 방문자면 도움말 뜨기 // localStorage 사용
  const [isDataLoading, setIsDataLoading] = useState(true); // data loading // default value = true
  const [markers, setMarkers] = useState([]);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  /* 위치 */
  const [mapRef, setMapRef] = useState<any>();
  // const mapRef = useRef<any>();
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
  const closeDataToAddBottomSheet = () => {
    setDataToAddToggle(false);
    setDataToAddPos(undefined);
    setContentData(undefined);
  };
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
  // 특정 QueryString 제거
  // 다른 말로는 모든 data값 초기화
  // - [ ] 모든 데이터 초기화하는 기능 만들기
  const deleteQueryString = useCallback(
    // ?data= 라는 것을 전체를 삭제한 값을 문자열로 반환하는 코드임
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key); // 이제 쿼리 문자열이 'bar=2'

      return params.toString();
    },
    [searchParams]
  );
  // Base64 데이터 가져오기
  // 손상된 데이터(빈 값도 포함)가 발생시 null 반환함
  const fetchDataFromUrl = (key: string) => {
    // - [ ] 지금 오류는 saveData에서만 일어남. 일단 임시로 fetchDataFromUrl을 saveData에서 handleBounds할때 쓰는게 아니고, 일단 saveData에서 생성한 데이터를 가지고 handBoudns에서 사용하도록 함
    // const searchParams = new URLSearchParams(window.location.search);
    // console.log('xxx', searchParams); // - [ ] 이게 useState같은 거라서 바로 반영이 안됨. 렌더링 한다음에 반영해야함.
    let returnValue = null;
    console.log(10000);
    const params: any = searchParams.get(key); // key is parameter key
    console.log(20000);
    try {
      console.log(30000);
      const fetchedData: any =
        isNil(params) || params === '' // null or undefined or '' (선언안됨) 이면 null로 처리함
          ? null
          : base64ArrayDecoder(params); // decode
      returnValue = fetchedData;
    } catch (error) {
      console.log(40000);
      returnValue = null;
    }
    console.log(50000);
    return returnValue;
  };
  // URL에 Base64 데이터 저장하기
  const saveDataToUrl = (key: string, value: string) => {
    // key는 QueryString key
    // value는 QueryString value
    router.push(pathname + '?' + createQueryString(key, value));
  };
  // URL에 특정 데이터 제거
  const removeDataToUrl = (data: any, key: string[]) => {
    // data는 지울 데이터
    // key = ['ksjfslfjfjlsjfkl', 'sdfjsflsjldfjslk', ...]
    const removedData: any = omit(data, key); // 지울 key가 없으면 원본 반환
    // - [ ] 원본 반환시는 saveDataToUrl 함수를 실행 안하도록 해야하나?
    const dataToSave: any = base64ArrayEncoder(removedData); // 재저장
    saveDataToUrl('data', dataToSave);
  };
  // 마커 데이터 저장
  // - [ ] 에러 판단해야함 => fetch... 거기서 데이터 손상 확인
  const saveData = (position: any, content: any) => {
    /* 도로명 주소 저장 */
    let lotAddr: any; // 지번 주소
    let roadAddr: any; // 도로명 주소
    // if (mapRef.current)는 할필요가 없음. 이미 mapRef.current가 불러오고 home page가 렌더링되기 때문임
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      position.lng,
      position.lat,
      (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log('지번 주소: ' + result[0]?.address?.address_name);
          console.log('도로명 주소: ' + result[0]?.road_address?.address_name);
          lotAddr = result[0]?.address?.address_name; // 지번 주소
          roadAddr = result[0]?.road_address?.address_name; // 도로명 주소
        }
        // 순차적으로 실행되기 위하여 callback 내부에 작성함
        const fetchedData: any = fetchDataFromUrl('data'); // {id: {  ..., position: { lat: ..., lng: ... }, content: ... }, id: { ... }, ... ]
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
        console.log(data);
        const mergedData: any = { ...fetchedData, ...data }; // fetchData와 병합
        const dataToSave = base64ArrayEncoder(mergedData); // encode
        saveDataToUrl('data', dataToSave); // 데이터 url에 저장하기 // 바로 즉각 반영이 느림
        console.log('저장을 완료했습니다');
        // handleBoundsChanged(); // - [ ] 데이터 없을때 저장시에 이게 실행이 안됨
        /* 임시 코드 */ // - [ ] get querystring이 한 번 늦게 반영되는 문제.
        // 아니 근데, 늦게 반영되던 말던, saveData에서는 handleBoundsChanged() 함수는 너무 비효율적임. 임시코드가 더 효율적임.
        const fetchedMarkers = transformObjectToArray(mergedData);
        const map: kakao.maps.Map = mapRef;
        console.log('mapRefState 테스트', mapRef);

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
  // - [ ] 마커 누르면 삭제 기능도 만들기 (모달로 하여금)
  const removeData = (ids: string[]) => {
    // - [ ] removeDataUrl이 안되는 듯 함. JTdCJTdE 이런거 남음 뭐인가? JTdCJTdE = {} 임.
    // 여러 id도 가능
    const fetchedData: any = fetchDataFromUrl('data');
    if (isNil(fetchedData)) return; // 데이터 손상시 함수 종료
    // removeDataToUrl(fetchedData, ids); // 새로고침 때문에 이거 안쓰는게 더 나을듯.
    const removedData: any = omit(fetchedData, ids); // 지울 key가 없으면 원본 반환
    // - [x] 원본 반환시는 saveDataToUrl 함수를 실행 안하도록 해야하나? => 아니 removeData는 원본 반환을 가질 수가 없다.
    const dataToSave: any = base64ArrayEncoder(removedData); // 재저장
    saveDataToUrl('data', dataToSave);
    // 새로고침
    // handleBoundsChanged();
    /* 임시 코드 */
    const fetchedMarkers = transformObjectToArray(removedData);
    const map: kakao.maps.Map = mapRef;
    console.log('mapRefState 테스트', mapRef);
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
  /* useEffect */
  // 특정 지역 내에서만 데이터 불러오기
  function transformObjectToArray(obj: any) {
    return Object.entries(obj).map(([id, value]: [any, any]) => ({
      id,
      ...value,
    }));
  }
  // bounds라는 것은 현재 지도의 영역이 바뀌면 동작되는 것임: 지도 영역이 변경되면 발생한다
  // 그러므로 handle~~ 이 함수는 내가 "이 지역 검색" 클릭시에만 작동되면 아주 아주 좋게 될 듯
  // 그리고 처음 로드시에는 handle... 이 함수 실행해야함
  const handleBoundsChanged = () => {
    console.log(2);
    const fetchedData: any = fetchDataFromUrl('data');
    //console.log(fetchedData);

    if (isNil(fetchedData)) {
      console.log('오류 발생이거나, 데이터에 아무런 값이 없습니다');
      setFetchDataToggle(false); // 읽어들이는 중... 그거 없엠
      setMapMovedToggle(false);
      return;
    }
    const fetchedMarkers = transformObjectToArray(fetchedData);
    const map: kakao.maps.Map = mapRef;
    console.log('mapRefState 테스트', mapRef);
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
    setFetchDataToggle(false); // 읽어들이는 중... 그거 없엠
    setMapMovedToggle(false); // - [ ] 이거 초기에 실행하는데 문제 없겠지?
    console.log(3);
  };

  /* 처음 로드시 현재 위치의 데이터 불러오기 */
  // - [*] 심각한 버그. prompt에서 denined이면 잘 표시가 됨. 그러나 태초부터 denied이면 아예 실행이 안됨. 계속 로딩 페이지에 머물러 있음.
  // - [*] 이유는 mapRef의 값이 변경이 즉각 되지 않아서임. 근데 이게 왜 그런지는 모름. 그래서 그냥 이 코드는 onCreate 내부에 위치했음
  // - [*] onCreate 내부 위치도 그렇지 좋지는 않음. 값이 계속 바뀌기 때문에.
  // 일단 mapRef가 kakao.map

  useEffect(() => {
    // 지도가 로드된 후 이 코드가 실행됩니다
    if (mapRef) {
      console.log('mapRefState 테스트', mapRef);
      //  kakao.maps.Map 사용 가능 지역
      handleBoundsChanged(); // - [ ] 아 근데, footer가 4rem 차지해서, 그 부분에 마커가 있으면 로드가 되긴 함. 어쩔 수 없음.
      setIsDataLoading(false);
    }
    // - [ ] 근데 mapRef.current로 추적하는게 맞나? => 맞나봄
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef]); // - [ ] mapRef는 setMapRefState(map)이라는 코드가 onCreate에 존재시 동작함, window.kakao도 되기는 함. 그냥 useEffect의 의존성에는 ref값을 넣지 말자.
  // 행정동 주소 변경
  const updateAdminDongAddr = (position: any) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(position.lng, position.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          // - [ ] 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
            const adminDongAddr: any = result[i].address_name;
            console.log('행정동', adminDongAddr);
            setCurAdminDongAddr(adminDongAddr);
            break;
          }
        }
      }
    });
  };
  // 초기 행정동 불러오기
  useEffect(() => {
    if (mapRef) {
      console.log('mapRefState 테스트', mapRef);
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
    /* 행정동 주소 검색 */
    updateAdminDongAddr({
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
      /* 행정동 주소 검색 */
      updateAdminDongAddr({
        lat: curPos.lat,
        lng: curPos.lng,
      });
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
      // setGeoPermission('prompt'); // 필요하지는 않음 prompt한 상태는 로딩 상태에서 이미 받을 것임. geoPermission의 상태는 거부와 승인 이 두개만 존재함.
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
          console.log('denied됨v1');
          // 만약에 여기서 updateAdminAddr을 하게 되면 거부로 변경시 주소도 defaultCenter의 주소를 가져오게 된다.
          // 그냥 useEffect를 사용하는게 가장 효율적일 듯 하긴 하다.
        }
      );
    }
    if (state === 'denied') {
      setGeoPermission('denied');
      // console.log('위치 액세스가 거부되었습니다.');
      stopWatchingPosition();
      console.log('denied됨v2');
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
  useEffect(() => {
    /* 위치 추적 기능 */
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
                  }}
                >
                  <SvgPlacePin />
                </PlaceMarker>
              </CustomOverlayMap>
            ))}

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
          {/* 장소 마커 바텀 시트 */}
          {/* closed될때 focused 되는 이유는? */}
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
                      <h1>도로명 주소</h1>
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
                      <DrawerTitle />
                      <DrawerDescription />

                      <ul>
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
                                // quit bottom sheet
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
                                return '';
                            }
                          })()}
                        </li>
                        <></>
                        <h2>이용 안내</h2>
                        <li>
                          <Link href="usage-guide">사용법</Link>
                        </li>
                        <li>
                          <Link href="mailto:fromhaneum">
                            문의하기: fromhaneum@gmail.com
                          </Link>
                        </li>
                        <></>
                        <h2>서비스 안내</h2>
                        <li>서비스 이용 약관</li>
                        <li>개인정보 취급 방침</li>
                      </ul>
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
