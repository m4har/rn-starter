import React from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {FlatList, View, Button} from 'react-native';
import {Container, Text} from '../../components/Styled';
import {KeranjangModel} from '../../../src/index';

const Cart = () => {
  const items: number[] = useStoreState(State => State.keranjang.items);
  const add = useStoreActions(action => action.keranjang.add);
  return (
    <Container style={{alignItems: 'center', justifyContent: 'center'}}>
      {/* <Text>Belanja</Text> */}
      <Button title="add" onPress={() => add(items.length + 1)} />
      {items.map((item, index) => (
        <View key={index}>
          <Text>{item}</Text>
        </View>
      ))}
    </Container>
  );
};

export default Cart;
