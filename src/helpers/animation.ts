import {LayoutAnimation} from 'react-native';
import {UIManager} from 'react-native';

const CONFIG = {
  duration: 350,
  create: {
    type: LayoutAnimation.Types.easeIn,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeOut,
  },
  delete: {
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeOut,
  },
};

export function animate() {
  LayoutAnimation.configureNext(CONFIG);
}

export function enableAnimation() {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
