import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import connectToMongoDB from '../config/mongodb';
import { GridFSBucket, ObjectId, Db } from 'mongodb';

// In a production app, you would upload images to a cloud storage service
// For this implementation, we'll store images locally and simulate upload

const IMAGE_DIRECTORY = FileSystem.documentDirectory + 'user_uploads/';

// Ensure the upload directory exists
const ensureDirectoryExists = async (): Promise<void> => {
  const dirInfo = await FileSystem.getInfoAsync(IMAGE_DIRECTORY);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(IMAGE_DIRECTORY, { intermediates: true });
  }
};

// Upload an image from a URI to local storage
const uploadImage = async (uri: string, fileName: string): Promise<string> => {
  try {
    await ensureDirectoryExists();
    
    // Generate a unique filename
    const timestamp = new Date().getTime();
    const uniqueFileName = `${fileName}_${timestamp}.jpg`;
    const destinationUri = IMAGE_DIRECTORY + uniqueFileName;
    
    // Copy the image to our app's directory
    await FileSystem.copyAsync({
      from: uri,
      to: destinationUri
    });
    
    console.log('Image saved successfully:', destinationUri);
    return destinationUri;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

// Get an image from local storage
const getImage = async (imagePath: string): Promise<string | null> => {
  try {
    const imageInfo = await FileSystem.getInfoAsync(imagePath);
    if (imageInfo.exists) {
      return imagePath;
    }
    return null;
  } catch (error) {
    console.error('Error getting image:', error);
    return null;
  }
};

// Delete an image from local storage
const deleteImage = async (imagePath: string): Promise<boolean> => {
  try {
    const imageInfo = await FileSystem.getInfoAsync(imagePath);
    if (imageInfo.exists) {
      await FileSystem.deleteAsync(imagePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

const imageUploadService = {
  uploadImage: async (uri: string, fileName: string): Promise<string> => {
    try {
      const db = await connectToMongoDB();
      if (!db) throw new Error('Failed to connect to database');
      
      const bucket = new GridFSBucket(db, { bucketName: 'id_cards' });

      // Convert the image to base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert base64 to buffer
      const buffer = Buffer.from(base64, 'base64');

      // Create a write stream
      const uploadStream = bucket.openUploadStream(fileName);
      uploadStream.end(buffer);

      // Return the file ID
      return uploadStream.id.toString();
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  },

  getImageUrl: async (fileId: string): Promise<string> => {
    try {
      const db = await connectToMongoDB();
      if (!db) throw new Error('Failed to connect to database');
      
      const bucket = new GridFSBucket(db, { bucketName: 'id_cards' });
      
      // Get the file info
      const file = await bucket.find({ _id: new ObjectId(fileId) }).toArray();
      if (!file || file.length === 0) {
        throw new Error('Image not found');
      }

      // Return the file URL
      return `mongodb://${process.env.MONGODB_URI}/id_cards/${fileId}`;
    } catch (error) {
      console.error('Error getting image URL:', error);
      throw new Error('Failed to get image URL');
    }
  },

  deleteImage: async (fileId: string): Promise<void> => {
    try {
      const db = await connectToMongoDB();
      if (!db) throw new Error('Failed to connect to database');
      
      const bucket = new GridFSBucket(db, { bucketName: 'id_cards' });
      
      await bucket.delete(new ObjectId(fileId));
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new Error('Failed to delete image');
    }
  }
};

export default imageUploadService;
