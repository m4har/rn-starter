import 'react-native-gesture-handler';
import './services/i18n';

import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components/native';
import {Theme} from './config/themes/types';
import ThemeManager, {useTheme} from './contexts/ManageThemeContext';
import T from './lang/types';
import Routes from './routes';
import {enableAnimation} from './helpers/animation';
const Container = styled.View<Theme>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.background};
`;
const Text = styled.Text<Theme>`
  color: ${props => props.theme.text};
`;
const App = () => {
  const theme = useTheme();
  useEffect(() => {
    enableAnimation();
  }, [false]);
  return (
    <ThemeManager>
      <Routes />
    </ThemeManager>
  );
};

export default App;
