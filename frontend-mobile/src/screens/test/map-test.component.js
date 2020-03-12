import React, { Component } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export class MapTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 53.4446175,
        longitude: -2.2748731,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  onRegionChange = region => {
    this.setState({ region });
  };

  render() {
    console.log("map region: ", this.state.region);
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
