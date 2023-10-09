<template>
  <div class="bg-gray-200 min-h-screen p-8 flex justify-center">
    <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl relative h-fit">
      <button @click.prevent="$emit('go-back')" class="absolute top-4 left-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
        ←
      </button>
      <header class="mb-4 text-center">
        <h1 class="text-3xl font-bold mb-2 text-blue-600">SkillClimb</h1>
      </header>
      <section class="mb-4">
        <div class="text-center">
          <h2 class="text-2xl font-semibold mb-2 text-blue-500">Certificate of Completion</h2>
          <p>This certifies that</p>
          <h3 class="text-xl font-bold mb-2 text-gray-700">{{ userFullName }}</h3>
          <p>has successfully completed the</p>
          <h4 class="text-xl font-bold mb-2 text-gray-700">{{ certificationTitle }}</h4>
          <p>on the topic of</p>
          <h5 class="text-lg font-medium mb-2 text-gray-600">{{ certificationTopic }}</h5>
          <p class="mb-2 text-gray-600">{{ certificationDate }}</p>
        </div>
      </section>
      <section class="mb-4">
        <p class="italic text-gray-600">"Your dedication and pursuit towards personal growth and excellence is commendable. Congratulations on your achievement."</p>
      </section>
      <section class="mt-8 flex justify-between items-center">
        <div class="space-x-4">
          <button @click="shareTo('facebook')" class="text-blue-600"><i class="mdi mdi-facebook mdi-24px"></i></button>
          <button @click="shareTo('twitter')" class="text-blue-400"><i class="mdi mdi-twitter mdi-24px"></i></button>
          <button @click="shareTo('linkedin')" class="text-blue-700"><i class="mdi mdi-linkedin mdi-24px"></i></button>
          <button @click="shareTo('whatsapp')" class="text-green-500"><i class="mdi mdi-whatsapp mdi-24px"></i></button>
        </div>
        <button @click="downloadCertification" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Download</button>
      </section>
    </div>
  </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.min.css';

export default {
  data() {
    return {
      userFullName: 'John Doe',
      certificationTitle: 'Advanced Web Development',
      certificationTopic: 'Vue.js Fundamentals',
      certificationDate: new Date().toLocaleDateString()
    }
  },
  methods: {
    shareTo(platform) {
      // Logic to share the certification to a specific platform
      alert(`Sharing the certification to ${platform}...`);
    },
    downloadCertification() {
      // Logic to download the certification
      alert('Downloading the certification...');
    },
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    }
  }
}
</script>

<style scoped>
/* You can add any additional styling if required */
</style>