import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Easing, ActivityIndicator } from 'react-native';
import { COLORS, FONT, SIZES } from '../constants/theme';

interface LoadingAnimationProps {
  text?: string;
}

const LoadingAnimation = ({ text = 'NNRG Connect' }: LoadingAnimationProps) => {
  // Animation values for dots
  const opacityDot1 = useRef(new Animated.Value(0)).current;
  const opacityDot2 = useRef(new Animated.Value(0)).current;
  const opacityDot3 = useRef(new Animated.Value(0)).current;

  // Start animations
  useEffect(() => {
    // Dots animation
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityDot1, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityDot1, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Dot 2 with delay
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(opacityDot2, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(opacityDot2, {
              toValue: 0.3,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, 150);

      // Dot 3 with delay
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(opacityDot3, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(opacityDot3, {
              toValue: 0.3,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, 300);
    };

    animateDots();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.loadingText}>{text}</Text>
        <View style={styles.dotsContainer}>
          <Animated.Text style={[styles.dot, { opacity: opacityDot1 }]}>.</Animated.Text>
          <Animated.Text style={[styles.dot, { opacity: opacityDot2 }]}>.</Animated.Text>
          <Animated.Text style={[styles.dot, { opacity: opacityDot3 }]}>.</Animated.Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.large,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginLeft: 2,
  },
  dot: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginLeft: -2,
  },
});

export default LoadingAnimation;
