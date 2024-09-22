import styled from 'styled-components';

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem 7rem 1rem;
`;
export const StyledNotFound = styled.main`
  max-width: 40rem;
  width: 100%;
  height: auto;
`;

export const StyledNotFoundTitle = styled.h1`
  font-size: 2rem;
  @media screen and (max-width: 641px) {
    font-size: 1.6rem;
  }
  line-height: 2rem;
  font-weight: 700;
  @media screen and (max-width: 641px) {
    font-weight: 600;
  }
  padding: 2rem 0 2rem 0;
  word-break: keep-all;
`;

export const StyledNotFoundMessage = styled.div`
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
  font-size: 1rem;
  @media screen and (max-width: 641px) {
    font-size: 0.8rem;
  }
  font-weight: 400;
  a {
    color: var(--blue-700);
  }
`;
