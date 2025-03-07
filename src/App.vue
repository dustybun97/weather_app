<script setup>
import { ref } from "vue";
import searchInput from "./components/searchInput.vue";
import WeatherCard from "./components/weatherCard.vue";
const places = ref([]);
const addPlace = (data) => {
  places.value.push(data);
};

const deletePlace = (name) => {
  places.value = places.value.filter((place) => place.location.name !== name);
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
    <div class="grid grid-cols-2 gap-4">
      <div v-for="place in places" :key="place.location.name">
        <WeatherCard :place="place" @delete-place="deletePlace" />
      </div>
    </div>
  </main>
</template>

<style scoped>
p {
  color: red;
}
</style>
