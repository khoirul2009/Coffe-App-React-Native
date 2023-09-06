import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Modal,
  Alert,
  Image,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {OrderScreenProps} from './type';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS, SIZES, useColorPrimary} from '../constants/theme';
import Icon from 'react-native-vector-icons/AntDesign';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import {IDRupiah} from '../utils/formater';
import CartItemPlaceHolder from '../components/CartItemPlaceHolder';
import CartItem from '../components/CartItem';

const OrderScreen: React.FC<OrderScreenProps> = ({navigation}) => {
  const imageBaseUrl =
    'https://firebasestorage.googleapis.com/v0/b/cafe-app-bf389.appspot.com/o/';
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const textColor = isDarkMode ? '#fff' : '#000';
  const colorPrimary = useColorPrimary(isDarkMode);
  const [deliverMethod, setDeliverMethod] = useState('self-service');
  const [paymentMethod, setPaymentMethod] = useState('e-wallet');
  const [modalVisible, setModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartsDocId, setCartsDocId] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const dummyUsername = '@khoirul2009';
  const fbCarts = firestore()
    .collection('carts')
    .where('username', '==', dummyUsername);

  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fbCarts.onSnapshot(querySnapshot => {
      const listCart: any = [];
      var tempPrice: any = 0;
      const listCartDocId: string[] = [];
      querySnapshot.forEach(doc => {
        const {ice, menu, price, quantity, shot, size, sugar, toping, variant} =
          doc.data();
        listCartDocId.push(doc.id);
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
      setCartsDocId(listCartDocId);
      setCarts(listCart);
      setTotalPrice(tempPrice);
      if (loading) setLoading(false);
    });
  }, []);

  const addOrder = () => {
    const orderDate = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    firestore()
      .runTransaction(async transaction => {
        await firestore().collection('orders').add({
          deliverMethod,
          carts,
          paymentMethod,
          orderDate,
          username: dummyUsername,
          bill: totalPrice,
          status: 'On Process',
        });
        cartsDocId.forEach(item => {
          transaction.delete(firestore().collection('carts').doc(item));
        });
      })
      .then(() => {
        setModalVisible(true);
      });
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrowleft"
            size={22}
            style={{margin: 10, color: textColor}}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: textColor}]}>
          Order Confirmation
        </Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.deliverMethodSection}>
          <Text style={[styles.sectionTitle, {color: textColor}]}>
            Deliver Method
          </Text>
          <View style={[styles.optinContainer, {borderColor: colorPrimary}]}>
            <TouchableHighlight
              underlayColor={colorPrimary}
              onPress={() => setDeliverMethod('self-service')}
              style={[
                styles.option,
                {
                  backgroundColor:
                    deliverMethod === 'self-service'
                      ? colorPrimary
                      : 'transparent',
                },
              ]}>
              <Text
                style={[
                  styles.optionLabel,
                  {
                    color:
                      deliverMethod === 'self-service'
                        ? Colors.lighter
                        : colorPrimary,
                  },
                ]}>
                Self Service
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colorPrimary}
              onPress={() => setDeliverMethod('deliver')}
              style={[
                styles.option,
                {
                  backgroundColor:
                    deliverMethod === 'deliver' ? colorPrimary : 'transparent',
                },
              ]}>
              <Text
                style={[
                  styles.optionLabel,
                  {
                    color:
                      deliverMethod === 'deliver'
                        ? Colors.lighter
                        : colorPrimary,
                  },
                ]}>
                Delivery
              </Text>
            </TouchableHighlight>
          </View>
        </View>
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
        <View style={styles.paymentMethodSection}>
          <Text style={[styles.sectionTitle, {color: textColor}]}>
            Payment Method
          </Text>
          <View style={[styles.optinContainer, {borderColor: colorPrimary}]}>
            <TouchableHighlight
              underlayColor={colorPrimary}
              onPress={() => setPaymentMethod('e-wallet')}
              style={[
                styles.option,
                {
                  backgroundColor:
                    paymentMethod === 'e-wallet' ? colorPrimary : 'transparent',
                },
              ]}>
              <Text
                style={[
                  styles.optionLabel,
                  {
                    color:
                      paymentMethod === 'e-wallet'
                        ? Colors.lighter
                        : colorPrimary,
                  },
                ]}>
                E-Wallet
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colorPrimary}
              onPress={() => setPaymentMethod('cash')}
              style={[
                styles.option,
                {
                  backgroundColor:
                    paymentMethod === 'cash' ? colorPrimary : 'transparent',
                },
              ]}>
              <Text
                style={[
                  styles.optionLabel,
                  {
                    color:
                      paymentMethod === 'cash' ? Colors.lighter : colorPrimary,
                  },
                ]}>
                Cash
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.promoSection}>
          <Text style={[styles.sectionTitle, {color: textColor}]}>Promo</Text>
          <TouchableOpacity
            onPress={() => {
              ToastAndroid.showWithGravity(
                'This Feature Not Available For Now ',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }}
            style={[styles.promoContainer, {borderColor: colorPrimary}]}>
            <FontAwesome5 name="tag" size={SIZES.xLarge} color={colorPrimary} />
            <View style={styles.promoInfo}>
              <Text style={{color: textColor}}>Diskon Name</Text>
              <Text style={{color: textColor, fontSize: SIZES.small}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing
              </Text>
            </View>
            <FontAwesome5
              name="chevron-right"
              size={SIZES.large}
              color={colorPrimary}
            />
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, {color: textColor}]}>
            Payment Details
          </Text>
          <View
            style={[
              styles.paymentDetailContainer,
              {borderColor: colorPrimary},
            ]}>
            <View style={[styles.detailGroup]}>
              <Text style={{color: textColor}}>Order Subtotal (2 items)</Text>
              <Text style={{color: textColor}}>
                {IDRupiah.format(totalPrice)}
              </Text>
            </View>
            <View style={[styles.detailGroup]}>
              <Text style={{color: textColor}}>Discount </Text>
              <Text style={{color: textColor}}>{IDRupiah.format(0)}</Text>
            </View>
            <View style={[styles.detailGroup]}>
              <Text style={{color: textColor, fontWeight: '600'}}>
                Payment Total
              </Text>
              <Text style={{color: textColor, fontWeight: '600'}}>
                {IDRupiah.format(totalPrice)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.orderContainer}>
        <View style={{height: 60}}>
          <Text style={{color: textColor}}>Payment Total</Text>
          <Text style={[styles.cartName, {color: textColor}]}>
            {IDRupiah.format(totalPrice)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={addOrder}
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, backgroundStyle]}>
            <Image
              source={require('../assets/order_success.png')}
              style={{
                width: 150,
                resizeMode: 'center',
                height: 150,
              }}
            />
            <Text
              style={[styles.modalText, {color: textColor, fontWeight: '500'}]}>
              12 Juli 2021 12:12
            </Text>
            <Text style={[styles.modalText, {color: textColor}]}>
              Transaction ID : CFT1206211212
            </Text>
            <Text
              style={[
                styles.modalText,
                {color: textColor, fontSize: SIZES.large, fontWeight: '600'},
              ]}>
              ORDER IN PROSES
            </Text>
            <Text style={[styles.modalText, {color: textColor}]}>
              Order will be ready in
            </Text>
            <Text style={[styles.modalText, {color: colorPrimary}]}>
              15 Minutes
            </Text>

            <TouchableOpacity
              style={[styles.button, {backgroundColor: colorPrimary}]}
              onPress={() => navigation.navigate('History')}>
              <Text style={[styles.textStyle, {fontSize: SIZES.medium}]}>
                See Status
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {borderColor: colorPrimary, borderWidth: 2, marginTop: 8},
              ]}
              onPress={() => navigation.navigate('Home')}>
              <Text
                style={[
                  styles.textStyle,
                  {fontSize: SIZES.medium, color: colorPrimary},
                ]}>
                Back To Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 8,
    alignItems: 'center',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 0.9,
    textAlign: 'center',
  },
  deliverMethodSection: {
    paddingBottom: 16,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.gray,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontWeight: '500',
  },
  optinContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
  },
  option: {
    flex: 1,
    padding: 4,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
  },
  optionLabel: {
    fontWeight: '500',
    textAlign: 'center',
  },
  paymentMethodSection: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderBottomColor: COLORS.gray,
    borderTopColor: COLORS.gray,
  },
  promoSection: {},
  promoContainer: {
    marginHorizontal: 16,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  cartName: {
    fontSize: 18,
    fontWeight: '600',
  },
  promoInfo: {
    paddingHorizontal: 8,
    flex: 0.99,
  },
  paymentDetailContainer: {
    marginHorizontal: 16,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  detailGroup: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  orderContainer: {
    marginTop: 'auto',
    marginHorizontal: 16,
    flexDirection: 'row',
    paddingTop: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    width: 150,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

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

export default OrderScreen;
