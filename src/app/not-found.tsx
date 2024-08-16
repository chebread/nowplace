'use client';

import Link from 'next/link';
import {
  StyledNotFoundMessage,
  StyledNotFoundTitle,
  StyledMain,
  StyledNotFound,
} from './not-found.css';
import {
  DrawerFooter,
  DrawerFooterBtn,
  DrawerFooterGradient,
  DrawerFooterWrapper,
} from '@/components/bottom-sheet/bottom-sheet.css';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <StyledMain>
      <StyledNotFound>
        <StyledNotFoundTitle>
          죄송합니다. 페이지를 사용할 수 없습니다.
        </StyledNotFoundTitle>
        <StyledNotFoundMessage>
          클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.{' '}
          <Link href="/">NowPlace로 돌아가기.</Link>
        </StyledNotFoundMessage>
      </StyledNotFound>

      <DrawerFooter>
        <DrawerFooterGradient></DrawerFooterGradient>
        <DrawerFooterWrapper>
          <DrawerFooterBtn
            onClick={() => {
              router.push('/');
            }}
          >
            돌아가기
          </DrawerFooterBtn>
        </DrawerFooterWrapper>
      </DrawerFooter>
    </StyledMain>
  );
}
