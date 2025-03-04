<script setup>
import { ref } from "vue";
import searchInput from "./components/searchInput.vue";
import WeatherCard from "./components/weatherCard.vue";
const places = ref([]);
const addPlace = (data) => {
  places.value.push(data);
};
</script>

<template>
  <main>
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
    <!-- search box -->
    <div class="">
      <searchInput @place-data="addPlace" />
    </div>
    <!-- weather card -->
     <div v-for="place in places" :key="place.location.name">
      <WeatherCard :place="place"/>
     </div>
  </main>
</template>

<style scoped>
p {
  color: red;
}
</style>
