import { useFirebaseRemove } from 'app/hooks/useFirebaseRemove';
import { ClientSmartBarServiceModel } from 'app/services/SmartBarService';
import { CONFIG_SETTING_URL } from 'app/types/configSetting';
import { pmParent } from 'app/utils/constants/postmessage';
import { useDraftConfig } from '../actions/actionConfig';
import { useActionGetIdEditing } from '../actions/actionIdEditing';
import { useActionGetPopupItem } from '../actions/actionStatisticPopup';
import { useEditSmartBar } from './useEditSmartBar';

export const useClickEdit = () => {
  const { handleRemove } = useFirebaseRemove();
  const getIdItem = useActionGetIdEditing();
  const { handleEditSmartBar } = useEditSmartBar();

  const setDraftConfig = useDraftConfig();
  const getSmartBarItem = useActionGetPopupItem();

  const handleClickEdit = (item: ClientSmartBarServiceModel) => {
    getSmartBarItem.request({
      id: item.id,
      callback: () => {
        pmParent.setPopup(CONFIG_SETTING_URL);
        handleEditSmartBar(item.id);
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
