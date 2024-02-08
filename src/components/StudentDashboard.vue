<template>
  <div class="min-h-screen bg-gray-50 pb-8">
    <!-- Dashboard Header -->
    <div class="text-center py-12 bg-green-500 text-white">
      <h1 class="text-4xl font-extrabold">Student Dashboard</h1>
      <p class="text-green-200">Explore and Enhance Your Learning Journey</p>
    </div>

    <!-- Dashboard Content -->
    <div class="container mx-auto max-w-screen-xl mt-8">
      <!-- Enrolled Courses Section -->
      <div class="bg-white p-6 py-4 rounded-xl shadow-lg mt-6 mb-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center mb-"
        >
          <h2 class="text-3xl font-semibold text-gray-700">Enrolled Courses</h2>
          <button
            class="bg-green-500 hover:bg-green-700 text-white rounded-lg px-4 sm:px-5 py-2 m-2 shadow-md transition-colors"
            @click="exploreCourses"
          >
            Explore Courses
          </button>
        </div>

        <!-- Hint for Clicking Courses -->
        <p class="text-sm text-gray-600 mb-4 text-center">
          Click on a course to view more information
        </p>

        <div
          v-if="enrolledCourses.length"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="course in enrolledCourses"
            :key="course.id"
            class="border p-4 rounded-lg flex flex-col justify-between cursor-pointer hover:shadow-md"
          >
            <div>
              <div class="flex items-center space-x-3 mb-3">
                <img
                  :src="course.thumbnail"
                  alt="Course Thumbnail"
                  class="w-10 h-10 rounded-md object-cover"
                />
                <div class="w-full">
                  <h3 class="text-lg font-semibold truncate">
                    {{ course.title }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    Prof. {{ course.professor }}
                  </p>
                </div>
              </div>
              <p class="text-xs text-gray-500 mb-1 truncate">
                {{ course.description }}
              </p>
            </div>
            <div>
              <div v-if="course.progress < 100">
                <div class="w-full bg-gray-200 rounded-full h-2 my-3">
                  <div
                    class="bg-green-600 h-2 rounded-full"
                    :style="'width: ' + course.progress + '%'"
                  ></div>
                </div>
                <div
                  class="flex justify-between items-center text-xs text-gray-500"
                >
                  <span>{{ course.progress }}% Complete</span>
                  <span
                    >{{ course.lessonsCompleted }}/{{
                      course.totalLessons
                    }}
                    Lessons</span
                  >
                </div>
              </div>
              <div
                v-else
                class="text-green-600 font-semibold text-center border-t pt-2 mt-3 border-gray-200"
              >
                Completed
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500 text-center p-2 pt-4">
          <p>You are not enrolled in any courses.</p>
        </div>
      </div>

      <!-- Course Details and Progress -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-6" v-if="selectedCourse">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">
          {{ selectedCourse.title }} - Progress Overview
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="border p-4 rounded-lg">
            <div class="flex items-center mb-3">
              <img
                :src="selectedCourse.thumbnail"
                alt="Course Thumbnail"
                class="w-10 h-10 mr-3 rounded-full shadow-sm"
              />
              <h3 class="text-lg font-semibold text-green-600">
                {{ selectedCourse.title }}
              </h3>
            </div>
            <p class="text-sm">
              Enrolled On: {{ selectedCourse.enrollmentDate }}
            </p>
            <p class="text-sm">Progress: {{ selectedCourse.progress }}%</p>
            <div class="mt-4">
              <div
                class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
              >
                <div
                  class="bg-green-600 h-2.5 rounded-full"
                  :style="'width: ' + selectedCourse.progress + '%'"
                ></div>
              </div>
            </div>
          </div>
          <div class="border p-4 rounded-lg">
            <h4 class="text-md font-semibold text-green-600 mb-3">
              Upcoming Lessons
            </h4>
            <ul class="space-y-2">
              <li
                v-for="lesson in selectedCourse.upcomingLessons"
                :key="lesson.id"
                class="bg-gray-100 p-2 rounded-lg"
              >
                <p class="font-semibold">{{ lesson.title }}</p>
                <p class="text-xs">Available On: {{ lesson.availableOn }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Learning Recommendations Section -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">
          Learning Recommendations
        </h2>
        <div v-if="!learningRecommendations.length" class="text-center">
          <p>No recommendations available.</p>
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <template v-for="(recommendation, index) in learningRecommendations">
            <div
              class="border border-gray-200 p-3 rounded-lg hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-gray-50 cursor-pointer"
            >
              <h3 class="text-md font-semibold text-green-600 truncate">
                {{ recommendation.title }}
              </h3>
              <p class="text-xs text-gray-600 mt-2">
                {{ recommendation.description }}
              </p>
            </div>
          </template>
        </div>
      </div>

      <!-- Feedback and Support Section -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-10">
        <h2 class="text-2xl font-semibold text-gray-700 mb-6">Your Feedback</h2>
        <div v-if="!yourFeedback.length" class="text-center">
          <p>No feedback submitted yet.</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <template v-for="(feedback, index) in yourFeedback" :key="index">
            <div
              class="relative border border-gray-200 p-3 rounded-lg hover:shadow-md transition duration-300 ease-in-out hover:bg-gray-50"
            >
              <div class="flex justify-between items-center mb-2">
                <div>
                  <h3 class="text-md font-semibold text-gray-900">
                    {{ feedback.course }}
                  </h3>
                  <p class="text-xs text-gray-500">{{ feedback.instructor }}</p>
                </div>
                <p class="text-xs text-gray-500">
                  {{ new Date(feedback.date).toLocaleDateString() }}
                </p>
              </div>
              <p class="text-sm text-gray-600">{{ feedback.comment }}</p>
              <div class="absolute bottom-2 right-2">
                <span
                  v-if="feedback.rating === 'like'"
                  class="mdi mdi-thumb-up text-green-600 text-lg"
                ></span>
                <span
                  v-else
                  class="mdi mdi-thumb-down text-red-600 text-lg"
                ></span>
              </div>
            </div>
          </template>
        </div>
        <div class="text-center">
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-4 py-2 shadow transition-colors mt-12 my-4"
          >
            Provide More Feedback
          </button>
        </div>
      </div>

      <!-- Feedback Modal -->
      <div v-if="showFeedbackModal" class="modal">
        <!-- Modal content with close button, form fields for feedback, and a submit button -->
        <!-- Implement modal with Vue transitions for a smooth appearance and disappearance -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentDashboard',
  data() {
    return {
      // Array of enrolled courses with details
      enrolledCourses: [
        {
          id: 1,
          title: 'Introduction to AI',
          thumbnail: 'https://source.unsplash.com/random/50x50',
          progress: 75,
          enrollmentDate: '2021-09-15',
          upcomingLessons: [
            { id: 1, title: 'Neural Networks', availableOn: '2024-02-10' },
            { id: 2, title: 'Deep Learning', availableOn: '2024-02-17' },
          ],
          professor: 'Jane Doe',
          rating: 4.5,
          reviews: 120,
          totalLessons: 20,
          lessonsCompleted: 15,
        },
        {
          id: 2,
          title: 'Data Science Fundamentals',
          thumbnail: 'https://source.unsplash.com/random/50x51',
          progress: 40,
          enrollmentDate: '2022-01-10',
          upcomingLessons: [
            { id: 1, title: 'Data Preprocessing', availableOn: '2024-02-12' },
            {
              id: 2,
              title: 'Exploratory Data Analysis',
              availableOn: '2024-02-19',
            },
          ],
          professor: 'John Smith',
          rating: 4.2,
          reviews: 95,
          totalLessons: 25,
          lessonsCompleted: 10,
        },
        {
          id: 3,
          title: 'Web Development Bootcamp',
          thumbnail: 'https://source.unsplash.com/random/51x50',
          progress: 60,
          enrollmentDate: '2022-05-05',
          upcomingLessons: [
            { id: 1, title: 'HTML & CSS', availableOn: '2024-02-14' },
            { id: 2, title: 'JavaScript Basics', availableOn: '2024-02-21' },
          ],
          professor: 'Emily Johnson',
          rating: 4.8,
          reviews: 150,
          totalLessons: 30,
          lessonsCompleted: 18,
        },
        {
          id: 4,
          title: 'Advanced React Techniques',
          thumbnail: 'https://source.unsplash.com/random/51x51',
          progress: 85,
          enrollmentDate: '2022-08-20',
          upcomingLessons: [
            { id: 1, title: 'Context API', availableOn: '2024-02-16' },
            { id: 2, title: 'React Hooks', availableOn: '2024-02-23' },
          ],
          professor: 'Michael Brown',
          rating: 4.7,
          reviews: 110,
          totalLessons: 15,
          lessonsCompleted: 13,
        },
        {
          id: 5,
          title: 'Machine Learning in Practice',
          thumbnail: 'path/to/fifth/thumbnail.jpg',
          progress: 100, // Indicates the course is completed
          enrollmentDate: '2021-11-15',
          upcomingLessons: [], // No upcoming lessons since the course is completed
          professor: 'Alex Green',
          rating: 4.9,
          reviews: 180,
          totalLessons: 30,
          lessonsCompleted: 30, // Equal to totalLessons, indicating completion
        },
      ],

      selectedCourse: null, // Holds the currently selected course for details view
      learningRecommendations: [
        {
          id: 1,
          title: 'Advanced Machine Learning',
          description:
            'Dive deeper into machine learning concepts and applications.',
        },
        {
          id: 2,
          title: 'Big Data Analytics',
          description:
            'Learn how to analyze and derive insights from large datasets.',
        },
        {
          id: 3,
          title: 'Artificial Intelligence Ethics',
          description: 'Explore the ethical considerations of AI technologies.',
        },
        // Add more recommendations as needed
      ],
      yourFeedback: [
        {
          id: 1,
          course: 'Introduction to AI',
          instructor: 'Dr. John Doe',
          rating: 'like',
          comment: 'Really enjoying the course so far!',
          date: '2024-02-05',
        },
        {
          id: 2,
          course: 'Data Science Fundamentals',
          instructor: 'Prof. Jane Smith',
          comment: 'Not very engaging. Could use more interactive content.',
          rating: 'dislike',
          date: '2024-02-06',
        },
        {
          id: 3,
          course: 'Advanced Machine Learning',
          instructor: 'Dr. Alex Johnson',
          comment:
            'Challenging but extremely rewarding. Great for deepening ML knowledge!',
          date: '2024-02-07',
          rating: 'like',
        },
        // Add more feedback entries as needed
      ],
    };
  },
  methods: {
    // Method to select a course and view its details
    selectCourse(course) {
      this.selectedCourse = course;
    },
    // Add any additional methods needed for interactivity
  },
};
</script>
