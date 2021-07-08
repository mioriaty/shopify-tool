import { View } from 'wiloke-react-core';
import { Box } from '../Box';

const CardLoading = () => {
  return (
    <Box>
      <View backgroundColor="gray4" aspectRatioInPercent={56.25} css={{ marginBottom: '10px' }} />
      <View css={{ padding: '25px' }}>
        <View backgroundColor="gray4" width={150} height={20} radius={8} css={{ marginBottom: '20px' }} />
        <View backgroundColor="gray4" height={8} radius={8} css={{ marginBottom: '8px', width: '100%' }} />
        <View backgroundColor="gray4" height={8} radius={8} css={{ marginBottom: '8px', width: '100%' }} />
        <View backgroundColor="gray4" height={8} radius={8} css={{ marginBottom: '20px', width: '100%' }} />

        <View backgroundColor="gray4" height={45} width={150} radius={8} />
      </View>
    </Box>
  );
};

export { CardLoading };
