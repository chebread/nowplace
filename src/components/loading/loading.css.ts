import Image from 'next/image';
import styled from 'styled-components';

export const StyledMain = styled.main`
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
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
  height: 2.75rem;
  width: 14.0625rem;
`;
