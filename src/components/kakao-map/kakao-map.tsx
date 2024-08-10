import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import KaKaoMapError from './kakao-map-error';
import { useRef } from 'react';
import { StyledMap } from './kakao-map.css';

export default function KakaoMap(props: any) {
  const mapRef = useRef<any>();
  const defaultLevel = 5; // 상수 선언 => 추후 변경값이면 useRef로 Wrapping 하기
  const defaultCenter = { lat: 37.575857, lng: 126.976805 }; // { lat: 36.3677, lng: 127.4365 };
  const [_, error]: any = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  if (error) return <KaKaoMapError />;

  return (
    <>
      <StyledMap
        ref={mapRef}
        isPanto // 이동시 부드럽게
        /* 장소 추가 */
        disableDoubleClickZoom // double click 막기
        onDoubleClick={props?.onDoubleClick || undefined}
        // onBoundsChanged={props?.onBoundsChanged || undefined}
        /* 현재 위치 */
        level={props?.level || defaultLevel}
        center={props?.center || defaultCenter}
        onDragEnd={(map: any) => {
          props?.onDragEnd(map); // drag 종료시 center 값 변경
          // stopLongPress(); // - [ ] longpress 지우기
        }}
        onZoomChanged={(map: any) => {
          props?.onDragEnd(map); // zoom 종료시 center 값 변경
        }} // zoom 바뀌면 onDragEnd 인식 못하는 문제 대응
        onZoomStart={props?.onZoomStart || undefined}
        onDragStart={props?.onDragStart || undefined}
      >
        {props.children}
      </StyledMap>
    </>
  );
}

// 위치 정보 및 데이터 로드로 인한 로딩 화면
