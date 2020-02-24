export type ThemeMode = 'light' | 'dark';
export interface ThemeProps {
  theme?: {
    dark?: boolean;
    primary?: string;
    background?: string;
    card?: string;
    text?: string;
    border?: string;
  };
}
export const lightTheme: ThemeProps = {
  theme: {
    dark: false,
    primary: '#FEFEFE',
    background: '#ededed',
    card: '#ECF0ED',
    text: '#2B2B31',
    border: '#A6B5B3',
  },
};
export const darkTheme: ThemeProps = {
  theme: {
    dark: true,
    primary: '#2B2B31',
    background: '#45484E',
    card: '#95A5A6',
    text: '#FEFEFE',
    border: '#7A8589',
  },
};
