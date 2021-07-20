import { ClientSmartBarServiceModel } from 'app/services/SmartBarService';
import { smartBarPageSelectors } from 'app/store/general/selectors';
import { useSelector } from 'react-redux';
import { useActionSelectItem } from '../actions/actionSelectItem';

export const useSelectItem = () => {
  const selectedStatisticItemState = useSelector(smartBarPageSelectors.selectedIds);
  const setSelectedIds = useActionSelectItem();

  const handleSelected = (item: ClientSmartBarServiceModel) => {
    let selectedArr: string[] = [];
    if (!selectedStatisticItemState.includes(item.id)) {
      selectedArr = [...selectedStatisticItemState, item.id];
    } else {
      selectedArr = selectedStatisticItemState.filter(x => x !== item.id);
    }
    setSelectedIds(selectedArr);
  };

  return {
    handleSelected,
  };
};
