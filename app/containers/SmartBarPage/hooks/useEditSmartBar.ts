import useInfo from 'app/hooks/useInfo';
import { authSelectors, smartBarPageSelectors } from 'app/store/general/selectors';
import { pmParent } from 'app/utils/constants/postmessage';
import { useSelector } from 'react-redux';

export const useEditSmartBar = () => {
  const statisticDetailState = useSelector(smartBarPageSelectors.statisticData);
  const shopName = useSelector(authSelectors.shopName);
  const { accessToken, userPackage, discounts } = useInfo();
  const pages = useSelector(authSelectors.pages);

  const handleEditSmartBar = (idEditing: string) => {
    const config = statisticDetailState.data.find(item => item.id === idEditing)?.config;
    pmParent.emit('@editSmartBar', {
      config,
    });

    if (discounts && userPackage && accessToken && shopName) {
      pmParent.emit('@sendInfo', {
        campaignId: idEditing,
        accessToken,
        discounts,
        shopName,
        userPackage,
        pages,
      });
    }
  };

  return {
    handleEditSmartBar,
  };
};
