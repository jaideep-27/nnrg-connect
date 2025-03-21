import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES, SHADOWS } from '../constants/theme';

// Mock data for announcements
const announcements = [
  {
    id: '1',
    title: 'Campus Recruitment Drive',
    date: 'March 15, 2025',
    time: '10:00 AM - 5:00 PM',
    location: 'NNRG Campus, Hyderabad',
    organizer: 'NNRG Placement Cell',
    description: 'TCS is conducting a campus recruitment drive for 2025 batch students. All eligible students are requested to register for the drive through the placement portal. The recruitment process will include an aptitude test, technical interview, and HR interview. Students are advised to prepare accordingly and carry their resumes and other necessary documents on the day of the drive.',
    icon: 'work',
  },
  {
    id: '2',
    title: 'Alumni Meet 2025',
    date: 'April 10, 2025',
    time: '4:00 PM - 8:00 PM',
    location: 'NNRG Auditorium',
    organizer: 'NNRG Alumni Association',
    description: 'Annual alumni meet will be held at the college auditorium. All alumni are cordially invited to attend the event and reconnect with their batch mates and professors. The event will feature keynote speeches, cultural performances, and networking opportunities. Dinner will be provided. Please register in advance to help us with the arrangements.',
    icon: 'groups',
  },
];

const AnnouncementDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Find the announcement with the matching ID
  const announcement = announcements.find(item => item.id === id);
  
  if (!announcement) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Announcement Details</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={64} color={COLORS.primary} />
          <Text style={styles.errorText}>Announcement not found</Text>
          <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Announcement Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <MaterialIcons name="share" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.announcementHeader}>
          <View style={styles.iconContainer}>
            <MaterialIcons name={announcement.icon as any} size={32} color={COLORS.white} />
          </View>
          <View style={styles.announcementTitleContainer}>
            <Text style={styles.announcementTitle}>{announcement.title}</Text>
            <Text style={styles.announcementDate}>{announcement.date}</Text>
          </View>
        </View>
        
        <View style={styles.detailsCard}>
          <View style={styles.detailItem}>
            <MaterialIcons name="access-time" size={24} color={COLORS.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailText}>{announcement.time}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailItem}>
            <MaterialIcons name="location-on" size={24} color={COLORS.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailText}>{announcement.location}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailItem}>
            <MaterialIcons name="business" size={24} color={COLORS.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Organizer</Text>
              <Text style={styles.detailText}>{announcement.organizer}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{announcement.description}</Text>
        </View>
        
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register Now</Text>
        </TouchableOpacity>
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
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: SIZES.large,
    paddingBottom: SIZES.xxLarge,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.large,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.medium,
  },
  announcementTitleContainer: {
    flex: 1,
  },
  announcementTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.xLarge,
    color: COLORS.black,
    marginBottom: SIZES.xSmall,
  },
  announcementDate: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    marginBottom: SIZES.large,
    ...SHADOWS.medium,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.small,
  },
  detailContent: {
    marginLeft: SIZES.medium,
  },
  detailLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  detailText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.small,
  },
  descriptionCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    marginBottom: SIZES.large,
    ...SHADOWS.medium,
  },
  descriptionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: SIZES.small,
  },
  descriptionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    lineHeight: 22,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    paddingVertical: SIZES.medium,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  registerButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.large,
  },
  errorText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.large,
    color: COLORS.black,
    marginTop: SIZES.medium,
    marginBottom: SIZES.large,
  },
  goBackButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.large,
  },
  goBackButtonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});

export default AnnouncementDetailsScreen;
