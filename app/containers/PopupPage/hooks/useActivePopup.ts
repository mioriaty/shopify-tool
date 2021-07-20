import { ClientStatisticDetailModel } from 'app/services/PopupService';
import { useActionUpdateStatusItem } from '../actions/actionStatisticPopup';

export const useActivePopup = () => {
  const setUpdateStatusItem = useActionUpdateStatusItem();

  const handleActive = (item: ClientStatisticDetailModel) => (isActive: boolean) => {
    const status = isActive === true ? 'active' : 'deactive';
    setUpdateStatusItem.request({ id: item.id, status });
  };

  return {
    handleActive,
  };
};
