<script setup>
import { ref, onMounted } from "vue";
import searchInput from "./components/searchInput.vue";
import WeatherCard from "./components/weatherCard.vue";
import currentLocation from "./components/currentLocation.vue";
import Navbar from "./components/Navbar.vue";
import WeatherFooter from "./components/WeatherFooter.vue";
import Date from "./components/Date.vue";
import LeafletMap from "./components/LeafletMap.vue";

const places = ref([]);
const mainRef = ref(null);  // สร้าง ref เพื่ออ้างอิงถึง <main>

// เพิ่มข้อมูลเมือง
const addPlace = (data) => {
  // เช็คชื่อเมืองซ้ำ (ป้องกันใส่ซ้ำ)
  const isExist = places.value.some(
    (place) => place.location.name === data.location.name
  );
  if (!isExist) {
    places.value.push(data);
  }
};

// ลบข้อมูลเมือง
const deletePlace = (name) => {
  places.value = places.value.filter((place) => place.location.name !== name);
};

// Auto scroll เมื่อ component ถูก mount
onMounted(() => {
  if (mainRef.value) {
    mainRef.value.scrollIntoView({ behavior: "smooth" });
  }
});
</script>

<template>
  <Navbar />
  <Date />
  <currentLocation />
  <LeafletMap />
  <!-- error location -->
  <div v-if="error" class="text-center text-red-500">{{ error }}</div>
  
  <!-- main content ที่ใช้ ref -->
  <main ref="mainRef" class="flex-row justify-center items-center">
    <!-- search box -->
    <div class="mb-10 flex justify-center items-center">
      <searchInput @place-data="addPlace" />
    </div>
    <!-- weather card -->
    <div class="grid grid-cols-3 gap-4">
      <div v-for="place in places" :key="place.location.name">
        <WeatherCard :place="place" @delete-place="deletePlace" />
      </div>
    </div>
  </main>
  
  <WeatherFooter />
</template>

<style scoped></style>
