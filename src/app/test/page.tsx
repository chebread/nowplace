'use client';

import { Drawer } from 'vaul';
import {
  A1,
  A2,
  A3,
  A4,
  Div1,
  Div2,
  Div3,
  Div4,
  Div5,
  DrawerContent,
  DrawerOverlay,
  DrawerTitle,
  P1,
  P2,
  Svg1,
  Svg2,
} from './test.css';

function Test() {
  return (
    <>
      <h1>test</h1>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
          <button>Open Drawer</button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <DrawerOverlay />
          <DrawerContent>
            <Div1>
              <Div2 />
              <Div3>
                <DrawerTitle>Unstyled drawer for React.</DrawerTitle>
                {/* <P1>
                  This component can be used as a replacement for a Dialog on
                  mobile and tablet devices.
                </P1>
                <P2>
                  It uses{' '}
                  <A1
                    href="https://www.radix-ui.com/docs/primitives/components/dialog"
                    target="_blank"
                  >
                    Radix&apos;s Dialog primitive
                  </A1>{' '}
                  under the hood and is inspired by{' '}
                  <A2
                    href="https://twitter.com/devongovett/status/1674470185783402496"
                    target="_blank"
                  >
                    this tweet.
                  </A2>
                </P2> */}
              </Div3>
            </Div1>
            {/* <Div4>
              <Div5>
                <A3 href="https://github.com/emilkowalski/vaul" target="_blank">
                  GitHub
                  <Svg1
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </Svg1>
                </A3>
                <A4 href="https://twitter.com/emilkowalski_" target="_blank">
                  Twitter
                  <Svg2
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </Svg2>
                </A4>
              </Div5>
            </Div4> */}
          </DrawerContent>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

export default Test;
