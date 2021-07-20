import { useFirebaseRemove } from 'app/hooks/useFirebaseRemove';
import { ClientStatisticDetailModel } from 'app/services/PopupService';
import { CONFIG_SETTING_URL } from 'app/types/configSetting';
import { pmParent } from 'app/utils/constants/postmessage';
import { useDraftConfig } from '../actions/actionConfig';
import { useActionGetIdEditing } from '../actions/actionIdEditing';
import { useActionGetPopupItem } from '../actions/actionStatisticPopup';
import { useEditPopup } from './useEditPopup';

export const useClickEdit = () => {
  const { handleRemove } = useFirebaseRemove();
  const getIdItem = useActionGetIdEditing();
  const { handleEditPopup } = useEditPopup();

  const setDraftConfig = useDraftConfig();
  const getPopupItem = useActionGetPopupItem();

  const handleClickEdit = (item: ClientStatisticDetailModel) => {
    getPopupItem.request({
      id: item.id,
      callback: () => {
        pmParent.setPopup(CONFIG_SETTING_URL);
        handleEditPopup(item.id);
        getIdItem(item.id);
      },
    });
    setDraftConfig({});
    handleRemove(item.id);
  };

  return {
    handleClickEdit,
  };
};
