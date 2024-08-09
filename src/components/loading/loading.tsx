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
import ImageCombinationLogo from '@/assets/icons/favicon.png';

export default function Loading() {
  const copyright = `© ${new Date().getFullYear()} Cha Haneum`;

  // - [ ] 로딩 opacity 사라짐 효과 구현하기
  return (
    <StyledMain>
      <StyledItem></StyledItem>
      <StyledCenterItem>
        <StyledImage src={ImageCombinationLogo} alt="" />
      </StyledCenterItem>
      <StyledBottomItem>{copyright}</StyledBottomItem>
    </StyledMain>
  );
}
