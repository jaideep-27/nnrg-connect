import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { COLORS, FONT, SIZES, SHADOWS } from '../../constants/theme';

const MenuScreen = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigateToProfile = () => {
    router.push('/profile');
  };

  const navigateToMessages = () => {
    router.push('/messages');
  };

  const renderMenuItem = (
    icon: string,
    title: string,
    subtitle: string,
    onPress: () => void,
    showBadge: boolean = false,
    badgeCount: number = 0
  ) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemIconContainer}>
        <MaterialIcons name={icon as any} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.menuItemAction}>
        {showBadge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        ) : (
          <MaterialIcons name="chevron-right" size={24} color={COLORS.darkGray} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.profileContainer} onPress={navigateToProfile}>
            <Image
              source={require('../../assets/images/default-profile.png')}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Amar Akbar</Text>
              <Text style={styles.profileRole}>Computer Science, 2022-26</Text>
              <Text style={styles.viewProfileText}>View Profile</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {renderMenuItem(
            'person',
            'Personal Information',
            'Update your personal details',
            navigateToProfile
          )}
          
          {renderMenuItem(
            'school',
            'Academic Details',
            'View your academic information',
            () => {}
          )}
          
          {renderMenuItem(
            'message',
            'Messages',
            'View your conversations',
            navigateToMessages,
            true,
            3
          )}
          
          {renderMenuItem(
            'notifications',
            'Notifications',
            'Manage your notification preferences',
            () => {},
            true,
            5
          )}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuItemIconContainer}>
              <MaterialIcons name="dark-mode" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTitle}>Dark Mode</Text>
              <Text style={styles.menuItemSubtitle}>Toggle dark theme</Text>
            </View>
            <Switch
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              thumbColor={COLORS.white}
              ios_backgroundColor={COLORS.lightGray}
              onValueChange={toggleDarkMode}
              value={isDarkMode}
            />
          </View>
          
          {renderMenuItem(
            'language',
            'Language',
            'Change app language',
            () => {}
          )}
          
          {renderMenuItem(
            'notifications-active',
            'Push Notifications',
            'Manage notification settings',
            () => {}
          )}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          {renderMenuItem(
            'help',
            'Help Center',
            'Get help with using the app',
            () => {}
          )}
          
          {renderMenuItem(
            'feedback',
            'Feedback',
            'Share your thoughts with us',
            () => {}
          )}
          
          {renderMenuItem(
            'info',
            'About',
            'Learn more about NNRG Connect',
            () => {}
          )}
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcons name="logout" size={20} color={COLORS.white} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>NNRG Connect v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium,
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.xLarge,
    color: COLORS.black,
  },
  profileSection: {
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    ...SHADOWS.medium,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SIZES.medium,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 2,
  },
  profileRole: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  viewProfileText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  sectionContainer: {
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: SIZES.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
    marginBottom: SIZES.small,
    ...SHADOWS.small,
  },
  menuItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.medium,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.small,
    color: COLORS.black,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.xSmall,
    color: COLORS.darkGray,
  },
  menuItemAction: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
    marginHorizontal: SIZES.large,
    marginVertical: SIZES.medium,
  },
  logoutButtonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginLeft: SIZES.small,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: SIZES.xLarge,
  },
  versionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
});

export default MenuScreen;
