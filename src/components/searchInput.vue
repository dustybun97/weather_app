<script setup>
import { reactive } from "vue";

const emit = defineEmits(["place-data"]);

const searchTerm = reactive({
  search: "",
  timeout: null,
  results: null,
});

// ค้นหาเมืองแบบแนะนำ (auto suggest)
const handleSearch = () => {
  clearTimeout(searchTerm.timeout);
  searchTerm.timeout = setTimeout(async () => {
    if (searchTerm.search !== "") {
      const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=4916bbe38db34274af241906250403&q=${searchTerm.search}`
      );
      const data = await res.json();
      console.log("suggestion: ", data);
      searchTerm.results = data;
    } else {
      searchTerm.results = null;
    }
  }, 500);
};

// ดึงข้อมูลอากาศจาก city ที่เลือก (จาก suggestion)
const getWeather = async (id) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4916bbe38db34274af241906250403&q=id:${id}&days=3&aqi=no&alerts=no`
  );
  const data = await res.json();
  emit("place-data", data);
  searchTerm.search = "";
  searchTerm.results = null;
};

// ดึงข้อมูลอากาศจากชื่อเมืองที่พิมพ์แล้วกด Enter
const searchWeatherDirectly = async () => {
  if (searchTerm.search.trim() === "") return;

  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4916bbe38db34274af241906250403&q=${searchTerm.search}&days=3&aqi=no&alerts=no`
  );
  const data = await res.json();
  console.log("direct search: ", data);
  emit("place-data", data);
  searchTerm.search = "";
  searchTerm.results = null;
};
</script>

<template>
  <div>
    <!-- search box -->
    <form @submit.prevent="searchWeatherDirectly">
      <div class="flex items-center bg-white rounded-lg shadow-lg">
        <i class="fa-solid fa-search p-2 text-indigo-600"></i>
        <input
          type="text"
          placeholder="Enter city name"
          class="rounded-r-lg p-2 border-0 outline-0 focus:ring-2 focus:ring-indigo-600 ring-inset w-full"
          v-model="searchTerm.search"
          @input="handleSearch"
        />
      </div>
    </form>
    <!-- search suggestions -->
    <div class="bg-white my-2 rounded-lg shadow-lg">
      <div v-if="searchTerm.results !== null">
        <div v-for="place in searchTerm.results" :key="place.id">
          <button
            @click="getWeather(place.id)"
            class="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left"
          >
            {{ place.name }}, {{ place.region }}, {{ place.country }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
