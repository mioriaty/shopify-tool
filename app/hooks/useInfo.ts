import { useGetPlans } from 'app/containers/PricingPage/actions/actionPlans';
import { useGetCodeDiscounts } from 'app/graphql/codeDiscount';
import { ClientDiscount } from 'app/services/PricingService';
import { authSelectors, pricingSelector } from 'app/store/general/selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useInfo = () => {
  const token = useSelector(authSelectors.shopifyToken);
  const { data: codeDiscounts, getCodeDiscountsBasic } = useGetCodeDiscounts();
  const userPackage = useSelector(pricingSelector.plans);
  const setUserPlans = useGetPlans();
  const [discounts, setDisounts] = useState<ClientDiscount[]>([]);

  useEffect(() => {
    getCodeDiscountsBasic({
      quantity: 20,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!codeDiscounts) {
      const getInfoCodeDiscount = codeDiscounts.codeDiscountNodes.edges.map(item => {
        return {
          id: item.node.id,
          code: item.node.codeDiscount.title,
          description: item.node.codeDiscount.summary,
          endsAt: item.node.codeDiscount.endsAt,
          startsAt: item.node.codeDiscount.startsAt,
          status: item.node.codeDiscount.status,
        };
      });
      setDisounts([...getInfoCodeDiscount]);
    }
  }, [codeDiscounts]);

  useEffect(() => {
    if (token) {
      setUserPlans.request(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handSetDiscount = (discount: ClientDiscount[]) => {
    setDisounts(discount);
  };

  return {
    userPackage: userPackage.plans,
    accessToken: token,
    discounts,
    setDiscounts: handSetDiscount,
  };
};

export default useInfo;
