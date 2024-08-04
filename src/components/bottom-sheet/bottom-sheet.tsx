import React from 'react';
import { Drawer } from 'vaul';
import {
  DrawerContents,
  DrawerContent,
  DrawerOverlay,
  DrawerHandleBar,
  DrawerModal,
} from './bottom-sheet.css';

export default function BottomSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  const [triggerChildren, contentsChildren] = React.Children.toArray(children);

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>{triggerChildren}</Drawer.Trigger>
      <Drawer.Portal>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerModal>
            <DrawerHandleBar />
            <DrawerContents>{contentsChildren}</DrawerContents>
          </DrawerModal>
        </DrawerContent>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
