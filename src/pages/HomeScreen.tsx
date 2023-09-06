import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
} from 'react-native';

import CategoryItem from '../components/CategoryItem';
import BannerSection from '../components/BannerSection';
import CoffeSection from '../components/CoffeSection';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const HomeScreen: React.FC<HomeScreenNavigationProp> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const fbMenu = firestore().collection('menu').limit(10);
  const fbCategories = firestore()
    .collection('categories')
    .orderBy('id', 'asc');
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    fbCategories.onSnapshot(querySnapshot => {
      const listCategory: any = [];
      querySnapshot.forEach(doc => {
        const {id, label, image} = doc.data();
        listCategory.push({id, label, image});
      });

      setCategories(listCategory);
    });

    fbMenu.onSnapshot(querySnapshot => {
      const listMenu: any = [];
      querySnapshot.forEach(doc => {
        const {id, name, price, image} = doc.data();
        listMenu.push({id, name, price, image});
      });

      setMenus(listMenu);

      if (loading) setLoading(false);
    });
  }, []);

  const textColor = isDarkMode ? '#fff' : '#000';

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <BannerSection backgroundColor={backgroundStyle} />
        <Text style={[styles.sectionTitle, {color: textColor}]}>
          What coffee do you want today?
        </Text>
        <FlatList
          data={categories}
          renderItem={({item}: {item: Category}) => {
            return (
              <CategoryItem
                item={item}
                onPress={() => {
                  navigation.navigate('Discover', {
                    category: item.label,
                  });
                }}
                textColor={textColor}
              />
            );
          }}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.categoryList}
        />
        <Text style={[styles.sectionTitle, {color: textColor}]}>
          Favorite Menu
        </Text>
        <CoffeSection
          data={menus}
          textColor={textColor}
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  categoryList: {
    paddingVertical: 8,
    paddingStart: 10,
    marginEnd: 16,
  },
});

interface HomeScreenNavigationProp {
  navigation: any;
}

export default HomeScreen;
