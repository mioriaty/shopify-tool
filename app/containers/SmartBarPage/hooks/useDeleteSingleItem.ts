import { ClientSmartBarServiceModel } from 'app/services/SmartBarService';
import { useActionDeleteItems } from '../actions/actionStatisticPopup';

export const useDeleteSingleItem = () => {
  const setDeleteItems = useActionDeleteItems();

  // Xử lý delete khi bấm vào nút delete trong popover
  const handleDeleteItem = (item: ClientSmartBarServiceModel) => {
    setDeleteItems.request({ ids: [item.id] });
  };

  return {
    handleDeleteItem,
  };
};
