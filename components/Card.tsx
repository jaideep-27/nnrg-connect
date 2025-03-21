import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS } from '../constants/theme';

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: any;
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const Card = ({
  title,
  subtitle,
  description,
  image,
  onPress,
  style,
  children,
}: CardProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      disabled={!onPress}
    >
      <View style={styles.content}>
        {image && (
          <Image
            source={image}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
          {description && <Text style={styles.description} numberOfLines={2}>{description}</Text>}
        </View>
      </View>
      {children && <View style={styles.childrenContainer}>{children}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    ...SHADOWS.small,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SIZES.medium,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
  childrenContainer: {
    marginTop: SIZES.medium,
  },
});

export default Card;
