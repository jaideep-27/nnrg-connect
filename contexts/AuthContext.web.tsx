// Web-specific AuthContext implementation
import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock user data for web
const mockUsers = [
  {
    id: 'web-admin',
    email: 'admin@nnrg.edu.in',
    name: 'Admin User',
    role: 'admin',
    approvalStatus: 'approved',
    password: 'admin123'
  },
  {
    id: 'web-student',
    email: 'student@nnrg.edu.in',
    name: 'Student User',
    role: 'student',
    rollNumber: 'ABC123',
    approvalStatus: 'approved',
    password: 'student123'
  }
];

// Define context type
interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, rollNumber: string, idCardImage: string) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Start with loading true

  // Mock login function for web
  const login = async (email: string, password: string) => {
    // Find user by email
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      throw new Error('User not found. Try admin@nnrg.edu.in / admin123 or student@nnrg.edu.in / student123');
    }
    
    // Actually verify the password
    if (foundUser.password !== password) {
      throw new Error('Invalid password. Try admin@nnrg.edu.in / admin123 or student@nnrg.edu.in / student123');
    }
    
    // Set the user
    const userWithoutPassword = { ...foundUser } as any;
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  // Mock logout function for web
  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Mock register function for web
  const register = async (email: string, password: string, name: string, rollNumber: string, idCardImage: string) => {
    // Check if user already exists
    if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser = {
      id: `web-${Date.now()}`,
      email,
      name,
      role: 'student',
      rollNumber,
      approvalStatus: 'approved',
      password: password
    };
    
    // Add to mock users
    mockUsers.push(newUser);
    
    // Set the user (without password)
    const userWithoutPassword = { ...newUser } as any;
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  // Check for existing user in localStorage on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    };
    
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}; 