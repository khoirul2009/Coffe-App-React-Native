import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {COLORS} from '../constants/theme';
import {IDRupiah} from '../utils/formater';
import React, {useState} from 'react';

const CartItem: React.FC<Props> = ({
  item,
  colorPrimary,
  textColor,
  imageBaseUrl,
}) => {
  const [disable, setDisable] = useState(false);

  const handleUpdateQuantity = (docId: string, opartion: number) => {
    const cartRef = firestore().doc(`carts/${docId}`);

    firestore().runTransaction(async transaction => {
      setDisable(true);
      await firestore()
        .collection('carts')
        .doc(docId)
        .update({
          quantity: firestore.FieldValue.increment(opartion),
        });

      const cart = await transaction.get(cartRef);

      if (cart.data()?.quantity >= 1) {
        const newPrice = cart.data()?.menu.price * cart.data()?.quantity;
        transaction.update(cartRef, {
          price: newPrice,
        });
        setDisable(false);
        return;
      }

      transaction.delete(cartRef);
    });
  };
  return (
    <View style={styles.cartContainer}>
      <Image
        style={styles.cartImage}
        source={{
          uri: `${imageBaseUrl}${item.menu.image}`,
        }}
      />
      <View style={styles.detailCartContainer}>
        <Text style={[styles.cartName, {color: textColor}]}>
          {item.menu.name}
        </Text>
        <Text style={[styles.cartDetail, {color: textColor}]}>
          {`${item.size} Size, ${item.ice} Ice, ${item.sugar} Sugar, ${item.shot} Shot, ${item.variant} Variant, ${item.toping}`}
        </Text>
        <Text style={[styles.cartPrice, {color: colorPrimary}]}>
          {IDRupiah.format(item.price)}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            disabled={disable}
            style={[
              styles.counterBtn,
              {
                borderColor: colorPrimary,
              },
            ]}
            onPress={() => handleUpdateQuantity(item.docId, -1)}>
            <Text style={[{textAlign: 'center', color: textColor}]}>-</Text>
          </TouchableOpacity>
          <Text style={[{color: textColor}]}>{item.quantity}</Text>
          <TouchableOpacity
            disabled={disable}
            style={[
              styles.counterBtn,
              {
                borderColor: colorPrimary,
              },
            ]}
            onPress={() => handleUpdateQuantity(item.docId, 1)}>
            <Text style={[{textAlign: 'center', color: textColor}]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

interface Props {
  item: any;
  textColor: string;
  colorPrimary: string;
  imageBaseUrl: string;
}

const styles = StyleSheet.create({
  cartContainer: {
    margin: 16,
    flex: 1,
    flexDirection: 'row',
  },
  cartImage: {
    height: '100%',
    maxWidth: 120,
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10,
  },
  detailCartContainer: {
    flex: 1,
    marginHorizontal: 8,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  cartName: {
    fontSize: 18,
    fontWeight: '600',
  },
  cartDetail: {
    padding: 0,
    fontSize: 12,
  },
  cartPrice: {
    fontWeight: '500',
    fontSize: 16,
    marginTop: 4,
  },
  counterBtn: {
    borderWidth: 1,
    width: 30,
    padding: 4,
    margin: 8,
    borderRadius: 6,
  },
  quantityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  checkoutBtn: {
    borderWidth: 2,
    margin: 16,
    padding: 8,
    borderRadius: 4,
  },
  orderContainer: {
    marginTop: 'auto',
    marginHorizontal: 16,
    flexDirection: 'row',
  },
});

export default CartItem;
