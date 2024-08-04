import { useKakaoLoader } from 'react-kakao-maps-sdk';
import KaKaoMapError from './kakao-map-error';
import { StyledMap } from './kakao-map.css';

export default function KakaoMap(props: any) {
  const defaultLevel = 5; // 상수 선언 => 추후 변경값이면 useRef로 Wrapping 하기
  const defaultCenter = { lat: 36.3677, lng: 127.4365 };
  const [_, error]: any = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
    // ...options,
  });

  if (error) return <KaKaoMapError />;

  return (
    <StyledMap
      isPanto // 이동시 부드럽게
      level={props?.level || defaultLevel} // - [ ] props.level number로 제한하기
      center={props?.center || defaultCenter}
    >
      {props.children}
    </StyledMap>
  );
}
