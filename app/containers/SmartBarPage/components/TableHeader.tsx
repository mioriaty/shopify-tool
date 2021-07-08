import { Checkbox } from 'app/components/Checkbox';
import { smartBarPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { useSelector } from 'react-redux';
import { Text, View } from 'wiloke-react-core';
import { useSelectAll } from '../actions/actionSelectAll';
import { useActionSelectItem } from '../actions/actionSelectItem';
import * as styles from '../styles';

const TableHeader = () => {
  // selectors
  const selectedIdsState = useSelector(smartBarPageSelectors.selectedIds);
  const statisticDataState = useSelector(smartBarPageSelectors.allData);

  // dispatchers
  const setSelectedIds = useActionSelectItem();
  const setSelectAll = useSelectAll();

  // Xử lý onChange select all
  const handleSelectAll = (isChecked: boolean) => {
    const ids = statisticDataState.map(item => item.id);
    if (isChecked) {
      setSelectAll(true);
      setSelectedIds(ids);
    } else {
      setSelectAll(false);
      setSelectedIds([]);
    }
  };

  return (
    <View className="smartbar__table-header" row css={styles.tableHeader}>
      <View columns={[1, 1, 1]} css={{ width: '5%' }}>
        <Checkbox
          activeColor="gray8"
          checked={selectedIdsState.length > 0 && statisticDataState.length > 0 && selectedIdsState.length === statisticDataState.length}
          onValueChange={handleSelectAll}
        />
      </View>
      <View columns={[1, 3, 3]} css={{ width: '15%' }}>
        <Text tagName="span" color="gray8" size={14} css={{ fontWeight: 500, lineHeight: '21px' }}>
          Id
        </Text>
      </View>
      <View columns={[1, 1, 1]} css={{ width: '10%' }}>
        <Text color="gray8" size={14} css={{ fontWeight: 500, lineHeight: '21px' }}>
          {i18n.t('goal')}
        </Text>
      </View>
      <View columns={[1, 1, 1]} css={{ width: '12.5%' }}>
        <Text color="gray8" size={14} css={{ fontWeight: 500, lineHeight: '21px' }}>
          {i18n.t('views')}
        </Text>
      </View>
      <View columns={[1, 1, 1]} css={{ width: '12.5%' }}>
        <Text color="gray8" size={14} css={{ fontWeight: 500, lineHeight: '21px' }}>
          {i18n.t('clicks')}
        </Text>
      </View>
      <View columns={[1, 1, 1]} css={{ width: '15%' }}>
        <Text color="gray8" size={14} css={{ fontWeight: 500, lineHeight: '21px' }}>
          {i18n.t('subscribers')}
        </Text>
      </View>
      <View columns={[1, 2, 2]} css={{ width: '15%' }}>
        <Text color="gray8" size={14} css={{ fontWeight: 500, lineHeight: '21px' }}>
          {i18n.t('conversionRate')}
        </Text>
      </View>
      <View columns={[1, 2, 2]} css={{ width: '15%' }}>
        <Text color="gray8" size={14} css={{ fontWeight: 500, lineHeight: '21px' }}>
          {i18n.t('active')}/{i18n.t('paused')}
        </Text>
      </View>
    </View>
  );
};

export { TableHeader };
