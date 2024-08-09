import { Map, MapComponent } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

export const StyledMap: MapComponent = styled(Map)`
  // MapComponent는 Map(sdks)의 ts-type임
  height: 100%;
  width: 100%;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;
