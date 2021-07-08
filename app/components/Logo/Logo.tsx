import { FC } from 'react';
import { Text } from 'wiloke-react-core';

export interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  return (
    <Text color="light" size={30} css={{ lineHeight: '45px', fontWeight: 700 }}>
      <Text tagName="span" color="primary">
        Ve
      </Text>
      nus
    </Text>
  );
};

export { Logo };
