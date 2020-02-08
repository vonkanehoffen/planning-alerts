import React from "react";
import config from '../../config';

/* global google */

/**
 * Loading google mas direct... perhaps we can dynamically add markers this way
 * ... or perhaps fuck it as it'll be completely different for the mobile version which is the main aim.
 */
class GoogleMap extends React.Component {

  componentDidMount() {
    console.log('Checking for google');
    if(typeof google === 'undefined') {
      console.log("loading maps API....");
      loadScript(`https://maps.googleapis.com/maps/api/js?key=${config.googleApiKey}&callback=initMap`);
      window.initMap = this.initMap;
    }
  }

  componentWillUnmount () {
    console.log('remove map here');
  }

  initMap = () => {
    console.log('init map');
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  render() {
    return (
      <div style={{
        height: '50%',
        background: '#999'
      }} id="map">
        here
      </div>
    );
  }
}

function loadScript(url) {
  const index  = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default GoogleMap
