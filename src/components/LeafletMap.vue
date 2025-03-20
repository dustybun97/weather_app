<template>
  <div class="container">
    <div id="map"></div>
  </div>
</template>

<script>
import { onMounted, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  setup() {
    onMounted(() => {
      nextTick(() => {
        // Check if geolocation is available
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // Create the map centered on the user's location
              const map = L.map("map").setView([latitude, longitude], 10);

              L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
              }).addTo(map);

              L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup(`📍 Your Location: ${latitude}, ${longitude}`)
                .openPopup();

              map.invalidateSize();
            },
            () => {
              console.error("Error fetching geolocation.");
            }
          );
        } else {
          console.error("Geolocation is not available in this browser.");
        }
      });
    });

    return {};
  },
};
</script>

<style>
.container {
  text-align: center;
  padding: 20px;
  margin: auto;
}

#map {
  height: 500px;
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  border-radius: 10px;
  border: 1px solid #ccc;
}
</style>
