<template>
  <div>
    <footer class="flex justify-between">
      <i class="fa-solid fa-cloud-bolt"> Dustin Weather App Project</i>
      <div class="flex gap-6">
        <button @click="scrollToTop" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-500 transition">Home</button>
        <button @click="goToGitHub" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-300 transition duration-300">
          Contact
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {methods: {
    goToGitHub() {
      window.open("https://github.com/dustybun97", "_blank");
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }};
</script>

<style></style>
