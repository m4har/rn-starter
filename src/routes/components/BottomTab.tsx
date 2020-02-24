import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  StyleSheetProperties,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PropsIcon {
  name: string;
  size: number;
  style: StyleSheetProperties;
}
export const GreenTabBar = ({state, descriptors, navigation}) => {
  const startAnimate = (
    value: any,
    props: {toValue: number; duration: number; useNativeDriver: boolean},
  ) => Animated.timing(value, props).start();
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        justifyContent: 'flex-end',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 0,
          height: 60,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#2ea903',
        }}>
        {state.routes.map((route, index) => {
          const [anim] = useState({
            icon: new Animated.Value(25),
            circle: new Animated.Value(0),
          });
          const {options} = descriptors[route.key];
          const label: 'home' | 'love' | 'cart' | 'profile' =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const title = () => {
            switch (label) {
              case 'home':
                return 'flower-tulip';
              case 'love':
                return 'heart';
              case 'cart':
                return 'cart';
              case 'profile':
                return 'account';
              default:
                return '';
            }
          };
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
            // animate()
          };
          const IconAnimated = Animated.createAnimatedComponent(Icon);
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          useEffect(() => {
            if (isFocused) {
              Promise.all([
                startAnimate(anim.icon, {
                  toValue: 30,
                  duration: 150,
                  useNativeDriver: false,
                }),
                startAnimate(anim.circle, {
                  toValue: 10,
                  duration: 150,
                  useNativeDriver: false,
                }),
              ]);
            } else {
              Promise.all([
                startAnimate(anim.icon, {
                  toValue: 25,
                  duration: 400,
                  useNativeDriver: false,
                }),
                startAnimate(anim.circle, {
                  toValue: 0,
                  duration: 400,
                  useNativeDriver: false,
                }),
              ]);
            }
          }, [isFocused]);
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconAnimated
                name={title()}
                style={{padding: 3, fontSize: anim.icon}}
                color={isFocused ? '#fff' : '#cbcbcbcb'}
              />
              <Animated.View
                style={{
                  height: anim.circle,
                  width: anim.circle,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
