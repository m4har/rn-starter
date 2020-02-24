import {createStore} from 'easy-peasy';
import {AppearanceModel, appearance} from './appearanceModel';

export interface StoreModel {
  appearance: AppearanceModel;
}
const storeModel: StoreModel = {
  appearance,
};
export const store = createStore(storeModel);
