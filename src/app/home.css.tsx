import {
  DrawerContents,
  DrawerModal,
} from '@/components/bottom-sheet/bottom-sheet.css';
import Link from 'next/link';
import TextareaAutosize from 'react-textarea-autosize';
import styled, { keyframes } from 'styled-components';

export const StyledMain = styled.main`
  position: relative;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const StyledMap = styled.div`
  height: 100%;
  width: 100%;
  z-index: 0;
`;

export const StyledHeaderLayout = styled.div``;

export const StyledHeader = styled.header`
  margin: 0.5rem 1rem 0rem 1rem;
  backdrop-filter: blur(1rem);
  -webkit-backdrop-filter: blur(1rem);
  background-color: rgba(255, 255, 255, 0.85);
  height: 4rem;
  max-width: 40rem;
  width: 100%;
  z-index: 0;
  padding: 1rem;
  box-sizing: border-box;
  z-index: 1;
  border-radius: 1rem;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.08);
`;

// PlaceFetcher로 하면x, 데이터를 불러오는 거라고 명명해야함
export const DataFetcherBtnWrapper = styled.div`
  position: absolute;
  top: 0;

  margin: 1rem;
  @media screen and (max-width: 641px) {
    margin: 0.5rem;
  }

  will-change: transform;
  z-index: 1;

  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  animation-duration: 0.2s;
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
`;

export const DataFetcherBtn = styled.button`
  all: unset;
  cursor: pointer;
  will-change: transform;

  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:active {
    transform: scale(0.86);
  }
  padding: 1rem 1rem 1rem 1rem;

  backdrop-filter: blur(1rem);
  -webkit-backdrop-filter: blur(1rem);
  background-color: rgba(255, 255, 255, 0.85);

  /* height: 3.5rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
  font-weight: 500;
  line-height: 1.5;

  white-space: normal;
  overflow-wrap: break-word;
  word-break: normal;

  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all; */ // - [ ] 말 줄임표 속성 적용 안됨
`;

export const StyledFooterLayout = styled.div`
  position: absolute; // - [ ] safari에서 주소창 때문에 가려짐. 근데 sticky 쓰면 되긴 하는데 그러면 100vh 이상해짐
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: auto;
  width: 100%;
  backdrop-filter: blur(1rem);
  -webkit-backdrop-filter: blur(1rem);
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: center;
`;

export const StyledFooter = styled.footer`
  height: 4rem;
  max-width: 40rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 1rem 0 1rem;
`;

export const StyledFooterItem = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledLogo = styled.div`
  svg {
    fill: #000000;
  }

  display: flex; // 공백 제거
`;

export const StyledCopyright = styled.div`
  font-size: 0.7rem;
  @media screen and (max-width: 641px) {
    font-size: 0.6rem;
  }
  line-height: 1;
  color: var(--gray-500); // instagram color: #737373
`;

export const StyledShowMoreBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const StyledFooterBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledFooterBtn = styled.button`
  cursor: pointer;
  will-change: transform;
  transition: transform var(--transition);
  &:active {
    transform: var(--btn-scale-small);
  }
  background-color: #ffffff;
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
`;

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const StyledFooterLoadingSpinnerButton = styled(StyledFooterBtn)`
  svg {
    animation: ${spin} 1s ease-in-out infinite;
  }
`;

export const CurPosMarkerBtn = styled.button`
  display: flex;

  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-touch-callout: none;
  -khtml-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const CurPosMarker = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: var(--white) solid 0.125rem;
  box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.35);
  background-color: var(--blue-500); // apple map: rgb(0, 122, 254)
`;

export const PlaceMarker = styled.div`
  display: flex;

  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-touch-callout: none;
  -khtml-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const DataToAddDrawerModal = styled(DrawerModal)`
  height: 100%;
  width: 100%;
`;

export const DataToAddDrawerContents = styled(DrawerContents)`
  height: 100%;
  width: 100%;
`;

export const DataToAddTextareaWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: #ffffff; // textarea 회색 잔상 제거
`;

export const DataToAddTextarea = styled(TextareaAutosize)`
  white-space: normal;
  overflow-wrap: break-word;
  word-break: normal;
  resize: none;
  border: 0;
  outline: 0;
  overflow: auto;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 100%;

  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
  line-height: 1.5;
  font-weight: 500;
`;

export const ShowMoreDrawerModal = styled(DrawerModal)`
  height: auto;
  width: 100%;
`;

export const ShowMoreDrawerContents = styled(DrawerContents)`
  height: auto;
  width: 100%;
`;

export const ShowMoreDrawerList = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0 4rem 0;
`;

