import styled, { keyframes } from 'styled-components';
import { Drawer } from 'vaul';

/* Drawer */
export const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const DrawerContent = styled(Drawer.Content)`
  /* background-color: var(--zinc-100); */
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 96%; // 크기 결정
  margin-top: 96px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000; // 최상단 위치
  overflow: auto;
`;
export const DrawerModal = styled.div`
  padding: 16px;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  flex: 1 1 0%;
`;
export const DrawerHandleBar = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 48px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 9999px;
  background-color: var(--zinc-300);
  margin-bottom: 2rem;
`;
export const DrawerContents = styled.div`
  max-width: 40rem;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
`;
/* styling */
export const StyledMain = styled.main``;

export const StyledMap = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  z-index: 0;
`;

export const StyledHeader = styled.header`
  position: absolute;
  z-index: 1;
  height: 100px;
  width: 300px;
  backdrop-filter: blur(1.5rem);
  background-color: rgba(255, 255, 255, 0.85);
  svg {
    fill: #000000;
  }
`;

export const StyledFooterLayout = styled.div`
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 4rem; // 64px
  width: 100vw;
  backdrop-filter: blur(1rem);
  -webkit-backdrop-filter: blur(1rem);
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: center;
`;

export const StyledFooter = styled.footer`
  height: 100%;
  width: 40rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 1rem 0 1rem;
`;

export const StyledFooterItem = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledLogo = styled.div`
  svg {
    fill: #000000;
  }
  display: flex; // 공백 제거
`;

export const StyledCopyright = styled.div`
  font-size: 0.7rem;
  line-height: 1;
  color: var(--gray-500); // instagram color: #737373
`;

export const StyledShowMoreBtn = styled.button`
  user-select: none; // text 선택 방지
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const StyledFooterBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledFooterButton = styled.button`
  cursor: pointer;
  will-change: transform;
  transition: transform var(--transition);
  &:active {
    transform: scale(0.86);
  }
  background-color: #ffffff;
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: var(--box-shadow);
`;

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
export const StyledFooterLoadingSpinnerButton = styled(StyledFooterButton)`
  svg {
    animation: ${spin} 1s ease-in-out infinite;
  }
`;
