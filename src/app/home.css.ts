import styled, { keyframes } from 'styled-components';
import { Drawer } from 'vaul';

export const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.4);
`;

export const DrawerContent = styled(Drawer.Content)`
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity)) /* #ffffff */;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 96%; // max-height: 96%
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const DrawerHeader = styled.header`
  background-color: #ffffff;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const DrawerHandlebarWrapper = styled(Drawer.Close)`
  width: 100%;
  padding: 1rem;
  cursor: ns-resize;
`;

export const DrawerHandlebar = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 48px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 9999px;
  background-color: var(--zinc-300);
`;

export const DrawerModal = styled.div`
  height: 100%; // height: auto; // default value
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: seagreen;
`;

export const DrawerContents = styled.div`
  /* max-width: 40rem; */
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const DrawerTitle = styled(Drawer.Title)``;

export const DrawerDescription = styled(Drawer.Description)``;

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
  position: absolute; // - [ ] safari에서 주소창 때문에 가려짐. 근데 sticky 쓰면 되긴 하는데 그러면 100vh 이상해짐
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
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
