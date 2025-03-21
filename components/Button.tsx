import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONT, SIZES } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: ButtonProps) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: [styles.container, styles.primaryContainer, disabled && styles.disabledContainer, style],
          text: [styles.text, styles.primaryText, textStyle],
        };
      case 'secondary':
        return {
          container: [styles.container, styles.secondaryContainer, disabled && styles.disabledContainer, style],
          text: [styles.text, styles.secondaryText, textStyle],
        };
      case 'outline':
        return {
          container: [styles.container, styles.outlineContainer, disabled && styles.disabledOutlineContainer, style],
          text: [styles.text, styles.outlineText, disabled && styles.disabledOutlineText, textStyle],
        };
      default:
        return {
          container: [styles.container, styles.primaryContainer, disabled && styles.disabledContainer, style],
          text: [styles.text, styles.primaryText, textStyle],
        };
    }
  };

  const buttonStyles = getButtonStyles();

  return (
    <TouchableOpacity
      style={buttonStyles.container}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <>
          {icon && icon}
          <Text style={buttonStyles.text}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.large,
  },
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  secondaryContainer: {
    backgroundColor: COLORS.secondary,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabledContainer: {
    backgroundColor: COLORS.secondaryLight,
  },
  disabledOutlineContainer: {
    borderColor: COLORS.secondaryLight,
  },
  text: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  disabledOutlineText: {
    color: COLORS.secondaryLight,
  },
});

export default Button;
