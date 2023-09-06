import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import {COLORS, useColorPrimary} from '../constants/theme';

const CustomRadionButton: React.FC<CustomRadionButtonProps> = ({
  label,
  items,
  textColor,
  setCart,
  cart,
}) => {
  const [selected, setSelected] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const colorPrimary = useColorPrimary(isDarkMode);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      columnGap: 10,
      paddingVertical: 4,
    },
    button: {
      borderRadius: 5,
      backgroundColor: isDarkMode ? COLORS.gray2 : COLORS.gray,
      padding: 4,
      minWidth: 60,
    },
    selectedButton: {
      borderColor: colorPrimary,
      borderWidth: 2,
    },
    labelGroup: {
      flex: 0.2,
    },
  });

  return (
    <View style={[styles.container]}>
      <View style={styles.labelGroup}>
        <Text
          style={[
            {
              color: textColor,
              marginTop: 'auto',
              marginBottom: 'auto',
              fontWeight: 'bold',
            },
          ]}>
          {label}
        </Text>
      </View>
      <View style={styles.container}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selected == `option ${index}` && styles.selectedButton,
            ]}
            onPress={() => {
              if (label == 'Size') setCart({...cart, size: item});
              if (label == 'Ices') setCart({...cart, ice: item});
              if (label == 'Sugars') setCart({...cart, sugar: item});
              if (label == 'Shots') setCart({...cart, shot: item});
              if (label == 'Variants') setCart({...cart, variant: item});

              setSelected(`option ${index}`);
            }}>
            <Text style={[{color: textColor, textAlign: 'center'}]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

interface CustomRadionButtonProps {
  label: string;
  items: string[];
  textColor: string;
  setCart: any;
  cart: any;
}

export default CustomRadionButton;
