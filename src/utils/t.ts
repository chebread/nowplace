const defaultLevel = 5; // 상수 선언 => 추후 변경값이면 useRef로 Wrapping 하기
const defaultCenter = { lat: 36.3677, lng: 127.4365 };
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: Infinity,
  maximumAge: 0,
};
const [location, setLocation] = useState<{
  lat: number;
  lng: number;
}>();
const [mounted, setMounted] = useState<boolean>();

const showSuccess = (coords: any) => {
  const { latitude, longitude } = coords;
  setLocation({ lat: latitude, lng: longitude });
};
const showError = (error: any) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      toast.error('Geolocation API의 사용이 거부되었습니다.');
      break;
    case error.POSITION_UNAVAILABLE:
      toast.error('가져온 위치 정보를 사용할 수 없습니다.');
      break;
    case error.TIMEOUT:
      toast.error('위치 정보를 가져오기 위한 요청이 허용 시간을 초과했습니다.');
      break;
    default:
      toast.error('위치를 가져오는 과정에서 알 수 없는 오류가 발생했습니다.');
      break;
  }
};

useEffect(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => showSuccess(coords),
      error => showError(error),
      geolocationOptions
    );
  } else {
    // geolocation 지원하지 않음
    setLocation(defaultCenter);
  }
}, []);
useEffect(() => {
  // Fetch data from API if `location` object is set
  if (location) {
    console.log('onload', location);
    setMounted(true);
    // 이거하기 전까지는 로딩창 띄우기
  }
}, [location]);

import { useKakaoLoader } from 'react-kakao-maps-sdk';
import KaKaoMapError from './kakao-map-error';
import { StyledMap } from './kakao-map.css';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// 이거 코드 page 로 다 옮기기
// 만약 아예 권한조차 허락받지 않은 사용자라면 버튼으로하여금 허락을 요청하기

export default function KakaoMap(props: any) {
  const defaultLevel = 5; // 상수 선언 => 추후 변경값이면 useRef로 Wrapping 하기
  const defaultCenter = { lat: 36.3677, lng: 127.4365 };
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  };
  const [_, error]: any = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
    // ...options,
  });
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const [mounted, setMounted] = useState<boolean>();

  useEffect(() => {
    const showSuccess = (coords: any) => {
      const { latitude, longitude } = coords;
      setLocation({ lat: latitude, lng: longitude });
    };
    const showError = (error: any) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          toast.error('Geolocation API의 사용이 거부되었습니다.');
          break;
        case error.POSITION_UNAVAILABLE:
          toast.error('가져온 위치 정보를 사용할 수 없습니다.');
          break;
        case error.TIMEOUT:
          toast.error(
            '위치 정보를 가져오기 위한 요청이 허용 시간을 초과했습니다.'
          );
          break;
        default:
          toast.error(
            '위치를 가져오는 과정에서 알 수 없는 오류가 발생했습니다.'
          );
          break;
      }
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => showSuccess(coords),
        error => showError(error),
        geolocationOptions
      );
    } else {
      // geolocation 지원하지 않음
      setLocation(defaultCenter);
    }
  }, []);

  useEffect(() => {
    // Fetch data from API if `location` object is set
    if (location) {
      console.log('onload', location);
      setMounted(true);
      // 이거하기 전까지는 로딩창 띄우기
    }
  }, [location]);

  if (error) return <KaKaoMapError />;

  return false ? (
    <StyledMap
      isPanto // 이동시 부드럽게
      level={props?.level || defaultLevel} // - [ ] props.level number로 제한하기
      center={location || defaultCenter}
    >
      {props.children}
    </StyledMap>
  ) : (
    // 위치 정보 및 데이터 로드로 인한 로딩 화면
    <>
      <h1>Loading</h1>
    </>
  );
}
