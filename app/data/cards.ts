import { CardProps } from 'app/components/Card';
import { i18n } from 'app/translation';

const cardsData = (): CardProps[] => {
  return [
    {
      title: 'Product Badge',
      description: 'Pellentesque blandit diam ac porttitor sodales. Sed dapibus urna purus, vitae efficitur ante vulputate non.',
      link: 'product-badge',
      textButton: i18n.t('createBadge'),
      imageSrc: 'https://polaris.shopify.com/bundles/bc7087219578918d62ac40bf4b4f99ce.png',
    },
    {
      title: 'Smart Banner',
      description: 'Pellentesque blandit diam ac porttitor sodales. Sed dapibus urna purus, vitae efficitur ante vulputate non.',
      link: 'smart-banner',
      textButton: i18n.t('createSmartBar'),
      imageSrc: 'https://polaris.shopify.com/bundles/bc7087219578918d62ac40bf4b4f99ce.png',
    },
    {
      title: 'Popup',
      description: 'Pellentesque blandit diam ac porttitor sodales. Sed dapibus urna purus, vitae efficitur ante vulputate non.',
      link: 'popup',
      textButton: i18n.t('createNewPopup'),
      imageSrc: 'https://polaris.shopify.com/bundles/bc7087219578918d62ac40bf4b4f99ce.png',
    },
  ];
};

export default cardsData;
