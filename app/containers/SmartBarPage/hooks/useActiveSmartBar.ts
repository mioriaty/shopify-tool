import { ClientSmartBarServiceModel } from 'app/services/SmartBarService';
import { useActionUpdateStatusItem } from '../actions/actionStatisticPopup';

export const useActiveSmartBar = () => {
  const setUpdateStatusItem = useActionUpdateStatusItem();

  const handleActive = (item: ClientSmartBarServiceModel) => (isActive: boolean) => {
    const status = isActive === true ? 'active' : 'deactive';
    setUpdateStatusItem.request({ id: item.id, status });
  };

  return {
    handleActive,
  };
};
