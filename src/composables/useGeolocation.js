import { ref } from 'vue';

export function useGeolocation() {
  const latitude = ref(null);
  const longitude = ref(null);
  const error = ref(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      error.value = 'Geolocation is not supported by your browser.';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
      },
      (err) => {
        error.value = 'Unable to retrieve your location.';
        console.error(err);
      }
    );
  };

  return { latitude, longitude, error, getLocation };
}
