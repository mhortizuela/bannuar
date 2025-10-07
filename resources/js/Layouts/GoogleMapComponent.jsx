import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '12px',
};

const GoogleMapComponent = ({
  apiKey,
  center,
  zoom = 14,
  markers = [],
  markerIcon = null,
  buildingMarker = null,
  buildingIcon = null,
  buildingInfo = null,
  selectedDeployment = null // can be {lat, lng} OR an array of markers
}) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showBuildingInfo, setShowBuildingInfo] = useState(false);
  const mapRef = useRef(null);

  // Handle deployment zooming / fitting
  useEffect(() => {
    if (mapRef.current && selectedDeployment) {
      if (Array.isArray(selectedDeployment) && selectedDeployment.length > 0) {
        // 👇 Fit bounds for multiple deployments
        const bounds = new window.google.maps.LatLngBounds();
        selectedDeployment.forEach(dep => {
          bounds.extend({ lat: dep.lat, lng: dep.lng });
        });
        mapRef.current.fitBounds(bounds);
      } else if (selectedDeployment.lat && selectedDeployment.lng) {
        // 👇 Pan/zoom for single deployment
        mapRef.current.panTo(selectedDeployment);
        mapRef.current.setZoom(18);
      }
    }
  }, [selectedDeployment]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={map => (mapRef.current = map)} // store map reference
      >

        {/* Member Markers */}
        {markers.map((marker, index) => (
          <Marker
            key={`member-${index}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={marker.icon || markerIcon}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {/* InfoWindow for selected member */}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <strong>{selectedMarker.name || 'Police Member'}</strong>
            </div>
          </InfoWindow>
        )}

        {/* Police Building Marker */}
        {buildingMarker && (
          <Marker
            position={buildingMarker}
            icon={buildingIcon}
            onClick={() => setShowBuildingInfo(true)}
          />
        )}

        {/* InfoWindow for Police Building */}
        {showBuildingInfo && buildingMarker && buildingInfo && (
          <InfoWindow
            position={buildingMarker}
            onCloseClick={() => setShowBuildingInfo(false)}
          >
            <div>
              <strong>{buildingInfo.name}</strong><br />
              <span>{buildingInfo.address}</span>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
