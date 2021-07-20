import { ClientStatisticDetailModel } from 'app/services/PopupService';
import { useActionDeleteItems } from '../actions/actionStatisticPopup';

export const useDeleteSingleItem = () => {
  const setDeleteItems = useActionDeleteItems();

  // Xử lý delete khi bấm vào nút delete trong popover
  const handleDeleteItem = (item: ClientStatisticDetailModel) => {
    setDeleteItems.request({ ids: [item.id] });
  };

  return {
    handleDeleteItem,
  };
};
