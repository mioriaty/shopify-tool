import { Button } from 'app/components/Button';
import { TableAtnd } from 'app/components/TableAtnd';
import { subscriberPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { isSmallDevice } from 'app/utils/isSmallDevice';
import { isEmpty } from 'ramda';
import { useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';
import { LineAwesome, LineAwesomeName, View } from 'wiloke-react-core';
import { useFetchTableSubscriber } from './actions/actionTable';

const colmuns = [
  {
    title: '#',
    dataIndex: 'key',
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
const SubscriberPage = () => {
  const fetchTable = useFetchTableSubscriber();
  const tableState = useSelector(subscriberPageSelectors.tableData);

  useEffect(() => {
    if (isEmpty(tableState.data)) {
      fetchTable.request(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const transformData = tableState.data.map(item => {
    return {
      ...item,
      campaign: <LineAwesome name={renderItemIcon(item.campaign)} />,
    };
  });

  return (
    <View>
      <View css={{ textAlign: 'right' }}>
        <Button
          radius={10}
          color="light"
          css={{
            marginBottom: '25px',
            opacity: tableState.data.length > 0 ? 1 : 0.4,
            userSelect: tableState.data.length > 0 ? 'auto' : 'none',
            cursor: tableState.data.length > 0 ? 'pointer' : 'no-drop',
          }}
        >
          <CSVLink
            style={{ color: 'inherit', cursor: tableState.data.length > 0 ? 'pointer' : 'no-drop' }}
            filename="subscribers.csv"
            data={tableState.data}
            onClick={() => {
              if (tableState.data.length > 0) {
                return true;
              }
              return false;
            }}
          >
            {i18n.t('downloadSubscribers')}
          </CSVLink>
        </Button>
      </View>
      <TableAtnd scroll={{ x: isSmallDevice() ? 1000 : 0 }} loading={tableState.status === 'loading'} columns={colmuns} dataSource={transformData} />
    </View>
  );
};

export { SubscriberPage };
