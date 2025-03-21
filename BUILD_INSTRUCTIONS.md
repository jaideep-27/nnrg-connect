# Building an APK for NNRG Connect

This document provides instructions for building an APK for the NNRG Connect app.

## Prerequisites

1. Install EAS CLI globally:
   ```
   npm install -g eas-cli
   ```

2. Log in to your Expo account:
   ```
   eas login
   ```
   If you don't have an Expo account, create one at https://expo.dev/signup

## Building the APK

### Option 1: Using EAS Build (Recommended)

1. Configure your build:
   ```
   eas build:configure
   ```

2. Build the APK:
   ```
   eas build -p android --profile preview
   ```

3. Once the build is complete, you can download the APK from the provided URL.

### Option 2: Using Local Build

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
   ./gradlew assembleRelease
   ```

4. The APK will be available at:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

## Troubleshooting

- If you encounter issues with the EAS build service, try:
  ```
  eas build:configure
  ```
  to reconfigure your build settings.

- Make sure your app.json has the correct Android package name and version code.

- If you're having issues with the local build, make sure you have the Android SDK installed and properly configured.
