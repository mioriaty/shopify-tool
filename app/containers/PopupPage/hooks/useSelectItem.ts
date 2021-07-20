import { ClientStatisticDetailModel } from 'app/services/PopupService';
import { popupPageSelectors } from 'app/store/general/selectors';
import { useSelector } from 'react-redux';
import { useActionSelectItem } from '../actions/actionSelectItem';

export const useSelectItem = () => {
  const selectedStatisticItemState = useSelector(popupPageSelectors.selectedIds);
  const setSelectedIds = useActionSelectItem();

  const handleSelected = (item: ClientStatisticDetailModel) => {
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
