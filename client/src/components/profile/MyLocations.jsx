import React, { useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { addLocation as addLocationApi } from '../../api/userApi';
import { setCredentials } from '../../app/features/authSlice';

// Map container style
const mapContainerStyle = {
  height: '400px',
  width: '100%',
  borderRadius: '8px',
};

// Default map center (e.g., a central point in India)
const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

// Libraries to load from Google Maps
const libraries = ['places'];

const MyLocations = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [marker, setMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });

    // Use Geocoding to get address from coordinates
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setSelectedPlace(results[0]);
      }
    });
  }, []);

  const onAutocompleteLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      setSelectedPlace(place);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMarker({ lat, lng });
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(15);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlace) {
      setError('Please select a location from the search bar or by clicking on the map.');
      return;
    }

    setLoading(true);
    setError('');

    // Extract address components
    const addressComponents = selectedPlace.address_components;
    const getAddressComponent = (type) =>
      addressComponents.find((c) => c.types.includes(type))?.long_name || '';
    
    const locationData = {
        address: selectedPlace.formatted_address,
        city: getAddressComponent('locality') || getAddressComponent('administrative_area_level_2'),
        postalCode: getAddressComponent('postal_code'),
    };

    try {
      const updatedUser = await addLocationApi(locationData);
      dispatch(setCredentials(updatedUser));
      setSelectedPlace(null);
      setMarker(null);
    } catch (err) {
      setError('Failed to add location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps...";

  return (
    <div className="locations-container">
      <div className="locations-list">
        <h2>My Saved Locations</h2>
        {userInfo?.savedLocations?.length === 0 ? (
          <p>You have no saved locations.</p>
        ) : (
          userInfo?.savedLocations?.map((loc, index) => (
            <div key={index} className="location-card">
              <p>{loc.address}</p>
              <p>{loc.city}, {loc.postalCode}</p>
            </div>
          ))
        )}
      </div>

      <div className="add-location-form">
        <h3>Add a New Location</h3>
        <p>Search for an address or click on the map to place a pin.</p>
        
        <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search for an address..."
            className="autocomplete-input"
          />
        </Autocomplete>
        
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={5}
          center={defaultCenter}
          onLoad={onMapLoad}
          onClick={onMapClick}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>

        {selectedPlace && (
            <div className="selected-address">
                <strong>Selected Address:</strong>
                <p>{selectedPlace.formatted_address}</p>
            </div>
        )}

        {error && <p className="error-message">{error}</p>}
        <button onClick={handleSubmit} disabled={loading || !selectedPlace} className="save-location-btn">
          {loading ? 'Saving...' : 'Save Location'}
        </button>
      </div>
    </div>
  );
};

export default MyLocations;