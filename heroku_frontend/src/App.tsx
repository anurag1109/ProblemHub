import * as React from 'react';
import {history} from './services/history'
import Router from './router/Router';
import configureStore from './store/ConfigureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingScreen from './components/Loaders/LoadingScreen';
import Theme from './components/theme/Theme';
import {CssBaseline} from '@material-ui/core';
import './components/editor/editor.css'
const {store,persistor}=configureStore()

const App: React.FC<any> = (props) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Suspense fallback={<LoadingScreen />}>
            <Theme >
              <CssBaseline />
              <Router history={history} />
          </Theme>
          </React.Suspense>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
