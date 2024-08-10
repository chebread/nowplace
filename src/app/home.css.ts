import {
  DrawerContents,
  DrawerModal,
} from '@/components/bottom-sheet/bottom-sheet.css';
import TextareaAutosize from 'react-textarea-autosize';
import styled, { keyframes } from 'styled-components';

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

export const StyledFooterBtn = styled.button`
  cursor: pointer;
  will-change: transform;
  transition: transform var(--transition);
  &:active {
    transform: var(--btn-scale-small);
  }
  background-color: #ffffff;
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
`;

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const StyledFooterLoadingSpinnerButton = styled(StyledFooterBtn)`
  svg {
    animation: ${spin} 1s ease-in-out infinite;
  }
`;

export const CurPosMarkerBtn = styled.button`
  display: flex;
`;

export const CurPosMarker = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: var(--white) solid 0.125rem;
  box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.35);
  background-color: var(--blue-500); // apple map: rgb(0, 122, 254)
`;

export const AddPlaceDrawerModal = styled(DrawerModal)`
  height: 100%;
  width: 100%;
`;

export const AddPlaceDrawerContents = styled(DrawerContents)`
  height: 100%;
  width: 100%;
`;

export const AddPlaceTextareaWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: #ffffff; // textarea 회색 잔상 제거
`;

export const AddPlaceTextarea = styled(TextareaAutosize)`
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  resize: none;
  border: 0;
  outline: 0;
  overflow: auto;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent; // 비표준
  width: 100%;
`;

export const AddPlaceFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 40rem;
  margin: 0 auto;
`;

export const AddPlaceFooterGradient = styled.div`
  height: 2rem;
  background: linear-gradient(
    to top,
    rgb(255, 255, 255),
    rgba(255, 255, 255, 0)
  );
`;

export const AddPlaceFooterWrapper = styled.div`
  padding: 1rem;
  background-color: #ffffff;
`;

export const AddPlaceFooterBtn = styled.button`
  height: 3rem;
  width: 100%;
  font-weight: 600;
  color: white;
  background-color: var(--app-icon-color-500);
  border-radius: 1rem;
  will-change: transform;
  transition: transform var(--transition);
  &:active {
    transform: var(--btn-scale-large);
  }
`;
