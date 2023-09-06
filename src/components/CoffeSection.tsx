import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {IDRupiah} from '../utils/formater';
import Menu from '../model/Menu';

const CoffeSection: React.FC<CoffeListProps> = ({
  data,
  textColor,
  navigation,
}) => {
  const imageBaseUrl =
    'https://firebasestorage.googleapis.com/v0/b/cafe-app-bf389.appspot.com/o/';

  return (
    <FlatList
      data={data}
      renderItem={({item}: {item: Menu}) => (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailsScreen', {
                menuId: item.id,
              })
            }>
            <Image
              style={styles.coffeImage}
              source={{uri: `${imageBaseUrl}${item.image}`}}
            />
            <Text style={[styles.coffeName, {color: textColor}]}>
              {item.name}
            </Text>
            <Text style={[{color: textColor}]}>
              {IDRupiah.format(item.price)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      scrollEnabled={false}
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    width: 'auto',
    padding: 8,
  },
  coffeImage: {
    width: 'auto',
    height: 200,
    borderRadius: 10,
  },
  gridContainer: {
    padding: 8,
  },
  coffeName: {
    fontWeight: '800',
    fontSize: 18,
    marginVertical: 2,
  },
});

interface CoffeListProps {
  data: Menu[];
  textColor: string;
  navigation: any;
}

export default CoffeSection;
