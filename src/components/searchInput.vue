<script setup>
import { reactive } from "vue";
const searchTerm = reactive({
  search: "",
});

const handleSearch = () => {
  clearTimeout(searchTerm.timeout);
  searchTerm.timeout = setTimeout(() => {
    console.log(searchTerm.search);
  }, 500);
};
</script>
<template>
  <div>
    <!-- search box -->
    <form>
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
      <div>
        <button
          class="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left"
        ></button>
      </div>
    </div>
  </div>
</template>
