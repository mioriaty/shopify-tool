import { authSelectors } from 'app/store/general/selectors';
import { db } from 'app/utils/db';
import handleError from 'app/utils/functions/handleError';
import { useSelector } from 'react-redux';

export const useFirebaseRemove = () => {
  const shopNameFirebase = useSelector(authSelectors.shopNameFirebase);

  const handleRemove = async (campaignId: string) => {
    try {
      const campaignFbRef = db.ref(`data/${shopNameFirebase}/${campaignId}`);
      const helpsFbRef = db.ref(`helps`);
      campaignFbRef.remove();
      const helpsQuery = db.ref('helps').orderByChild('campaignId').equalTo(campaignId);
      const snap = await helpsQuery.once('value');
      if (snap?.exists()) {
        const data = snap?.val();
        if (typeof data === 'object' && !!data) {
          const [key] = Object.keys(data);
          helpsFbRef.child(key).remove();
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  return {
    handleRemove,
  };
};
