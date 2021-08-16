import React, { useEffect, useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
//import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export function MapContainer() {
  const [lat, setLat] = useState(42.1);
  const [lng, setLng] = useState(42.1);
  // const address = async () => await geocodeByAddress('Toronto, ON, Canada').then(results => getLatLng(results[0])).then(({ lat, lng }) => { setLat(lat); setLng(lng); }).catch(error => console.error('Error', error));
  // useEffect(address, []);

  return (
    <Map google={window.google} initialCenter={{ lat: lat, lng: lng }} center={{ lat: lat, lng: lng }}  >
      <Marker position={{ lat: lat, lng: lng }} />
    </Map>
  )
}

export default GoogleApiWrapper({ apiKey: ('AIzaSyDwzGSsCkzeL0hqgqv_OOLAkhYfOlzvL9k') })(MapContainer)