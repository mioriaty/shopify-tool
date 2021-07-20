import { TableAtnd } from 'app/components/TableAtnd';
import { smartBarPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { isSmallDevice } from 'app/utils/isSmallDevice';
import { useSelector } from 'react-redux';
import { LineAwesome, LineAwesomeName } from 'wiloke-react-core';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    width: 140,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 140,
  },
  {
    title: i18n.t('campaign'),
    dataIndex: 'campaign',
    width: 140,
  },
  {
    title: i18n.t('dateSubscribed'),
    dataIndex: 'dateSubscribed',
    width: 120,
  },
];

const SmartBarTable = () => {
  const tableSmartBarState = useSelector(smartBarPageSelectors.tableData);
  const currentId = useSelector(smartBarPageSelectors.idEditing);
  const tablePopupData = tableSmartBarState[currentId]?.data ? tableSmartBarState[currentId] : { data: [], status: 'loading', message: '' };

  const renderItemIcon = (goal: string): LineAwesomeName => {
    switch (goal) {
      case 'email': {
        return 'envelope';
      }
      case 'email_social': {
        return 'facebook';
      }
      case 'email_wheel': {
        return 'podcast';
      }
      case 'social_follows': {
        return 'share-alt';
      }
      case 'target_url': {
        return 'user-circle';
      }
      default:
        return '500px';
    }
  };

  const transformData = tablePopupData.data.map(item => {
    return {
      ...item,
      campaign: <LineAwesome color="primary" name={renderItemIcon(item.campaign)} />,
    };
  });

  // scroll={{ x: 1500 }}
  return (
    <TableAtnd
      size="middle"
      scroll={{ x: isSmallDevice() ? 1000 : 0 }}
      loading={tablePopupData.status === 'loading'}
      columns={columns}
      dataSource={transformData}
    />
  );
};

export { SmartBarTable };
