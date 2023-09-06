import {View, useColorScheme} from 'react-native';
import {COLORS} from '../constants/theme';

const CartItemPlaceHolder = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colorOnSurface = isDarkMode ? COLORS.gray2 : COLORS.gray;

  return (
    <View
      style={{
        marginHorizontal: 16,
        flex: 1,
        flexDirection: 'row',
        marginTop: 16,
      }}>
      <View
        style={{
          height: 130,
          maxWidth: 120,
          backgroundColor: colorOnSurface,
          borderRadius: 8,
          flex: 1,
          flexDirection: 'column',
        }}></View>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: colorOnSurface,
            width: 200,
            height: 28,
            marginStart: 8,
            borderRadius: 8,
          }}></View>
        <View
          style={{
            backgroundColor: colorOnSurface,
            width: 220,
            height: 18,
            marginStart: 8,
            borderRadius: 8,
            marginTop: 8,
          }}></View>
        <View
          style={{
            backgroundColor: colorOnSurface,
            width: 120,
            height: 18,
            marginStart: 8,
            borderRadius: 8,
            marginTop: 8,
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            marginStart: 'auto',
            alignItems: 'center',
            marginTop: 'auto',
          }}>
          <View
            style={{
              backgroundColor: colorOnSurface,
              width: 30,
              height: 30,
              margin: 8,
              borderRadius: 8,
              marginTop: 8,
            }}></View>

          <View
            style={{
              backgroundColor: colorOnSurface,
              width: 25,
              height: 25,

              borderRadius: 8,
              marginVertical: 'auto',
            }}></View>

          <View
            style={{
              backgroundColor: colorOnSurface,
              width: 30,
              margin: 8,
              height: 30,
              borderRadius: 8,
              marginTop: 8,
            }}></View>
        </View>
      </View>
    </View>
  );
};
export default CartItemPlaceHolder;
