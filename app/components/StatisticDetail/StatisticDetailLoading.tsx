import { Box } from 'app/components/Box';
import { LineAwesome, View } from 'wiloke-react-core';

const StatisticDetailLoading = () => {
  return (
    <Box radius={16} css={{ padding: '30px 20px', marginBottom: '6px' }}>
      <View row css={{ alignItems: 'center' }}>
        <View columns={[1, 1, 1]}>
          <View width={24} height={24} backgroundColor="gray3" radius={6} />
        </View>
        <View columns={[1, 3, 3]}>
          <View radius={6} backgroundColor="gray3" width={200} css={{ marginBottom: '5px' }} height={10} />
          <View radius={6} backgroundColor="gray3" width={150} height={10} />
        </View>
        <View columns={[1, 1, 1]}>
          <View width={15} height={15} backgroundColor="gray3" radius={6} />
        </View>
        <View columns={[1, 1, 1]}>
          <View width={20} height={15} backgroundColor="gray3" radius={6} />
        </View>
        <View columns={[1, 1, 1]}>
          <View width={20} height={15} backgroundColor="gray3" radius={6} />
        </View>
        <View columns={[1, 1, 1]}>
          <View width={20} height={15} backgroundColor="gray3" radius={6} />
        </View>
        <View columns={[1, 2, 2]}>
          <View width={20} height={15} backgroundColor="gray3" radius={6} />
        </View>
        <View columns={[1, 1, 1]}>
          <View width={40} height={22} backgroundColor="gray3" radius={20} css={{ margin: '0 auto' }} />
        </View>
        <View columns={[1, 1, 1]} css={{ textAlign: 'center', paddingRight: 0 }}>
          <View css={{ display: 'inline-block', cursor: 'pointer' }}>
            <LineAwesome name="ellipsis-h" size={18} color="gray8" css={{ lineHeight: '18px' }} />
          </View>
        </View>
      </View>
    </Box>
  );
};

export { StatisticDetailLoading };
