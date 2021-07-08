import { View } from 'wiloke-react-core';
import { Box } from '../Box';

const StatisticBoxLoading = () => {
  return (
    <Box radius={16}>
      <View height={100} css={{ padding: '25px', display: 'flex', alignItems: 'center' }}>
        <View width={50} height={50} css={{ marginRight: '14px' }} radius={16} backgroundColor="gray2" />
        <View css={{ marginRight: '30px' }}>
          <View width={50} height={12} backgroundColor="gray2" radius={8} css={{ marginBottom: '8px' }} />
          <View width={50} height={20} backgroundColor="gray2" radius={8} />
        </View>
        <View width={80} height={3} radius={8} backgroundColor="gray2" />
      </View>
    </Box>
  );
};

export { StatisticBoxLoading };
