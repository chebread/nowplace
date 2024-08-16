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
    
    /* 앱 아이콘 대표색 */
    --app-icon-color-100: #D9D9D9;
    --app-icon-color-200: #BFBFBF;
    --app-icon-color-300: #8C8C8C;
    --app-icon-color-400: #595959;
    --app-icon-color-500: #262626;

    /* Tailwind color palette */
    ${tailwindColorPalette}

    // transition: background-color var(--transition), color var(--transition);
    /* transform */
    --btn-scale-large: scale(0.96);
    --btn-scale-small: scale(0.86);

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

    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;

    display: block;
    white-space: nowrap; // text로 이루어진 button을 위해 text는 nowrap함
  }

  li,
  ul li {
    margin: 0;
    padding: 0;
    text-indent: 0;
    list-style-type: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;

    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;

    &:active,
    &:hover,
    &:focus {
      background-color: transparent;
      outline: none;
    }
  }

  p {
    margin: 0;
    padding: 0;
  }

  h1 {
    margin: 0;
    padding: 0;
    font-size: 100%;
    font-weight: normal;
    line-height: 1;
  }

  .toaster {
    font-family: var(--font-sans);

    -webkit-touch-callout: none;
    -khtml-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;

export default GlobalStyle;
