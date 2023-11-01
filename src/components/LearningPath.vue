<template>
  <main class="flex flex-col p-4 max-w-screen-xl mx-auto">
    <!-- Learning Path Insights -->
    <div
      class="mb-6 bg-white p-8 pb-4 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center"
    >
      <div class="mb-4 md:mb-0">
        <h1 class="text-4xl font-semibold">{{ learningPath.title }}</h1>
        <p class="text-gray-600">Dive deep into this comprehensive journey.</p>
        <!-- Call to Action Button -->
        <button
          class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        >
          Start Learning Path
        </button>
      </div>
      <div class="space-x-4 flex items-center">
        <div>
          <span class="font-bold">{{ learningPath.students }}</span> students
          enrolled
        </div>
        <div>
          <span v-for="n in 5" :key="n" class="mr-1">
            <i
              :class="
                n <= learningPath.rating
                  ? 'fas fa-star text-yellow-500'
                  : 'far fa-star text-gray-300'
              "
            ></i>
          </span>
        </div>
        <div>
          <span class="font-bold">{{ learningPath.courses.length }}</span>
          courses
        </div>
        <div>
          <span class="font-bold">{{ learningPath.assessments }}</span>
          assessments
        </div>
      </div>
    </div>

    <!-- Included Courses -->
    <section class="bg-white p-4 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Included Courses</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(course, index) in learningPath.courses"
          :key="index"
          class="flex flex-col justify-between rounded-lg shadow-sm bg-gray-100 p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          @click="$emit('preview-course')"
        >
          <!-- Course Header with Thumbnail and Duration -->
          <div class="flex justify-between mb-4">
            <div class="flex">
              <div class="w-12 h-12 bg-white shadow-lg rounded-lg mr-3">
                <img
                  src="https://source.unsplash.com/random/201x126?course"
                  :alt="course.title"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div class="flex-1 flex items-center">
                <h3 class="text-lg font-semibold mb-1 line-clamp-2">
                  {{ course.title }}
                </h3>
              </div>
            </div>
            <!-- Course Duration -->
            <div class="duration-block flex items-end border-solid ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 6v6l4 2" />
                <path d="M12 4a8 8 0 100 16 8 8 0 000-16z" />
              </svg>
              <span class="text-xs min-w-fit">{{ course.duration }} weeks</span>
            </div>
          </div>

          <!-- Course Topics -->
          <div class="mb-6">
            <ul class="flex flex-wrap gap-3">
              <li
                v-for="topic in course.topics"
                :key="topic"
                class="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600"
              >
                {{ topic }}
              </li>
            </ul>
          </div>

          <!-- Instructor, Additional Info -->
          <div class="flex items-center justify-between text-sm mb-2">
            <div>
              <span class="font-bold">{{ course.lessons }}</span> lessons
              <span class="ml-2 font-bold">{{ course.assessments }}</span>
              assessments
            </div>
            <span class="text-gray-600 font-semibold">{{ course.instructor.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Gained -->
    <section class="bg-white rounded-lg shadow-lg p-6 space-y-4 py-8">
      <h2 class="text-2xl font-bold text-center">Skills to Master</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="skill in learningPath.skills"
          :key="skill"
          class="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-200"
        >
          {{ skill }}
        </div>
      </div>
    </section>

    <!-- Prerequisites -->
    <section class="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 class="text-2xl font-bold mb-4">Before You Start</h2>
      <ul class="list-disc pl-5">
        <li
          v-for="prerequisite in learningPath.prerequisites"
          :key="prerequisite"
          class="mb-4 list-none flex flex-col"
        >
          <div class="flex -mb-3">
            <!-- Icon/Image for visual indicator -->
            <img
              :src="prerequisite.icon"
              alt="Icon for prerequisite"
              class="w-9 h-9 mr-3 rounded"
            />
            <!-- Prerequisite description -->
            <span>{{ prerequisite.description }}</span>
          </div>
          <!-- Link to brush-up resource -->
          <a
            :href="prerequisite.resourceLink"
            class="text-sm text-blue-500 hover:underline ml-12"
            >Learn more</a
          >
        </li>
      </ul>
    </section>

    <!-- Learner Testimonials -->
    <section class="py-16 w-11/12 mx-auto" id="reviews">
      <h2 class="text-4xl font-bold text-center mb-12">
        Hear from Our Learners
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="testimonial in learningPath.testimonials"
          :key="testimonial.id"
          class="review-card rounded-lg shadow-md p-4 bg-white transition-all transform hover:-translate-y-1"
        >
          <!-- User Info -->
          <div class="flex items-center mb-3">
            <img
              src="https://source.unsplash.com/random/201x126?course"
              :alt="'Image of ' + testimonial.author"
              class="w-8 h-8 rounded-full mr-2"
            />
            <span class="text-lg font-medium">{{ testimonial.author }}</span>
          </div>
          <!-- Star Ratings -->
          <div class="mb-2">
            <span
              v-for="star in 5"
              :key="star"
              :class="
                star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
              "
            >
              &#9733;
            </span>
          </div>
          <!-- Testimonial Content -->
          <p class="text-gray-600 text-sm">{{ testimonial.content }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      learningPath: {
        title: 'ChatGPT Mastery Path',
        students: 2050,
        rating: 4.5,
        assessments: 15,
        description: '',
        courses: [
          {
            title: 'Advanced React Techniques',
            duration: 6,
            lessons: 18,
            assessments: 4,
            topics: [
              'Hooks in-depth',
              'Context API',
              'Advanced Routing',
              'Server Side Rendering',
            ],
            instructor: {
              name: 'Alex Kent',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
          {
            title: 'Introduction to TypeScript',
            duration: 4,
            lessons: 12,
            assessments: 2,
            topics: [
              'Basic types',
              'Interfaces and Classes',
              'Generics',
              'Decorators',
            ],
            instructor: {
              name: 'Mia Wong',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
          {
            title: 'Web Performance Optimization',
            duration: 5,
            lessons: 14,
            assessments: 3,
            topics: [
              'Critical Rendering Path',
              'Image & Media Optimization',
              'Lazy Loading',
              'Performance Auditing',
            ],
            instructor: {
              name: 'Leo Fitz',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
          {
            title: 'Vue.js Foundations',
            duration: 5,
            lessons: 17,
            assessments: 3,
            topics: [
              'Reactive Data Binding',
              'Vue Components',
              'Vue Router',
              'State Management with Vuex',
            ],
            instructor: {
              name: 'Isabelle Choi',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
          {
            title: 'CSS Animations & Transitions',
            duration: 3,
            lessons: 10,
            assessments: 2,
            topics: [
              'Transitions vs. Animations',
              'Keyframe Animations',
              'Easing Functions',
              'Performance Considerations',
            ],
            instructor: {
              name: 'Samuel Jackson',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
          {
            title: 'GraphQL for Frontend Developers',
            duration: 5,
            lessons: 16,
            assessments: 3,
            topics: [
              'GraphQL Basics',
              'Queries and Mutations',
              'Integrating with React',
              'State Management with Apollo',
            ],
            instructor: {
              name: 'Lydia Hall',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
          {
            title: 'Web Accessibility (A11y) Best Practices',
            duration: 4,
            lessons: 13,
            assessments: 2,
            topics: [
              'Accessibility Basics',
              'Screen Readers and Semantics',
              'ARIA Roles & Attributes',
              'Testing for Accessibility',
            ],
            instructor: {
              name: 'Raul Vega',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
          {
            title: 'Progressive Web Apps (PWA) Mastery',
            duration: 6,
            lessons: 18,
            assessments: 4,
            topics: [
              'What are PWAs?',
              'Service Workers & Caching',
              'Offline Capabilities',
              'Push Notifications',
            ],
            instructor: {
              name: 'Nina Bhatia',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
        ],
        skills: [
          'Responsive Web Design using Flexbox and Grid',
          'Advanced JavaScript Patterns & Best Practices',
          'State Management in Vue with Vuex',
          'Creating Reusable React Components',
          'Optimizing Web Performance',
          'Integrating APIs and handling data',
        ],
        testimonials: [
          {
            id: 1,
            author: 'Jane Doe',
            content:
              'This learning path was a game-changer for me. Every topic was covered in-depth.',
            rating: 4,
          },
          {
            id: 2,
            author: 'John Smith',
            content:
              'Loved the hands-on projects and real-world scenarios. The instructors were very knowledgeable.',
            rating: 4,
          },
          {
            id: 3,
            author: 'Ella Fitz',
            content:
              'I went from knowing basic web design to building full-fledged web apps, all thanks to this path!',
            rating: 4,
          },
          {
            id: 4,
            author: 'Martin Gold',
            content:
              'The course structure, content, and teaching methodology are top-notch. Highly recommended!',
            rating: 4,
          },
        ],
        prerequisites: [
          {
            id: 1,
            description: 'Basic understanding of HTML, CSS, and JavaScript',
            completed: false,
            icon: 'https://source.unsplash.com/random/201x126?course',
            resourceLink: 'https://some-resource-to-learn-html.com',
          },
          {
            id: 2,
            description: 'Familiarity with the command line',
            completed: false,
            icon: 'https://source.unsplash.com/random/201x126?course',
            resourceLink: 'https://some-resource-to-learn-command-line.com',
          },
          {
            id: 5,
            description: 'Understanding of Basic Web Design Principles',
            completed: false,
            icon: 'https://source.unsplash.com/random/201x126?course',
            resourceLink: 'https://some-resource-to-learn-web-design.com',
          },
          {
            id: 6,
            description: 'Experience with Version Control (Git)',
            completed: false,
            icon: 'https://source.unsplash.com/random/201x126?course',
            resourceLink: 'https://some-resource-to-learn-git.com',
          },
        ],
      },
    };
  },
};
</script>
