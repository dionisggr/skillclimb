<template>
  <main class="flex flex-col p-4 max-w-screen-xl mx-auto">
    <!-- Header / Title -->
    <div class="text-center py-6 bg-white rounded-lg">
      <h1 class="text-3xl font-semibold">Course Preview</h1>
      <p class="text-gray-600">Get a glimpse of what you'll learn.</p>
    </div>

    <!-- Introductory Video Section -->
    <section
      class="relative rounded-lg shadow-lg overflow-hidden w-5/6 mx-auto"
      style="height: 500px"
    >
      <video
        controls
        class="w-full h-full object-cover"
        poster="//placekitten.com/800/450"
      >
        <source :src="course.videoUrl" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        class="absolute top-0 left-0 bg-gradient-to-b from-black to-transparent text-white p-4 w-full"
      >
        <h1 class="text-2xl font-bold">{{ course.title }}</h1>
        <p>{{ course.description }}</p>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-white rounded-lg p-6 mt-8 text-center">
      <h2 class="text-2xl font-bold mb-6">Start Your Journey Now</h2>
      <p class="text-gray-600 mb-6">
        Enroll in the "{{ course.title }}" course and begin your learning
        adventure with {{ instructor.name }} as your guide.
      </p>
      <div
        class="flex flex-col md:flex-row md:justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
      >
        <button
          @click="$emit('open-course')"
          class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 px-8 w-full md:w-auto transition-colors duration-300 ease-in-out focus:outline-none focus:border-4 active:outline-none border-blue-700"
        >
          Enroll Now
        </button>
      </div>
      <div
        v-if="showCourseStarting"
        class="mt-6 bg-gray-100 border-t border-gray-300 pt-6"
      >
        <h3 class="text-xl font-semibold mb-3">Course Starting...</h3>
        <div class="relative h-5 w-full bg-gray-300 rounded-lg overflow-hidden">
          <div
            class="absolute h-5 bg-green-500 transition-width"
            :style="{ width: courseStartingProgress + '%' }"
          ></div>
        </div>
      </div>
    </section>

    <!-- Curriculum Section -->
    <section class="bg-white rounded-lg p-6 shadow-lg mt-4">
      <h2 class="text-xl font-bold mb-4">Curriculum</h2>
      <div v-for="(lesson, index) in course.lessons" :key="index" class="mb-4">
        <div
          class="mb-3 bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-all duration-200 cursor-pointer shadow-md"
          @click="lesson.showTopics = !lesson.showTopics"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span
                class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4"
              >
                {{ index + 1 }}
              </span>
              <p class="flex-grow">{{ lesson.title }}</p>
            </div>
            <span class="text-sm text-gray-600">{{ lesson.duration }}</span>
          </div>
        </div>
        <transition name="slide-fade">
          <div v-if="lesson.showTopics || index === 0" class="mt-2 ml-12">
            <div
              v-for="topic in lesson.topics"
              :key="topic"
              class="my-1 p-2 bg-gray-200 rounded hover:shadow-md hover:bg-gray-300 transition-all duration-200 cursor-pointer"
            >
              {{ topic }}
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- What You'll Learn Section -->
    <section class="bg-white rounded-lg p-6 mt-8">
      <h2 class="text-xl font-bold mb-6 text-center">What You'll Learn</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in course.learnings"
          :key="index"
          class="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <svg class="w-8 h-8 text-green-500 mb-3" viewBox="0 0 24 24">
            <path
              d="M20 12l-1.39-.81l.36-2.19l1.81.68l.4-2.01l-1.82-.67l.37-2.18L20 4l-1.09-.39l.02-.02L12 2L2.47 9l1.66 5l-1.63 5l1.25.46L12 22l6.84-2.53l.02-.02L20 12z"
            ></path>
          </svg>
          <p class="text-center">{{ item }}</p>
        </div>
      </div>
    </section>

    <!-- Instructor Info Section -->
    <section
      class="bg-gradient-to-r from-blue-500 to-green-400 rounded-lg p-6 shadow-lg text-white mt-2"
    >
      <h2 class="text-xl font-bold mb-4">Instructor Info</h2>
      <div class="flex items-center space-x-4">
        <img
          :src="instructor.imageUrl"
          alt="Instructor"
          class="w-24 h-24 rounded-full border-4 border-white"
        />
        <div>
          <p class="text-2xl font-semibold">{{ instructor.name }}</p>
          <p class="mb-2">{{ instructor.title }}</p>
          <p>{{ instructor.bio }}</p>
          <a :href="instructor.website" class="block mt-4 text-sm underline"
            >Visit Instructor's Website</a
          >
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      course: {
        title: 'Master Vue.js - The Complete Guide',
        description:
          'Unlock the potentials and master Vue.js from scratch to advanced concepts.',
        videoUrl: '',
        lessons: [
          {
            title: 'Introduction to Vue.js',
            duration: '10:15',
            topics: ['Installing Vue', 'The Vue Instance', 'Data Binding'],
          },
          {
            title: 'Vue.js Directives and Data Rendering',
            duration: '15:25',
            topics: [
              'Using v-if, v-else-if, v-else',
              'Looping with v-for',
              'Binding attributes with v-bind',
              'Listening to events with v-on',
            ],
          },
          {
            title: 'Vue Components and Props',
            duration: '20:30',
            topics: [
              'Creating Vue Components',
              'Passing Data with Props',
              'Using slots',
              'Component lifecycle hooks',
            ],
          },
          {
            title: 'State Management with Vuex',
            duration: '25:40',
            topics: [
              'Centralized State Management',
              'Actions, Mutations, and Getters',
              'Modules in Vuex',
              'Handling state in large applications',
            ],
          },
          {
            title: 'Routing with Vue Router',
            duration: '18:20',
            topics: [
              'Setting up Vue Router',
              'Creating routes and nested routes',
              'Lazy loading routes',
              'Navigation guards',
            ],
          },
          {
            title: 'Advanced Vue.js Patterns',
            duration: '22:15',
            topics: [
              'Mixins and Custom Directives',
              'Vue Render Functions',
              'Using the Provide/Inject pattern',
              'Server-Side Rendering with Nuxt.js',
            ],
          },
        ],

        learnings: [
          'Understand the basics of Vue.js',
          'Build interactive web interfaces',
          'Use Vue CLI for project management',
          'Create Single Page Applications (SPA)',
          'Handle HTTP requests with Axios',
          'Implement Routing with Vue Router',
          'State Management with Vuex',
          'Optimize your Vue applications',
        ],
      },
      instructor: {
        name: 'John Doe',
        title: 'Senior Vue.js Developer',
        bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
        imageUrl: '//placekitten.com/200/200',
        website: 'https://johndoe.com',
      },
    };
  },
};
</script>

<style scoped>
/* Your TailwindCSS styles can go here, should you require custom styling */
</style>
