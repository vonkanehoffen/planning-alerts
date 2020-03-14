# Planning Alerts Mobile App

## React Native

With [UI Kitten](https://akveo.github.io/react-native-ui-kitten/docs/guides/getting-started#new-apps),
[React Native Maps](https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md),
[Auth0](https://auth0.com/docs/quickstart/native/react-native/00-login?download=true),
[React Navigation](https://reactnavigation.org/docs/en/navigating.html)

Auth0 config currently in Default App.

Android package name & iOS Bundle Identifier:

```
com.kanec.planningalerts
```

Apple App ID: 1499203549

### Dev setup

Use Node 13.7.0 LTS

Install Watchman

```
brew install watchman
```

Install deps

```
npm i
cd ios
pod install
```

Start Metro bundler:

```
npm start
```

Plug in a device and push a debug build:

```
adb devices # is it there?
npm run android
npm run ios
```

### Build for release:

See docs [here](https://facebook.github.io/react-native/docs/running-on-device#building-your-app-for-production)
and [here](https://facebook.github.io/react-native/docs/signed-apk-android)

#### Android:

Make sure `frontend-mobile/android/app/pa-upload-key.keystore` exists.

```
npx react-native run-android --variant=release
```

Upload the resulting bundle `frontend-mobile/android/app/build/outputs/bundle/release/app.aab` to Play console.

#### iOS

Enable App Transport Security - `NSExceptionDomains` in `ios/PlanningAlerts/Info.plist` should be blank. localhost should be excluded for dev.

In Xcode:

- Switch profile to "Release"
- Product -> Build
- Product -> Archive
- Window -> Organizer (to see new archive)
- Distribute App

Dev and Distribution certs live in the login keychain.
