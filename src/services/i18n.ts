import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import {En, Id} from '../lang';
/* 
  config lang,
  store all stranslate at resouece:{...}
*/
const I18n = (): void => {
  i18next.use(initReactI18next).init({
    lng: RNLocalize.getLocales()[0].languageCode,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: true,
    },
    cleanCode: true,
    resources: {
      // language here..
      en: {
        translation: {
          ...En,
        },
      },
      id: {
        translation: {
          ...Id,
        },
      },
    },
  });
};
export default I18n();
