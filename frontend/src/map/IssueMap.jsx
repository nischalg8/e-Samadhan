import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MapClickHandler from './MapClickHandler';
import L from 'leaflet';

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const userIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectorIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function IssueMap({
  userLocation,
  selectedLocation,
  onLocationSelect,
}) {
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url={TILE_URL} />

      <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
        <Popup>Your Location</Popup>
      </Marker>

      <Marker
        position={[selectedLocation.lat, selectedLocation.lng]}
        icon={selectorIcon}
        draggable
        eventHandlers={{
          dragend: (e) => onLocationSelect(e.target.getLatLng()),
        }}
      />

      <MapClickHandler onSelect={onLocationSelect} />
    </MapContainer>
  );
}
