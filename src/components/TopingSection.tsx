import {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {COLORS, useColorPrimary} from '../constants/theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const imageBaseUrl =
  'https://firebasestorage.googleapis.com/v0/b/cafe-app-bf389.appspot.com/o/';

export const TopingSection: React.FC<TopingSectionProps> = ({
  data,
  textColor,
  setCart,
  cart,
}) => {
  const [selected, setSelected] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = isDarkMode ? Colors.darker : Colors.lighter;
  const colorPrimary = useColorPrimary(isDarkMode);

  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={{width: 10}}></View>}
      renderItem={({item}: {item: Toping}) => (
        <TouchableOpacity
          style={[
            styles.container,
            selected == item.name && {
              borderColor: colorPrimary,
              borderWidth: 2,
            },
            {backgroundColor: backgroundStyle},
          ]}
          onPress={() => {
            setSelected(item.name);
            setCart({...cart, toping: item.name});
          }}>
          <Image
            style={styles.topingImg}
            source={{
              uri: `${imageBaseUrl}${item.img}`,
            }}
          />
          <Text style={[{color: textColor, textAlign: 'center'}]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
      numColumns={3}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  topingImg: {
    height: 80,
    width: '100%',
    resizeMode: 'cover',
  },
  container: {
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 3,
    marginEnd: 16,
    marginTop: 28,
    marginBottom: 8,
    flex: 0.34,
  },
});

interface Toping {
  id: string;
  name: string;
  img: string;
}

interface TopingSectionProps {
  data: Toping[];
  textColor: string;
  setCart: any;
  cart: any;
}
