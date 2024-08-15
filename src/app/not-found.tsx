'use client';

import Link from 'next/link';
import { StyledMain } from './not-found.css';

export default function NotFound() {
  return (
    <StyledMain>
      <h1> 죄송합니다. 페이지를 사용할 수 없습니다.</h1>
      클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.{' '}
      <Link href="/">NowPlace로 돌아가기.</Link>
    </StyledMain>
  );
}
