<template>
  <div class="nav-container">
    <nav class="flex justify-between items-center">
      <i class="fa-solid fa-cloud-bolt"> Dustin Weather App Project</i>
      <ul class="flex justify-end gap-6 p-4">
        <li>
          <button
            @click="goToRepo"
            class="px-4 py-2 bg-green-500 text-white rounded"
          >
            About
          </button>
        </li>
        <li>
          <button
            @click="goToGitHub"
            class="px-4 py-2 bg-red-500 text-white rounded"
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    goToRepo() {
      window.open("https://github.com/dustybun97/weather_app", "_blank");
    },
    goToGitHub() {
      window.open("https://github.com/dustybun97", "_blank");
    },
  },
};
</script>

<style></style>
