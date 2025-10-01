import React, { useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { addLocation as addLocationApi } from '../../api/userApi';
import { setCredentials } from '../../app/features/authSlice';

const mapContainerStyle = {
  height: '400px',
  width: '100%',
  borderRadius: '8px',
  marginTop: '1rem',
};
const defaultCenter = { lat: 20.5937, lng: 78.9629 };
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

  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);
  
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
        // *** THIS IS THE KEY CHANGE ***
        // We are adding { enableHighAccuracy: true }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newPos = { lat: latitude, lng: longitude };
                setMarker(newPos);
                panTo(newPos);

                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ location: newPos }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        setSelectedPlace(results[0]);
                    }
                });
            },
            () => {
                setError('Unable to retrieve your location. Please allow location access.');
            },
            { enableHighAccuracy: true } // Request high accuracy
        );
    } else {
        setError('Geolocation is not supported by your browser.');
    }
  };

  const onMapClick = useCallback((event) => {
    // ... (rest of the component logic remains the same)
  }, []);

  const onAutocompleteLoad = useCallback((autocomplete) => {
    // ...
  }, []);

  const onPlaceChanged = () => {
    // ...
  };

  const handleSubmit = async (e) => {
    // ...
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
        <p>Search for an address, use your current location, or click on the map.</p>
        
        <div className="location-controls">
          <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Search for an address..."
              className="autocomplete-input"
            />
          </Autocomplete>
          <button onClick={handleCurrentLocation} className="btn-current-location">
            📍 Use Current Location
          </button>
        </div>
        
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={5}
          center={defaultCenter}
          onLoad={(map) => (mapRef.current = map)}
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