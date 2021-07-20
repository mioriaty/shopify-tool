import { Button } from 'app/components/Button';
import { ClientPlan } from 'app/services/PricingService';
import { pricingSelector } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LineAwesome, Text, View } from 'wiloke-react-core';
import { useGetPlanURL } from './actions/actionPlans';
import * as styles from './styles';

const PricingPage = () => {
  const planStore = useSelector(pricingSelector.plans);
  const planUrl = useSelector(pricingSelector.plandUrl);
  const getPlanUrl = useGetPlanURL();

  useEffect(() => {
    if (!!planUrl) {
      parent.window.close();
      window.open(planUrl, '_blank');
    }
  }, [planUrl]);

  const handleClick = (planType: ClientPlan) => () => {
    getPlanUrl.request({ plan: planType });
  };

  return (
    <View>
      <View row>
        <View columns={[12, 6, 6]}>
          <Text color="gray9" size={28} css={{ fontWeight: 600, lineHeight: '42px' }}>
            {i18n.t('pricing')}
          </Text>
        </View>
      </View>
      <View height={1} backgroundColor="gray3" css={{ width: '100%', margin: '20px 0' }} />

      <View css={styles.pricingContainer}>
        <View css={styles.tableContainer} className="Pricing-table" borderColor="gray4" borderStyle="solid" borderWidth={1} tagName="table">
          <View tagName="thead" css={styles.tableHeader}>
            <View tagName="tr">
              <View css={styles.col20} tagName="th"></View>
              <View css={styles.col20} tagName="th">
                <Text css={{ fontSize: '18px' }}>Free</Text>
                <Text css={styles.normalFont}>For new store and testing Life time</Text>
                <Button
                  radius={6}
                  loading={planStore.redirectStatus.free === 'loading'}
                  disabled={planStore.plans === 'free'}
                  size="small"
                  onClick={handleClick('free')}
                >
                  {planStore.plans === 'free' ? i18n.t('currentPlan') : i18n.t('upgradeNow')}
                </Button>
              </View>
              <View css={styles.col20} tagName="th">
                <Text css={{ fontSize: '18px' }}>Basic</Text>
                <Text css={styles.normalFont}>All the basics for starting a new business</Text>
                <Button
                  radius={6}
                  loading={planStore.redirectStatus.originalFree === 'loading'}
                  disabled={planStore.plans === 'originalFree'}
                  size="small"
                  onClick={handleClick('originalFree')}
                >
                  {planStore.plans === 'originalFree' ? i18n.t('currentPlan') : i18n.t('upgradeNow')}
                </Button>
              </View>
              <View css={styles.col20} tagName="th">
                <Text css={{ fontSize: '18px' }}>Pro</Text>
                <Text css={styles.normalFont}>Everything you need for a growing business</Text>
                <Button
                  radius={6}
                  loading={planStore.redirectStatus.silver === 'loading'}
                  disabled={planStore.plans === 'silver'}
                  size="small"
                  onClick={handleClick('silver')}
                >
                  {planStore.plans === 'silver' ? i18n.t('currentPlan') : i18n.t('upgradeNow')}
                </Button>
              </View>
              <View css={styles.col20} tagName="th">
                <Text css={{ fontSize: '18px' }}>Premium</Text>
                <Text css={styles.normalFont}>Advanced features for scaling your business</Text>
                <Button
                  radius={6}
                  loading={planStore.redirectStatus.gold === 'loading'}
                  disabled={planStore.plans === 'gold'}
                  size="small"
                  onClick={handleClick('gold')}
                >
                  {planStore.plans === 'gold' ? i18n.t('currentPlan') : i18n.t('upgradeNow')}
                </Button>
              </View>
            </View>
          </View>
          <View tagName="tbody" css={styles.tableBody}>
            <View tagName="tr">
              <View css={styles.col20} tagName="th">
                {i18n.t('monthly')}
              </View>
              <View tagName="td">0$</View>
              <View tagName="td">
                14.<Text tagName="small">99</Text>$/{i18n.t('monthly')}
              </View>
              <View tagName="td">
                29.<Text tagName="small">99</Text>$/{i18n.t('monthly')}
              </View>
              <View tagName="td">
                59.<Text tagName="small">99</Text>$/{i18n.t('monthly')}
              </View>
            </View>
            {/* <View tagName="tr">
              <View css={styles.col20} tagName="th">
                {i18n.t('yearly')}
              </View>
              <View css={styles.col20} tagName="td">
                -
              </View>
              <View css={styles.col20} tagName="td">
                149.<Text tagName="small">99</Text>$/{i18n.t('yearly')}
              </View>
              <View css={styles.col20} tagName="td">
                299.<Text tagName="small">99</Text>$/{i18n.t('yearly')}
              </View>
              <View css={styles.col20} tagName="td">
                599.<Text tagName="small">99</Text>$/{i18n.t('yearly')}
              </View>
            </View> */}
            <View tagName="tr">
              <View css={styles.col20} tagName="th">
                {i18n.t('support')}
              </View>
              <View css={styles.col20} tagName="td">
                {i18n.t('emailSupport')}
              </View>
              <View css={styles.col20} tagName="td">
                {i18n.t('liveChat')}
              </View>
              <View css={styles.col20} tagName="td">
                24/7 {i18n.t('liveChat')}
              </View>
              <View css={styles.col20} tagName="td">
                24/7 {i18n.t('liveChat')}
              </View>
            </View>
            <View tagName="tr">
              <View css={styles.col20} tagName="th">
                {i18n.t('pagesLimit')}
              </View>
              <View css={styles.col20} tagName="td">
                {i18n.t('standardPageOnly')}
                <br />({i18n.t('limit')} 3 {i18n.t('pages')})
              </View>
              <View css={styles.col20} tagName="td">
                {i18n.t('allPageType')} <br />({i18n.t('limit')} 10 {i18n.t('pages')})
              </View>
              <View css={styles.col20} tagName="td">
                {i18n.t('allPageType')}
                <br />({i18n.t('limit')} 50 {i18n.t('pages')})
              </View>
              <View css={styles.col20} tagName="td">
                {i18n.t('allPageType')}
                <br />({i18n.t('unlimited')})
              </View>
            </View>
            <View tagName="tr">
              <View css={styles.col20} tagName="th">
                {i18n.t('editCode')}
              </View>
              <View css={styles.col20} tagName="td">
                -
              </View>
              <View css={styles.col20} tagName="td">
                <LineAwesome color="primary" name="check" />
              </View>
              <View css={styles.col20} tagName="td">
                <LineAwesome color="primary" name="check" />
              </View>
              <View css={styles.col20} tagName="td">
                <LineAwesome color="primary" name="check" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export { PricingPage };
