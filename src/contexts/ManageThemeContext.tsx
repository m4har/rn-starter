import React, {createContext, FC, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider} from 'styled-components/native';
import darkTheme from '../config/themes/dark';
import lightTheme from '../config/themes/light';
import {ThemeContext, ThemeMode} from '../config/themes/types';

const defaultMode = Appearance.getColorScheme() || 'light';

const ManageThemeContext = createContext<ThemeContext>({
  // @ts-ignore
  mode: defaultMode,
  setMode: mode => {},
});

export const useTheme = () => React.useContext(ManageThemeContext);

const ManageThemeProvider: FC = ({children}) => {
  const [themeState, setThemeState] = useState(defaultMode);

  const setMode = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({colorScheme}: {colorScheme: ThemeMode}) => {
        setThemeState(colorScheme);
      },
    );
    return () => subscription.remove();
  }, []);

  return (
    <ManageThemeContext.Provider
      value={{mode: themeState as ThemeMode, setMode}}>
      <ThemeProvider
        theme={themeState === 'dark' ? darkTheme.theme : lightTheme.theme}>
        <>
          <StatusBar
            barStyle={themeState === 'dark' ? 'light-content' : 'dark-content'}
          />
          {children}
        </>
      </ThemeProvider>
    </ManageThemeContext.Provider>
  );
};

const ManageThemeProviderWrapper: FC = ({children}) => (
  <AppearanceProvider>
    <ManageThemeProvider>{children}</ManageThemeProvider>
  </AppearanceProvider>
);

export default ManageThemeProviderWrapper;
