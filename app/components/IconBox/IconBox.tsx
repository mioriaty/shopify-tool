import React, { FC } from 'react';
import { Image, LineAwesome, LineAwesomeName, Size, View, ViewProps } from 'wiloke-react-core';
import { IconBoxLoading } from './IconBoxLoading';
import * as css from './styles';

export type SizeIconBox = Exclude<Size, 'extra-small'>;

export interface IconBoxProps extends Omit<ViewProps, 'color' | 'colorHover' | 'backgroundColor' | 'backgroundColorHover'> {
  /** Size cua icon box */
  size?: SizeIconBox;
  /** Icon name*/
  iconName: LineAwesomeName;
  /** Duong dan anh */
  uri?: string;
  /** BackgroundColor box icon */
  color?: string;
  /** Overlay Enabled*/
  overlayEnabled?: boolean;
}

interface IconBoxStatic {
  Loading: typeof IconBoxLoading;
}

const IconBox: FC<IconBoxProps> & IconBoxStatic = ({
  size = 'large',
  radius = 6,
  className,
  iconName,
  overlayEnabled = false,
  color,
  uri,
  ...rest
}) => {
  const _color = color ? color : '';

  const _iconSizeMapping: Record<SizeIconBox, number> = {
    small: 28 / (28 / 20),
    medium: 39 / (39 / 25),
    large: 50 / (50 / 30),
  };

  const _imageSizeMapping: Record<SizeIconBox, number> = {
    small: 28,
    medium: 39,
    large: 50,
  };

  if (uri) {
    return (
      <View {...rest} radius={radius} className={className} css={css.container(size)}>
        <Image src={uri} width={_imageSizeMapping[size]} previewSrc={uri} aspectRatioInPercent={100} />
      </View>
    );
  }

  return (
    <View
      {...rest}
      radius={radius}
      className={className}
      color="light"
      nightModeBlacklist="color"
      css={[css.container(size), css.backgroundColor(_color), rest.css]}
    >
      <LineAwesome name={iconName} size={_iconSizeMapping[size]} />
      {overlayEnabled && <View css={css.overlay} />}
    </View>
  );
};

IconBox.Loading = IconBoxLoading;

export { IconBox };
