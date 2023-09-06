import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useColorPrimary} from '../constants/theme';
import {COLORS, SIZES} from '../constants/theme';
import auth from '@react-native-firebase/auth';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ProfileScreenProps} from './type';

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const underlayColor = isDarkMode ? COLORS.black : COLORS.gray;

  const textColor = isDarkMode ? '#fff' : '#000';

  const colorPrimary = useColorPrimary(isDarkMode);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      });
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <Text style={[styles.headerText, {color: textColor}]}>Profile</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.sectionProfileContainer}>
          <Image
            style={styles.userProfileImg}
            source={require('../assets/default_user.png')}
          />
          <View style={styles.userProfileInfo}>
            <Text
              style={{
                color: textColor,
                fontSize: SIZES.medium,
                fontWeight: '600',
              }}>
              Khoirul
            </Text>
            <Text style={{color: textColor}}>+62 85 123456023</Text>
            <Text style={{color: textColor}}>khoirulafwan20@gmail.com</Text>
          </View>
          <TouchableOpacity style={{marginStart: 'auto'}}>
            <FontAwesome5
              name={'pen'}
              size={SIZES.medium}
              color={colorPrimary}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.sectionTitle, {color: textColor}]}>Account</Text>
        <TouchableHighlight
          underlayColor={underlayColor}
          onPress={() => {}}
          style={styles.menuItem}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5 name="tag" size={SIZES.medium} color={textColor} />
            <Text
              style={{
                color: textColor,
                marginStart: 8,
                fontSize: SIZES.medium,
              }}>
              Promo
            </Text>
            <FontAwesome5
              name="chevron-right"
              size={SIZES.medium}
              color={textColor}
              style={{marginStart: 'auto'}}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={underlayColor}
          onPress={() => {}}
          style={styles.menuItem}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5
              name="hands-helping"
              size={SIZES.medium}
              color={textColor}
            />
            <Text
              style={{
                color: textColor,
                marginStart: 8,
                fontSize: SIZES.medium,
              }}>
              Help & Report
            </Text>
            <FontAwesome5
              name="chevron-right"
              size={SIZES.medium}
              color={textColor}
              style={{marginStart: 'auto'}}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={underlayColor}
          onPress={() => {}}
          style={styles.menuItem}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5
              name="language"
              size={SIZES.medium}
              color={textColor}
            />
            <Text
              style={{
                color: textColor,
                marginStart: 8,
                fontSize: SIZES.medium,
              }}>
              Language
            </Text>
            <FontAwesome5
              name="chevron-right"
              size={SIZES.medium}
              color={textColor}
              style={{marginStart: 'auto'}}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={underlayColor}
          onPress={() => {}}
          style={styles.menuItem}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5
              name="money-check"
              size={SIZES.medium}
              color={textColor}
            />
            <Text
              style={{
                color: textColor,
                marginStart: 8,
                fontSize: SIZES.medium,
              }}>
              Payment Method
            </Text>
            <FontAwesome5
              name="chevron-right"
              size={SIZES.medium}
              color={textColor}
              style={{marginStart: 'auto'}}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={underlayColor}
          onPress={handleLogout}
          style={styles.menuItem}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5
              name="sign-out-alt"
              size={SIZES.medium}
              color={textColor}
            />
            <Text
              style={{
                color: textColor,
                marginStart: 8,
                fontSize: SIZES.medium,
              }}>
              Sign Out
            </Text>
            <FontAwesome5
              name="chevron-right"
              size={SIZES.medium}
              color={textColor}
              style={{marginStart: 'auto'}}
            />
          </View>
        </TouchableHighlight>
      </ScrollView>
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
  sectionProfileContainer: {
    flexDirection: 'row',
    margin: 16,
  },
  userProfileImg: {
    height: 50,
    width: 50,
  },
  userProfileInfo: {
    marginStart: 16,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});

export default ProfileScreen;
