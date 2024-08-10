// global.css

'use client';

import { createGlobalStyle } from 'styled-components';
import reset from './reset.css'; // temporary code
import tailwindColorPalette from './tailwind-color-palette.css';

const GlobalStyle = createGlobalStyle`
  ${reset} // later this code must be below 'reset code'

  :root {
    --100vh: calc(var(--vh, 1vh) * 100);

    /* Typography */
    --font-sans: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Roboto',
      'Helvetica Neue', sans-serif;
    --font-mono: var(--font-geist-mono), 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo',
      monospace;

    /* Colors */
    --white: #ffffff;
    --black: #000000;
    --bg: var(--white);
    --fg: var(--black);

    /* Tailwind color palette */
    ${tailwindColorPalette}

    // transition: background-color var(--transition), color var(--transition);
    /* Transitions */
    --transition: 0.2s ease-out;
    --transition-slow: 0.3s ease-out;

    /* animation-duration: 0.2s;
    animation-timing-function: ease-out;
    animation-name: smooth;

    @keyframes smooth {
      from {
        opacity: 0;
        transform: scale(0);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    transition-property: transform;
    transition-duration: 0.2s;
    transition-timing-function: ease-out; */

    /* */
    --box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
  }

  [data-theme='dark'] {
    /* Colors */
    --bg: #000000;
    --fg: #ffffff;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    background: var(--bg);
    color: var(--fg);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 110%;
    font-size: 16px; // 1rem = 16px
    line-height: 1.55em;

  }

  body {
    min-height: 100vh;
    font-family: var(--font-sans);
    display: flex;
    flex-direction: column;
    position: relative;
  }
  // reset codes
  pre,
  code {
    font-family: var(--font-mono);
  }

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    -webkit-tap-highlight-color: transparent; // 비표준
    
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  textarea {
    
  }

  .toaster {
    font-family: var(--font-sans);
    
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;

export default GlobalStyle;
