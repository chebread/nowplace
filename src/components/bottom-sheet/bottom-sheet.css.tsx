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
  margin-bottom: 2rem; /* 32px */
`;

export const DrawerContents = styled.div`
  max-width: 28rem; /* 448px */
  margin-left: auto;
  margin-right: auto;
`;
