import { GoogleProvider as LeafletGoogleProvider } from 'leaflet-geosearch';

const GoogleProvider = (key) =>
  new LeafletGoogleProvider({
    params: {
      key,
      region: 'de',
    },
  });
export default GoogleProvider;
