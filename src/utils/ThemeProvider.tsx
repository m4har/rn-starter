import React, {useEffect} from 'react';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {useStoreState, useStoreActions} from '../hooks/easyPeasy';
import {ThemeMode, lightTheme, darkTheme} from '../config/Theme';

const Theme = ({children}) => {
  const setTheme = useStoreActions(ac => ac.appearance.setMode);
  const mode = useStoreState(st => st.appearance.mode);
  useEffect(() => {
    const subsTheme = Appearance.addChangeListener(
      ({colorScheme}: {colorScheme: ThemeMode}) => {
        setTheme(colorScheme);
      },
    );
    return () => subsTheme.remove();
  }, []);
  return (
    <AppearanceProvider>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <ThemeProvider
        theme={mode === 'dark' ? darkTheme.theme : lightTheme.theme}>
        {children}
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default Theme;
