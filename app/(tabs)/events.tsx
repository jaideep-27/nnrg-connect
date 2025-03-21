import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, FONT, SIZES, SHADOWS } from '../../constants/theme';
import SearchBar from '../../components/SearchBar';

// Define event types
type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
  image: any;
  attendees: number;
  category: 'Workshop' | 'Seminar' | 'Conference' | 'Meetup' | 'Cultural' | 'Sports';
  isRegistered: boolean;
  isFeatured: boolean;
};

// Mock data for events
const events: Event[] = [
  {
    id: '1',
    title: 'Annual Alumni Meet 2025',
    date: 'May 15, 2025',
    time: '10:00 AM - 5:00 PM',
    location: 'NNRG Campus, Hyderabad',
    organizer: 'NNRG Alumni Association',
    description: 'Join us for the annual alumni meet where you can reconnect with your classmates, professors, and make new connections. The event will feature keynote speeches, panel discussions, networking sessions, and cultural performances.',
    image: require('../../assets/images/default-profile.png'),
    attendees: 350,
    category: 'Meetup',
    isRegistered: true,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Tech Symposium 2025',
    date: 'April 10, 2025',
    time: '9:00 AM - 6:00 PM',
    location: 'NNRG Auditorium',
    organizer: 'Department of CSE',
    description: 'A technical symposium featuring workshops, coding competitions, paper presentations, and guest lectures from industry experts. This is a great opportunity to showcase your technical skills and learn from the best in the industry.',
    image: require('../../assets/images/default-profile.png'),
    attendees: 250,
    category: 'Conference',
    isRegistered: false,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Career Guidance Workshop',
    date: 'March 25, 2025',
    time: '2:00 PM - 5:00 PM',
    location: 'Online (Zoom)',
    organizer: 'NNRG Placement Cell',
    description: 'A workshop focused on career guidance, resume building, interview preparation, and job search strategies. Learn from industry professionals and alumni who have successfully navigated their career paths.',
    image: require('../../assets/images/default-profile.png'),
    attendees: 180,
    category: 'Workshop',
    isRegistered: true,
    isFeatured: false,
  },
  {
    id: '4',
    title: 'Cultural Fest - Rhythm 2025',
    date: 'February 28, 2025',
    time: '4:00 PM - 10:00 PM',
    location: 'NNRG Open Air Theatre',
    organizer: 'Student Cultural Committee',
    description: 'The annual cultural festival featuring music performances, dance competitions, fashion show, and various other cultural activities. Come and showcase your talent or enjoy the performances by your fellow students.',
    image: require('../../assets/images/default-profile.png'),
    attendees: 500,
    category: 'Cultural',
    isRegistered: false,
    isFeatured: false,
  },
  {
    id: '5',
    title: 'Sports Tournament - Champions League',
    date: 'April 5-7, 2025',
    time: 'All Day',
    location: 'NNRG Sports Complex',
    organizer: 'Sports Committee',
    description: 'A three-day sports tournament featuring cricket, football, basketball, volleyball, and athletics. Participate in your favorite sports or come and cheer for your department/batch.',
    image: require('../../assets/images/default-profile.png'),
    attendees: 300,
    category: 'Sports',
    isRegistered: false,
    isFeatured: false,
  },
];

const EventsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (event) =>
          event.title.toLowerCase().includes(query.toLowerCase()) ||
          event.organizer.toLowerCase().includes(query.toLowerCase()) ||
          event.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const filterEvents = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setFilteredEvents(events);
    } else if (filter === 'Registered') {
      setFilteredEvents(events.filter((event) => event.isRegistered));
    } else if (filter === 'Featured') {
      setFilteredEvents(events.filter((event) => event.isFeatured));
    } else {
      setFilteredEvents(events.filter((event) => event.category === filter));
    }
  };

  const renderEventCard = ({ item }: { item: Event }) => (
    <TouchableOpacity style={styles.eventCard}>
      <Image source={item.image} style={styles.eventImage} />
      
      <View style={styles.eventDateBadge}>
        <Text style={styles.eventDateText}>{item.date.split(',')[0]}</Text>
      </View>
      
      {item.isRegistered && (
        <View style={styles.registeredBadge}>
          <MaterialIcons name="check-circle" size={16} color={COLORS.white} />
          <Text style={styles.registeredText}>Registered</Text>
        </View>
      )}
      
      <View style={styles.eventContent}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        
        <Text style={styles.eventTitle}>{item.title}</Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.eventDetailItem}>
            <MaterialIcons name="access-time" size={16} color={COLORS.darkGray} />
            <Text style={styles.eventDetailText}>{item.time}</Text>
          </View>
          
          <View style={styles.eventDetailItem}>
            <MaterialIcons name="location-on" size={16} color={COLORS.darkGray} />
            <Text style={styles.eventDetailText}>{item.location}</Text>
          </View>
          
          <View style={styles.eventDetailItem}>
            <MaterialIcons name="people" size={16} color={COLORS.darkGray} />
            <Text style={styles.eventDetailText}>{item.attendees} Attendees</Text>
          </View>
        </View>
        
        <View style={styles.eventFooter}>
          <TouchableOpacity
            style={[
              styles.registerButton,
              item.isRegistered && styles.registeredButton,
            ]}
          >
            <Text
              style={[
                styles.registerButtonText,
                item.isRegistered && styles.registeredButtonText,
              ]}
            >
              {item.isRegistered ? 'Registered' : 'Register Now'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton}>
            <MaterialIcons name="share" size={20} color={COLORS.darkGray} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterOption = (filter: string) => (
    <TouchableOpacity
      style={[styles.filterOption, activeFilter === filter && styles.activeFilterOption]}
      onPress={() => filterEvents(filter)}
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
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity style={styles.calendarButton}>
          <MaterialIcons name="calendar-today" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search events..."
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
            <Text style={styles.featuredTitle}>Annual Alumni Meet 2025</Text>
            <Text style={styles.featuredSubtitle}>
              Join us for a day of networking and reconnecting
            </Text>
            <TouchableOpacity style={styles.featuredButton}>
              <Text style={styles.featuredButtonText}>Register Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featuredImageContainer}>
            <MaterialIcons name="event" size={80} color="rgba(255,255,255,0.3)" />
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
          {renderFilterOption('Registered')}
          {renderFilterOption('Workshop')}
          {renderFilterOption('Seminar')}
          {renderFilterOption('Conference')}
          {renderFilterOption('Meetup')}
          {renderFilterOption('Cultural')}
          {renderFilterOption('Sports')}
        </ScrollView>
      </View>
      
      <FlatList
        data={filteredEvents}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default EventsScreen;

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
  calendarButton: {
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
  eventsList: {
    paddingHorizontal: SIZES.large,
    paddingBottom: 100,
  },
  eventCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    marginBottom: SIZES.medium,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  eventImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  eventDateBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    ...SHADOWS.small,
  },
  eventDateText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  registeredBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.success,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  registeredText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.xSmall,
    color: COLORS.white,
    marginLeft: 4,
  },
  eventContent: {
    padding: SIZES.medium,
  },
  categoryContainer: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: SIZES.small,
  },
  categoryText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.xSmall,
    color: COLORS.darkGray,
  },
  eventTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: SIZES.small,
  },
  eventDetails: {
    marginBottom: SIZES.medium,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDetailText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginLeft: 8,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.small,
    flex: 1,
    marginRight: SIZES.small,
    alignItems: 'center',
  },
  registeredButton: {
    backgroundColor: COLORS.lightGray,
  },
  registerButtonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  registeredButtonText: {
    color: COLORS.darkGray,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
