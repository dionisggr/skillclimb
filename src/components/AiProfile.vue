<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4">
    <div
      class="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden px-2"
    >
      <div class="px-6 py-8 relative">
        <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">
          Customize Your AI Profile
        </h1>

        <div class="space-y-10">
          <template
            v-for="(metrics, category) in aiProfileMetrics"
            :key="category"
          >
            <div>
              <h2 class="text-2xl font-semibold text-gray-700 mb-6">
                {{ formatCategoryTitle(category) }}
              </h2>

              <!-- Category Description -->
              <p class="text-gray-600 mb-6 ml-2 font-medium">
                {{ metrics.description }}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <template
                  v-for="(item, index) in metrics.list"
                  :key="`${category}-${index}`"
                >
                  <div
                    class="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm relative space-x-4"
                  >
                    <div class="flex items-center">
                      <span class="text-gray-700 font-medium">{{
                        item.metric
                      }}</span>
                    </div>
                    <button
                      @click="item.selected = !item.selected"
                      :class="item.selected ? 'bg-blue-500' : 'bg-gray-200'"
                      class="toggle-btn"
                    >
                      <span
                        :class="
                          item.selected ? 'translate-x-7' : 'translate-x-1'
                        "
                        class="toggle-dot"
                      ></span>
                    </button>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>

        <div class="flex justify-center mt-10">
          <button
            @click="savePreferences"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold my-8 py-2 px-8 rounded-lg transition-colors duration-200"
          >
            Save Preferences
          </button>
        </div>
        <div class="absolute bottom-5 right-5" v-if="showNotification">
          <div
            class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 pr-11 rounded relative"
            role="alert"
          >
            <span class="block sm:inline">Changes saved successfully!</span>
            <button class="absolute top-0.5 bottom-0 right-0 px-4 py-3" @click="showNotification = false">
              <svg
                class="fill-current h-5 w-5 text-green-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNotification: false,
      aiProfileMetrics: {
        personal: {
          description:
            'Review and select the personal information you want to share with the AI.',
          list: [
            { metric: 'Resume Uploads', selected: true },
            { metric: 'Professional Interests', selected: true },
            { metric: 'Skill Self-Assessment', selected: true },
            { metric: 'Learning Goals', selected: true },
            { metric: 'Past Course Enrollments', selected: true },
            { metric: 'Certifications Achieved', selected: false },
            { metric: 'Preferred Language', selected: true },
            { metric: 'Geographical Location', selected: false },
            { metric: 'Educational Background', selected: true },
          ],
        },
        performance: {
          description:
            'Select the performance metrics you want to track and analyze.',
          list: [
            { metric: 'Quiz Scores', selected: true },
            { metric: 'Assessment Scores', selected: true },
            { metric: 'Quiz Attempts', selected: true },
            { metric: 'Quiz Completion Time', selected: false },
            { metric: 'Assessment Retakes', selected: false },
            { metric: 'Learning Path Progress', selected: true },
            { metric: 'Score Trend Over Time', selected: false },
            { metric: 'Course Rate Completion', selected: true },
            { metric: 'Course Completion Time', selected: false },
          ],
        },
        interaction: {
          description:
            'Choose the interaction metrics you want to track and analyze.',
          list: [
            { metric: 'Course Views', selected: true },
            { metric: 'Lesson Views', selected: true },
            { metric: 'Lesson Completion Time', selected: true },
            { metric: 'Lessons Skipped', selected: false },
            { metric: 'Lesson Sections Visited', selected: false },
            { metric: 'Notes Taken per Lesson', selected: false },
            { metric: 'Breadth of Topics Explored', selected: false },
            { metric: 'Topic Deep-Diving Habits', selected: false },
            { metric: 'Student AI conversations', selected: false },
          ],
        },
        preferences: {
          description:
            'Select the preferences you want the AI to consider when recommending content and learning paths.',
          list: [
            { metric: 'Preference in Content', selected: false },
            { metric: 'Language Preferences', selected: false },
            { metric: 'Preferred Assessment Types', selected: true },
          ],
          usage: [
            { metric: 'Device Types Used', selected: true },
            { metric: 'Session Duration', selected: true },
          ],
        },
      },
    };
  },
  methods: {
    formatCategoryTitle(category) {
      return category
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
    savePreferences() {
      // Logic to save user preferences
      console.log('Preferences saved:', this.aiProfileMetrics);

      // Show notification
      this.showNotification = true;

      // Hide notification after 3 seconds
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.toggle-btn {
  @apply relative inline-flex items-center justify-start w-12 h-6 rounded-full transition-colors duration-200 ease-in-out;
}

.toggle-dot {
  @apply absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out;
}
</style>
