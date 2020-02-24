import Styled from 'styled-components/native';
import {ThemeProps} from '../config/Theme';

export const Container = Styled.View<ThemeProps>`
  flex: 1;
  background-color: ${props => props.theme.background};
`;
export const Text = Styled.Text<ThemeProps>`
  color: ${props => props.theme.text};
`;
