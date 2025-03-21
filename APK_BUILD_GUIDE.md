# NNRG Connect APK Build Guide

This guide provides detailed instructions for building an APK for the NNRG Connect app using different methods.

## Method 1: Using the Build Script (Recommended)

We've created a batch script to automate the APK building process.

### Prerequisites

1. Install Android Studio from [developer.android.com/studio](https://developer.android.com/studio)
2. During installation, make sure to install the Android SDK
3. Set the `ANDROID_HOME` environment variable to your Android SDK location (typically `C:\Users\USERNAME\AppData\Local\Android\Sdk`)

### Steps

1. Open a command prompt in the project directory
2. Run the build script:
   ```
   build_apk.bat
   ```
3. The script will:
   - Check if Android SDK is installed
   - Generate native Android project files
   - Build the APK using Gradle
   - Copy the APK to the root directory as `nnrg-connect.apk`

## Method 2: Manual Build Process

If the script doesn't work, you can follow these manual steps:

1. Generate native Android project files:
   ```
   npx expo prebuild -p android
   ```

2. Navigate to the Android directory:
   ```
   cd android
   ```

3. Build the APK using Gradle:
   ```
   .\gradlew.bat assembleRelease
   ```

4. The APK will be available at:
   ```
   android\app\build\outputs\apk\release\app-release.apk
   ```

## Method 3: Using Expo EAS Build

If you prefer using Expo's build service:

1. Install the EAS CLI:
   ```
   npm install -g eas-cli
   ```

2. Log in to your Expo account:
   ```
   eas login
   ```

3. Configure your build:
   ```
   eas build:configure
   ```

4. Build the APK:
   ```
   eas build -p android --profile preview
   ```

5. Once the build is complete, you can download the APK from the provided URL.

## Troubleshooting

### Common Issues

1. **Android SDK not found**
   - Make sure Android Studio is installed
   - Set the `ANDROID_HOME` environment variable correctly

2. **Gradle build fails**
   - Make sure you have Java JDK installed
   - Check that your `android/gradle.properties` file is correctly configured

3. **EAS build fails**
   - Make sure you're logged in to the correct Expo account
   - Check that your `app.json` has the correct configuration

### Getting Help

If you encounter issues not covered in this guide, refer to:

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/environment-setup)
- [Android Developer Documentation](https://developer.android.com/studio/build)
