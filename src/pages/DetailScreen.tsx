import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomRadionButton from '../components/CustomRadionButton';
import Icon from 'react-native-vector-icons/AntDesign';
import {DetailsScreenProps} from './type';
import {COLORS, useColorPrimary} from '../constants/theme';
import {TopingSection} from '../components/TopingSection';
import firestore from '@react-native-firebase/firestore';
import {IDRupiah} from '../utils/formater';

const DetailScreen: React.FC<DetailsScreenProps> = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {menuId} = route.params;

  const fbMenu = firestore().collection('menu').where('id', '==', menuId);

  const [menu, setMenu] = useState(Object);

  const [loading, setLoading] = useState(true);

  const [notes, onChangeNotes] = useState('');

  const colorOnSurface = isDarkMode ? COLORS.gray2 : COLORS.gray;

  const [cart, setCart] = useState({
    username: '@khoirul2009',
    size: '',
    ice: '',
    sugar: '',
    shot: 0,
    variant: '',
    toping: '',
    quantity: 0,
    note: '',
    price: 0,
  });

  const imageBaseUrl =
    'https://firebasestorage.googleapis.com/v0/b/cafe-app-bf389.appspot.com/o/';

  useEffect(() => {
    return fbMenu.onSnapshot(querySnapshoot => {
      querySnapshoot.forEach(doc => {
        const {
          id,
          name,
          price,
          image,
          desc,
          sizes,
          ices,
          sugars,
          shots,
          variants,
          topings,
        } = doc.data();
        setMenu({
          id,
          name,
          price,
          image,
          desc,
          sizes,
          ices,
          sugars,
          shots,
          variants,
          topings,
        });
      });

      setLoading(false);
    });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const textColor = !isDarkMode ? Colors.darker : Colors.ligther;

  const [qty, setQuantity] = useState(1);

  const colorPrimary = useColorPrimary(isDarkMode);

  const handleAddToCart = () => {
    firestore()
      .collection('carts')
      .add({
        ...cart,
        note: notes,
        quantity: qty,
        price: menu.price * qty,
        menu: menu,
      })
      .then(() => {
        navigation.navigate('Carts');
      });
  };

  const noValid =
    cart.size == '' ||
    cart.ice == '' ||
    cart.sugar == '' ||
    cart.shot == 0 ||
    cart.variant == ''
      ? true
      : false;

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {!loading ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={styles.container}>
            <ImageBackground
              style={styles.bannerImage}
              source={{
                uri: `${imageBaseUrl}${menu.image}`,
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrowleft"
                  size={30}
                  style={{margin: 10, color: COLORS.gray2}}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={{marginHorizontal: 16}}>
            <View style={styles.section1}>
              <Text style={[{color: textColor}, styles.sectionTitle]}>
                {menu.name}
              </Text>

              <Text
                style={[
                  {color: textColor},
                  styles.priceText,
                  {color: colorPrimary},
                ]}>
                {IDRupiah.format(menu.price)}
              </Text>
            </View>
            <Text style={[{color: textColor}, styles.description]}>
              {menu.desc}
            </Text>
            <View style={styles.section2}>
              <CustomRadionButton
                textColor={textColor}
                items={menu.sizes}
                label="Size"
                setCart={setCart}
                cart={cart}
              />
              <CustomRadionButton
                textColor={textColor}
                items={menu.ices}
                label="Ices"
                setCart={setCart}
                cart={cart}
              />
              <CustomRadionButton
                textColor={textColor}
                items={menu.sugars}
                label="Sugars"
                setCart={setCart}
                cart={cart}
              />
              <CustomRadionButton
                textColor={textColor}
                items={menu.shots}
                label="Shots"
                setCart={setCart}
                cart={cart}
              />
              <CustomRadionButton
                textColor={textColor}
                items={menu.variants}
                label="Variants"
                setCart={setCart}
                cart={cart}
              />
            </View>
            {menu.topings != null ? (
              <View style={{marginEnd: -16}}>
                <Text
                  style={[
                    {color: textColor},
                    {fontWeight: 'bold', marginTop: 8},
                  ]}>
                  Toping
                </Text>
                <TopingSection
                  data={menu.topings}
                  textColor={textColor}
                  cart={cart}
                  setCart={setCart}
                />
              </View>
            ) : (
              ''
            )}

            <Text
              style={[{color: textColor}, {fontWeight: 'bold', marginTop: 16}]}>
              Note for the barista!
            </Text>
            <TextInput
              placeholder="Type here..."
              style={[
                styles.noteTextArea,
                {
                  backgroundColor: isDarkMode ? COLORS.gray2 : COLORS.gray,
                  color: textColor,
                },
              ]}
              multiline
              placeholderTextColor="gray"
              onChangeText={onChangeNotes}
            />

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.counterBtn, {borderColor: colorPrimary}]}
                onPress={() => {
                  if (qty > 1) {
                    setQuantity(qty - 1);
                  }
                }}>
                <Text style={[{color: textColor}, {textAlign: 'center'}]}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={{color: textColor}}>{qty}</Text>
              <TouchableOpacity
                style={[styles.counterBtn, {borderColor: colorPrimary}]}
                onPress={() => setQuantity(qty + 1)}>
                <Text style={[{color: textColor}, {textAlign: 'center'}]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              disabled={noValid}
              onPress={handleAddToCart}
              style={[
                styles.button,
                {backgroundColor: !noValid ? colorPrimary : colorOnSurface},
              ]}>
              <Text
                style={{
                  color: !noValid ? 'white' : textColor,
                  textAlign: 'center',
                }}>
                Add To Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                firestore().collection('menu').add(menu);
              }}
              style={[
                styles.button,
                {backgroundColor: !noValid ? colorPrimary : colorOnSurface},
              ]}>
              <Text
                style={{
                  color: !noValid ? 'white' : textColor,
                  textAlign: 'center',
                }}>
                Add To Menu
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.centeredView}>
          <ActivityIndicator size="small" color={textColor} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 'auto',
  },
  section1: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 6,
    alignItems: 'center',
  },
  description: {
    textAlign: 'justify',
    lineHeight: 25,
  },
  section2: {
    marginTop: 20,
  },
  container: {
    height: 250,
    borderBottomEndRadius: 20,
    overflow: 'hidden',
    borderBottomStartRadius: 20,
  },
  noteTextArea: {
    marginVertical: 8,
    borderRadius: 10,
    padding: 8,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  counterBtn: {
    borderWidth: 1,
    width: 30,
    padding: 4,
    margin: 8,

    borderRadius: 4,
  },
  quantityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    marginVertical: 16,
    borderRadius: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
});

export default DetailScreen;
