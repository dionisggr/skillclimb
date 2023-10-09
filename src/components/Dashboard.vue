<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Dashboard Header -->
    <div class="text-center py-12 bg-indigo-600 text-white">
      <h1 class="text-4xl font-extrabold">Creator Dashboard</h1>
      <p class="text-indigo-200">Harness the power of AI for your courses</p>
    </div>

    <!-- Dashboard Content -->
    <div class="container mx-auto px-4 max-w-screen-xl mt-8">
      <!-- Insights Section -->
      <div class="bg-white p-6 shadow-lg grid grid-cols-3 gap-4 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-md flex items-center">
          <div class="mr-4 bg-indigo-200 p-4 rounded-full">
            <i class="fas fa-video text-indigo-600 text-xl"></i>
            <!-- Using Font Awesome icons -->
          </div>
          <div>
            <h2 class="text-xl font-semibold">Total Videos</h2>
            <p>123</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md flex items-center">
          <div class="mr-4 bg-indigo-200 p-4 rounded-full">
            <i class="fas fa-eye text-indigo-600 text-xl"></i>
          </div>
          <div>
            <h2 class="text-xl font-semibold">Total Views</h2>
            <p>456K</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md flex items-center">
          <div class="mr-4 bg-indigo-200 p-4 rounded-full">
            <i class="fas fa-comments text-indigo-600 text-xl"></i>
          </div>
          <div>
            <h2 class="text-xl font-semibold">Total Comments</h2>
            <p>789</p>
          </div>
        </div>
      </div>

      <!-- Courses Overview -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-10">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold text-gray-700">Your Courses</h2>
          <button
            class="bg-indigo-500 text-white rounded-lg px-5 py-2 shadow-md hover:bg-indigo-700 transition-colors"
            @click="$emit('open-video-platform')"
          >
            Create New Course
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="course in courses"
            :key="course.id"
            class="border p-6 rounded-lg"
          >
            <img
              :src="course.thumbnail"
              alt="Course Thumbnail"
              class="w-full mb-4"
            />
            <h3 class="text-lg font-medium mb-2">{{ course.title }}</h3>
            <p class="text-sm text-gray-500 mb-2 truncate">
              {{ course.description }}
            </p>
            <p class="text-sm text-gray-500 mb-2">
              <i class="fas fa-users"></i> {{ course.enrolled }} enrolled
            </p>
            <p class="text-sm text-gray-500 mb-4">
              <i class="fas fa-clock"></i> {{ course.duration }} hours
            </p>
            <button
              class="bg-indigo-500 text-white rounded-lg px-4 py-1 shadow-md hover:bg-indigo-700 transition-colors"
            >
              Add Lesson
            </button>
          </div>
        </div>
      </div>

      <!-- Feedback Section -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-10">
        <h2 class="text-2xl font-semibold text-gray-700 mb-6">
          Recent Feedback
        </h2>
        <ul>
          <li
            v-for="feedback in recentFeedback"
            :key="feedback.id"
            class="border-b pb-4 mb-4"
          >
            <p class="text-gray-700 mb-2">{{ feedback.comment }}</p>
            <span class="text-sm text-indigo-500">{{ feedback.course }}</span>
          </li>
        </ul>
      </div>

      <!-- Recommendations Section -->
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-700 mb-6">
          AI Recommendations for Your Courses
        </h2>
        <ul>
          <li
            v-for="recommendation in aiRecommendations"
            :key="recommendation.id"
            class="mb-4"
          >
            <p>
              <strong class="text-indigo-600">{{
                recommendation.title
              }}</strong>
            </p>
            <p class="text-gray-600">{{ recommendation.detail }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalStudents: 4523,
      totalCourses: 12,
      avgRating: 4.5,
      courses: [
        {
          id: 1,
          title: 'Mastering Vue.js',
          description: 'Deep dive into Vue.js and its ecosystem.',
          thumbnail: '',
          enrolled: 1500,
          duration: 5,
        },
        {
          id: 2,
          title: 'AI for Beginners',
          description:
            'Introduction to AI, machine learning, and neural networks.',
          thumbnail: '',
          enrolled: 2300,
          duration: 8,
        },
        // ... Add more mock courses as needed
      ],
      recentFeedback: [
        {
          id: 1,
          course: 'Mastering Vue.js',
          comment: 'Loved the way concepts are explained!',
        },
        {
          id: 2,
          course: 'AI for Beginners',
          comment: 'Wish there were more hands-on exercises.',
        },
        // ... More feedback
      ],
      aiRecommendations: [
        {
          id: 1,
          title: 'Update Content',
          detail:
            "The topic 'Reactive Properties' in 'Mastering Vue.js' is outdated. Consider updating it for Vue 4.",
        },
        {
          id: 2,
          title: 'Engage Students',
          detail:
            "The course 'AI for Beginners' has low interaction in the last module. Consider adding quizzes or activities.",
        },
        // ... More AI Recommendations
      ],
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
