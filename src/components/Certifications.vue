<template>
  <div class="min-h-screen p-12 bg-gray-100">
    <div class="container mx-auto">
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-800 tracking-wide">Certifications</h1>
      </header>
      <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div
          v-for="certification in certifications"
          :key="certification.id"
          class="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative"
          @click="viewCertification(certification)"
        >
          <div v-if="certification.date" class="absolute top-0 right-0 bg-green-500 text-white py-1 px-3 rounded-bl-lg font-medium text-sm">
            Completed on {{ certification.date }}
          </div>
          <h2 :class="certification.date ? 'mt-6' : 'mt-2'" class="text-2xl font-semibold mb-2 text-gray-900">{{ certification.title }}</h2>
          <p class="text-base mb-2 text-gray-600">{{ certification.topic }}</p>
          <div class="mb-4 border-t border-gray-200 pt-4">
            <p class="text-sm text-gray-500">{{ certification.videos }} Videos &middot; {{ certification.assessments }} Assessments</p>
          </div>
          <div class="flex justify-between items-center">
            <button @click.stop="$emit('view-learning-path')" class="flex items-center text-indigo-600 hover:text-indigo-800 hover:underline">
              <span class="mr-2">View Details</span>
              <i class="fas fa-info-circle"></i>
            </button>
            <button v-if="certification.date" @click.stop="$emit('view-certification')" class="flex items-center text-green-600 hover:text-green-800 hover:underline">
              <span class="mr-2">View Certificate</span>
              <i class="fas fa-certificate"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openCertification: null,
      certifications: [
        { id: 1, title: 'Advanced Web Development', date: new Date().toLocaleDateString(), topic: 'Web Development', videos: 10, assessments: 5 },
        { id: 2, title: 'UI/UX Design Principles', date: null, topic: 'Design', videos: 8, assessments: 4 },
        { id: 3, title: 'Cloud Computing Basics', date: null, topic: 'Cloud Computing', videos: 12, assessments: 6 },
        // ... other certifications data ...
      ],
    };
  },
  methods: {
    viewCertification(certification) {
      // logic to open certification
    },
    viewDetails(certification) {
      // logic to open details
    },
  },
};
</script>

<style scoped>
/* No additional styles required as we are using tailwind for everything */
</style>
