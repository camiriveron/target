// App common constants

export const SUPPORTED_LANGUAGES = ['en', 'es'];
export const DEFAULT_LANGUAGE = 'en';
export const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY || '';
export const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`;
export const COLORS = {
  yellow: '#efc638',
  white: '#ffffff',
  blue: '#00bfff',
};
