'use client';

import { Drawer } from 'vaul';
import BottomSheet from '@/components/bottom-sheet';
import {
  Contents,
  DrawerContent,
  DrawerOverlay,
  DrawerTitle,
  HandleBar,
  Modal,
  Main,
} from './test.css';

function Test() {
  return (
    <Main>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
          <button>Open Drawer</button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <DrawerOverlay />
          <DrawerContent>
            <Modal>
              <HandleBar />
              <Contents>
                <DrawerTitle>Unstyled drawer for React.</DrawerTitle>
              </Contents>
            </Modal>
          </DrawerContent>
        </Drawer.Portal>
      </Drawer.Root>
    </Main>
  );
}

export default Test;
