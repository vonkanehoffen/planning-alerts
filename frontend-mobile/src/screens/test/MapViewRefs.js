import React, { Component } from "react";
import MapView from "react-native-maps";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PaLogo } from "../../components/PaLogo";

const initialRegion = {
  latitude: 53.44377497031008,
  latitudeDelta: 0.05861431339441481,
  longitude: -2.262476727574612,
  longitudeDelta: 0.062443106335308585
};

const newRegion = {
  latitude: 53.532179852997864,
  latitudeDelta: 0.05849226929878171,
  longitude: -2.287102203326095,
  longitudeDelta: 0.06244310295477362
};

function MapViewRefs() {
  let map;

  const setRegion = () => {
    console.log("SETREGIONFN:", map);
    map.animateToRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={initialRegion}
        style={styles.map}
        ref={el => (map = el)}
      />
      <TouchableOpacity style={styles.logo} onPress={setRegion}>
        <PaLogo size={40} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  logo: {
    position: "absolute",
    top: 10,
    left: 10
  }
});

export default MapViewRefs;
