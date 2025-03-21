import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, FONT, SIZES, SHADOWS } from '../../constants/theme';
import SearchBar from '../../components/SearchBar';

// Define job types
type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  salary: string;
  postedDate: string;
  logo: any;
  description: string;
  requirements: string[];
  isFeatured: boolean;
  isBookmarked: boolean;
};

// Mock data for jobs
const jobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Google',
    location: 'Hyderabad, India',
    type: 'Full-time',
    salary: '₹18-25 LPA',
    postedDate: '2 days ago',
    logo: require('../../assets/images/default-profile.png'),
    description: 'We are looking for a Software Engineer to join our team in Hyderabad. You will be working on cutting-edge technologies and products that impact millions of users worldwide.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      '2+ years of experience in software development',
      'Proficiency in at least one programming language (Java, Python, C++)',
      'Experience with web technologies and frameworks',
    ],
    isFeatured: true,
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '₹20-30 LPA',
    postedDate: '1 week ago',
    logo: require('../../assets/images/default-profile.png'),
    description: 'Microsoft is seeking a Product Manager to drive product strategy and execution for our cloud services. You will work closely with engineering, design, and marketing teams to deliver exceptional products.',
    requirements: [
      'B.Tech/MBA or equivalent degree',
      '3+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Excellent communication and leadership abilities',
    ],
    isFeatured: true,
    isBookmarked: true,
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'Amazon',
    location: 'Hyderabad, India',
    type: 'Full-time',
    salary: '₹15-22 LPA',
    postedDate: '3 days ago',
    logo: require('../../assets/images/default-profile.png'),
    description: 'Join Amazon as a Data Scientist to work on challenging problems using machine learning and statistical analysis. You will help drive business decisions through data insights.',
    requirements: [
      'M.Tech/PhD in Computer Science, Statistics, or related field',
      'Experience with machine learning algorithms and statistical modeling',
      'Proficiency in Python, R, or similar languages',
      'Knowledge of big data technologies',
    ],
    isFeatured: false,
    isBookmarked: false,
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    company: 'Flipkart',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '₹12-18 LPA',
    postedDate: '5 days ago',
    logo: require('../../assets/images/default-profile.png'),
    description: 'Flipkart is looking for a talented UI/UX Designer to create beautiful and functional user interfaces for our e-commerce platform. You will collaborate with product managers and developers to deliver exceptional user experiences.',
    requirements: [
      'Bachelor\'s degree in Design, HCI, or related field',
      '2+ years of experience in UI/UX design',
      'Proficiency in design tools like Figma, Sketch, Adobe XD',
      'Portfolio demonstrating strong design skills',
    ],
    isFeatured: false,
    isBookmarked: true,
  },
  {
    id: '5',
    title: 'Frontend Developer Intern',
    company: 'Swiggy',
    location: 'Remote',
    type: 'Internship',
    salary: '₹25-40K per month',
    postedDate: '1 day ago',
    logo: require('../../assets/images/default-profile.png'),
    description: 'Swiggy is offering an internship opportunity for frontend developers to work on our consumer-facing web applications. This is a great opportunity to gain hands-on experience in a fast-paced environment.',
    requirements: [
      'Currently pursuing B.Tech/M.Tech in Computer Science or related field',
      'Knowledge of HTML, CSS, JavaScript, and React',
      'Strong problem-solving skills',
      'Ability to work in a team',
    ],
    isFeatured: false,
    isBookmarked: false,
  },
];

const JobsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const filterJobs = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setFilteredJobs(jobs);
    } else if (filter === 'Featured') {
      setFilteredJobs(jobs.filter((job) => job.isFeatured));
    } else if (filter === 'Bookmarked') {
      setFilteredJobs(jobs.filter((job) => job.isBookmarked));
    } else {
      setFilteredJobs(jobs.filter((job) => job.type === filter));
    }
  };

  const renderJobCard = ({ item }: { item: Job }) => (
    <TouchableOpacity style={styles.jobCard}>
      <View style={styles.jobCardHeader}>
        <Image source={item.logo} style={styles.companyLogo} />
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.companyName}>{item.company}</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color={COLORS.darkGray} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <MaterialIcons
            name={item.isBookmarked ? 'bookmark' : 'bookmark-border'}
            size={24}
            color={item.isBookmarked ? COLORS.primary : COLORS.darkGray}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.jobCardFooter}>
        <View style={styles.jobTypeContainer}>
          <Text style={styles.jobTypeText}>{item.type}</Text>
        </View>
        <Text style={styles.salaryText}>{item.salary}</Text>
        <Text style={styles.postedDateText}>{item.postedDate}</Text>
      </View>
      
      {item.isFeatured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderFilterOption = (filter: string) => (
    <TouchableOpacity
      style={[styles.filterOption, activeFilter === filter && styles.activeFilterOption]}
      onPress={() => filterJobs(filter)}
    >
      <Text
        style={[
          styles.filterText,
          activeFilter === filter && styles.activeFilterText,
        ]}
      >
        {filter}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jobs Board</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialIcons name="notifications" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search jobs, companies..."
          value={searchQuery}
          onChangeText={handleSearch}
          onSubmitEditing={() => {}}
        />
      </View>
      
      <View style={styles.featuredContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.featuredBanner}
        >
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>Find Your Dream Job</Text>
            <Text style={styles.featuredSubtitle}>
              Explore 1000+ jobs from top companies
            </Text>
            <TouchableOpacity style={styles.featuredButton}>
              <Text style={styles.featuredButtonText}>Explore All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featuredImageContainer}>
            <MaterialIcons name="work" size={80} color="rgba(255,255,255,0.3)" />
          </View>
        </LinearGradient>
      </View>
      
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
        >
          {renderFilterOption('All')}
          {renderFilterOption('Featured')}
          {renderFilterOption('Full-time')}
          {renderFilterOption('Part-time')}
          {renderFilterOption('Internship')}
          {renderFilterOption('Contract')}
          {renderFilterOption('Bookmarked')}
        </ScrollView>
      </View>
      
      <FlatList
        data={filteredJobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.jobsList}
        showsVerticalScrollIndicator={false}
      />
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
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: SIZES.large,
    marginBottom: SIZES.medium,
  },
  featuredContainer: {
    paddingHorizontal: SIZES.large,
    marginBottom: SIZES.medium,
  },
  featuredBanner: {
    height: 160,
    borderRadius: SIZES.medium,
    flexDirection: 'row',
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  featuredContent: {
    flex: 1,
    padding: SIZES.large,
    justifyContent: 'center',
  },
  featuredTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: SIZES.large,
    color: COLORS.white,
    marginBottom: SIZES.xSmall,
  },
  featuredSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    color: COLORS.white,
    marginBottom: SIZES.medium,
  },
  featuredButton: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.small,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  featuredImageContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    marginBottom: SIZES.small,
  },
  filtersScrollContent: {
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.small,
  },
  filterOption: {
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
    marginRight: SIZES.small,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  activeFilterOption: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
  activeFilterText: {
    color: COLORS.white,
  },
  jobsList: {
    paddingHorizontal: SIZES.large,
    paddingBottom: 100,
  },
  jobCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    marginBottom: SIZES.medium,
    padding: SIZES.medium,
    ...SHADOWS.medium,
  },
  jobCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: SIZES.medium,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 2,
  },
  companyName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.xSmall,
    color: COLORS.darkGray,
    marginLeft: 4,
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.small,
  },
  jobCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobTypeContainer: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  jobTypeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.xSmall,
    color: COLORS.darkGray,
  },
  salaryText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  postedDateText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.xSmall,
    color: COLORS.darkGray,
  },
  featuredBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopRightRadius: SIZES.medium,
    borderBottomLeftRadius: SIZES.medium,
  },
  featuredText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
});

export default JobsScreen;
