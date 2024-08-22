/* 메모
- [ ] background-image로 변경하기
*/

import {
  StyledBottomItem,
  StyledCenterItem,
  StyledImage,
  StyledItem,
  StyledMain,
} from './loading.css';
import SvgAppIcon from '@/assets/icons/app-icon.png';

export default function Loading() {
  const copyright = `© ${new Date().getFullYear()} Cha Haneum`;

  // - [ ] 로딩 opacity 사라짐 효과 구현하기
  return (
    <StyledMain>
      <StyledItem></StyledItem>
      <StyledCenterItem>
        <StyledImage src={SvgAppIcon} alt="NowPlace 앱 아이콘" priority />
      </StyledCenterItem>
      <StyledBottomItem>{copyright}</StyledBottomItem>
    </StyledMain>
  );
}
