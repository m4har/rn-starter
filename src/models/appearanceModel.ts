import {action, Action} from 'easy-peasy';
import {Appearance} from 'react-native-appearance';

export interface AppearanceModel {
  mode: string;
  autoDark: boolean;
  setMode: Action<AppearanceModel, string>;
  setAutoDark: Action<AppearanceModel, boolean>;
}
export const appearance: AppearanceModel = {
  mode: Appearance.getColorScheme() || 'light',
  autoDark: true,
  // action
  setMode: action((state, payload: string) => {
    state.mode = payload;
  }),
  setAutoDark: action((state, payload: boolean) => {
    state.autoDark = payload;
  }),
};
