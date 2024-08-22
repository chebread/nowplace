import Image from 'next/image';
import styled from 'styled-components';

export const StyledMain = styled.main`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000; // 항상 최상단으로 지도 위에 위치 해야하기 때문에 z-index: 10000으로 지정함
  justify-content: center;
  align-items: center;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  background-color: var(--bg);
`;

export const StyledItem = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
`;

export const StyledCenterItem = styled(StyledItem)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledBottomItem = styled(StyledItem)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 0.8rem;
  line-height: 1;
  color: var(--gray-500);
  margin-bottom: 1rem;
`;

export const StyledImage = styled(Image)`
  /* height: 2.75rem;
  width: 14.0625rem; */
  height: 10rem;
  width: 10rem;
`;
