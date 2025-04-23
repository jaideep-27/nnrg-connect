// Platform check utility
import { Platform } from 'react-native';

// Flag to check if we're running in a web environment
export const isWeb = Platform.OS === 'web';

// Flag to check if we're running in a native environment
export const isNative = Platform.OS === 'android' || Platform.OS === 'ios'; 