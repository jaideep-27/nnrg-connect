import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES, SHADOWS } from '../constants/theme';
import Button from '../components/Button';
import InputField from '../components/InputField';

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    rollNumber?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      rollNumber?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!rollNumber) {
      newErrors.rollNumber = 'Roll Number is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validateForm()) {
      // In a real app, you would handle user registration here
      router.replace('/(tabs)');
    }
  };

  const handleGoogleSignUp = () => {
    // In a real app, you would handle Google Sign-Up here
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join the NNRG community and connect with your peers
            </Text>
          </View>

          <View style={styles.formContainer}>
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              error={errors.name}
              icon={<MaterialIcons name="person" size={20} color={COLORS.darkGray} />}
              autoCapitalize="words"
            />
            
            <InputField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.email}
              icon={<MaterialIcons name="email" size={20} color={COLORS.darkGray} />}
            />
            
            <InputField
              label="Roll Number"
              placeholder="Enter your roll number"
              value={rollNumber}
              onChangeText={setRollNumber}
              error={errors.rollNumber}
              icon={<MaterialIcons name="badge" size={20} color={COLORS.darkGray} />}
              autoCapitalize="characters"
            />
            
            <InputField
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
              icon={<MaterialIcons name="lock" size={20} color={COLORS.darkGray} />}
            />
            
            <InputField
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={errors.confirmPassword}
              icon={<MaterialIcons name="lock" size={20} color={COLORS.darkGray} />}
            />
            
            <Button
              title="Sign Up"
              onPress={handleSignup}
              style={styles.signupButton}
            />
            
            <View style={styles.orContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.divider} />
            </View>
            
            <Button
              title="Sign up with Google"
              onPress={handleGoogleSignUp}
              variant="outline"
              style={styles.googleButton}
              icon={
                <Image
                  source={require('../assets/images/google-icon.png')}
                  style={styles.googleIcon}
                  resizeMode="contain"
                />
              }
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SIZES.large,
  },
  header: {
    marginVertical: SIZES.large,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.black,
    marginBottom: SIZES.small,
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
  },
  formContainer: {
    marginBottom: SIZES.large,
  },
  signupButton: {
    marginTop: SIZES.medium,
    marginBottom: SIZES.large,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.large,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.secondaryLight,
  },
  orText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginHorizontal: SIZES.medium,
  },
  googleButton: {
    marginBottom: SIZES.medium,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: SIZES.small,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.xxLarge,
  },
  footerText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginRight: SIZES.small,
  },
  loginText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
});

export default Signup;
