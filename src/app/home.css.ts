import styled from 'styled-components';

export const StyledMain = styled.main``;

export const StyledMap = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
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
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 4rem; // 64px
  width: 100vw;
  backdrop-filter: blur(1rem);
  background-color: rgba(255, 255, 255, 0.85);
`;

export const StyledFooter = styled.footer`
  margin: 0 auto;
  height: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledFooterItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLogo = styled.div`
  svg {
    fill: #000000;
  }
  display: flex; // 공백 제거
`;

export const StyledCopyright = styled.div`
  font-size: 0.8rem;
  line-height: 1;
  color: var(--rose-400);
`;
