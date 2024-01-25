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
      <div class="mb-1 bg-white shadow-lg rounded-xl">
        <div
          class="bg-white p-4 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-xl"
        >
          <template v-for="metric in metrics">
            <div
              :class="{
                'shadow-xl bg-gray-200': metric.title === selectedMetric.title,
                'bg-white': metric.title !== selectedMetric.title,
              }"
              class="p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer transition duration-300 ease-in-out"
              @click="toggleMetric(metric)"
            >
              <div
                :class="
                  'bg-' + metric.color + '-200 p-2 px-3 rounded-full mb-2'
                "
              >
                <i
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

      <!-- Expanded Metric Details -->
      <div
        v-if="selectedMetric.title === 'Total Courses'"
        class="bg-white p-6 rounded-xl shadow-lg mb-6"
      >
        <h2 class="text-xl font-semibold mb-4 text-gray-700">
          Course Insights
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="course in courses"
            :key="course.id"
            class="border p-4 rounded-lg hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer hover:bg-gray-100"
          >
            <!-- Course Thumbnail and Title -->
            <div class="flex items-center mb-3">
              <img
                :src="course.thumbnail"
                alt="Course Thumbnail"
                class="w-10 h-10 mr-3 rounded-full shadow-sm"
              />
              <h3 class="text-lg font-semibold text-blue-600">
                {{ course.title }}
              </h3>
            </div>
            <!-- Course Metrics in Two Columns -->
            <div class="grid grid-cols-2 gap-2 text-sm mt-4">
              <p>
                <i class="fas fa-users text-blue-500 mr-2"></i
                ><strong>Students:</strong> {{ course.enrolled }}
              </p>
              <p>
                <i class="fas fa-video text-red-500 mr-2"></i
                ><strong>Videos:</strong> {{ course.videos }}
              </p>
              <p>
                <i class="fas fa-star text-yellow-500 mr-2"></i
                ><strong>Avg. Rating:</strong> {{ course.avgRating }} ★
              </p>
              <p>
                <i class="fas fa-eye text-indigo-500 mr-2"></i
                ><strong>Views:</strong> {{ course.views }}
              </p>
              <p>
                <i class="fas fa-comments text-purple-500 mr-2"></i
                ><strong>Comments:</strong> {{ course.comments }}
              </p>
              <p>
                <i class="fas fa-heart text-pink-500 mr-2"></i
                ><strong>Engagement:</strong> {{ course.engagementRate }}
              </p>
              <p>
                <i class="fas fa-user-plus text-orange-500 mr-2"></i
                ><strong>New Subscribers:</strong> {{ course.newSubscribers }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Expanded Total Students Metric Details -->
      <div
        v-if="selectedMetric.title === 'Total Students'"
        class="bg-white p-6 rounded-xl shadow-lg mb-6"
      >
        <h2 class="text-xl font-semibold mb-4 text-gray-700">
          Student Insights
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="student in students"
            :key="student.id"
            class="border p-4 rounded-lg hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-gray-100"
          >
            <!-- Student Info -->
            <div class="flex items-center mb-3">
              <img
                :src="student.photo"
                alt="Student Photo"
                class="w-10 h-10 mr-3 rounded-full shadow-sm"
              />
              <h3 class="text-lg font-semibold text-blue-600">
                {{ student.name }}
              </h3>
            </div>
            <!-- Scrollable Courses Taken -->
            <div class="max-h-36 overflow-y-auto">
              <div
                v-for="course in student.coursesTaken"
                :key="course.name"
                class="bg-gray-100 p-2 rounded-lg mb-2"
              >
                <div class="flex justify-between items-center">
                  <p class="font-semibold">
                    <i class="fas fa-book-reader text-green-500 mr-2"></i
                    >{{ course.name }}
                  </p>
                  <span class="text-xs">
                    <i class="fas fa-tasks text-blue-500 mr-1"></i>
                    <span v-if="course.progress === 100">Complete</span>
                    <span v-else>Progress: {{ course.progress }}%</span>
                  </span>
                </div>
                <div class="flex justify-between items-center text-xs mt-2">
                  <span>
                    <i class="fas fa-comments text-purple-500 mr-1"></i
                    >{{ course.comments }}
                    Comments
                  </span>
                  <span>
                    <i class="fas fa-thumbs-up text-yellow-500 mr-1"></i>Rating
                    {{ course.rating }} ★
                  </span>
                  <span>
                    <i class="fas fa-user-clock text-pink-500 mr-1"></i
                    >{{ course.engagement }}% Engagement
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expanded Total Videos Metric Details -->
      <div
        v-if="selectedMetric.title === 'Total Videos'"
        class="bg-white p-6 rounded-xl shadow-lg mb-6"
      >
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Video Insights</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="video in videos"
            :key="video.id"
            class="bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <!-- Video Thumbnail -->
            <img
              :src="video.thumbnail"
              alt="Video Thumbnail"
              class="w-full h-36 object-cover"
            />

            <!-- Video Details -->
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">{{ video.title }}</h3>
              <div class="flex justify-between items-start text-sm mb-3">
                <div>
                  <p class="flex items-center">
                    <i class="fas fa-clock text-green-500 mr-2"></i
                    >{{ video.duration }} mins
                  </p>
                  <p class="flex items-center">
                    <i class="fas fa-eye text-indigo-500 mr-2"></i
                    >{{ video.views }} views
                  </p>
                </div>
                <div>
                  <p class="flex items-center">
                    <i class="fas fa-thumbs-up text-blue-500 mr-2"></i
                    >{{ video.likes }}
                  </p>
                  <p class="flex items-center">
                    <i class="fas fa-thumbs-down text-red-500 mr-2"></i
                    >{{ video.dislikes }}
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center text-xs">
                <p class="flex items-center">
                  <i class="fas fa-star text-yellow-500 mr-1"></i>Rating:
                  {{ video.avgRating }} ★
                </p>
                <p class="flex items-center">
                  <i class="fas fa-heartbeat text-pink-500 mr-1"></i>Engagement:
                  {{ video.engagementRate }}%
                </p>
                <p class="flex items-center">
                  <i class="fas fa-comments text-purple-500 mr-1"></i>Comments:
                  {{ video.comments.length }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expanded Average Rating Metric Details -->
      <div
        v-if="selectedMetric.title === 'Average Rating'"
        class="bg-white p-6 rounded-xl shadow-lg mb-6"
      >
        <h2 class="text-2xl font-bold mb-6 text-gray-800">
          Average Rating Insights
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="course in courses"
            :key="course.id"
            class="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <!-- Course Thumbnail -->
            <img
              :src="course.thumbnail"
              alt="Course Thumbnail"
              class="w-full h-40 object-cover"
            />

            <!-- Course Content -->
            <div class="p-4">
              <h3 class="text-lg font-semibold text-blue-700 mb-2">
                {{ course.title }}
              </h3>
              <div class="flex justify-between items-center mb-4">
                <p class="text-sm text-gray-600">
                  <i class="fas fa-user-friends mr-1"></i>
                  {{ course.enrolled }} Reviews
                </p>
                <p class="flex items-center text-yellow-500">
                  <i class="fas fa-star mr-1"></i> {{ course.avgRating }}
                </p>
              </div>

              <!-- Videos List -->
              <ul class="space-y-1">
                <li v-for="video in videos" :key="video.id" class="text-sm">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-700">{{ video.title }}</span>
                    <span class="flex items-center text-yellow-500">
                      <i class="fas fa-star mr-1"></i> {{ video.avgRating }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Expanded Total Views Metric Details -->
      <div
        v-if="selectedMetric.title === 'Total Views'"
        class="bg-white p-6 rounded-xl shadow-lg mb-6"
      >
        <h2 class="text-2xl font-semibold mb-4 text-gray-700">
          Total Views Insights
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
          <div
            v-for="course in courses"
            :key="course.id"
            class="bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-y-scroll"
          >
            <!-- Course Thumbnail -->
            <img
              :src="course.thumbnail"
              alt="Course Thumbnail"
              class="w-full h-40 object-cover"
            />

            <!-- Course Content -->
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">{{ course.title }}</h3>

              <!-- Videos List -->
              <div
                v-for="video in videos"
                :key="video.id"
                class="border-t border-gray-200 pt-2 mt-2"
              >
                <h4 class="text-sm font-semibold">{{ video.title }}</h4>
                <p class="text-xs text-gray-600">
                  Views: {{ video.views }}
                  <i class="fas fa-clock text-gray-500 mx-1"></i>
                  {{ video.avgWatchDuration }} mins
                </p>

                <!-- Viewers List Container -->
                <div class="bg-gray-200 rounded-lg mt-2 h-28 overflow-y-auto">
                  <ul class="space-y-1 p-2">
                    <li
                      v-for="viewer in video.viewers"
                      :key="viewer.id"
                      class="text-xs"
                    >
                      {{ viewer.name }} - {{ viewer.views }} views
                      <i class="fas fa-clock text-gray-500 mx-1"></i>
                      {{ viewer.avgWatchDuration }} mins
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expanded Total Comments Metric Details -->
      <div
        v-if="selectedMetric.title === 'Total Comments'"
        class="bg-white p-6 rounded-xl shadow-lg mb-6"
      >
        <h2 class="text-xl font-semibold mb-4 text-gray-700">
          Comments Insights
        </h2>
        <div class="space-y-4">
          <div
            v-for="course in courses"
            :key="course.id"
            class="border p-4 rounded-lg"
          >
            <!-- Course Name -->
            <h3 class="text-lg font-semibold">{{ course.title }}</h3>

            <div v-for="video in videos" :key="video.id">
              <!-- Video Name -->
              <h4 class="text-md font-semibold mt-6">{{ video.title }}</h4>

              <!-- Comments List -->
              <ul class="space-y-2 mt-2">
                <li
                  v-for="comment in video.comments.slice(0, 5)"
                  :key="comment.id"
                  class="bg-gray-100 p-2 rounded-lg"
                >
                  <div class="flex justify-between items-end">
                    <!-- Comment Content -->
                    <div>
                      <p class="text-sm font-semibold">
                        {{ comment.user }}
                        <span class="text-xs text-gray-500"
                          >({{ comment.date }})</span
                        >
                      </p>
                      <p class="text-sm text-gray-600">{{ comment.content }}</p>
                    </div>
                    <!-- Reply Button -->
                    <button
                      @click="comment.showReply = !comment.showReply"
                      class="text-xs px-2 py-0.5 text-white rounded-md transition-colors duration-200 mr-2 mb-1"
                      :class="{
                        'bg-blue-500 hover:bg-blue-600': !comment.showReply,
                        'bg-red-500 hover:bg-red-600': comment.showReply,
                      }"
                    >
                      {{ comment.showReply ? 'Hide' : 'Reply' }}
                    </button>
                  </div>
                  <!-- Reply Area -->
                  <div v-if="comment.showReply" class="mt-2">
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
            </div>
          </div>
        </div>
      </div>

<!-- Expanded Engagement Rate Metric Details -->
<div v-if="selectedMetric.title === 'Engagement Rate'" class="bg-white p-6 rounded-xl shadow-lg mb-6">
    <h2 class="text-2xl font-bold text-blue-600 mb-6">
      Engagement Rate Insights
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="course in courses" :key="course.id" class="bg-gray-100 rounded-xl shadow hover:shadow-2xl transition duration-300 ease-in-out">
        
        <!-- Course Header -->
        <div class="bg-blue-500 text-white p-4 rounded-t-xl flex justify-between items-center">
          <h3 class="font-semibold">{{ course.title }}</h3>
          <span class="bg-cyan-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
            {{ course.engagementRate }}% Engagement
          </span>
        </div>
        
        <!-- Course Content -->
        <div class="p-4 space-y-4">
          <!-- Top Engaged Videos -->
          <div class="bg-white p-3 rounded-lg shadow">
            <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <i class="fas fa-video mr-2 text-red-500"></i>Top Engaged Videos
            </h4>
            <ul class="text-xs">
              <li v-for="video in videos" :key="video.id" class="hover:text-blue-500 cursor-pointer">
                {{ video.title }} - {{ students.length }} students - {{ video.engagementRate }}%
              </li>
            </ul>
          </div>

          <!-- Most Active Students -->
          <div class="bg-white p-3 rounded-lg shadow">
            <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <i class="fas fa-users mr-2 text-green-500"></i>Most Active Students
            </h4>
            <ul class="text-xs">
              <li v-for="student in students.slice(0, 3)" :key="student.id" class="hover:text-blue-500 cursor-pointer">
                {{ student.name }} - {{ student.engagement }}%
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

<!-- Expanded New Subscribers Metric Details -->
<div v-if="selectedMetric.title === 'New Subscribers'" class="bg-white p-6 rounded-xl shadow-lg mb-6">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">
      New Subscribers Insights
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="subscriber in newSubscribers" :key="subscriber.id" class="border p-4 rounded-lg hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-gray-100">
        <!-- Subscriber Info with Joined Date -->
        <div class="flex justify-between items-center mb-3">
          <div class="flex items-center">
            <img :src="subscriber.photo" alt="Subscriber Photo" class="w-10 h-10 mr-3 rounded-full shadow-sm">
            <h3 class="text-lg font-semibold text-blue-600">{{ subscriber.name }}</h3>
          </div>
          <span class="text-sm text-gray-600">
            <i class="fas fa-calendar-alt text-orange-500 mr-2"></i>Date: {{ subscriber.joinDate }}
          </span>
        </div>
        <!-- Subscribed Courses -->
        <div class="mb-3">
          <p class="text-sm">
            <i class="fas fa-book-open text-red-500 mr-2"></i>Subscribed to: <span v-for="(course, index) in subscriber.subscribedTo" :key="index" class="text-blue-600">{{ course }}<span v-if="index < subscriber.subscribedTo.length - 1">, </span></span>
          </p>
        </div>
        <!-- Other Metrics -->
        <div class="grid grid-cols-2 gap-2 text-sm">
          <p>
            <i class="fas fa-eye text-indigo-500 mr-2"></i>Total Views: {{ subscriber.totalViews }}
          </p>
          <p>
            <i class="fas fa-comments text-purple-500 mr-2"></i>Comments Made: {{ subscriber.commentsMade }}
          </p>
          <p>
            <i class="fas fa-thumbs-up text-green-500 mr-2"></i>Liked Videos: {{ subscriber.likedVideos }}
          </p>
        </div>
      </div>
    </div>
  </div>


      <!-- Courses Overview -->
      <div class="bg-white p-6 rounded-xl shadow-lg mt-6 mb-10">
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

        <div
          v-if="courses?.length"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
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
              View Course
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
          <p class="text-gray-500 text-center p-2 pt-4">No feedback yet.</p>
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
    if (this.user.id?.includes('active-instructor')) {
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
      mockVideoRating: 4.5,
      selectedMetric: 'Total Courses',
      newSubscribers: [
        {
          id: 1,
          name: 'John Doe',
          photo: 'https://via.placeholder.com/40',
          joinDate: '2021-07-21',
          totalViews: 100,
          commentsMade: 10,
          likedVideos: 5,
          subscribedTo: ['Vue.js Fundamentals', 'Advanced CSS Techniques'],
        },
        {
          id: 2,
          name: 'Emma Smith',
          photo: 'https://via.placeholder.com/40',
          joinDate: '2021-07-21',
          totalViews: 80,
          commentsMade: 8,
          likedVideos: 4,
          subscribedTo: ['Advanced CSS Techniques'],
        },
        {
          id: 3,
          name: 'Michael Johnson',
          photo: 'https://via.placeholder.com/40',
          joinDate: '2021-07-21',
          totalViews: 70,
          commentsMade: 7,
          likedVideos: 3,
          subscribedTo: ['Vue.js Fundamentals'],
        },
        {
          id: 4,
          name: 'Sophia Williams',
          photo: 'https://via.placeholder.com/40',
          joinDate: '2021-07-21',
          totalViews: 50,
          commentsMade: 5,
          likedVideos: 2,
          subscribedTo: ['Vue.js Fundamentals', 'Advanced CSS Techniques'],
        },
        {
          id: 5,
          name: 'James Brown',
          photo: 'https://via.placeholder.com/40',
          joinDate: '2021-07-21',
          totalViews: 40,
          commentsMade: 4,
          likedVideos: 2,
          subscribedTo: ['Advanced CSS Techniques'],
        },
        {
          id: 6,
          name: 'William Jones',
          photo: 'https://via.placeholder.com/40',
          joinDate: '2021-07-21',
          totalViews: 30,
          commentsMade: 3,
          likedVideos: 1,
          subscribedTo: ['Vue.js Fundamentals'],
        },
        {
          id: 7,
          name: 'Olivia Miller',
          photo: 'https://via.placeholder.com/40',
          joinDate: '2021-07-21',
          totalViews: 20,
          commentsMade: 2,
          likedVideos: 1,
          subscribedTo: ['Vue.js Fundamentals', 'Advanced CSS Techniques'],
        },
        {
          id: 8,
          name: 'Liam Davis',
          photo: 'https://via.placeholder.com/40',
          joinDate: '2021-07-21',
          totalViews: 10,
          commentsMade: 1,
          likedVideos: 1,
          subscribedTo: ['Advanced CSS Techniques'],
        },
      ],
      videos: [
        {
          id: 1,
          title: 'Vue.js Fundamentals',
          thumbnail: 'https://via.placeholder.com/40',
          views: 1200,
          avgRating: 4.8,
          reviews: 35,
          comments: 30,
          engagementRate: 75,
          duration: 15,
          likes: 200,
          dislikes: 5,
          avgWatchDuration: 10,
          viewers: [
            { id: 1, name: 'John Doe', views: 100, avgWatchDuration: 10 },
            { id: 2, name: 'Emma Smith', views: 80, avgWatchDuration: 12 },
            { id: 3, name: 'Michael Johnson', views: 70, avgWatchDuration: 8 },
            { id: 4, name: 'Sophia Williams', views: 50, avgWatchDuration: 9 },
            { id: 5, name: 'James Brown', views: 40, avgWatchDuration: 11 },
            { id: 6, name: 'William Jones', views: 30, avgWatchDuration: 10 },
            { id: 7, name: 'Olivia Miller', views: 20, avgWatchDuration: 12 },
            { id: 8, name: 'Liam Davis', views: 10, avgWatchDuration: 8 },
            { id: 9, name: 'Emma Wilson', views: 5, avgWatchDuration: 9 },
            { id: 10, name: 'Noah Taylor', views: 1, avgWatchDuration: 11 },
          ],
          comments: [
            { id: 2, user: 'Bob', content: 'Great intro!', date: '2023-07-21' },
            {
              id: 3,
              user: 'Charlie',
              content: 'Great intro!',
              date: '2023-07-21',
            },
            {
              id: 4,
              user: 'David',
              content: 'Great intro!',
              date: '2023-07-21',
            },
          ],
        },
        {
          id: 2,
          title: 'Advanced CSS Techniques',
          thumbnail: 'https://via.placeholder.com/40',
          views: 950,
          avgRating: 4.6,
          reviews: 25,
          comments: 25,
          engagementRate: 70,
          duration: 20,
          likes: 180,
          dislikes: 10,
          avgWatchDuration: 12,
          viewers: [
            { id: 1, name: 'John Doe', views: 100, avgWatchDuration: 10 },
            { id: 2, name: 'Emma Smith', views: 80, avgWatchDuration: 12 },
            { id: 3, name: 'Michael Johnson', views: 70, avgWatchDuration: 8 },
            { id: 4, name: 'Sophia Williams', views: 50, avgWatchDuration: 9 },
            { id: 5, name: 'James Brown', views: 40, avgWatchDuration: 11 },
            { id: 6, name: 'William Jones', views: 30, avgWatchDuration: 10 },
            { id: 7, name: 'Olivia Miller', views: 20, avgWatchDuration: 12 },
            { id: 8, name: 'Liam Davis', views: 10, avgWatchDuration: 8 },
            { id: 9, name: 'Emma Wilson', views: 5, avgWatchDuration: 9 },
            { id: 10, name: 'Noah Taylor', views: 1, avgWatchDuration: 11 },
          ],
          comments: [
            { id: 2, user: 'Bob', content: 'Great intro!', date: '2023-07-21' },
            {
              id: 3,
              user: 'Charlie',
              content: 'Great intro!',
              date: '2023-07-21',
            },
            {
              id: 4,
              user: 'David',
              content: 'Great intro!',
              date: '2023-07-21',
            },
          ],
        },
        {
          id: 3,
          title: 'JavaScript Best Practices',
          thumbnail: 'https://via.placeholder.com/40',
          views: 800,
          avgRating: 4.7,
          reviews: 15,
          comments: 20,
          engagementRate: 80,
          duration: 18,
          likes: 220,
          dislikes: 8,
          avgWatchDuration: 10,
          viewers: [
            { id: 1, name: 'John Doe', views: 100, avgWatchDuration: 10 },
            { id: 2, name: 'Emma Smith', views: 80, avgWatchDuration: 12 },
            { id: 3, name: 'Michael Johnson', views: 70, avgWatchDuration: 8 },
            { id: 4, name: 'Sophia Williams', views: 50, avgWatchDuration: 9 },
            { id: 5, name: 'James Brown', views: 40, avgWatchDuration: 11 },
            { id: 6, name: 'William Jones', views: 30, avgWatchDuration: 10 },
            { id: 7, name: 'Olivia Miller', views: 20, avgWatchDuration: 12 },
            { id: 8, name: 'Liam Davis', views: 10, avgWatchDuration: 8 },
            { id: 9, name: 'Emma Wilson', views: 5, avgWatchDuration: 9 },
            { id: 10, name: 'Noah Taylor', views: 1, avgWatchDuration: 11 },
          ],
          comments: [
            { id: 2, user: 'Bob', content: 'Great intro!', date: '2023-07-21' },
            {
              id: 3,
              user: 'Charlie',
              content: 'Great intro!',
              date: '2023-07-21',
            },
            {
              id: 4,
              user: 'David',
              content: 'Great intro!',
              date: '2023-07-21',
            },
          ],
        },
        {
          id: 4,
          title: 'Understanding React Hooks',
          thumbnail: 'https://via.placeholder.com/40',
          views: 1100,
          avgRating: 4.9,
          reviews: 42,
          comments: 35,
          engagementRate: 85,
          duration: 12,
          likes: 250,
          dislikes: 4,
          avgWatchDuration: 11,
          viewers: [
            { id: 1, name: 'John Doe', views: 100, avgWatchDuration: 10 },
            { id: 2, name: 'Emma Smith', views: 80, avgWatchDuration: 12 },
            { id: 3, name: 'Michael Johnson', views: 70, avgWatchDuration: 8 },
            { id: 4, name: 'Sophia Williams', views: 50, avgWatchDuration: 9 },
            { id: 5, name: 'James Brown', views: 40, avgWatchDuration: 11 },
            { id: 6, name: 'William Jones', views: 30, avgWatchDuration: 10 },
            { id: 7, name: 'Olivia Miller', views: 20, avgWatchDuration: 12 },
            { id: 8, name: 'Liam Davis', views: 10, avgWatchDuration: 8 },
            { id: 9, name: 'Emma Wilson', views: 5, avgWatchDuration: 9 },
            { id: 10, name: 'Noah Taylor', views: 1, avgWatchDuration: 11 },
          ],
          comments: [
            { id: 2, user: 'Bob', content: 'Great intro!', date: '2023-07-21' },
            {
              id: 3,
              user: 'Charlie',
              content: 'Great intro!',
              date: '2023-07-21',
            },
            {
              id: 4,
              user: 'David',
              content: 'Great intro!',
              date: '2023-07-21',
            },
          ],
        },
        {
          id: 5,
          title: 'Python for Data Science',
          thumbnail: 'https://via.placeholder.com/40',
          views: 1300,
          avgRating: 4.8,
          reviews: 50,
          comments: 40,
          engagementRate: 90,
          duration: 22,
          likes: 300,
          dislikes: 3,
          avgWatchDuration: 12,
          viewers: [
            { id: 1, name: 'John Doe', views: 100, avgWatchDuration: 10 },
            { id: 2, name: 'Emma Smith', views: 80, avgWatchDuration: 12 },
            { id: 3, name: 'Michael Johnson', views: 70, avgWatchDuration: 8 },
            { id: 4, name: 'Sophia Williams', views: 50, avgWatchDuration: 9 },
            { id: 5, name: 'James Brown', views: 40, avgWatchDuration: 11 },
            { id: 6, name: 'William Jones', views: 30, avgWatchDuration: 10 },
            { id: 7, name: 'Olivia Miller', views: 20, avgWatchDuration: 12 },
            { id: 8, name: 'Liam Davis', views: 10, avgWatchDuration: 8 },
            { id: 9, name: 'Emma Wilson', views: 5, avgWatchDuration: 9 },
            { id: 10, name: 'Noah Taylor', views: 1, avgWatchDuration: 11 },
          ],
          comments: [
            { id: 2, user: 'Bob', content: 'Great intro!', date: '2023-07-21' },
            {
              id: 3,
              user: 'Charlie',
              content: 'Great intro!',
              date: '2023-07-21',
            },
            {
              id: 4,
              user: 'David',
              content: 'Great intro!',
              date: '2023-07-21',
            },
          ],
        },
        {
          id: 6,
          title: 'Machine Learning Essentials',
          thumbnail: 'https://via.placeholder.com/40',
          views: 700,
          avgRating: 4.5,
          reviews: 18,
          comments: 18,
          engagementRate: 65,
          duration: 25,
          likes: 160,
          dislikes: 12,
          avgWatchDuration: 10,
          viewers: [
            { id: 1, name: 'John Doe', views: 100, avgWatchDuration: 10 },
            { id: 2, name: 'Emma Smith', views: 80, avgWatchDuration: 12 },
            { id: 3, name: 'Michael Johnson', views: 70, avgWatchDuration: 8 },
            { id: 4, name: 'Sophia Williams', views: 50, avgWatchDuration: 9 },
            { id: 5, name: 'James Brown', views: 40, avgWatchDuration: 11 },
            { id: 6, name: 'William Jones', views: 30, avgWatchDuration: 10 },
            { id: 7, name: 'Olivia Miller', views: 20, avgWatchDuration: 12 },
            { id: 8, name: 'Liam Davis', views: 10, avgWatchDuration: 8 },
            { id: 9, name: 'Emma Wilson', views: 5, avgWatchDuration: 9 },
            { id: 10, name: 'Noah Taylor', views: 1, avgWatchDuration: 11 },
          ],
          comments: [
            { id: 2, user: 'Bob', content: 'Great intro!', date: '2023-07-21' },
            {
              id: 3,
              user: 'Charlie',
              content: 'Great intro!',
              date: '2023-07-21',
            },
            {
              id: 4,
              user: 'David',
              content: 'Great intro!',
              date: '2023-07-21',
            },
          ],
        },
      ],

      students: [
        {
          id: 1,
          name: 'John Doe',
          photo: 'https://via.placeholder.com/40',
          coursesTaken: [
            {
              name: 'Mastering Vue.js',
              progress: 75,
              comments: 10,
              rating: 4.5,
              engagement: 80,
            },
            {
              name: 'AI for Beginners',
              progress: 100,
              comments: 15,
              rating: 4.8,
              engagement: 85,
            },
            {
              name: 'AI for Beginners',
              progress: 100,
              comments: 15,
              rating: 4.8,
              engagement: 85,
            },
          ],
        },
        {
          id: 2,
          name: 'Emma Smith',
          photo: 'https://via.placeholder.com/40',
          coursesTaken: [
            {
              name: 'Introduction to JavaScript',
              progress: 50,
              comments: 5,
              rating: 4.2,
              engagement: 70,
            },
            {
              name: 'Advanced CSS Techniques',
              progress: 90,
              comments: 12,
              rating: 4.7,
              engagement: 90,
            },
          ],
        },
        {
          id: 3,
          name: 'Michael Johnson',
          photo: 'https://via.placeholder.com/40',
          coursesTaken: [
            {
              name: 'Python for Data Science',
              progress: 65,
              comments: 8,
              rating: 4.3,
              engagement: 75,
            },
            {
              name: 'Deep Learning Fundamentals',
              progress: 80,
              comments: 10,
              rating: 4.6,
              engagement: 82,
            },
          ],
        },
        {
          id: 4,
          name: 'Sophia Williams',
          photo: 'https://via.placeholder.com/40',
          coursesTaken: [
            {
              name: 'Blockchain Basics',
              progress: 100,
              comments: 20,
              rating: 5.0,
              engagement: 95,
            },
            {
              name: 'React Native Development',
              progress: 85,
              comments: 14,
              rating: 4.9,
              engagement: 88,
            },
          ],
        },
        {
          id: 5,
          name: 'James Brown',
          photo: 'https://via.placeholder.com/40',
          coursesTaken: [
            {
              name: 'Web Development Bootcamp',
              progress: 40,
              comments: 3,
              rating: 3.8,
              engagement: 60,
            },
            {
              name: 'UI/UX Design Principles',
              progress: 70,
              comments: 9,
              rating: 4.1,
              engagement: 76,
            },
          ],
        },
      ],

      metrics: [
        { title: 'Total Courses', value: 0, icon: 'fa-book', color: 'green' },
        {
          title: 'Total Students',
          value: 0,
          icon: 'fa-users',
          color: 'blue',
        },
        { title: 'Total Videos', value: 0, icon: 'fa-video', color: 'red' },
        {
          title: 'Average Rating',
          value: '0.0 ★',
          icon: 'fa-star',
          color: 'yellow',
        },
        {
          title: 'Total Views',
          value: '0',
          icon: 'fa-eye',
          color: 'indigo',
        },
        {
          title: 'Total Comments',
          value: 0,
          icon: 'fa-comments',
          color: 'purple',
        },
        {
          title: 'Engagement Rate',
          value: '0%',
          icon: 'fa-heart',
          color: 'pink',
        },
        {
          title: 'New Subscribers',
          value: '0',
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

      this.metrics = [
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
      ];
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
    toggleMetric(metric) {
      if (this.selectedMetric.title === metric.title) {
        this.selectedMetric = {};
      } else {
        this.selectedMetric = metric;
      }
    },
    mockVideoCount(videoCount) {
      return Array.from({ length: videoCount }, (_, i) => i + 1);
    },
  },
  watch: {
    'user.id'(newId) {
      if (newId?.includes('active-instructor')) {
        this.setup();
      } else {
        this.courses = [];
        this.recentFeedback = [];
        this.aiRecommendations = [];
        this.metrics = [
          { title: 'Total Courses', value: 0, icon: 'fa-book', color: 'green' },
          {
            title: 'Total Students',
            value: 0,
            icon: 'fa-users',
            color: 'blue',
          },
          { title: 'Total Videos', value: 0, icon: 'fa-video', color: 'red' },
          {
            title: 'Average Rating',
            value: '0.0 ★',
            icon: 'fa-star',
            color: 'yellow',
          },
          {
            title: 'Total Views',
            value: '0',
            icon: 'fa-eye',
            color: 'indigo',
          },
          {
            title: 'Total Comments',
            value: 0,
            icon: 'fa-comments',
            color: 'purple',
          },
          {
            title: 'Engagement Rate',
            value: '0%',
            icon: 'fa-heart',
            color: 'pink',
          },
          {
            title: 'New Subscribers',
            value: '0',
            icon: 'fa-user-plus',
            color: 'orange',
          },
        ];
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
