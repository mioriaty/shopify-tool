import { FC } from 'react';
import { LogoSvg } from './logoSvg';

export interface LogoProps {}

// <Text color="primary" size={30} css={{ lineHeight: '45px', fontWeight: 700 }}>
//   {i18n.t('logo')}
// </Text>

const Logo: FC<LogoProps> = () => {
  return <LogoSvg />;
};

export { Logo };
