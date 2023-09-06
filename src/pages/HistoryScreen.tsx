import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useColorPrimary} from '../constants/theme';
import {COLORS} from '../constants/theme';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

const HistoryScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textColor = isDarkMode ? '#fff' : '#000';

  const colorPrimary = useColorPrimary(isDarkMode);

  const [orders, setOrders] = useState<any[]>();

  const fbOrders = firestore()
    .collection('orders')
    .where('username', '==', '@khoirul2009');

  useEffect(() => {
    fbOrders.onSnapshot(querySnapshot => {
      const listOrder: any[] = [];

      querySnapshot.forEach(doc => {
        const {bill, carts, deliverMethod, orderDate, paymentMethod, status} =
          doc.data();

        listOrder.push({
          bill,
          carts,
          deliverMethod,
          orderDate,
          paymentMethod,
          status,
        });
      });

      setOrders(listOrder);
    });
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <Text style={[styles.headerText, {color: textColor}]}>History</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={({item}: {item: History}) => (
          <View
            style={[
              styles.historyContainer,
              backgroundStyle,
              {shadowColor: textColor},
            ]}>
            <View
              style={{
                flex: 0.99,
              }}>
              <Text style={[{color: textColor, flex: 1}, styles.dateOrder]}>
                {item.orderDate}
              </Text>
              <Text style={[styles.menuOrder, {color: textColor}]}>
                {item.carts.map(data => `${data.quantity} ${data.menu.name}, `)}
              </Text>
              <Text style={[styles.bill, {color: textColor}]}>{item.bill}</Text>
            </View>
            <View>
              <View style={{flex: 1, marginVertical: 4}}>
                <Text
                  style={
                    item.status === 'On Process'
                      ? styles.badgeStatusInProcess
                      : styles.badgeStatusSuccess
                  }>
                  {item.status}
                </Text>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: colorPrimary}]}>
                  <Text style={{color: 'white'}}>Beli Lagi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

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
  historyContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  dateOrder: {
    marginVertical: 8,
  },
  menuOrder: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 8,
  },
  bill: {
    fontSize: 14,
    marginBottom: 8,
  },
  badgeStatusInProcess: {
    borderColor: COLORS.orange,
    backgroundColor: COLORS.lightOrange,
    borderWidth: 2,
    paddingVertical: 4,
    width: 100,
    marginStart: 'auto',
    textAlign: 'center',
    borderRadius: 4,
    color: COLORS.orange,
  },
  badgeStatusSuccess: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.lightGreen,
    borderWidth: 2,
    paddingVertical: 4,
    width: 100,
    marginStart: 'auto',
    textAlign: 'center',
    borderRadius: 4,
    color: COLORS.green,
  },
  button: {
    marginTop: 'auto',
    paddingHorizontal: 16,
    marginStart: 'auto',
    borderRadius: 4,
    paddingVertical: 8,
  },
});

interface History {
  orderDate: string;
  menu: string[];
  bill: string;
  status: string;
  carts: any[];
}

export default HistoryScreen;
