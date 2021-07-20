import { dateOptions } from 'app/data/options';
import { DayPicker, DateType } from 'app/components/DayPicker';
import { ModalAntd } from 'app/components/ModalAntd';
import { SelectAntd, Option, SelectAntdProps } from 'app/components/SelectAntd';
import { dashboardPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import { useActionFilterByDate } from '../actions/actionFilter';
import { useFetchSmartBar, useFetchStatisticList, useFetchStatisticProducts } from '../actions/actionStatisticList';

interface DateFilterProps {}

const DateFilter: FC<DateFilterProps> = () => {
  // selector
  const filterByDateState = useSelector(dashboardPageSelectors.filterByDate);

  // dispatcher
  const setDate = useActionFilterByDate();
  const fetchPopups = useFetchStatisticList();
  const fetchProducts = useFetchStatisticProducts();
  const fetchSmartBar = useFetchSmartBar();

  // state
  const [startDateState, setStartDate] = useState<DateType>(null);
  const [endDateState, setEndDate] = useState<DateType>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  let dateText = '';
  if (typeof filterByDateState === 'string') {
    dateText = filterByDateState;
  }
  if (typeof filterByDateState === 'object' && filterByDateState.endDate !== '' && filterByDateState.startDate !== '') {
    dateText = `${filterByDateState.startDate} - ${filterByDateState.endDate}`;
  }
  if (typeof filterByDateState === 'object' && filterByDateState.endDate === '' && filterByDateState.startDate === '') {
    dateText = i18n.t('customRange');
  }

  const handleCancel = () => {
    setStartDate(null);
    setEndDate(null);
    setDate({ endDate: '', startDate: '' });
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);

    if (typeof filterByDateState === 'object' && !!filterByDateState.startDate && !!filterByDateState.endDate) {
      const startDateReg = filterByDateState.startDate.replace(/[.]/g, '-');
      const endDateReg = filterByDateState.endDate.replace(/[.]/g, '-');

      fetchPopups.request({
        params: {
          filter: 'custom',
          from: startDateReg,
          to: endDateReg,
        },
      });

      fetchProducts.request({
        params: {
          filter: 'custom',
          from: startDateReg,
          to: endDateReg,
        },
      });

      fetchSmartBar.request({
        params: {
          filter: 'custom',
          from: startDateReg,
          to: endDateReg,
        },
      });
    }
  };

  // Hàm onChange custom date
  const handleDateChange = (args: { startDate: DateType; endDate: DateType }) => {
    const { startDate, endDate } = args;
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate !== null && endDate !== null) {
      setDate({ startDate: startDate?.format('YYYY.MM.DD'), endDate: endDate?.format('YYYY.MM.DD') });
    }
  };

  // Hàm onChange date (không bao gồm custom date)
  const handleSelectChange: SelectAntdProps['onChange'] = value => {
    if (value !== 'custom-range' && typeof value === 'string') {
      setDate(value);
      fetchPopups.request({
        params: {
          filter: value,
        },
      });
      fetchProducts.request({
        params: {
          filter: value,
        },
      });
      fetchSmartBar.request({
        params: {
          filter: value,
        },
      });
    }
  };

  // Hàm hiển thị ngày bắt đầu và ngày kết thúc
  const renderOptionLabel = (item: Option) => {
    if (item.value === 'custom-range') {
      if (typeof filterByDateState === 'object') {
        if (filterByDateState.startDate !== '' && filterByDateState.endDate !== '') {
          return `${filterByDateState.startDate} -  ${filterByDateState.endDate}`;
        } else {
          return item.label;
        }
      }
    }
    return item.label;
  };

  return (
    <View
      css={{ paddingRight: 0, paddingLeft: 0 }}
      columns={
        typeof filterByDateState === 'object' && filterByDateState.startDate !== '' && filterByDateState.endDate !== '' ? [12, 6, 6] : [12, 5, 5]
      }
      className="dashboard__fitler--date"
    >
      <SelectAntd
        defaultValue={filterByDateState ? dateText : dateOptions()[0].value.toString()}
        virtual={false}
        onChange={handleSelectChange}
        data={dateOptions()}
        renderOption={(item, index) => (
          <View key={index} className="custom-options">
            {renderOptionLabel(item)}
          </View>
        )}
        onSelect={value => {
          if (value === 'custom-range') {
            setIsModalVisible(true);
          }
        }}
      />
      <ModalAntd width={670} onCancel={handleCancel} onOk={handleOk} okText="Save" visible={isModalVisible} title="Custom Range">
        <DayPicker startDate={startDateState} endDate={endDateState} onValueChange={handleDateChange} />
      </ModalAntd>
    </View>
  );
};

export { DateFilter };
