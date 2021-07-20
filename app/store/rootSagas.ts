import { sagasAuth } from 'app/containers/Auth';
import { sagaDashboardPage } from 'app/containers/DashBoardPage';
import { sagaPopupPage } from 'app/containers/PopupPage';
import { sagasPricingPage } from 'app/containers/PricingPage';
import { sagaSmartBarPage } from 'app/containers/SmartBarPage';
import { sagasSubscriberPage } from 'app/containers/SubscriberPage';
import { all, call, spawn, delay } from 'redux-saga/effects';

const sagas = [...sagaPopupPage, ...sagaDashboardPage, ...sagaSmartBarPage, ...sagasSubscriberPage, ...sagasAuth, ...sagasPricingPage];

// https://github.com/redux-saga/redux-saga/issues/760#issuecomment-273737022
const makeRestartable = (saga: any) => {
  return function* () {
    yield spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          console.error('unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!', saga);
        } catch (e) {
          console.error('Saga error, the saga will be restarted', e);
        }
        yield delay(1000); // Avoid infinite failures blocking app TODO use backoff retry policy...
      }
    });
  };
};

const rootSagas = sagas.map(makeRestartable);

export default function* root() {
  yield all(rootSagas.map(call));
}
