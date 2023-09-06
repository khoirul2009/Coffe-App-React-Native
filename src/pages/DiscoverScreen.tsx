import {FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  useColorScheme,
  View,
  Button,
  ScrollView,
  Text,
} from 'react-native';
import {DiscoverPageProps} from './type';
import {SIZES, useColorPrimary} from '../constants/theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CoffeSection from '../components/CoffeSection';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import CategoryItemFilter from '../components/CategoryItemFilter';

const DiscoverScreen: FC<DiscoverPageProps> = ({navigation, route}) => {
  const {category} = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const colorPrimary = useColorPrimary(isDarkMode);
  const textColor = isDarkMode ? '#fff' : '#000';
  const [query, setQuery] = useState('');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [lastDocument, setLastDocument] = useState();
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fbCategories = firestore()
    .collection('categories')
    .orderBy('id', 'asc');
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(category || 'All');

  useEffect(() => {
    fbCategories.onSnapshot(querySnapshot => {
      const listCategory: any = [];
      querySnapshot.forEach(doc => {
        const {id, label, image} = doc.data();
        listCategory.push({id, label, image});
      });

      setCategories(listCategory);

      loadData();
    });
  }, [query, selected]);

  function loadData() {
    let query = firestore()
      .collection('menu')
      .where('category', 'array-contains', selected); // sort the data
    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument); // fetch data following the last document accessed
    }
    query
      .limit(10) // limit to your page size, 3 is just an example
      .get()
      .then((querySnapshot: any) => {
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        makeUserData(querySnapshot.docs);
      });
  }

  function makeUserData(docs: any) {
    const listMenu: any = [];
    docs.forEach((doc: any) => {
      const {id, name, price, image} = doc.data();
      listMenu.push({id, name, price, image});
    });
    setMenus(menus.concat(listMenu));
    if (loading) setLoading(false);
  }

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1, flexDirection: 'column'}]}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrowleft"
              size={30}
              style={[styles.backButton, {color: textColor}]}
            />
          </TouchableOpacity>
          <TextInput
            style={[styles.searchInput, backgroundStyle]}
            placeholder="Search Here..."
            placeholderTextColor="gray"
            onChangeText={(value: string) => setQuery(value)}
          />
        </View>
        <FlatList
          data={categories}
          renderItem={({item}: {item: Category}) => {
            return (
              <CategoryItemFilter
                item={item}
                onPress={() => setSelected(item.label)}
                textColor={textColor}
                colorPrimary={colorPrimary}
                selected={selected}
              />
            );
          }}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.categoryList}
        />
        <CoffeSection
          data={menus}
          textColor={textColor}
          navigation={navigation}
        />
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colorPrimary}]}
          onPress={() => {
            loadData();
          }}>
          <Text>Load More</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  searchInputDark: {
    marginHorizontal: 16,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.darker,
  },
  categoryList: {
    paddingVertical: 8,
    paddingStart: 10,
    marginEnd: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  backButton: {
    marginVertical: 'auto',
    marginTop: 10,
  },
  button: {
    width: 100,
    padding: 8,
    borderRadius: 8,
    marginStart: 'auto',
    marginEnd: 'auto',
    alignItems: 'center',
  },
});

export default DiscoverScreen;
