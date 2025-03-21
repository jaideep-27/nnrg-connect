@echo off
echo ===================================
echo NNRG Connect APK Builder
echo ===================================
echo.

echo This script will help you build an APK for your NNRG Connect app.
echo.

REM Check if Android SDK is installed
if "%ANDROID_HOME%"=="" (
    echo Android SDK not found. You need to install Android Studio first.
    echo Please download and install Android Studio from:
    echo https://developer.android.com/studio
    echo.
    echo After installation, set the ANDROID_HOME environment variable to your Android SDK location.
    echo Typically: C:\Users\USERNAME\AppData\Local\Android\Sdk
    echo.
    pause
    exit /b
)

echo Android SDK found at: %ANDROID_HOME%
echo.

REM Generate native Android project files
echo Generating native Android project files...
call npx expo prebuild -p android
if %ERRORLEVEL% NEQ 0 (
    echo Failed to generate Android project files.
    pause
    exit /b
)

echo Native Android project files generated successfully.
echo.

REM Navigate to the Android directory and build the APK
echo Building APK using Gradle...
cd android
call .\gradlew.bat assembleRelease
if %ERRORLEVEL% NEQ 0 (
    echo Failed to build APK.
    cd ..
    pause
    exit /b
)
cd ..

echo.
echo APK built successfully!
echo.
echo You can find your APK at:
echo android\app\build\outputs\apk\release\app-release.apk
echo.

REM Copy the APK to the root directory for easy access
echo Copying APK to root directory...
copy android\app\build\outputs\apk\release\app-release.apk nnrg-connect.apk
echo.
echo APK copied to: nnrg-connect.apk
echo.

echo Build process completed.
echo.

pause
