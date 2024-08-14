// import Image from 'next/image';
// import { StyledItem, StyledMain } from './loading.css';
// import Logo from '@/assets/icons/combination-logo.svg';
// import Logo2 from '@/assets/icons/favicon.png';

// export default function Loading() {
//   return (
//     <StyledMain>
//       <Image src={Logo2} alt="" height={100} width={100} />
//     </StyledMain>
//   );
// }

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
