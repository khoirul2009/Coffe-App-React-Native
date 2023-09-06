import {FC, useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface CategoryItemProps {
  item: Category;
  onPress: () => void;
  textColor: string;
  colorPrimary: string;
  selected: string;
}

const CategoryItemFilter: FC<CategoryItemProps> = ({
  item,
  onPress,
  textColor,
  colorPrimary,
  selected,
}) => {
  const imageBaseUrl =
    'https://firebasestorage.googleapis.com/v0/b/cafe-app-bf389.appspot.com/o/';

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: `${imageBaseUrl}${item.image}?alt=media`,
          }}
        />
        <Text style={[{color: textColor}]}>{item.label}</Text>
        {selected === item.label ? (
          <View style={[styles.pointer, {backgroundColor: colorPrimary}]} />
        ) : (
          ''
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    alignItems: 'center',
    marginEnd: 5,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  categoryList: {
    paddingVertical: 8,
    paddingStart: 10,
    marginEnd: 16,
  },
  pointer: {
    height: 8,
    width: 20,
    marginHorizontal: 'auto',
    marginTop: 4,
    borderRadius: 8,
  },
});

export default CategoryItemFilter;