export const ShowMoreDrawerCategory = styled.div`
  padding: 2.35rem 0 0.5rem 0;
  color: var(--gray-600);
  font-weight: 500;
  font-size: 0.9rem;
  @media screen and (max-width: 641px) {
    font-size: 0.8rem;
  }
  line-height: 1;
`;

export const ShowMoreDrawerItem = styled.li``;

export const ShowMoreDrawerBtn = styled.button`
  // - [ ] styled.button으로 하면 width가 inherit로 바뀜
  padding: 0.75rem 0 0.75rem 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
  line-height: 1;
  width: 100%;
  text-align: left; // width: 100%시에 중앙 정렬되는것 방지
`;

export const ShowMoreDrawerLink = styled(Link)`
  display: block;
  padding: 0.75rem 0 0.75rem 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
  line-height: 1;
`;

export const ShowMoreDrawerDetailedBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0.75rem 0 0.75rem 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
  line-height: 1;
`; // 현재 상태를 함께 표시하는 버튼

export const ShowMoreDrawerGeoPermStatusInd = styled.p`
  color: var(--gray-500);
  font-weight: 400;
`;

export const ShowMoreDrawerRemoveAllPlacesBtn = styled(ShowMoreDrawerBtn)`
  color: var(--red-600);
`;

export const ShowMoreCopyright = styled.div`
  padding: 2.35rem 0 0 0;
  color: var(--gray-500);
  font-size: 0.8rem;
  @media screen and (max-width: 641px) {
    font-size: 0.7rem;
  }
  line-height: 1;
`;

export const PermReqDrawerModal = styled(DrawerModal)``;

export const PermReqDrawerContents = styled(DrawerContents)`
  padding: 0 0 7rem 0;
`;

export const PermReqDrawerTitle = styled.h1`
  font-size: 2rem;
  @media screen and (max-width: 641px) {
    font-size: 1.8rem; // -2
  }
  line-height: 1.5;
  font-weight: 700;
  padding: 2rem 0 2rem 0;
  word-break: keep-all;
`;

export const PermReqDrawerMessage = styled.div`
  word-break: keep-all; // 단어 단위로 줄바꿈
  overflow-wrap: break-word;
  white-space: normal;
  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
  font-weight: 400;
`;

export const PlaceMoreDrawerModal = styled(DrawerModal)`
  height: auto;
  width: 100%;
`;

export const PlaceMoreDrawerContents = styled(DrawerContents)`
  height: auto;
  width: 100%;
  font-weight: 500;
  padding: 0 0 4rem 0;
`;

export const PlaceMoreDrawerContentData = styled.p`
  padding: 2rem 0 4rem 0;
  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
`;

export const PlaceMoreDrawerAddress = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0.75rem 0 0.75rem 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
  line-height: 1;
  width: 100%;
  text-align: left;
`;

export const PlaceMoreDrawerAddressName = styled.p`
  color: var(--gray-500);
  padding-left: 1rem;
  font-weight: 400;
  word-break: normal;
  overflow-wrap: break-word;
  white-space: normal;
`;

export const PlaceMoreDrawerBtn = styled.button`
  padding: 0.75rem 0 0.75rem 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
  line-height: 1;
  width: 100%;
  text-align: left;
`;

export const PlaceMoreDrawerRemovePlaceBtn = styled(PlaceMoreDrawerBtn)`
  color: var(--red-600);
`;

export const SearchDrawerModal = styled(DrawerModal)`
  height: 100%;
  width: 100%;
`;

export const SearchDrawerContents = styled(DrawerContents)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const SearchDrawerInputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  border-radius: 1rem;
  background-color: var(--gray-100);
  margin: 0rem 0 2rem 0;
  /* border: 0.5px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 10.5px 21px 0 rgba(0, 0, 0, 0.08); */ // threads
`;

export const SearchDrawerInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
  font-weight: 500;
  &:focus {
  }
  &::placeholder {
    color: var(--gray-700);
  }
`;

export const SearchDrawerResultList = styled.div`
  padding: 0 0 4rem 0;
`;

export const SearchDrawerResultItem = styled.button`
  padding: 0.75rem 0 0.75rem 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
  line-height: 1;
  width: 100%;
  text-align: left;
`;

export const SearchDrawerNoResultsFound = styled.div`
  padding: 0.75rem 0 0.75rem 0;
  cursor: default;
  font-weight: 500;
  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.9rem;
  }
  line-height: 1;
  width: 100%;
  text-align: left;
`;

export const EditContentDataModal = styled(DrawerModal)``;
