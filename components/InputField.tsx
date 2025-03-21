import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TextStyle, ViewStyle, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONT, SIZES } from '../constants/theme';

export interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  icon,
  containerStyle,
  inputStyle,
  autoCapitalize = 'none',
  editable = true,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputStyles: TextStyle[] = [
    styles.input,
    icon && styles.inputWithIcon,
    inputStyle,
    !editable && styles.inputTextDisabled,
  ].filter(Boolean) as TextStyle[];

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        error && styles.errorInput,
        !editable && styles.disabledInput,
      ]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={inputStyles}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.visibilityToggle}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            disabled={!editable}
          >
            <MaterialIcons
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color={!editable ? COLORS.textLight : COLORS.darkGray}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SIZES.xSmall,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  iconContainer: {
    paddingHorizontal: SIZES.medium,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  input: {
    flex: 1,
    height: 56,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.text,
    paddingHorizontal: SIZES.medium,
  },
  inputWithIcon: {
    paddingLeft: SIZES.small,
  },
  errorInput: {
    borderColor: COLORS.error,
  },
  disabledInput: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
  },
  inputTextDisabled: {
    color: COLORS.textLight,
  },
  errorText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.error,
    marginTop: SIZES.xSmall,
  },
  visibilityToggle: {
    padding: SIZES.medium,
  },
});

export default InputField;
