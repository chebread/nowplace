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

export const CurPosMarker = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: var(--white) solid 0.125rem;
  box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.35);
  background-color: var(--blue-500); // apple map: rgb(0, 122, 254)
`;
