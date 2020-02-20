import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Animated, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStoreState} from 'easy-peasy';
import {animate} from '../helpers/animation';
import Dashboard from '../modules/Dashboard';
import Love from '../modules/Love';
import Profile from '../modules/Profile';
import Cart from '../modules/Cart';

function MyTabBar({state, descriptors, navigation}) {
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
          const countCart: number[] = useStoreState(
            state => state.keranjang.items,
          );
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
                bottom: label === 'cart' ? 5 : 0,
              }}>
              {label === 'cart' && countCart.length !== 0 && (
                <View
                  style={{
                    backgroundColor: 'red',
                    height: 15,
                    width: 15,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 10,
                  }}>
                  <Text style={{color: '#fff'}}>{countCart.length}</Text>
                </View>
              )}
              <IconAnimated
                name={title()}
                // size={isFocused ? 30 : 25}
                style={{padding: 3, fontSize: anim.icon}}
                color={isFocused ? '#fff' : '#cbcbcbcb'}
              />
              <Animated.View
                style={{
                  // height: isFocused ? 10 : 0,
                  // width: isFocused ? 10 : 0,
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
}

const HomeTabs = () => {
  const {Navigator, Screen} = createBottomTabNavigator();
  return (
    <Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{unmountOnBlur: false}}>
      <Screen name="home" component={Dashboard} />
      <Screen name="love" component={Love} />
      <Screen name="cart" component={Cart} />
      <Screen name="profile" component={Profile} />
    </Navigator>
  );
};

const Root = () => {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <NavigationContainer>
      <Navigator initialRouteName="dashboard">
        <Screen
          name="dashboard"
          component={HomeTabs}
          options={{headerShown: false}}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Root;
