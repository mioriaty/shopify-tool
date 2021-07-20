import { Button } from 'app/components/Button';
import { smartBarPageSelectors } from 'app/store/general/selectors';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTheme, View } from 'wiloke-react-core';
import { useActionDeleteItems } from '../actions/actionStatisticPopup';

interface DeleteCampaignProps {}

const DeleteCampaign: FC<DeleteCampaignProps> = () => {
  const { colors } = useTheme();
  const setDeleteItems = useActionDeleteItems();

  const selectedStatisticItemState = useSelector(smartBarPageSelectors.selectedIds);
  const statisticItemState = useSelector(smartBarPageSelectors.statisticData);

  const handleDeleteSelectedItems = () => {
    setDeleteItems.request({ ids: selectedStatisticItemState });
  };

  return (
    <View className="smartbar__delete-campaign" columns={[12, 3, 3]} css={{ textAlign: 'right' }}>
      <Button
        onClick={handleDeleteSelectedItems}
        radius={10}
        color="tertiary"
        backgroundColor="light"
        css={{ border: `1px solid ${colors.gray3}` }}
        loading={statisticItemState.deleteStatus === 'loading'}
      >
        Delete campaign
      </Button>
    </View>
  );
};

export { DeleteCampaign };
