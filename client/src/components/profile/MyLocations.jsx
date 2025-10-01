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
            () => { setError('Unable to retrieve your location.'); },
            { enableHighAccuracy: true }
        );
    } else {
        setError('Geolocation is not supported by your browser.');
    }
  };

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
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
        const newPos = { lat, lng };
        setMarker(newPos);
        panTo(newPos);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlace) {
      setError('Please select a location from the search bar or map.');
      return;
    }
    setLoading(true);
    setError('');
    const addressComponents = selectedPlace.address_components;
    const getComponent = (type) => addressComponents.find(c => c.types.includes(type))?.long_name || '';
    const locationData = {
        address: selectedPlace.formatted_address,
        city: getComponent('locality') || getComponent('administrative_area_level_2'),
        postalCode: getComponent('postal_code'),
    };

    try {
      const updatedUser = await addLocationApi(locationData);
      dispatch(setCredentials(updatedUser));
      setSelectedPlace(null);
      setMarker(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
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
        <p>Search, use your current location, or click on the map.</p>
        
        <div className="location-controls">
          <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
            <input type="text" placeholder="Search for an address..." className="autocomplete-input" />
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