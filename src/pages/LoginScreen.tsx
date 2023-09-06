import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import {LoginScreenProps} from './type';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS, SIZES, useColorPrimary} from '../constants/theme';
import auth from '@react-native-firebase/auth';

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colorOnSurface = isDarkMode ? COLORS.gray2 : COLORS.gray;
  const colorPrimary = useColorPrimary(isDarkMode);
  const textColor = isDarkMode ? '#fff' : '#000';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeTabs'}],
        });
      });
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={[styles.title, {color: textColor}]}>Login</Text>
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, {color: textColor}]}>Email</Text>
        <TextInput
          style={[
            styles.textInput,
            {backgroundColor: colorOnSurface, color: textColor},
          ]}
          placeholder="Type your email here..."
          placeholderTextColor="gray"
          onChangeText={val => setEmail(val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, {color: textColor}]}>Password</Text>
        <TextInput
          style={[
            styles.textInput,
            {backgroundColor: colorOnSurface, color: textColor},
          ]}
          placeholder="Type your password here..."
          placeholderTextColor="gray"
          onChangeText={val => setPassword(val)}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        disabled={email === '' && password === ''}
        style={[styles.button, {backgroundColor: colorPrimary}]}>
        <Text style={{color: 'white', fontSize: SIZES.medium}}>Login</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 8}}>
        <Text style={{color: textColor, marginEnd: 8}}>
          Dont have account yet?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={{color: colorPrimary}}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  inputGroup: {
    width: '100%',
  },
  textInput: {
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  inputLabel: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default LoginScreen;
