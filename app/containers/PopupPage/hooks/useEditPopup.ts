import useInfo from 'app/hooks/useInfo';
import { authSelectors, popupPageSelectors } from 'app/store/general/selectors';
import { pmParent } from 'app/utils/constants/postmessage';
import { useSelector } from 'react-redux';

export const useEditPopup = () => {
  const statisticDetailState = useSelector(popupPageSelectors.statisticData);
  const shopName = useSelector(authSelectors.shopName);
  const { accessToken, userPackage, discounts } = useInfo();
  const pages = useSelector(authSelectors.pages);

  const handleEditPopup = (idEditing: string) => {
    const config = statisticDetailState.data.find(item => item.id === idEditing)?.config;

    pmParent.emit('@editPopup', {
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
    handleEditPopup,
  };
};
