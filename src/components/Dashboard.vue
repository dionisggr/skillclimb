<template>
  <div class="min-h-screen bg-gray-50 pb-8">
    <!-- Dashboard Header -->
    <div class="text-center py-12 bg-blue-500 text-white">
      <h1 class="text-4xl font-extrabold">Creator Dashboard</h1>
      <p class="text-blue-200">Harness the power of AI for your courses</p>
    </div>

    <!-- Dashboard Content -->
    <div class="container mx-auto max-w-screen-xl mt-8">
      <!-- Insights Section -->
      <div class="mb-8 bg-white shadow-lg rounded-xl">
        <div
          class="bg-white p-4 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-xl"
        >
          <template v-for="metric in metrics">
            <div
              class="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center"
            >
              <div
                :class="
                  'bg-' + metric.color + '-200 p-2 px-3 rounded-full mb-2'
                "
              >
                <i
                  class="text-lg"
                  :class="
                    'fas ' + metric.icon + ' text-' + metric.color + '-600'
                  "
                ></i>
              </div>
              <h2 class="font-semibold">{{ metric.title }}</h2>
              <p class="text-sm">{{ metric.value }}</p>
            </div>
          </template>
        </div>
      </div>

      <!-- Courses Overview -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-10">
        <div
          class="flex flex-col md:flex-row justify-between items-center mb-6"
        >
          <h2
            class="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 md:mb-0"
          >
            Your Courses
          </h2>
          <button
            class="bg-blue-500 text-white rounded-lg px-4 sm:px-5 py-2 shadow-md hover:bg-blue-700 transition-colors"
            @click="$emit('create-new-course')"
          >
            Create New Course
          </button>
        </div>

        <div v-if="courses?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="course in courses"
            :key="course.id"
            class="border p-6 rounded-lg"
          >
            <div class="flex items-center space-x-4 mb-4">
              <img
                :src="course.thumbnail"
                alt="Course Thumbnail"
                class="w-12 rounded-md"
              />
              <h3 class="text-xl font-semibold">{{ course.title }}</h3>
            </div>
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
              class="bg-blue-500 text-white rounded-lg px-4 py-1 shadow-md hover:bg-blue-700 transition-colors"
            >
              Add Lesson
            </button>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-500 text-center p-2 pt-4">
            You don't have any courses.
          </p>
        </div>
      </div>

      <!-- Feedback Section -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-10">
        <h2 class="text-2xl font-semibold text-gray-700 mb-6">
          Recent Feedback
        </h2>
        <ul v-if="recentFeedback?.length">
          <li
            v-for="feedback in recentFeedback"
            :key="feedback.id"
            class="border-b pb-4 mb-4"
          >
            <p class="text-gray-700 mb-2">{{ feedback.comment }}</p>
            <span class="text-sm text-blue-500">{{ feedback.course }}</span>
            <button
              @click="feedback.showReply = !feedback.showReply"
              class="ml-4 text-xs px-2 py-0.5 text-white rounded-md transition-colors duration-200"
              :class="{
                'bg-blue-500 hover:bg-blue-600': !feedback.showReply,
                'bg-red-500 hover:bg-red-600': feedback.showReply,
              }"
            >
              {{ feedback.showReply ? 'Hide' : 'Reply' }}
            </button>
            <div v-if="feedback.showReply" class="mt-2">
              <textarea
                class="border p-2 text-sm w-full h-20"
                placeholder="Write your reply..."
              ></textarea>
              <button
                class="text-white bg-blue-500 hover:bg-blue-700 rounded px-4 py-1 mt-2"
              >
                Send
              </button>
              <button
                class="text-white bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 mt-2 ml-2"
              >
                <i class="fas fa-smile"></i>
              </button>
            </div>
          </li>
        </ul>
        <div v-else>
          <p class="text-gray-500 text-center p-2 pt-4">
            No feedback yet.
          </p>
        </div>
        <!-- Show More Button -->
        <button
          v-if="recentFeedback.length"
          @click="loadMoreFeedback"
          class="mx-auto block mt-8 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-500 transition duration-300"
        >
          Show More
        </button>
      </div>

      <!-- Recommendations Section -->
      <div
        class="bg-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:shadow-2xl"
      >
        <h2 class="text-2xl font-semibold text-gray-700 mb-6">
          AI Recommendations for Your Courses
        </h2>
        <ul v-if="aiRecommendations?.length">
          <li
            v-for="recommendation in aiRecommendations"
            :key="recommendation.id"
            :class="{
              'border-blue-300 bg-blue-50 bg-opacity-60':
                selectedRecommendation?.id === recommendation.id,
            }"
            class="mb-4 p-4 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 hover:bg-opacity-60 transform transition duration-300 cursor-pointer"
            @click="toggleRecommendation(recommendation)"
          >
            <p class="font-semibold text-lg text-blue-600 mb-2">
              {{ recommendation.title }}
            </p>
            <p class="text-gray-600">
              {{ recommendation.detail }}
            </p>
          </li>
        </ul>
        <div v-else>
          <p class="text-gray-500 text-center p-2 pt-4">
            No recommendations yet.
          </p>
        </div>

        <!-- Additional Information Section -->
        <transition name="slide-fade">
          <div v-if="selectedRecommendation" class="bg-white p-6 rounded-xl">
            <h3 class="text-2xl font-semibold text-gray-700 mb-4">
              {{ selectedRecommendation?.title }}
            </h3>
            <p class="text-gray-600">
              <!-- Here you can add more detailed information based on the selected recommendation -->
              {{ selectedRecommendation?.supplementalInfo }}
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    if (this.user?.id?.includes('active-instructor')) {
      this.setup();
    }
  },
  data() {
    return {
      totalStudents: 0,
      totalCourses: 0,
      avgRating: 0,
      totalVideos: 0,
      totalViews: 0,
      totalComments: 0,
      courses: [],
      recentFeedback: [],
      aiRecommendations: [],
      selectedRecommendation: null,
      metricsPerCourseVisible: false,
      metrics: [
        { title: 'Total Courses', value: 12, icon: 'fa-book', color: 'green' },
        {
          title: 'Total Students',
          value: 4523,
          icon: 'fa-users',
          color: 'blue',
        },
        { title: 'Total Videos', value: 123, icon: 'fa-video', color: 'red' },
        {
          title: 'Average Rating',
          value: '4.5 ★',
          icon: 'fa-star',
          color: 'yellow',
        },
        {
          title: 'Total Views',
          value: '456k',
          icon: 'fa-eye',
          color: 'indigo',
        },
        {
          title: 'Total Comments',
          value: 789,
          icon: 'fa-comments',
          color: 'purple',
        },
        {
          title: 'Engagement Rate',
          value: '76%',
          icon: 'fa-heart',
          color: 'pink',
        },
        {
          title: 'New Subscribers',
          value: '250+',
          icon: 'fa-user-plus',
          color: 'orange',
        },
      ],
    };
  },
  methods: {
    setup() {
      this.courses = [
        {
          id: 1,
          title: 'Mastering Vue.js',
          description: 'Deep dive into Vue.js and its ecosystem.',
          enrolled: 1500,
          duration: 5,
          videos: 35,
          avgRating: 4.8,
          views: 12000,
          comments: 150,
          engagementRate: '78%',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
        },
        {
          id: 2,
          title: 'AI for Beginners',
          description:
            'Introduction to AI, machine learning, and neural networks.',
          enrolled: 2300,
          duration: 8,
          videos: 50,
          avgRating: 4.6,
          views: 18000,
          comments: 220,
          engagementRate: '82%',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
        },
        // Add more courses as needed
      ];

      this.recentFeedback = [
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
      ];

      this.aiRecommendations = [
        {
          id: 1,
          title: 'Update Content',
          detail:
            "The topic 'Reactive Properties' in 'Mastering Vue.js' is outdated. Consider updating it for Vue 4.",
          supplementalInfo:
            'The Vue team has announced that Vue 4 will be released in 2022. It will have a new API for reactive properties. You can read more about it here: https://vuejs.org/v3/api/reactivity.html#reactive',
        },
        {
          id: 2,
          title: 'Engage Students',
          detail:
            "The course 'AI for Beginners' has low interaction in the last module. Consider adding quizzes or activities.",
          supplementalInfo:
            'Students are more likely to complete a course if it has quizzes or activities. You can read more about it here: https://support.udemy.com/hc/en-us/articles/229605008-How-to-Add-Quizzes-and-Practice-Activities',
        },
      ];

      this.totalStudents = 4523;
      this.totalCourses = 12;
      this.avgRating = 4.5;
      this.totalVideos = 123;
      this.totalViews = '456k';
      this.totalComments = 789;
    },
    toggleMetricsPerCourse() {
      this.metricsPerCourseVisible = !this.metricsPerCourseVisible;
    },
    toggleRecommendation(recommendation) {
      if (this.selectedRecommendation?.id === recommendation.id) {
        this.selectedRecommendation = null;
      } else {
        this.selectedRecommendation = recommendation;
      }
    },
  },
  watch: {
    'user.id'(newId) {
      if (newId?.includes('active-instructor')) {
        this.setup();
      } else {
        this.totalStudents = 0;
        this.totalCourses = 0;
        this.avgRating = 0;
        this.totalVideos = 0;
        this.totalViews = 0;
        this.totalComments = 0;
        this.courses = [];
        this.recentFeedback = [];
        this.aiRecommendations = [];
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
