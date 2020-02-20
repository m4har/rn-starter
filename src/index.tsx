import 'react-native-gesture-handler';
import './services/i18n';

import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StoreProvider, createStore, action, Action} from 'easy-peasy';
import {Theme} from './config/themes/types';
import ThemeManager, {useTheme} from './contexts/ManageThemeContext';
import T from './lang/types';
import Routes from './routes';
import {enableAnimation} from './helpers/animation';
export interface KeranjangModel {
  items?: number[];
  add?: Action<KeranjangModel, number>;
}
const keranjang: KeranjangModel = {
  items: [1, 2, 3, 4],
  add: action((state, payload: number) => {
    state.items.push(payload);
  }),
};
const store = createStore({keranjang});

const App = () => {
  const theme = useTheme();
  useEffect(() => {
    enableAnimation();
  }, [false]);
  return (
    <StoreProvider store={store}>
      <ThemeManager>
        <Routes />
      </ThemeManager>
    </StoreProvider>
  );
};

export default App;
