<template>
  <main class="flex flex-col p-4 max-w-screen-xl mx-auto">
    <!-- Learning Path Insights -->
    <div
      class="mb-6 bg-white p-4 sm:p-6 md:p-8 pb-4 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
    >
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
          {{ learningPath.title }}
        </h1>
        <p class="text-gray-600 mt-2">
          Dive deep into this comprehensive journey.
        </p>
        <!-- Call to Action Button -->
        <button
          class="mt-4 text-white px-6 py-2 rounded-md focus:outline-none focus:ring"
          :class="
            isLoggedIn
              ? 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300'
          "
          @click="user?.id ? $emit('open-course') : $emit('toggle-login-modal')"
        >
          {{ isEnrolled ? 'Continue' : 'Begin' }} Path
        </button>
      </div>
      <div class="flex-1 flex flex-col sm:flex-row justify-evenly items-center">
        <div class="flex items-center mb-2 sm:mb-0">
          <span class="font-bold text-lg">{{ learningPath.students }}</span>
          <span class="ml-1 text-gray-600">students enrolled</span>
        </div>
        <div class="flex items-center mb-2 sm:mb-0">
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
        <div class="flex items-center mb-2 sm:mb-0">
          <span class="font-bold text-lg">{{
            learningPath.courses.length
          }}</span>
          <span class="ml-1 text-gray-600">courses</span>
        </div>
        <div class="flex items-center">
          <span class="font-bold text-lg">{{ learningPath.assessments }}</span>
          <span class="ml-1 text-gray-600">assessments</span>
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
          :class="[
            'relative flex flex-col justify-between rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer',
            isLoggedIn && !index ? 'bg-blue-50' : 'bg-gray-100', // Highlight the third course
            index < 2 ? 'coming-soon' : '',
          ]"
          @click="$emit('open-course-preview')"
        >
          <!-- Coming Soon Overlay for first 2 courses -->
          <div
            v-if="index > 1"
            class="absolute rounded-xl top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex items-center justify-center"
          >
            <span class="text-white font-bold text-xl">Coming Soon</span>
          </div>

          <!-- Progress Indicator for the third course -->
          <div v-if="isEnrolled && !index" class="ml-auto mb-2">
            <span
              class="text-yellow-600 font-semibold text-sm bg-yellow-200 px-2 py-1 rounded-full"
            >
              In Progress
            </span>
          </div>
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
                <h3 class="w-11/12 text-base font-semibold mb-1 md:text-lg">
                  {{ course.title }}
                </h3>
              </div>
            </div>
            <!-- Course Duration -->
            <div
              class="duration-block flex flex-col items-center text-center border-solid ml-2"
            >
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
            <span class="text-gray-600 font-semibold">{{
              course.instructor?.name
            }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Gained -->
    <section class="bg-white rounded-lg shadow-lg p-6 space-y-4 py-8">
      <h2 class="text-2xl font-bold text-center">Skills to Master</h2>
      <!-- Adjust grid columns: 1 column for mobile, 3 for tablet, 4 for desktop -->
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
        <div
          v-for="skill in learningPath.skills"
          :key="skill"
          class="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-200 ease-in-out"
        >
          {{ skill }}
        </div>
      </div>
    </section>

    <!-- Prerequisites -->
    <section class="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 class="text-2xl font-bold mb-4">Before You Start</h2>
      <ul class="list-disc pl-5 space-y-6">
        <li
          v-for="prerequisite in learningPath.prerequisites"
          :key="prerequisite"
          class="flex flex-col"
        >
          <div class="flex">
            <!-- Icon/Image for visual indicator -->
            <img
              :src="prerequisite.icon"
              alt="Icon for prerequisite"
              class="w-12 h-12 mr-3 rounded"
            />

            <div class="flex flex-col text-sm lg:text-base">
              <!-- Prerequisite description -->
              <span>{{ prerequisite.description }}</span>

              <!-- Link to brush-up resource -->
              <a
                :href="prerequisite.resourceLink"
                class="text-sm text-blue-500 hover:underline mt-1"
                >Learn more</a
              >
            </div>
          </div>
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
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isLoggedIn: true,
      learningPath: {
        title: 'ChatGPT Mastery Path',
        students: 2050,
        rating: 4.5,
        assessments: 15,
        description: '',
        courses: [
          {
            title: 'Job Searching with ChatGPT',
            duration: 5,
            lessons: 14,
            assessments: 3,
            topics: ['Resume Optimization', 'Interview Preparation'],
            instructor: {
              name: 'Dionis Gonzalez',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
          {
            title: 'Mastering Interviews with ChatGPT',
            duration: 5,
            lessons: 17,
            assessments: 3,
            topics: [
              'Interview Types',
              'Behavioral Questions',
              'Technical Interviews',
              'STAR Method',
            ],
            instructor: {
              name: 'Dionis Gonzalez',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
          {
            title: 'ChatGPT For Everyone',
            duration: 6,
            lessons: 18,
            assessments: 4,
            topics: [
              'Artificial Intelligence',
              'Large Language Models',
              'OpenAI',
              'ChatGPT',
              'Prompt Engineering',
            ],
            instructor: {
              name: 'Dionis Gonzalez',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
          {
            title: 'ChatGPT For Developers',
            duration: 4,
            lessons: 12,
            assessments: 2,
            topics: [
              'AI Design',
              'Debugging',
              'Troubleshooting',
              'Prompt Engineering',
            ],
            instructor: {
              name: 'Dionis Gonzalez',
              imageUrl: 'https://source.unsplash.com/random/201x126?course',
            },
          },
        ],
        skills: [
          'Artificial Intelligence',
          'Large Language Models',
          'OpenAI, GPT and ChatGPT',
          'GPT 3.5-Turbo vs GPT-4',
          'Pair-Programming with AI',
          'Prompt Engineering',
          'Resume Optimization',
          'Interview Preparation',
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
  computed: {
    isContentCreator() {
      return this.user?.id?.includes('active-instructor');
    },
    isEnrolled() {
      return this.user?.id?.includes('active-student');
    }
  }
};
</script>
