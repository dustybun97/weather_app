<script setup>
import { ref, onMounted, watch } from "vue";
import searchInput from "./components/searchInput.vue";
import WeatherCard from "./components/weatherCard.vue";
import currentLocation from "./components/currentLocation.vue";

const apiKey = "4916bbe38db34274af241906250403";
const places = ref([]);
const addPlace = (data) => {
  // เช็คชื่อเมืองซ้ำ (ป้องกันใส่ซ้ำ)
  const isExist = places.value.some(
    (place) => place.location.name === data.location.name
  );
  if (!isExist) {
    places.value.push(data);
  }
};

const deletePlace = (name) => {
  places.value = places.value.filter((place) => place.location.name !== name);
};


</script>

<template>
  <div class="bg-cover" style="background-image: url('/4049458.jpg')">
    <currentLocation />
    <!-- date -->
    <div class="text-center mb-6">
      {{
        new Date().toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }}
    </div>
    <!-- error location -->
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>

    <main>
      <!-- search box -->
      <div class="mb-8">
        <searchInput @place-data="addPlace" />
      </div>
      <!-- weather card -->
      <div class="grid grid-cols-3 gap-4">
        <div v-for="place in places" :key="place.location.name">
          <WeatherCard :place="place" @delete-place="deletePlace" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* เพิ่มเติมหากอยากให้พื้นหลัง cover ทั้งหน้าจอ */
.min-h-screen {
  min-height: 100vh;
}
</style>
