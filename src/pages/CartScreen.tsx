import {
  Text,
  View,
  StatusBar,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS, useColorPrimary} from '../constants/theme';

import firestore from '@react-native-firebase/firestore';
import {IDRupiah} from '../utils/formater';
import CartItemPlaceHolder from '../components/CartItemPlaceHolder';
import {FlatList} from 'react-native';
import CartItem from '../components/CartItem';

const CartScreen: React.FC<CartScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const imageBaseUrl =
    'https://firebasestorage.googleapis.com/v0/b/cafe-app-bf389.appspot.com/o/';

  const dummyUsername = '@khoirul2009';

  const fbCarts = firestore()
    .collection('carts')
    .where('username', '==', dummyUsername);

  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fbCarts.onSnapshot(querySnapshot => {
      const listCart: any = [];
      var tempPrice: any = 0;
      querySnapshot.forEach(doc => {
        const {ice, menu, price, quantity, shot, size, sugar, toping, variant} =
          doc.data();

        listCart.push({
          docId: doc.id,
          ice,
          menu,
          price,
          quantity,
          shot,
          size,
          sugar,
          toping,
          variant,
        });
        tempPrice = tempPrice + price;
      });
      setCarts(listCart);
      setTotalPrice(tempPrice);
      if (loading) setLoading(false);
    });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textColor = isDarkMode ? '#fff' : '#000';

  const colorPrimary = useColorPrimary(isDarkMode);

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={styles.header}>
        <Text style={[styles.headerText, {color: textColor}]}>Carts</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {!loading ? (
          <FlatList
            data={carts}
            scrollEnabled={false}
            keyExtractor={item => item.docId}
            renderItem={({item}: {item: CartItem}) => {
              return (
                <CartItem
                  item={item}
                  colorPrimary={colorPrimary}
                  textColor={textColor}
                  imageBaseUrl={imageBaseUrl}
                />
              );
            }}
          />
        ) : (
          <CartItemPlaceHolder />
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={[styles.checkoutBtn, {borderColor: colorPrimary}]}>
          <Text
            style={{
              textAlign: 'center',
              color: colorPrimary,
              fontWeight: '500',
            }}>
            + Add Other Menu
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.orderContainer}>
        <View style={{height: 60}}>
          <Text style={{color: textColor}}>
            Price Total ({carts.length}) Items
          </Text>
          <Text style={[styles.cartName, {color: textColor}]}>
            {IDRupiah.format(totalPrice)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderScreen')}
          disabled={!carts.length}
          style={{
            padding: 8,
            backgroundColor: colorPrimary,
            borderRadius: 4,
            width: 80,
            height: 40,
            alignItems: 'center',
            marginStart: 'auto',
          }}>
          <Text
            style={{color: 'white', textAlign: 'center', fontWeight: '500'}}>
            Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

interface CartItem {
  docId: string;
  ice: string;
  menu: any;
  price: number;
  quantity: number;
  shot: string;
  size: string;
  sugar: string;
  toping: string;
  variant: string;
}

const styles = StyleSheet.create({
  header: {
    padding: 8,
    alignItems: 'center',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 2,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
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

interface CartScreenProps {
  navigation: any;
}

export default CartScreen;
