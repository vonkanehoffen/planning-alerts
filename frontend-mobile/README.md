# Planning Alerts Mobile App
## React Native

With UI Kitten:
https://akveo.github.io/react-native-ui-kitten/docs/guides/getting-started#new-apps

React Native Maps:
https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md

Auth0:
https://auth0.com/docs/quickstart/native/react-native/00-login?download=true

Android:
com.planningalerts

iOs: changed from 
org.reactjs.native.example.PlanningAlerts

to
com.planningalerts

See Auth0 instructions. Guess might need to change for submission tho...

Seems ok on node v10.16.0
watchman / metro have problems on 12.15.0 LTS

`npm run android` first.
...then `npm run ios` as it can't start metro on it's own for some reason.
