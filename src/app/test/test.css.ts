import styled from 'styled-components';
import { Drawer } from 'vaul';

export const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const DrawerContent = styled(Drawer.Content)`
  background-color: var(--zinc-100);
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 96%;
  margin-top: 96px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Div1 = styled.div`
  padding: 16px;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  flex: 1 1 0%;
`;

export const Div2 = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 48px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 9999px;
  background-color: var(--zinc-300);
  margin-bottom: 2rem; /* 32px */
`;

export const Div3 = styled.div`
  max-width: 28rem; /* 448px */
  margin-left: auto;
  margin-right: auto;
`;

export const DrawerTitle = styled(Drawer.Title)`
  font-weight: 500;
  margin-bottom: 1rem; /* 16px */
`;

export const P1 = styled.p`
  color: var(--zinc-600);
  margin-bottom: 0.5rem; /* 8px */
`;

export const P2 = styled.p`
  color: var(--zinc-600);
  margin-bottom: 2rem; /* 32px */
`;

export const A1 = styled.a`
  text-decoration-line: underline;
`;

export const A2 = styled.a`
  text-decoration-line: underline;
`;

export const Div4 = styled.div`
  padding: 1rem; /* 16px */
  background-color: var(--zinc-100);
  border-top-width: 1px;
  border-color: var(--zinc-200);
  margin-top: auto;
  background-color: red;
`;

export const Div5 = styled.div`
  display: flex;
  gap: 1.5rem; /* 24px */
  justify-content: flex-end;
  max-width: 28rem; /* 448px */
  margin-left: auto;
  margin-right: auto;
`;

export const A3 = styled.a`
  font-size: 0.75rem; /* 12px */
  line-height: 1rem; /* 16px */
  color: var(--zinc-600);
  display: flex;
  align-items: center;
  gap: 1px;
`;

export const Svg1 = styled.svg`
  width: 0.75rem; /* 12px */
  height: 0.75rem; /* 12px */
  margin-left: 0.25rem; /* 4px */
`;

export const A4 = styled.a`
  font-size: 0.75rem; /* 12px */
  line-height: 1rem; /* 16px */
  color: var(--zinc-600);
  display: flex;
  align-items: center;
  gap: 1px;
`;

export const Svg2 = styled.svg`
  width: 0.75rem; /* 12px */
  height: 0.75rem; /* 12px */
  margin-left: 0.25rem; /* 4px */
`;
