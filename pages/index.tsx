import { getUseDispatchRedux } from 'wiloke-react-core/utils';
import { useDispatch } from 'react-redux';
import { AppProvider } from 'app/containers/AppProvider';
import Routes from 'app/routes';

getUseDispatchRedux(useDispatch);

const Index = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default Index;
