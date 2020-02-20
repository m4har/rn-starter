import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Animated from 'react-native-reanimated'
import {animate} from '../../helpers/animation';

const iconList = [
  {
    name: 'home',
  },
  {
    name: 'account',
  },
];

const RenderIcon = (props: {
  name: string;
  index: number;
  position: number;
  onPress?(): void;
}) => {
  const isFocus = props.index === props.position;
  const [size] = useState(new Animated.Value(30));
  useEffect(() => {
    if (isFocus) {
      Animated.timing(size, {
        toValue: 60,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(size, {
        toValue: 30,
        duration: 600,
        useNativeDriver: false,
      }).start();
    }
  }, [props.position]);
  const IconAnimate = Animated.createAnimatedComponent(Icon);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <TouchableOpacity onPress={props.onPress}>
        <IconAnimate name={props.name} style={{fontSize: size}} />
      </TouchableOpacity>
    </View>
  );
};

const Love = () => {
  const [state, setState] = useState({position: 8});
  const onPress = (position: number) => () => {
    setState(prev => ({...prev, position}));
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        {iconList.map((item, index) => (
          <RenderIcon
            key={index}
            name={item.name}
            index={index}
            position={state.position}
            onPress={onPress(index)}
          />
        ))}
      </View>
    </View>
  );
};

export default Love;
