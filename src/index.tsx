import React from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components/native';
import {Theme} from './config/themes/types';
import ThemeManager, {useTheme} from './contexts/ManageThemeContext';
import T from './lang/types';
import './services/i18n';

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
  const {t, i18n} = useTranslation();
  return (
    <ThemeManager>
      <Container>
        <Text>{t(T.hello)}</Text>
      </Container>
    </ThemeManager>
  );
};

export default App;
