import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {animate} from '../../helpers/animation';
import Header from './components/Header';
import {Container, Text} from '../../components/Styled';
const testArr = Array.from(Array(30).keys());
const menu = [
  {
    name: 'HOT',
  },
  {
    name: 'New',
  },
  {
    name: 'Promo',
  },
];
interface ItemProps {
  item: number;
  index: number;
}
const RenderItem = (data: boolean) => ({item, index}: ItemProps) => {
  return (
    <View
      style={{
        flex: 1,
        height: data ? 300 : 200,
        backgroundColor: '#fff',
        margin: data ? 0 : 20,
        marginVertical: data ? 20 : 10,
        borderRadius: 10,
        elevation: 5,
      }}>
      <FastImage
        source={{
          uri:
            'https://bonsaifinance.com/wp-content/uploads/2018/03/bonsai.png',
          priority: FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          height: data ? 200 : 150,
          width: '100%',
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{`Bonsai ${index}`}</Text>
      </View>
    </View>
  );
};
const Dashboard = () => {
  const [state, setState] = useState({menu: true, selectMenu: 'HOT'});
  const onHideMenu = () => () => {
    setState(prevState => ({...prevState, menu: !prevState.menu}));
    animate();
  };
  const onSelectMenu = selectMenu => () => {
    setState(prevState => ({...prevState, selectMenu}));
    animate();
  };
  return (
    <SafeAreaView>
      <Header onPress={onHideMenu()} />
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            height: responsiveHeight(100),
            width: state.menu ? responsiveWidth(30) : 0,
            backgroundColor: 'white',
          }}>
          <FlatList
            data={menu}
            scrollEnabled={false}
            contentContainerStyle={{
              justifyContent: 'center',
              flex: 1,
              alignItems: 'center',
            }}
            keyExtractor={item => item.name}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={onSelectMenu(item.name)}>
                <Text
                  style={{
                    marginVertical: 20,
                    fontSize: state.menu ? responsiveFontSize(2.5) : 0,
                    color: state.selectMenu === item.name ? '#2ea903' : '#000',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <Container
          style={{
            height: responsiveHeight(100),
            width: state.menu ? responsiveWidth(70) : responsiveWidth(100),
          }}>
          <View
            style={{
              flex: 1,
              marginTop: responsiveHeight(8),
              marginHorizontal: 30,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: responsiveFontSize(5)}}>
              Explore
            </Text>
            <FlatList
              disableVirtualization
              showsVerticalScrollIndicator={false}
              key={state.menu ? 'h' : 'v'}
              data={testArr}
              keyExtractor={(item, index) => index.toLocaleString()}
              numColumns={state.menu ? 1 : 2}
              horizontal={false}
              contentContainerStyle={{paddingBottom: 100}}
              renderItem={RenderItem(state.menu)}
            />
          </View>
        </Container>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
