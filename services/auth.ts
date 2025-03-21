import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { databaseService } from './database';

const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const studentData = await databaseService.getStudentByEmail(email);
    if (studentData) {
      // Return combined user data
      return {
        ...userCredential.user,
        ...studentData
      };
    }
    return userCredential.user;
  } catch (error: any) {
    console.error('Email sign-in error:', error);
    throw error;
  }
};

const signUpWithEmail = async (email: string, password: string) => {
  try {
    const studentData = await databaseService.getStudentByEmail(email);
    if (!studentData) {
      throw new Error('Email not found in student database');
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      ...userCredential.user,
      ...studentData
    };
  } catch (error: any) {
    console.error('Sign-up error:', error);
    throw error;
  }
};

const resetPassword = async (email: string) => {
  try {
    const studentData = await databaseService.getStudentByEmail(email);
    if (!studentData) {
      throw new Error('Email not found in student database');
    }
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Password reset error:', error);
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Sign-out error:', error);
    throw error;
  }
};

const getCurrentUser = () => {
  return auth.currentUser;
};

const authService = {
  signInWithEmail,
  signUpWithEmail,
  resetPassword,
  signOutUser,
  getCurrentUser
};

export default authService;
