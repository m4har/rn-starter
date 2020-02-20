import Styled from 'styled-components/native';
import {Theme} from '../config/themes/types';

export const Container = Styled.View<Theme>`
  flex: 1;
  background-color: ${props => props.theme.background};
`;
export const Text = Styled.Text<Theme>`
  color: ${props => props.theme.text};
`;
