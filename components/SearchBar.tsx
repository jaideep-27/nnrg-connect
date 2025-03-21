import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onSubmitEditing?: () => void;
  onFilterPress?: () => void;
  showFilter?: boolean;
}

const SearchBar = ({
  placeholder = 'Search...',
  value,
  onChangeText,
  onSubmit,
  onSubmitEditing,
  onFilterPress,
  showFilter = true,
}: SearchBarProps) => {
  const handleSubmit = () => {
    if (onSubmitEditing) {
      onSubmitEditing();
    } else if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={COLORS.darkGray} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.darkGray}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          autoCapitalize="none"
        />
        {value.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => onChangeText('')}
          >
            <MaterialIcons name="clear" size={20} color={COLORS.darkGray} />
          </TouchableOpacity>
        )}
      </View>
      {showFilter && (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={onFilterPress}
        >
          <MaterialIcons name="filter-list" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.small,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingHorizontal: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginRight: SIZES.small,
  },
  input: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.black,
    height: '100%',
  },
  clearButton: {
    padding: SIZES.small,
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.small,
    ...SHADOWS.small,
  },
});

export default SearchBar;
