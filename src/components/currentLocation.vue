<script setup>
import { ref, onMounted } from "vue";

const apiKey = import.meta.env.VITE_API_KEY; // ใส่ API Key จาก WeatherAPI
const location = ref("กำลังดึงข้อมูล...");
const temperature = ref(null);
const condition = ref("");
const icon = ref("");
const lat = ref(null);
const lon = ref(null);

const getWeather = async (latitude, longitude) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&lang=th`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    location.value = `${data.location.name}, ${data.location.country}`;
    temperature.value = `${data.current.temp_c}°C`;
    condition.value = data.current.condition.text;
    icon.value = data.current.condition.icon;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

onMounted(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        lat.value = latitude; // อัปเดตค่า lat
        lon.value = longitude; // อัปเดตค่า lon
        getWeather(latitude, longitude);
      },
      () => {
        location.value = "ไม่สามารถดึงตำแหน่งได้";
      }
    );
  } else {
    location.value = "เบราว์เซอร์ไม่รองรับ Geolocation";
  }
});

</script>

<template class="bg-fixed">
  <div class="weather-container flex-col justify-center items-center ">
    <h2>Your current weather</h2>
    <p>{{ location }}</p>
    <p v-if="temperature">{{ temperature }}</p>
    <p v-if="condition">{{ condition }}</p>
    <img v-if="icon" :src="icon" alt="Weather Icon" class="pl-24" />
  </div>
</template>

<style scoped>
.weather-container {
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 300px;
  margin: auto;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
