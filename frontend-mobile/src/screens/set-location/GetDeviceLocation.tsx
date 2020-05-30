import React, { useState } from "react";
import {Button, Icon, Spinner} from '@ui-kitten/components';
import {Platform} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from "react-native-geolocation-service";
import Snackbar from 'react-native-snackbar';

interface GetDeviceLocationProps {
  updateUserLocation: (coords: any) => any
}

const NavigationIcon = (style:any) => <Icon {...style} name="navigation-2-outline" />;

export function GetDeviceLocation({updateUserLocation}: GetDeviceLocationProps) {
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    let permissionResult;
    setLoading(true);
    if (Platform.OS === "ios") {
      console.log("Doing iOS perms check");
      permissionResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
    }

    switch (permissionResult) {
      case RESULTS.UNAVAILABLE:
      case RESULTS.DENIED:
      case RESULTS.BLOCKED:
        console.log("Probs getting location permission", permissionResult);
        break;
      case RESULTS.GRANTED:
        console.log("Location permission is granted");
        Geolocation.getCurrentPosition(
            position => {
              console.log("GEOLOCATION SUCCESS", position);
              updateUserLocation([
                position.coords.latitude,
                position.coords.longitude
              ]);
              setLoading(false);
            },
            error => {
              // See error code charts below.
              Snackbar.show({
                text: `Problem getting device location: ${error.message}`,
                duration: Snackbar.LENGTH_SHORT
              });
              setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        break;
    }
  };

  if(loading) return <Spinner/>;

  return (
      <Button onPress={getLocation} accessoryRight={NavigationIcon}>
        Get Location
      </Button>
  )

}
