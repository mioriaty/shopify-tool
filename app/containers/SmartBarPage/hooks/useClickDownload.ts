import { ClientSmartBarServiceModel } from 'app/services/SmartBarService';
import { useActionGetIdEditing } from '../actions/actionIdEditing';
import { useFetchTableSmartBar } from '../actions/actionTable';

export const useClickDownload = () => {
  const getIdItem = useActionGetIdEditing();
  const tableData = useFetchTableSmartBar();

  const handleClickDownload = (item: ClientSmartBarServiceModel) => {
    getIdItem(item.id);
    tableData.request({ id: item.id });
  };

  return {
    handleClickDownload,
  };
};
