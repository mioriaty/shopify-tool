import { statisticOption } from 'app/data/options';
import { SelectAntdProps, SelectAntd } from 'app/components/SelectAntd';
import { dashboardPageSelectors } from 'app/store/general/selectors';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import { useActionFilterByPage } from '../actions/actionFilter';

interface PageFilterProps {}

const PageFilter: FC<PageFilterProps> = () => {
  const setFilterByPage = useActionFilterByPage();
  const filterByPageState = useSelector(dashboardPageSelectors.filterByPage);

  const handleChange: SelectAntdProps['onChange'] = value => {
    setFilterByPage(value);
  };

  return (
    <View className="dashboard__fitler--page" columns={[12, 5, 5]}>
      <SelectAntd
        defaultValue={filterByPageState ? filterByPageState : statisticOption()[0].value.toString()}
        virtual={false}
        data={statisticOption()}
        onChange={handleChange}
      />
    </View>
  );
};

export { PageFilter };
