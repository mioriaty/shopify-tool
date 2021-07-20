import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Image, Text, View, withStyles } from 'wiloke-react-core';
import { Box } from '../Box';
import { Button, ButtonProps } from '../Button';
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
  /** sự kiện onClick của Button **/
  onClick?: ButtonProps['onClick'];
}

const LinkWithStyle = withStyles(Link);

interface CardStatic {
  Loading: typeof CardLoading;
}

const Card: FC<CardProps> & CardStatic = ({ description, imageSrc, link, textButton, title, previewImage = '', onClick }) => {
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
        <Button onClick={onClick} size="large" backgroundColor="primary" radius={10}>
          <LinkWithStyle css={css.link} to={link} color="light">
            {textButton}
          </LinkWithStyle>
        </Button>
      </View>
    </Box>
  );
};

Card.Loading = CardLoading;

export { Card };
