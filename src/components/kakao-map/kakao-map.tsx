import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import KaKaoMapError from './kakao-map-error';
import useLongPress from '@/utils/use-long-press';
import { useRef, useState } from 'react';

// 만약 아예 권한조차 허락받지 않은 사용자라면 버튼으로하여금 허락을 요청하기 => 메뉴얼
// - [ ] 길게 누르면 장소 추가 기능 만들기
// 안되면, 클릭을 해서 modal 띄워서 지도 추가하기

export default function KakaoMap(props: any) {
  const mapRef = useRef<any>();
  const defaultLevel = 5; // 상수 선언 => 추후 변경값이면 useRef로 Wrapping 하기
  const defaultCenter = { lat: 37.575857, lng: 126.976805 }; // { lat: 36.3677, lng: 127.4365 };
  const [_, error]: any = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  });
  const [latlng, setLatlng] = useState({});

  const handleLongPress = (e: any) => {
    console.log('long press', latlng);
  };
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(
    handleLongPress,
    () => {},
    defaultOptions
  );

  const handleMouseDown = (map: any, mouseEvent: any) => {
    const latLng = mouseEvent.latLng;
    setLatlng({
      lat: latLng.getLat(),
      lng: latLng.getLng(),
    });
  };

  if (error) return <KaKaoMapError />;

  return (
    <>
      <Map
        ref={mapRef}
        style={{
          height: '100%',
          width: '100%',
        }}
        isPanto // 이동시 부드럽게
        level={props?.level || defaultLevel} // - [ ] props.level number로 제한하기
        center={props?.center || defaultCenter}
        onDragEnd={map => {
          props?.onDragEnd(map);
          // stopLongPress(); // - [ ] longpress 지우기
        }}
        onZoomStart={props?.onZoomStart || undefined}
        onDragStart={props?.onDragStart || undefined}
        /* 장소 추가 */
        {...longPressEvent}
        onCreate={map => {
          kakao.maps.event.addListener(map, 'mousedown', (mouseEvent: any) =>
            handleMouseDown(map, mouseEvent)
          );
        }}
      >
        {props.children}
      </Map>
    </>
  );
}

// 위치 정보 및 데이터 로드로 인한 로딩 화면
