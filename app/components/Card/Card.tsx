import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Image, Text, View, withStyles } from 'wiloke-react-core';
import { Box } from '../Box';
import { Button } from '../Button';
import { CardLoading } from './CardLoading';
import * as css from './styles';

export interface CardProps {
  /** Ảnh của Card **/
  imageSrc: string;
  /** Ảnh preview của Card **/
  previewImage?: string;
  /** Tiêu đề của Card **/
  title: string;
  /** Mô tả của Card **/
  description: string;
  /** Đường dẫ của Card **/
  link: string;
  /** nội dung của Button **/
  textButton: string;
}

const LinkWithStyle = withStyles(Link);

interface CardStatic {
  Loading: typeof CardLoading;
}

const Card: FC<CardProps> & CardStatic = ({ description, imageSrc, link, textButton, title, previewImage = '' }) => {
  return (
    <Box>
      <Image src={imageSrc} previewSrc={previewImage} lazyLoad={!!previewImage} aspectRatioInPercent={56.25} />
      <View css={css.body}>
        <Text color="gray9" css={css.title}>
          {title}
        </Text>
        <Text color="gray6" css={css.description}>
          {description}
        </Text>
        <LinkWithStyle css={css.link} to={link} color="light">
          <Button size="large" backgroundColor="primary" radius={10}>
            {textButton}
          </Button>
        </LinkWithStyle>
      </View>
    </Box>
  );
};

Card.Loading = CardLoading;

export { Card };
