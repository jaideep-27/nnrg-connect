import { DefaultTheme } from 'react-native-paper';

const COLORS = {
  primary: '#3366FF',
  primaryLight: '#E9F0FF',
  secondary: '#FF6584',
  secondaryLight: '#FFE9EF',
  white: '#FFFFFF',
  lightWhite: '#F5F5F5',
  black: '#000000',
  gray: '#83829A',
  lightGray: '#C1C0C8',
  lightGray2: '#F5F4F8',
  darkGray: '#4B4B4B',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
};

const FONT = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};

const SIZES = {
  xSmall: 8,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.secondary,
    background: COLORS.white,
    surface: COLORS.white,
    text: COLORS.black,
    placeholder: COLORS.gray,
    error: COLORS.error,
    success: COLORS.success,
    warning: COLORS.warning,
  },
  roundness: 10,
};

export { COLORS, FONT, SIZES, SHADOWS };
