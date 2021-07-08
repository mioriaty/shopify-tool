import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { LineAwesome, LineAwesomeName, Text, useStyleSheet, useTheme, View, withStyles, WithStylesProps } from 'wiloke-react-core';
import * as css from './styles';

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  exact?: boolean;
  icon: LineAwesomeName;
  isReactRouter: boolean;
  hasDivider?: boolean;
}

export interface NavigationProps {
  data: MenuItem[];
}

const NavLinkWithStyles = withStyles(NavLink);

const Navigation: FC<NavigationProps> = ({ data }) => {
  const { colors } = useTheme();
  const { styles } = useStyleSheet(colors);

  const renderLink = (item: MenuItem): ReactNode => {
    const { isReactRouter, href, label, icon, exact } = item;
    const linkProps: Pick<WithStylesProps, 'color' | 'colorHover' | 'css'> = {
      css: css.link,
      color: 'light',
      colorHover: 'primary',
    };

    if (isReactRouter) {
      return (
        <NavLinkWithStyles {...linkProps} activeClassName={styles(css.active)} exact={exact} to={href as any}>
          <LineAwesome size={18} name={icon} css={{ lineHeight: '18px', marginRight: '12px' }} />
          {label}
        </NavLinkWithStyles>
      );
    }
    return (
      <Text {...linkProps} tagName="a" href={href}>
        <LineAwesome size={18} name={icon} css={{ lineHeight: '18px', marginRight: '12px' }} />
        {label}
      </Text>
    );
  };

  const renderMenuItem = (item: MenuItem): ReactNode => {
    const { id, hasDivider } = item;
    return (
      <View key={id}>
        <View className="Navigation-parent" css={css.parent}>
          {renderLink(item)}
        </View>
        {!!hasDivider && (
          <View
            width={260}
            height={0.8}
            backgroundColor="gray7"
            css={{ position: 'relative', marginLeft: '-30px', marginTop: '15px', marginBottom: '15px' }}
          />
        )}
      </View>
    );
  };

  return (
    <View tagName="nav" className="Navigation-container" css={css.container}>
      {data.map(renderMenuItem)}
    </View>
  );
};

export { Navigation };
