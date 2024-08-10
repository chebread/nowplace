import styled from 'styled-components';
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
  height: auto; // default value
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const DrawerContents = styled.div`
  max-width: 40rem;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const DrawerTitle = styled(Drawer.Title)``;

export const DrawerDescription = styled(Drawer.Description)``;
