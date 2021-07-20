import { ClientStatisticDetailModel } from 'app/services/PopupService';
import { useActionGetIdEditing } from '../actions/actionIdEditing';
import { useFetchTablePopup } from '../actions/actionTable';

export const useClickDownload = () => {
  const getIdItem = useActionGetIdEditing();
  const tableData = useFetchTablePopup();

  const handleClickDownload = (item: ClientStatisticDetailModel) => {
    getIdItem(item.id);
    tableData.request({ id: item.id });
  };

  return {
    handleClickDownload,
  };
};
