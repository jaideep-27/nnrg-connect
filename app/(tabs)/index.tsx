import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import authService from '../../services/auth';
import { databaseService, StudentData } from '../../services/database';

import { COLORS, FONT, SIZES, SHADOWS } from '../../constants/theme';
import SearchBar from '../../components/SearchBar';
import ProfileCard from '../../components/ProfileCard';
import Card from '../../components/Card';

// Quick links data
const quickLinks = [
  {
    id: '1',
    title: 'Batch Groups',
    icon: 'group' as const,
    color: COLORS.primary,
  },
  {
    id: '2',
    title: 'Job Board',
    icon: 'work' as const,
    color: '#FF9843',
  },
  {
    id: '3',
    title: 'Events',
    icon: 'event' as const,
    color: COLORS.primary,
  },
];

// Recent announcements data
const recentAnnouncements = [
  {
    id: '1',
    title: 'Campus Recruitment Drive',
    date: 'March 15, 2025',
    description: 'TCS is conducting a campus recruitment drive for 2025 batch students.',
    icon: 'work',
  },
  {
    id: '2',
    title: 'Alumni Meet 2025',
    date: 'April 10, 2025',
    description: 'Annual alumni meet will be held at the college auditorium.',
    icon: 'groups',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<StudentData[]>([]);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      const data = await databaseService.loadStudentData();
      setStudents(data);
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/(tabs)/search' as const,
        params: { query: searchQuery }
      });
    }
  };

  const renderAlumniItem = ({ item }: { item: StudentData }) => (
    <TouchableOpacity 
      style={styles.alumniCard}
      onPress={() => router.push({
        pathname: '/profile' as const,
        params: { id: item.id }
      })}
    >
      <Image source={require('../../assets/images/default-profile.png')} style={styles.alumniImage} />
      <View style={styles.alumniInfo}>
        <Text style={styles.alumniName}>{item.name}</Text>
        <Text style={styles.alumniCompany}>{item.rollNumber}</Text>
        <View style={styles.alumniDepartment}>
          <Text style={styles.alumniDepartmentText}>{item.department}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderQuickLinkItem = ({ item }: { item: typeof quickLinks[0] }) => (
    <TouchableOpacity
      style={[styles.quickLinkItem, { backgroundColor: item.color }]}
      onPress={() => {
        switch (item.title) {
          case 'Batch Groups':
            router.push('/batch-groups' as any);
            break;
          case 'Job Board':
            router.push('/(tabs)/jobs' as const);
            break;
          case 'Events':
            router.push('/(tabs)/events' as const);
            break;
        }
      }}
    >
      <View style={styles.quickLinkIconContainer}>
        <MaterialIcons name={item.icon} size={24} color={COLORS.white} />
      </View>
      <Text style={styles.quickLinkTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>NNRG Connect</Text>
        </View>
        <SearchBar
          placeholder="Search students, alumni, or roll numbers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          onFilterPress={() => router.push('/(tabs)/search' as const)}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.welcomeSection}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.welcomeBanner}
          >
            <View style={styles.welcomeContent}>
              <Text style={styles.welcomeTitle}>Welcome to NNRG Connect</Text>
              <Text style={styles.welcomeSubtitle}>
                Connect with alumni, find jobs, and stay updated with college events
              </Text>
              <TouchableOpacity style={styles.completeProfileButton}>
                <Text style={styles.completeProfileButtonText}>Complete Your Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.welcomeImageContainer}>
              <MaterialIcons name="people" size={80} color="rgba(255,255,255,0.3)" />
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Alumni</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/search' as const)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={students}
            renderItem={renderAlumniItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.alumniList}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinksContainer}>
            {quickLinks.map((item) => (
              <View key={item.id} style={styles.quickLinkWrapper}>
                {renderQuickLinkItem({ item })}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Announcements</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/events' as const)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentAnnouncements.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.announcementCard}
              onPress={() => router.push({
                pathname: '/announcement-details' as const,
                params: { id: item.id }
              })}
            >
              <View style={styles.announcementIconContainer}>
                <MaterialIcons name={item.icon as any} size={24} color={COLORS.white} />
              </View>
              <View style={styles.announcementContent}>
                <Text style={styles.announcementTitle}>{item.title}</Text>
                <Text style={styles.announcementDate}>{item.date}</Text>
                <Text style={styles.announcementDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.darkGray} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'Poppins_700Bold',
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginLeft: SIZES.small,
  },
  scrollContent: {
    padding: SIZES.medium,
    paddingBottom: SIZES.xxLarge,
  },
  welcomeSection: {
    marginBottom: SIZES.large,
  },
  welcomeBanner: {
    height: 160,
    borderRadius: SIZES.medium,
    flexDirection: 'row',
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  welcomeContent: {
    flex: 1,
    padding: SIZES.large,
    justifyContent: 'center',
  },
  welcomeTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: SIZES.large,
    color: COLORS.white,
    marginBottom: SIZES.xSmall,
  },
  welcomeSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    color: COLORS.white,
    marginBottom: SIZES.medium,
  },
  completeProfileButton: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.small,
    alignSelf: 'flex-start',
  },
  completeProfileButtonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  welcomeImageContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: SIZES.large,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  seeAllText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  alumniList: {
    paddingVertical: SIZES.small,
    gap: SIZES.medium,
  },
  alumniCard: {
    width: 200,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    marginRight: SIZES.medium,
    ...SHADOWS.medium,
  },
  alumniImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: SIZES.small,
  },
  alumniInfo: {
    marginBottom: SIZES.small,
  },
  alumniName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 2,
  },
  alumniCompany: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  alumniDepartment: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  alumniDepartmentText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.xSmall,
    color: COLORS.darkGray,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SIZES.medium,
  },
  quickLinkWrapper: {
    width: '48%',
    marginBottom: SIZES.medium,
  },
  quickLinkItem: {
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  quickLinkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.small,
  },
  quickLinkTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  announcementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    ...SHADOWS.medium,
  },
  announcementIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.medium,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 2,
  },
  announcementDate: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  announcementDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
});
