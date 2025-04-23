import React from 'react';
import { View, Text, StyleSheet, Platform, Linking, TouchableOpacity } from 'react-native';

export default function WebNotice({ children }: { children: React.ReactNode }) {
  // Only show web notice on web platform
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.noticeBox}>
        <Text style={styles.title}>⚠️ Web Preview Mode</Text>
        <Text style={styles.description}>
          MongoDB connections are not supported in web browsers. This is a limited preview of the NNRG Connect app.
        </Text>
        <Text style={styles.description}>
          For the full experience with all features, please install the mobile app.
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => Linking.openURL('https://expo.dev/@jaideep.7/nnrg-connect')}
        >
          <Text style={styles.buttonText}>Get Mobile App</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noticeBox: {
    backgroundColor: '#FEF7E1',
    padding: 16,
    margin: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F6C000'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8
  },
  contentContainer: {
    flex: 1
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
}); 