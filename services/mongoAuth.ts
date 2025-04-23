import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { databaseService } from './database';

// Define types for our status and role enums
export type ApprovalStatusType = 'pending' | 'approved' | 'rejected';
export type UserRoleType = 'student' | 'admin';

// Import appropriate MongoDB functionality
let User: any, connectToMongoDB: any;
let ApprovalStatus: any;
let UserRole: any;

// In web mode, use our synchronous mock
if (Platform.OS === 'web') {
  // Import from web-optimized file
  const webMongo = require('../config/mongoWeb').default;
  
  connectToMongoDB = webMongo.connectToMongoDB;
  User = webMongo.User;
  
  // Import enums
  const { ApprovalStatus: WebApprovalStatus, UserRole: WebUserRole } = require('../config/mongoWeb');
  ApprovalStatus = WebApprovalStatus;
  UserRole = WebUserRole;
} else {
  // In native environments, use the real MongoDB
  connectToMongoDB = require('../config/mongodb').default;
  const UserModel = require('../models/User');
  User = UserModel.default;
  ApprovalStatus = UserModel.ApprovalStatus;
  UserRole = UserModel.UserRole;
}

// Helper function to hash passwords
// In a real app, you would use bcrypt, but for React Native compatibility
// we're using a simpler approach here
const hashPassword = async (password: string): Promise<string> => {
  // Simple hash for demonstration - in production use a proper hashing library
  // that works with React Native
  return Array.from(password)
    .reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0)
    .toString(16);
};

// Helper function to verify password
const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const hashed = await hashPassword(password);
  return hashed === hashedPassword;
};

// Store user session in AsyncStorage
const storeUserSession = async (user: any) => {
  const userData = {
    id: user._id ? user._id.toString() : 'web-mock-id',
    email: user.email || 'web@example.com',
    name: user.name || 'Web User',
    role: user.role || UserRole.STUDENT,
    approvalStatus: user.approvalStatus || ApprovalStatus.APPROVED,
    rollNumber: user.rollNumber || ''
  };
  
  await AsyncStorage.setItem('user', JSON.stringify(userData));
  return userData;
};

// Get current user from AsyncStorage
const getCurrentUser = async () => {
  const userJson = await AsyncStorage.getItem('user');
  if (!userJson) return null;
  return JSON.parse(userJson);
};

// Register a new user - with web environment handling
const registerUser = async (
  email: string, 
  password: string, 
  name: string, 
  rollNumber: string, 
  idCardImageUri: string
): Promise<any> => {
  try {
    // For web environment, mock the registration
    if (Platform.OS === 'web') {
      console.log('Web environment - using mock registration');
      // Create mock user
      const mockUser = {
        _id: 'web-mock-id',
        email,
        name,
        rollNumber,
        idCardImage: idCardImageUri,
        role: UserRole.STUDENT,
        approvalStatus: ApprovalStatus.APPROVED
      };
      
      return await storeUserSession(mockUser);
    }

    // Native environment - proceed with real MongoDB
    await connectToMongoDB();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(password);
    
    // Upload ID card image to server or cloud storage
    // For now, we'll just store the local URI
    // In a production app, you would upload this to a server or cloud storage
    
    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      rollNumber,
      idCardImage: idCardImageUri,
      role: UserRole.STUDENT,
      approvalStatus: ApprovalStatus.PENDING
    });
    
    await newUser.save();
    
    // Don't store the password in the session
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    
    // Store user session
    return await storeUserSession(userWithoutPassword);
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(error.message || 'Failed to register user');
  }
};

// Login user - with web environment handling
const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    // For web environment, mock the login
    if (Platform.OS === 'web') {
      console.log('Web environment - using mock login');
      
      // Create mock user for web environment
      const mockUser = {
        _id: 'web-mock-id',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? UserRole.ADMIN : UserRole.STUDENT,
        approvalStatus: ApprovalStatus.APPROVED
      };
      
      return await storeUserSession(mockUser);
    }

    // Native environment - proceed with real MongoDB
    await connectToMongoDB();
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    
    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    
    // Check if user is approved
    if (user.role === UserRole.STUDENT && user.approvalStatus !== ApprovalStatus.APPROVED) {
      throw new Error(`Your account is ${user.approvalStatus}. Please wait for admin approval.`);
    }
    
    // Store user session
    return await storeUserSession(user);
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Failed to login');
  }
};

// Logout user
const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error('Failed to logout');
  }
};

// Check if user is authenticated
const isAuthenticated = async (): Promise<boolean> => {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch (error) {
    return false;
  }
};

// Get all pending approvals (admin only) - with web environment handling
const getPendingApprovals = async (): Promise<any[]> => {
  try {
    // For web environment, return mock data
    if (Platform.OS === 'web') {
      console.log('Web environment - returning mock pending approvals');
      return [
        {
          _id: 'web-mock-id-1',
          email: 'student1@example.com',
          name: 'Mock Student 1',
          rollNumber: 'ABC123',
          role: UserRole.STUDENT,
          approvalStatus: ApprovalStatus.PENDING
        },
        {
          _id: 'web-mock-id-2',
          email: 'student2@example.com',
          name: 'Mock Student 2',
          rollNumber: 'XYZ456',
          role: UserRole.STUDENT,
          approvalStatus: ApprovalStatus.PENDING
        }
      ];
    }

    // Native environment - proceed with real MongoDB
    await connectToMongoDB();
    
    const pendingUsers = await User.find({
      role: UserRole.STUDENT,
      approvalStatus: ApprovalStatus.PENDING
    }).select('-password');
    
    return pendingUsers;
  } catch (error: any) {
    console.error('Error fetching pending approvals:', error);
    throw new Error('Failed to fetch pending approvals');
  }
};

// Update user approval status (admin only) - with web environment handling
const updateUserApproval = async (userId: string, status: ApprovalStatus): Promise<any> => {
  try {
    // For web environment, return mock data
    if (Platform.OS === 'web') {
      console.log('Web environment - mocking approval update');
      return {
        _id: userId,
        approvalStatus: status
      };
    }

    // Native environment - proceed with real MongoDB
    await connectToMongoDB();
    
    const user = await User.findByIdAndUpdate(
      userId,
      { approvalStatus: status },
      { new: true }
    ).select('-password');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error: any) {
    console.error('Error updating user approval:', error);
    throw new Error('Failed to update user approval status');
  }
};

// Create admin user if it doesn't exist - with web environment handling
const ensureAdminExists = async (): Promise<void> => {
  try {
    // Skip in web environment
    if (Platform.OS === 'web') {
      console.log('Web environment - skipping admin creation');
      return;
    }

    // Native environment - proceed with real MongoDB
    await connectToMongoDB();
    
    const adminEmail = 'admin@nnrg.edu.in';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const hashedPassword = await hashPassword('admin123');
      
      const newAdmin = new User({
        email: adminEmail,
        password: hashedPassword,
        name: 'System Admin',
        role: UserRole.ADMIN,
        approvalStatus: ApprovalStatus.APPROVED
      });
      
      await newAdmin.save();
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error ensuring admin exists:', error);
  }
};

const mongoAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  isAuthenticated,
  getPendingApprovals,
  updateUserApproval,
  ensureAdminExists
};

export default mongoAuthService;
