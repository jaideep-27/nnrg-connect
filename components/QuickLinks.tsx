import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { COLORS, FONT, SIZES } from '../constants/theme';

interface QuickLinkProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  route: string;
  backgroundColor: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ icon, label, route, backgroundColor }) => (
  <Link href={route} asChild>
    <TouchableOpacity style={styles.linkContainer}>
      <View style={[styles.linkButton, { backgroundColor }]}>
        <MaterialIcons name={icon} size={24} color={COLORS.white} />
        <Text style={styles.linkText}>{label}</Text>
      </View>
    </TouchableOpacity>
  </Link>
);

const QuickLinks = () => {
  const links: QuickLinkProps[] = [
    {
      icon: 'group',
      label: 'Batch Groups',
      route: '/batch-groups',
      backgroundColor: COLORS.primary,
    },
    {
      icon: 'chat',
      label: 'Messages',
      route: '/messages',
      backgroundColor: '#34C759',
    },
    {
      icon: 'work',
      label: 'Job Board',
      route: '/jobs',
      backgroundColor: '#FF9500',
    },
    {
      icon: 'event',
      label: 'Events',
      route: '/events',
      backgroundColor: '#007AFF',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Links</Text>
      <View style={styles.linksGrid}>
        {links.map((link, index) => (
          <View key={index} style={styles.linkWrapper}>
            <QuickLink {...link} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.medium,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.semiBold,
    color: COLORS.text,
    marginBottom: SIZES.medium,
    paddingHorizontal: SIZES.medium,
  },
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SIZES.small / 2,
  },
  linkWrapper: {
    width: '50%',
    padding: SIZES.small / 2,
  },
  linkContainer: {
    flex: 1,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  linkText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    marginLeft: SIZES.small,
  },
});

export default QuickLinks;
