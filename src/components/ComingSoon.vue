<template>
  <div class="coming-soon flex mt-40 justify-center bg-white">
    <div class="text-center">
      <h1 class="text-4xl lg:text-6xl font-bold text-gray-800">Coming Soon!</h1>
      <p class="text-xl text-gray-600 mt-4">
        We're working hard to bring you exciting new content.
      </p>
      <div class="mt-8">
        <a
          href="#"
          class="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors text-lg cursor-pointer"
        >
          Notify Me
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComingSoon',
  methods: {
    // Define methods for actions like 'Notify Me'
  },
};
</script>

<style scoped>
.coming-soon {
  height: calc(100vh - 400px);
}
</style>
