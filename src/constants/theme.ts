const COLORS = {
  tertiary: '#FF7754',
  gray: '#DDDDDD',
  gray2: '#4F4F4F',

  brown: '#886345',
  ligthBrown: '#E6A977',

  white: '#F3F4F8',
  lightWhite: '#FAFAFC',

  black: '#0F0F0F',

  orange: '#FFA91A',
  lightOrange: '#FFF4E0',

  green: '#7BBB71',
  lightGreen: '#EAFFE7',

  red500: '#ef4444',

  red700: '#b91c1c',
};

const FONT = {
  regular: 'DMRegular',
  medium: 'DMMedium',
  bold: 'DMBold',
};

const useColorPrimary = (isDarkmode: boolean): string => {
  return isDarkmode ? COLORS.ligthBrown : COLORS.brown;
};

const useColorDanger = (isDarkmode: boolean): string => {
  return isDarkmode ? COLORS.red500 : COLORS.red700;
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export {COLORS, FONT, SIZES, SHADOWS, useColorPrimary, useColorDanger};
