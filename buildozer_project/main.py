import os
import shutil
import subprocess
import sys

def main():
    print("NNRG Connect App Packager")
    print("==========================")
    print("This script will help you package your React Native app as an APK.")
    
    # Check if Python is installed
    print("Checking Python installation...")
    python_version = sys.version
    print(f"Python version: {python_version}")
    
    # Check if npm is installed
    print("Checking npm installation...")
    try:
        # Use shell=True for Windows compatibility
        npm_version = subprocess.check_output(["npm", "--version"], shell=True).decode().strip()
        print(f"npm version: {npm_version}")
    except Exception as e:
        print(f"Error checking npm: {e}")
        print("npm detection failed, but we'll continue anyway.")
    
    # Check if the React Native project exists
    print("Checking React Native project...")
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    package_json_path = os.path.join(project_root, "package.json")
    
    if not os.path.exists(package_json_path):
        print(f"package.json not found at {package_json_path}")
        return
    else:
        print(f"Found package.json at {package_json_path}")
    
    print("\nTo build an APK for your React Native app, you have several options:")
    print("\n1. Use Expo EAS Build (requires an Expo account)")
    print("2. Use a local Android development environment (requires Android SDK)")
    print("3. Use a cloud build service like Appetize.io")
    
    choice = input("\nEnter your choice (1-3): ")
    
    if choice == "1":
        print("\nTo use Expo EAS Build:")
        print("1. Make sure you have an Expo account (create one at https://expo.dev/signup)")
        print("2. Install the EAS CLI: npm install -g eas-cli")
        print("3. Log in to your Expo account: eas login")
        print("4. Configure your build: eas build:configure")
        print("5. Build the APK: eas build -p android --profile preview")
        print("6. Once the build is complete, you can download the APK from the provided URL.")
    elif choice == "2":
        print("\nTo use a local Android development environment:")
        print("1. Install Android Studio from https://developer.android.com/studio")
        print("2. Set up the Android SDK and environment variables")
        print("3. Generate native Android project files: npx expo prebuild -p android")
        print("4. Navigate to the Android directory: cd android")
        print("5. Build the APK using Gradle: ./gradlew assembleRelease")
        print("6. The APK will be available at: android/app/build/outputs/apk/release/app-release.apk")
    elif choice == "3":
        print("\nTo use a cloud build service like Appetize.io:")
        print("1. Create an account on Appetize.io")
        print("2. Build a development version of your app: npx expo start --dev-client")
        print("3. Upload your app to Appetize.io")
        print("4. Share the provided URL with others to test your app")
    else:
        print("Invalid choice. Please run the script again and select a valid option.")

if __name__ == "__main__":
    main()
