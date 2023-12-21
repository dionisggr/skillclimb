<template>
  <header class="sticky top-0 z-50 bg-white p-4 shadow-md">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <!-- Simple SVG ladder icon as a placeholder -->
        <svg
          class="h-6 w-6 mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M7 0h2v24H7zm8 0h2v24h-2zm-6 4h6v2h-6zm6 5H9v-2h6zm-6 5h6v2h-6zm6 5H9v-2h6z"
          />
        </svg>
        <h1
          class="text-xl font-semibold cursor-pointer"
          @click="selectedNavItem = 'home'"
        >
          SkillClimb
        </h1>
      </div>
      <!-- Hamburger Icon -->
      <div class="md:hidden">
        <button @click="toggleSidebar">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <!-- Navigation Links -->
      <nav class="hidden md:flex items-center w-full justify-between ml-8">
        <div class="flex mx-auto w-1/2 justify-between">
          <div
            class="flex p-1.5 px-2 relative"
            v-for="link in ['Home', 'Courses', 'Certifications', 'Pricing']"
          >
            <a
              href="#"
              class="rounded hover:bg-gray-200 p-1 font-semibold"
              :class="
                link === 'Certifications'
                  ? 'text-gray-600'
                  : 'text-gray-700'
              "
              @click="selectNavItem(link.toLowerCase())"
              >{{ link }}</a
            >
          </div>
        </div>
        <div class="flex items-center">
          <input
            type="text"
            placeholder="Search course..."
            class="hidden lg:block w-80 rounded-xl border p-2 px-4 ml-8"
          />
          <button
            class="rounded-full bg-gray-200 ml-8 mr-6 p-2 hover:shadow-lg transform transition-all duration-200"
            @click="toggleAccountOptions"
          >
            <account-circle />
          </button>
          <!-- Account Dropdown -->
          <div
            v-if="showAccountOptions"
            class="absolute mt-24 right-8 bg-white border border-gray-300 shadow-md rounded py-2"
          >
            <template v-if="user">
              <button class="block px-4 py-2 hover:bg-gray-100 cursor-not-allowed">
                My Account
              </button>
              <button class="block px-4 py-2 hover:bg-gray-100" @click="toggleLoginModal">Switch User</button>
              <button class="block px-4 py-2 hover:bg-gray-100 w-full" @click.stop="logout">Logout</button>
            </template>
              <button
                v-else
                class="block px-4 py-2 hover:bg-gray-100"
                @click="toggleLoginModal"
              >
                Login As...
              </button>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <!-- Sidebar -->
  <transition name="slide">
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 overflow-hidden z-50"
      @click.self="toggleSidebar"
    >
      <div
        class="absolute inset-0 bg-black opacity-50"
        @click="toggleSidebar"
      ></div>
      <div
        class="absolute top-0 right-0 w-64 bg-white p-4 overflow-auto h-full shadow-lg transform transition-transform duration-300 ease-in-out"
      >
        <!-- Close button -->
        <button
          class="absolute top-4 right-4 focus:outline-none"
          @click="toggleSidebar"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <!-- Sidebar header with website title -->
        <div class="border-b pb-2 mb-6">
          <h2 class="text-2xl font-semibold">SkillClimb</h2>
        </div>

        <!-- Navigation links -->
        <nav>
          <a
            href="#"
            class="block py-4 px-4 rounded transition duration-200 hover:bg-gray-100 mb-2 text-lg"
            v-for="link in ['Home', 'Courses', 'Certifications', 'Pricing']"
            @click="
              selectedNavItem = link.toLowerCase();
              toggleSidebar();
            "
          >
            {{ link }}
          </a>
        </nav>
      </div>
    </div>
  </transition>

  <!-- Home -->
  <Home
    v-if="selectedNavItem === 'home'"
    :user="user"
    @open-learning-path="openLearningPath"
    @open-dashboard="selectedNavItem = 'dashboard'"
    @toggle-login="toggleLoginModal"
  />

  <!-- Courses -->
  <Courses
    v-else-if="selectedNavItem === 'courses'"
    @preview-course="selectedNavItem = 'course-preview'"
  />

  <!-- Course Preview -->
  <CoursePreview
    v-else-if="selectedNavItem === 'course-preview'"
    :user="user"
    :isNewCourse="isNewCourse"
    @create-new-course="createNewCourse"
    @open-course="openCourse"
  />

  <!-- Course -->
  <Course
    v-else-if="selectedNavItem === 'course'"
    :user="user"
    :isNewCourse="isNewCourse"
    @open-practice="selectedNavItem = 'practice'"
  />

  <!-- Certifications -->
  <Certifications
    v-else-if="selectedNavItem === 'certifications'"
    @go-back="selectedNavItem = 'certifications'"
    @view-learning-path="selectedNavItem = 'learning-path'"
    @view-certification="selectedNavItem = 'certification'"
  />

  <!-- Certification -->
  <Certification
    v-else-if="selectedNavItem === 'certification'"
    @go-back="selectedNavItem = 'certifications'"
  />

  <!-- Pricing -->
  <Pricing v-else-if="selectedNavItem === 'pricing'" />

  <!-- Learning Path -->
  <LearningPath
    v-else-if="selectedNavItem === 'learning-path'"
    :user="user"
    @open-course="openCourse"
    @open-course-preview="selectedNavItem = 'course-preview'"
    @toggle-login-modal="toggleLoginModal"
  />

  <!-- Video Platform -->
  <VideoPlatform
    v-else-if="selectedNavItem === 'video-platform'"
    @open-course="selectedNavItem = 'course'"
  />

  <!-- Dashboard -->
  <Dashboard
    v-else-if="selectedNavItem === 'dashboard'"
    :user="user"
    @open-course="selectedNavItem = 'course'"
    @create-new-course="createNewCoursePreview"
  />

  <!-- Footer Section -->
  <section class="bg-gray-100 py-12 mt-16">
    <div class="container mx-auto px-8 lg:flex">
      <!-- Column 1: Information & Navigation Links -->
      <div class="lg:w-1/3 mb-8 lg:mb-0">
        <h2 class="text-lg font-bold mb-4">Information</h2>
        <ul class="text-sm">
          <li class="mb-2">
            <a href="#" class="text-gray-600 hover:text-gray-800">About Us</a>
          </li>
          <li class="mb-2">
            <a href="#" class="text-gray-600 hover:text-gray-800">Blog</a>
          </li>
          <li class="mb-2">
            <a href="#" class="text-gray-600 hover:text-gray-800">Partners</a>
          </li>
          <li class="mb-2">
            <a href="#" class="text-gray-600 hover:text-gray-800"
              >Privacy Policy</a
            >
          </li>
          <li>
            <a href="#" class="text-gray-600 hover:text-gray-800"
              >Terms of Service</a
            >
          </li>
        </ul>
      </div>

      <!-- Column 2: Contact & Support -->
      <div class="lg:w-1/3 mb-8 lg:mb-0">
        <h2 class="text-lg font-bold mb-4">Contact & Support</h2>
        <ul class="text-sm">
          <li class="mb-2">
            <span class="text-gray-600">Email: </span
            ><a href="mailto:support@skillclimb.com" class="hover:text-gray-800"
              >support@skillclimb.com</a
            >
          </li>
          <li class="mb-2">
            <span class="text-gray-600">Phone: </span
            ><a href="tel:+1234567890" class="hover:text-gray-800"
              >+1 234 567 890</a
            >
          </li>
          <li>
            <a href="#" class="text-gray-600 hover:text-gray-800 underline"
              >Help Center</a
            >
          </li>
        </ul>
      </div>

      <!-- Column 3: Social & Subscribe -->
      <div class="lg:w-1/3">
        <h2 class="text-lg font-bold mb-4">Stay Connected</h2>
        <ul class="mb-4 text-sm">
          <li class="inline-block mx-2">
            <a href="#" class="text-gray-600 hover:text-gray-800"
              ><i class="fab fa-facebook"></i
            ></a>
          </li>
          <li class="inline-block mx-2">
            <a href="#" class="text-gray-600 hover:text-gray-800"
              ><i class="fab fa-twitter"></i
            ></a>
          </li>
          <li class="inline-block mx-2">
            <a href="#" class="text-gray-600 hover:text-gray-800"
              ><i class="fab fa-linkedin"></i
            ></a>
          </li>
          <li class="inline-block mx-2">
            <a href="#" class="text-gray-600 hover:text-gray-800"
              ><i class="fab fa-instagram"></i
            ></a>
          </li>
        </ul>
        <form @submit.prevent="subscribe">
          <input
            type="email"
            placeholder="Your email"
            class="p-2 rounded w-2/3 border"
            v-model="subscriberEmail"
            required
          />
          <button
            type="submit"
            class="bg-gray-800 text-white py-2 px-4 ml-2 rounded hover:bg-gray-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
    <div class="text-center text-gray-500 text-sm mt-4">
      &copy; 2023 SkillClimb. All rights reserved.
    </div>
  </section>

  <!-- Modal for Login As -->
