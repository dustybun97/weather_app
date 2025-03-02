<script setup>
  import searchInput from './components/searchInput.vue'
</script>

<template>
  <main>
    <!-- date -->
    <div class=" text-center mb-6">
      {{ new Date().toLocaleDateString('en-us',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) }}
    </div>
    <!-- search box -->
    <div class="">
      <searchInput />
    </div>
    <!-- weather report -->
    <div class="flex justify-center mt-6">
      <div class="bg-gray-200 p-4">
        <h2 class="text-center">City Name</h2>
        <div class="flex justify-between">
          <p>Temperature</p>
          <p>25°C</p>
        </div>
        <div class="flex justify-between">
          <p>Weather</p>
          <p>Cloudy</p>
        </div>
        <div class="flex justify-between">
          <p>Wind</p>
          <p>5 km/h</p>
        </div>
        <div class="flex justify-between">
          <p>Humidity</p>
          <p>50%</p>
        </div>
      </div>
    </div>
    
  </main>
</template>

<style scoped>
p {
  color: red;
}
</style>
