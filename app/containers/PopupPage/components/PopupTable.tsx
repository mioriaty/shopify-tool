import { TableAtnd } from 'app/components/TableAtnd';
import { popupPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { isSmallDevice } from 'app/utils/isSmallDevice';
import { useSelector } from 'react-redux';
import { LineAwesome, LineAwesomeName } from 'wiloke-react-core';

const colmuns = [
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
    dataIndex: 'createdDate',
    width: 120,
  },
];

const PopupTable = () => {
  const tablePopupState = useSelector(popupPageSelectors.tableData);
  const currentId = useSelector(popupPageSelectors.idEditing);
  const tablePopupData = tablePopupState[currentId]?.data ? tablePopupState[currentId] : { data: [], status: 'loading', message: '' };

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
      campaign: <LineAwesome name={renderItemIcon(item.campaign)} />,
    };
  });

  return (
    <TableAtnd
      size="middle"
      scroll={{ x: isSmallDevice() ? 1000 : 0 }}
      loading={tablePopupData.status === 'loading'}
      columns={colmuns}
      pagination={false}
      dataSource={transformData}
    />
  );
};

export { PopupTable };
