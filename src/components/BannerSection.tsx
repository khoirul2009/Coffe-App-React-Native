
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {View, ImageBackground, TextInput, StyleSheet} from 'react-native';

const BannerSection: React.FC<BannerProps> = ({backgroundColor}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bannerImage}
        resizeMode="cover"
        source={require('../assets/banner.jpeg')}>
        <TextInput
          style={[styles.searchInput, backgroundColor]}
          placeholder="Search Here..."
          placeholderTextColor="gray"
          
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  searchInput: {
    marginHorizontal: 16,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.lighter,
  },
  searchInputDark: {
    marginHorizontal: 16,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.darker,
  },
  container: {
    flex: 1,
    height: 200,
  },
});

interface BannerProps {
  backgroundColor: any;
}

export default BannerSection;
