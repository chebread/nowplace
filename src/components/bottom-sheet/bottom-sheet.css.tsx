import styled from 'styled-components';
import { Drawer } from 'vaul';

export const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0 0 0 / 0.4);
`;

export const DrawerContent = styled(Drawer.Content)`
  background-color: #ffffff;
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
  padding: 0 1rem 0 1rem; // 1rem left, right 띄움
  box-sizing: border-box;
`;

export const DrawerContents = styled.div`
  position: relative;
  max-width: 40rem;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  white-space: pre-wrap; // 이거 해야지 \n이 개행됨
`;

export const DrawerTitle = styled(Drawer.Title)`
  display: none;
`;

export const DrawerDescription = styled(Drawer.Description)`
  display: none;
`;

export const DrawerCopyright = () => {
  const copyright = `© ${new Date().getFullYear()} Cha Haneum`;

  return <>{copyright}</>;
};

/* nested */

export const DrawerNestedOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0px;
  background-color: rgb(0 0 0 / 0.4);
`;

export const DrawerNestedContent = styled(Drawer.Content)`
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity)) /* #f3f4f6 */;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 100%;
  margin-top: 6rem; /* 96px */
  max-height: 94%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
`;

export const DrawerNestedHeader = styled.header`
  background-color: #ffffff;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const DrawerNestedHandlebarWrapper = styled(Drawer.Close)`
  width: 100%;
  padding: 1rem;
  cursor: ns-resize;
`;

export const DrawerNestedHandlebar = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 48px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 9999px;
  background-color: var(--zinc-300);
`;

export const DrawerNestedModal = styled.div`
  padding: 1rem /* 16px */;
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity)) /* #ffffff */;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  flex: 1 1 0%;
`;

export const DrawerNestedContents = styled.div`
  max-width: 28rem /* 448px */;
  margin-left: auto;
  margin-right: auto;
`;
