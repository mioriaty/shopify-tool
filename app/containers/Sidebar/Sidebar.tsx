import sidebarData from 'app/data/sidebar';
import { Logo } from 'app/components/Logo';
import { Navigation } from 'app/components/Navigation';
import useCLickInside from 'app/hooks/useClickInside';
import { useRef } from 'react';
import { useState } from 'react';
import { LineAwesome, OuterTrigger, Text, View } from 'wiloke-react-core';
import { i18n } from 'app/translation';
import * as styles from './styles';

const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const handleVisible = () => {
    setVisible(prevState => !prevState);
  };

  const handleCloseMenu = () => {
    setVisible(false);
  };

  useCLickInside(sidebarRef, handleCloseMenu);

  return (
    <View>
      <OuterTrigger onClick={handleCloseMenu}>
        <View onClick={handleVisible} css={styles.bars} width={30} height={30} backgroundColor="gray8">
          <LineAwesome size={20} nightModeBlacklist="color" color="light" name="bars" />
        </View>
      </OuterTrigger>
      <View className="Sidebar-container" backgroundColor="gray8" css={styles.container(visible)}>
        <View css={{ padding: '15px 20px 10px' }}>
          <Logo />
          <Text color="gray4">{i18n.t('logoDescription')}</Text>
        </View>
        <View ref={sidebarRef}>
          <Navigation data={sidebarData()} />
        </View>
      </View>
    </View>
  );
};

export { Sidebar };
