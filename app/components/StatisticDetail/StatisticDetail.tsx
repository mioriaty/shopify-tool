import { Result } from 'app/models/PostMessageResult';
import { i18n } from 'app/translation';
import { FC, useState } from 'react';
import { LineAwesome, LineAwesomeName, Text, View } from 'wiloke-react-core';
import { Box } from '../Box';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { Popover } from '../Popover';
import { SwitchProps, Switch } from '../Switch';
import { PopoverContent, PopoverContentProps } from './PopoverContent';
import { StatisticDetailLoading } from './StatisticDetailLoading';

type DataStatus = 'active' | 'deactive';

interface Data {
  /** Id của popup*/
  id: string;
  /** title của popup*/
  title: string;
  /** Icon(LineAwesome) của popup*/
  goal: 'email' | 'email_wheel' | 'email_social' | 'social_follows' | 'target_url';
  /** Lượng view của popup*/
  views: string;
  /** Lượng click của popup*/
  clicks: string;
  /** Lượng subscribers của popup*/
  subscribers: string;
  /** Tỷ lệ chuyển đổi của popup*/
  conversion: string;
  /** Trạng thái hiển thị của popup*/
  status: DataStatus;
  /** Ngày tạo của popup*/
  date: string;
  /** Config của popup*/
  config?: Result;
}

interface StatisticDetailBoxStatic {
  Loading: typeof StatisticDetailLoading;
}

export interface StatisticDetailProps extends PopoverContentProps {
  /* Item đầu vào của component */
  item: Data;
  /* check xem item đã được select hay chưa */
  selected?: boolean;
  /* loading khi bấm active/deactive component */
  isActiveLoading?: boolean;
  /* Sự kiện onActive của component */
  onActive?: SwitchProps['onValueChange'];
  /* Sự kiện onSelected của component */
  onSelected?: CheckboxProps['onValueChange'];
  /* Sự kiện onIconClick của component */
  onIconClick?: () => void;
}

const StatisticDetail: FC<StatisticDetailProps> & StatisticDetailBoxStatic = ({
  item,
  selected = false,
  isActiveLoading = false,
  onActive,
  onSelected,
  onIconClick,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (show: boolean) => {
    setVisible(show);
  };

  const renderItemIcon = (goal: Data['goal']): LineAwesomeName => {
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

  const handleEdit = () => {
    rest.onEdit?.();
    setVisible(false);
  };

  const handleDelete = () => {
    rest.onDelete?.();
  };

  const handleDownload = () => {
    rest.onDownload?.();
    setVisible(false);
  };

  return (
    <Box radius={16} css={{ padding: '20px', marginBottom: '6px' }}>
      <View row css={{ alignItems: 'center' }}>
        <View columns={[1, 1, 1]} css={{ width: '5%' }}>
          <Checkbox size="small" activeColor="gray8" checked={selected} onValueChange={onSelected} />
        </View>
        <View columns={[1, 3, 3]} css={{ width: '15%' }}>
          <Text numberOfLines={1} size={16} color="gray7">
            {item.title}
          </Text>
          <Text numberOfLines={1} size={12} color="gray6">
            {i18n.t('lastEdit')}: {item.date}
          </Text>
        </View>
        <View columns={[1, 1, 1]} css={{ width: '10%' }}>
          <LineAwesome name={renderItemIcon(item.goal)} color="primary" size={18} css={{ verticalAlign: 'middle' }} />
        </View>
        <View columns={[1, 1, 1]} css={{ width: '12.5%' }}>
          <Text size={16} color="gray7">
            {item.views}
          </Text>
        </View>
        <View columns={[1, 1, 1]} css={{ width: '12.5%' }}>
          <Text size={16} color="gray7">
            {item.clicks}
          </Text>
        </View>
        <View columns={[1, 1, 1]} css={{ width: '15%' }}>
          <Text color="gray7" size={16}>
            {item.subscribers}
          </Text>
        </View>
        <View columns={[1, 2, 2]} css={{ width: '15%' }}>
          <Text color="gray7" size={16}>
            {item.conversion}%
          </Text>
        </View>
        <View columns={[1, 1, 1]} css={{ width: '10%' }}>
          <Switch loading={isActiveLoading} onValueChange={onActive} checked={item.status === 'active' ? true : false} />
        </View>
        <View columns={[1, 1, 1]} css={{ width: '5%', textAlign: 'center' }}>
          <Popover
            placement="bottomRight"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            content={
              <PopoverContent
                deleteContent={rest.deleteContent}
                downloadContent={rest.downloadContent}
                editContent={rest.editContent}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDownload={handleDownload}
              />
            }
          >
            <View css={{ display: 'inline-block', cursor: 'pointer' }}>
              <LineAwesome onClick={onIconClick} name="ellipsis-h" size={18} color="gray8" css={{ lineHeight: '18px' }} />
            </View>
          </Popover>
        </View>
      </View>
    </Box>
  );
};

StatisticDetail.Loading = StatisticDetailLoading;

export { StatisticDetail };