<div v-if="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  <div class="bg-white rounded-lg p-6 px-8 grid grid-cols-2 gap-4 relative">
    <!-- Close Button -->
    <button
      class="absolute top-0 right-2 text-3xl m-2 text-red-400 p-2 hover:text-gray-800"
      @click="showLoginModal = false"
    >
      &times;
    </button>
    <div
      v-for="(role, index) in [
        'new-student',
        'active-student',
        'new-instructor',
        'active-instructor',
      ]"
      :key="role"
      class="flex flex-col items-center cursor-pointer hover:bg-gray-100 rounded-full p-6 px-10"
      @click="loginAs(role)"
    >
      <img
        :src="`https://source.unsplash.com/random/100x${100 + index}`"
        alt="Avatar"
        class="rounded-full mb-2"
      />
      <span class="capitalize">{{ role.replace('-', ' ') }}</span>
    </div>
  </div>
</div>

</template>

<script>
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue';
import ArrowDown from 'vue-material-design-icons/ArrowDown.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import Home from './components/Home.vue';
import CoursePreview from './components/CoursePreview.vue';
import Course from './components/Course.vue';
import Certifications from './components/Certifications.vue';
import Certification from './components/Certification.vue';
import Pricing from './components/Pricing.vue';
import Courses from './components/Courses.vue';
import LearningPath from './components/LearningPath.vue';
import VideoPlatform from './components/VideoPlatform.vue';
import Dashboard from './components/Dashboard.vue';
import data from './data.js';

