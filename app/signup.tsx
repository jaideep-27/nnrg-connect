import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { COLORS, FONT, SIZES, SHADOWS } from '../constants/theme';
import Button from '../components/Button';
import InputField from '../components/InputField';
import mongoAuthService from '../services/mongoAuth';
import imageUploadService from '../services/imageUpload';

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idCardImage, setIdCardImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    rollNumber?: string;
    password?: string;
    confirmPassword?: string;
    idCardImage?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      rollNumber?: string;
      password?: string;
      confirmPassword?: string;
      idCardImage?: string;
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
    
    if (!idCardImage) {
      newErrors.idCardImage = 'ID Card image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera roll permissions to upload your ID card.');
        return;
      }
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled) {
        setIdCardImage(result.assets[0].uri);
        // Clear any previous error
        setErrors(prev => ({ ...prev, idCardImage: undefined }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // First upload the ID card image
      let imageUri = '';
      if (idCardImage) {
        imageUri = await imageUploadService.uploadImage(idCardImage, `id_card_${rollNumber}`);
      }
      
      // Register the user
      await mongoAuthService.registerUser(email, password, name, rollNumber, imageUri);
      
      Alert.alert(
        'Registration Successful', 
        'Your account has been created and is pending approval by an administrator. You will be notified once your account is approved.',
        [{ text: 'OK', onPress: () => router.push('/login') }]
      );
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
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
            
            <View style={styles.idCardContainer}>
              <Text style={styles.idCardLabel}>Upload ID Card Image *</Text>
              <TouchableOpacity 
                style={styles.idCardUpload} 
                onPress={pickImage}
              >
                {idCardImage ? (
                  <Image 
                    source={{ uri: idCardImage }} 
                    style={styles.idCardPreview} 
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.idCardPlaceholder}>
                    <MaterialIcons name="add-photo-alternate" size={40} color={COLORS.gray} />
                    <Text style={styles.idCardText}>Tap to upload ID Card</Text>
                  </View>
                )}
              </TouchableOpacity>
              {errors.idCardImage && (
                <Text style={styles.errorText}>{errors.idCardImage}</Text>
              )}
            </View>
            
            <Button
              title={isLoading ? "Creating Account..." : "Sign Up"}
              onPress={handleSignup}
              style={styles.signupButton}
              disabled={isLoading}
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
  idCardContainer: {
    marginTop: SIZES.medium,
  },
  idCardLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SIZES.small,
  },
  idCardUpload: {
    width: '100%',
    height: 150,
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  idCardPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  idCardText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  idCardPreview: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.error,
    marginTop: 5,
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
