import 'react-native-gesture-handler';
import './services/i18n';

import React, {useEffect} from 'react';
import {StoreProvider} from 'easy-peasy';
import Routes from './routes';
import {enableAnimation} from './helpers/animation';
import ThemeProvider from './utils/ThemeProvider';
import {store} from './models';

const App = () => {
  useEffect(() => {
    enableAnimation();
  }, [false]);
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