export default {
  components: {
    AccountCircle,
    ChevronRight,
    ArrowDown,
    Home,
    CoursePreview,
    Course,
    Certification,
    Certifications,
    Pricing,
    Courses,
    LearningPath,
    VideoPlatform,
    Dashboard,
  },

  data() {
    return {
      user: null,
      isNewCourse: false,
      showLoginModal: false,
      selectedNavItem: 'home',
      supplementalInfo:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.'.repeat(
          10
        ),
      selectedSubtopic: null,
      showPractice: false,
      showAssessments: false,
      course: {
        name: 'ChatGPT and AI Prompts',
        lessons: [
          {
            id: 1,
            title: 'What is ChatGPT?',
            thumbnail: 'https://via.placeholder.com/150',
            duration: '5m 20s',
            progress: 100,
            progressText: '100%',
          },
          {
            id: 2,
            title: 'ChatGPT And The Job Market',
            thumbnail: 'https://via.placeholder.com/150',
            duration: '7m 10s',
            progress: 20,
            progressText: '20%',
          },
        ],
      },
      generatedSubtopics: [
        {
          id: 1,
          name: 'AI-Generated Subtopic 1',
          supplementalInfo: 'Lorem ipsum',
        },
        {
          id: 2,
          name: 'AI-Generated Subtopic 2',
          supplementalInfo: 'Lorem ipsum',
        },
        // ... more generated subtopics
      ],
      sections: [
        {
          title: 'Mock Video Title',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
          duration: '3:32',
          show: false,
          progress: 70,
          topics: [
            {
              name: 'Topic 1',
              discussed: true,
              subTopics: [
                {
                  name: 'Subtopic 1',
                  supplementalInfo:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.',
                },
                {
                  name: 'Subtopic 2',
                  supplementalInfo:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.',
                },
              ],
            },
            {
              name: 'Topic 2',
              discussed: false,
              subTopics: [
                {
                  name: 'Subtopic 1',
                  supplementalInfo:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.',
                },
                {
                  name: 'Subtopic 2',
                  supplementalInfo:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.',
                },
              ],
            },
            {
              name: 'Topic 3',
              discussed: false,
              subTopics: [
                {
                  name: 'Subtopic 1',
                  supplementalInfo:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.',
                },
                {
                  name: 'Subtopic 2',
                  supplementalInfo:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.',
                },
              ],
            },
            {
              name: 'Topic 4',
              discussed: false,
              subTopics: [
                {
                  name: 'Subtopic 1',
                  supplementalInfo: 'Lorem',
                },
              ],
            },
            {
              name: 'Topic 5',
              discussed: false,
              subTopics: [
                {
                  name: 'Subtopic 1',
                  supplementalInfo: 'Lorem',
                },
              ],
            },
          ],
          supplementalInfo:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.',
        },
        {
          title: 'Mock Video Title',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
          duration: '2:32',
          show: false,
          progress: 0,
          topics: [
            {
              name: 'Topic 1',
              discussed: false,
              subTopics: ['Subtopic 1', 'Subtopic 2'],
            },
            {
              name: 'Topic 2',
              discussed: false,
              subTopics: ['Subtopic 1', 'Subtopic 2'],
            },
            {
              name: 'Topic 3',
              discussed: false,
              subTopics: ['Subtopic 1', 'Subtopic 2'],
            },
            {
              name: 'Topic 4',
              discussed: false,
              subTopics: ['Subtopic 1', 'Subtopic 2'],
            },
            {
              name: 'Topic 5',
              discussed: false,
              subTopics: ['Subtopic 1', 'Subtopic 2'],
            },
          ],
          supplementalInfo:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.',
        },
        {
          title: 'Mock Video Title',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
          duration: '4:32',
          show: false,
          progress: 0,
          topics: [
            {
              name: 'Topic 1',
              discussed: false,
              subTopics: ['Subtopic 1', 'Subtopic 2'],
            },
            {
              name: 'Topic 2',
              discussed: false,
              subTopics: ['Subtopic 1', 'Subtopic 2'],
            },
            {
              name: 'Topic 3',
              discussed: false,
              subTopics: ['Subtopic 1', 'Subtopic 2'],
            },
            {
              name: 'Topic 4',
              discussed: false,
              subTopics: ['Subtopic 1', 'Subtopic 2'],
            },
            {
              name: 'Topic 5',
              discussed: false,
              subTopics: ['Subtopic 1', 'Subtopic 2'],
            },
          ],
          supplementalInfo:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.',
        },
      ],
      practices: [
        {
          title: 'Intent or Structure?',
          description:
            'Identify the location where suggestions fit best in the prompt',
          exerciseCount: 5,
        },
        {
          title: 'Bias Busters',
          description: 'Identify potentially strong biases in provided prompts',
          exerciseCount: 3,
        },
        {
          title: 'Parts Of A Prompt',
          description:
            'Identify the location where suggestions fit the prompt best',
          exerciseCount: 5,
        },
        {
          title: 'Prompt Puzzles',
          description:
            'Identify the location where suggestions fit the prompt best',
          exerciseCount: 5,
        },
        {
          title: 'Prompt-Off',
          description:
            'Identify the location where suggestions fit the prompt best',
          exerciseCount: 5,
        },
        {
          title: 'Prompt Crafting',
          description:
            'Identify the location where suggestions fit the prompt best',
          exerciseCount: 5,
        },
      ],
      selectedSubtopic: {},
      selectedTopic: {},
      selectedOption: null,
      selectedLessonIndex: null,
      selectedNavItem: 'home',
      isSidebarOpen: false,
      showAccountOptions: false,
    };
  },
  computed: {
    currentLesson() {
      return this.course.lessons[0];
    },
    currentSection() {
      return this.sections[0];
    },
    currentTopic() {
      return this.currentSection.topics[0];
    },
    currentSubTopic() {
      return this.currentTopic.subTopics[0];
    },
    currentSupplementalInfo() {
      return this.supplementalInfo;
    },
  },
  methods: {
    toggleLoginModal() {
      this.showLoginModal = !this.showLoginModal;
      this.showAccountOptions = false;
    },
    loginAs(userId) {
      this.user = data.users.find((user) => user.id === userId);
      this.showLoginModal = false;

      this.$forceUpdate();
    },
    logout() {
      this.user = null;
      this.showAccountOptions = false;
      this.selectedNavItem = 'home';
    },
    toggleAccountOptions() {
      this.showAccountOptions = !this.showAccountOptions;
    },
    toggleSection(index) {
      this.sections[index].show = !this.sections[index].show;
    },
    hoverMiniVideo(id) {
      // Do something on hover if required
    },
    unhoverMiniVideo(id) {
      // Reset hover effects if required
    },
    activateVideo(index) {
      this.sections = this.sections.map((section, idx) => ({
        ...section,
        show: idx === index && !section.show,
      }));

      this.activeVideoIndex = index;
    },
    selectTopic(topic) {
      this.selectedTopic = topic;
    },
    selectSubtopic(subtopic) {
      this.selectedSubtopic = subtopic;
    },
    goBack() {
      this.selectedSubtopic = {};
    },
    selectOption(option) {
      this.selectedOption = 'Lorem ipsum dolor sit amet option ' + option;
      // ... any other logic ...
    },
    selectLesson(index) {
      this.selectedLessonIndex = index; // Update the selected lesson index
    },
    isSelectedLesson(index) {
      return this.selectedLessonIndex === index; // Check if the lesson is selected
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    createNewCoursePreview() {
      this.isNewCourse = true;
      this.selectedNavItem = 'course-preview';
    },
    createNewCourse() {
      this.selectedNavItem = 'course';
    },
    openCourse() {
      if (!this.user?.id) {
        this.toggleLoginModal();
      } else {
        this.selectedNavItem = 'course';
      }

    },
    openLearningPath() {
      this.selectedNavItem = 'learning-path';
      this.selectNavItem('learning-path');
    },
    selectNavItem(item) {
      this.selectedNavItem = item;

      window.scrollTo(0, 0);
    },
    
  },
};
</script>

<style>
/* Custom styling for hover, color, and shadow effects */
.video-lesson {
  transition: transform 0.3s ease, background-color 0.3s ease;
  background-color: #fff;
}

.video-lesson:hover {
  transform: translateY(-5px);
  background-color: #f9f9f9;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.mini-video {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.mini-video:hover {
  background-color: #f5f5f5;
}

.mini-video.selected {
  background-color: #e0e0e0;
}

.thumbnail {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
}

.duration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  padding: 2px 4px;
  text-align: center;
  font-size: 10px;
  border-radius: 0 0 5px 5px;
}

.video-topic:hover {
  background-color: #f7f7f7;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.video-topic:hover {
  cursor: pointer;
  transition: all 0.3s ease;
}

.video-topic.bg-blue-100 {
  border-color: blue;
}

.line-through {
  text-decoration: line-through;
}

::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

* {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
}
</style>
