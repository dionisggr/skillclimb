<template>
  <!-- Main Content -->
  <main class="flex p-4" v-if="selectedNavItem === 'home'">
    <!-- Sidebar -->
    <aside
      class="h-screen max-w-[350px] overflow-y-auto rounded bg-white p-4 shadow-md"
    >
      <h2
        class="mb-6 text-center text-lg font-bold border border-solid rounded-md p-1"
      >
        Course Modules
      </h2>

      <!-- Sidebar Video Lessons -->
      <a
        href="#"
        class="video-lesson mt-5 flex items-center"
        v-for="(lesson, index) in course.modules"
        :key="index"
        :class="{ yourSelectedStyle: isSelectedLesson(index) }"
        @click.prevent="selectLesson(index)"
      >
        <div class="relative mr-2 inline-block w-16">
          <img :src="lesson.thumbnail" :alt="lesson.name" class="rounded-md" />
          <p
            class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white rounded-b-md px-1 text-[11px]"
          >
            {{ lesson.duration }}
          </p>
        </div>
        <div class="inline-block w-2/3">
          <p class="text-sm font-bold text-center">{{ lesson.name }}</p>
          <div class="relative h-4 w-full rounded-full bg-gray-200 mt-2">
            <div
              class="absolute left-0 h-full rounded-full bg-green-400"
              :style="{ width: lesson.progress + '%' }"
            ></div>
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-xs"
            >
              {{ lesson.progressText }}
            </div>
          </div>
        </div>
      </a>
    </aside>

    <!-- Course Content -->
    <section class="ml-4 w-3/4 rounded bg-white p-5 pb-0 shadow-md relative">
      <div class="flex items-center text-sm mb-2">
        <a href="#" class="hover:underline hover:text-blue-500">{{
          course.name
        }}</a>
        <chevron-right size="20" class="mx-1" />
      </div>

      <h2 class="text-2xl font-bold m-1 mt-4">{{ currentLesson.title }}</h2>

      <!-- Course Video and Right Section -->
      <div class="mb-6 flex min-w-[700px]">
        <iframe
          src="https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="w-full h-auto"
        ></iframe>

        <!-- Right Section: Video Description and Topics -->
        <div class="ml-4 flex w-2/5 flex-col space-y-4">
          <!-- Video Topics -->
          <div class="h-[400px] flex-grow overflow-y-auto">
            <p class="mb-2 font-semibold text-lg text-gray-800">
              Module Lessons:
            </p>

            <div v-for="(lesson, index) in selectedModule.lessons" :key="index">
              <!-- Video Entry -->
              <div
                class="video-lesson mt-3 flex items-center p-3 border border-blue-700 rounded-md shadow-md hover:shadow-lg border-opacity-30"
                @click="toggleVideo(index)"
                :class="{ 'bg-blue-100': activeVideoIndex === index }"
              >
                <div class="relative mr-2 inline-block w-16">
                  <img
                    :src="lesson.thumbnail"
                    :alt="lesson.title"
                    class="rounded-md"
                  />
                  <p
                    class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white rounded-b-md px-1 text-[11px]"
                  >
                    {{ lesson.duration }}
                  </p>
                </div>
                <div class="inline-block w-2/3">
                  <p class="text-sm font-bold text-center">
                    {{ lesson.title }}
                  </p>
                  <div
                    class="relative h-2 w-full rounded-full bg-gray-300 mt-2 mb-2"
                  >
                    <div
                      class="absolute left-0 h-full rounded-full bg-green-400"
                      :style="{ width: lesson.progress + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Expanded Details Section for the current Video Entry -->
              <div
                v-if="activeVideoIndex === index"
                class="p-3 bg-gray-50 border rounded-md"
              >
                <p class="text-xs italic">{{ lesson.description }}</p>
                <ul class="space-y-2">
                  <li
                    v-for="topic in currentLesson.topics"
                    :key="topic"
                    @click="selectTopic(topic)"
                    class="cursor-pointer border rounded-lg px-4 py-2 flex text-sm font-medium items-center hover:bg-blue-100 hover:text-blue-700 transition-all duration-300"
                    :class="{
                      'bg-blue-200 text-blue-800 border-blue-500':
                        selectedSubtopic === topic,
                      'line-through': topic.discussed,
                    }"
                  >
                    <!-- Mocked timestamp -->
                    <span class="mr-4 text-xs text-gray-500">{{
                      topic.timestamp || '00:00'
                    }}</span>
                    {{ topic.title }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Supplemental Information Section -->
      <div class="bg-gray-100 p-6 mb-6 rounded-lg shadow-lg relative">
        <!-- Back Button and Subtopic Name Wrapper -->
        <div class="flex items-center mb-4">
          <!-- Back Button -->
          <button
            v-if="selectedSubtopic.name"
            @click="goBack"
            class="bg-white p-2 rounded-full hover:bg-gray-200 transition-all duration-300 mr-4"
          >
            ⬅️
          </button>

          <!-- Subtopic Name -->
          <h3 v-if="!selectedSubtopic.name" class="text-xl font-semibold">
            Supplemental Information
          </h3>
          <h3 v-else class="text-xl font-semibold">
            {{ selectedSubtopic.name }}
          </h3>
        </div>

        <template v-if="!selectedSubtopic.name">
          <p class="text-gray-700 leading-relaxed mb-4">
            {{ currentTopic.supplementalInfo?.repeat(10) }}
          </p>
        </template>

        <template v-else>
          <!-- Selected Option's Subtitle, Text, and Follow-up Buttons -->
          <div v-if="selectedOption">
            <h4 class="text-lg font-medium mb-2">
              {{ 'Selected Option: ' + selectedOption }}
            </h4>
            <p class="text-gray-700 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              euismod orci ut sem gravida tincidunt.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <button
                v-for="followUp in 2"
                :key="followUp"
                class="bg-blue-200 text-blue-800 rounded-full px-4 py-1.5 hover:bg-blue-300 transition-all duration-300 shadow-md hover:shadow-lg"
                @click="handleFollowUp(followUp)"
              >
                {{ followUp }}
              </button>
            </div>
          </div>

          <!-- Options and Custom Question Input -->
          <div>
            <!-- Two Column Grid for Options -->
            <div class="flex flex-wrap justify-between mb-4">
              <div class="w-1/2 pr-2">
                <div
                  v-for="i in 3"
                  :key="'left-' + i"
                  class="option-container mb-2 cursor-pointer bg-gray-200 text-gray-800 font-medium p-2 rounded-md transition-all duration-300 hover:bg-blue-200 hover:text-white"
                  @click="selectOption(i)"
                >
                  Lorem ipsum dolor sit amet option {{ i }}
                </div>
              </div>
              <div class="w-1/2 pl-2">
                <div
                  v-for="i in [4, 5, 6]"
                  :key="'right-' + i"
                  class="option-container mb-2 cursor-pointer bg-gray-200 text-gray-800 font-medium p-2 rounded-md transition-all duration-300 hover:bg-blue-200 hover:text-white"
                  @click="selectOption(i)"
                >
                  Lorem ipsum dolor sit amet option {{ i }}
                </div>
              </div>
            </div>

            <!-- Custom Question Input -->
            <div class="mt-4 flex w-2/3 bg-gray-200 p-2 rounded-md shadow-md">
              <label for="customQuestion" class="sr-only"
                >Write your custom question:</label
              >
              <input
                type="text"
                id="customQuestion"
                v-model="customQuestion"
                placeholder="Type your question here..."
                class="flex-grow p-2 border rounded-l-md bg-gray-100 placeholder-gray-600"
              />
              <button
                class="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
                @click="submitCustomQuestion"
              >
                ▶️
                <!-- Triangle Unicode as Send icon -->
              </button>
            </div>
          </div>
        </template>

        <h4 v-if="!selectedSubtopic.name" class="text-lg font-medium mt-4 mb-2">
          Learn More:
        </h4>
        <div v-if="!selectedSubtopic.name" class="flex flex-wrap gap-2">
          <span
            v-for="subtopic in generatedSubtopics"
            :key="subtopic.name"
            class="cursor-pointer bg-green-200 text-green-800 rounded-full px-4 py-1.5 hover:bg-green-300 transition-all duration-300 shadow-md hover:shadow-lg"
            @click="selectedSubtopic = { name: subtopic.name, options: [] }"
          >
            {{ subtopic.name }}
          </span>
        </div>
      </div>

      <!-- Notes Section -->
      <div class="mt-6">
        <label class="my-2 block text-xl font-semibold">Notes</label>

        <!-- Timestamp Button and Textarea Group -->
        <div class="relative">
          <!-- Add Timestamp Button -->
          <button
            class="absolute top-1 right-1 rounded-full bg-blue-200 text-xs px-2 py-1 text-blue-700 hover:bg-blue-300 transition-all duration-300"
            @click="addTimestamp"
          >
            + Timestamp
          </button>

          <!-- Textarea -->
          <textarea
            class="w-full rounded-lg border p-2"
            rows="4"
            placeholder="Write your note..."
          ></textarea>
        </div>

        <!-- Save Note Button -->
        <button
          class="mt-2 bg-blue-500 px-5 py-2 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          @click="saveNote"
        >
          Save Note
        </button>

        <!-- Timestamped Notes -->
        <ul class="mt-4">
          <li v-for="(note, index) in notes" :key="index" class="mb-2">
            <span
              class="text-blue-500 cursor-pointer hover:underline"
              @click="seekVideo(note.timestamp)"
            >
              [{{ note.timestamp }}]
            </span>
            {{ note.content }}
          </li>
        </ul>
      </div>

      <!-- Practice Section -->
      <div class="my-12 cursor-pointer">
        <div
          class="flex items-center justify-between border-b-2 mt-6 pb-2"
          @click="showPractice = !showPractice"
        >
          <h3 class="ml-2 text-2xl font-semibold">Mini-Practice</h3>
        </div>

        <div class="mt-4 grid grid-cols-3 gap-4">
          <div
            v-for="practice in practices"
            :key="practice.title"
            class="h-fit w-full rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
            :class="{
              'bg-blue-100 border-blue-300 shadow-md':
                selectedPractice?.title === practice.title,
            }"
            @click="selectedPractice = practice"
          >
            <h4 class="text-sm font-bold">{{ practice.title }}</h4>
            <p class="text-xs my-2 italic">{{ practice.description }}</p>
            <p class="text-xs font-bold">
              {{ practice.exerciseCount }} exercises
            </p>
          </div>
        </div>

        <Practice :name="selectedPractice?.title" />
      </div>
    </section>
  </main>
</template>

<script>
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue';
import ArrowDown from 'vue-material-design-icons/ArrowDown.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import Practice from './Practice/index.vue';

export default {
  components: {
    AccountCircle,
    ChevronRight,
    ArrowDown,
    Practice,
  },
  mounted() {
    this.selectedModule = this.course.modules[0];
  },
  data() {
    return {
      selectedPractice: null,
      selectedNavItem: 'home',
      supplementalInfo:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.'.repeat(
          10
        ),
      selectedSubtopic: null,
      showPractice: false,
      miniVideos: [
        // sample data
        {
          id: 1,
          title: 'Topic 1',
          thumbnail: 'https://via.placeholder.com/150',
          duration: '5:20',
          isSelected: false,
        },
        {
          id: 2,
          title: 'Topic 2',
          thumbnail: 'https://via.placeholder.com/150',
          duration: '7:10',
          isSelected: false,
        },
        // ... more mini-videos
      ],
      showPractice: false,
      showAssessments: false,
      course: {
        name: 'ChatGPT for Job Searching & Interview Prep',
        modules: [
          {
            id: 1,
            name: 'Intro to ChatGPT and AI Prompts',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'AI, LLMS and ChatGPT',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '5m 20s',
                progress: 100,
                progressText: '100%',
                topics: [
                  {
                    id: 1,
                    title: 'Overview of AI and LLMS',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'What is Artificial Intelligence',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'What are Large Language Models?',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 3,
                        name: 'OpenAI, GPT and ChatGPT',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 4,
                        name: 'What ChatGPT Can and Can\t Do',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 5,
                        name: 'General Use Cases',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 6,
                        name: 'GPT 3.5-Turbo vs GPT-4',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 7,
                        name: 'Other LLM Options and Tools',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                  {
                    id: 2,
                    title: 'Biases, Inaccuracies & Responsible Use',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '4:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'What is a Bias?',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Biases in AI-Generated Content',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 3,
                        name: 'Hallucinations and How to Avoid Them',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 4,
                        name: 'General Recommendations',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                  {
                    id: 3,
                    title: 'Ethical Considerations & Privacy',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '5:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'ChatGPT & Your Privacy',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'What Data is Collected?',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 3,
                        name: 'How You Can Protect Your Privacy',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 4,
                        name: 'AI Assistance vs AI Dependence',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                ],
              },
              {
                id: 2,
                title: 'ChatGPT And The (Modern) Job Market',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '7m 10s',
                progress: 20,
                progressText: '20%',
                topics: [
                  {
                    id: 6,
                    title: 'How Recruiters Are Leveraging ChatGPT',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'Screening Applications',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Communication & Networking',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 3,
                        name: 'Deepening Interviews',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 4,
                        name: 'Automation & "Efficiency"',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                  {
                    id: 7,
                    title: 'The New Problem With Job Searching',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'Job Searching & AI',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Applicant Expectations vs Hiring Realities',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 3,
                        name: 'Metric-Obsessed "Human" Resources',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 4,
                        name: 'Skill Evaluation vs Depth of Knowledge',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                  {
                    id: 8,
                    title: 'How Applicants Are Taking Advantage of ChatGPT',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '4:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'Writing Resumes & Cover Letters',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Optimizing for ATS',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 3,
                        name: 'Communication & Networking',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 4,
                        name: 'Company & Role Research',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 5,
                        name: 'Comprehensive Interview Prep',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 6,
                        name: 'Generating High-Quality Questions',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 7,
                        name: 'Salary Negotation Strategies',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 8,
                        name: 'Personal Brand Building',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                ],
              },
              {
                id: 3,
                title: 'Crafting Effective Prompts',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '7m 10s',
                progress: 20,
                progressText: '20%',
                subtopics: [
                  {
                    id: 1,
                    name: 'Prompt Psychology: Intent, Context & Structure',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 1,
                    name: 'Leveraging & Avoiding Biases',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 2,
                    name: 'Refining & Iterating Prompts',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 3,
                    name: 'Prompt Engineering Basics',
                    supplementalInfo: 'Lorem ipsum',
                  },
                ],
              },
              {
                id: 4,
                title: 'Exploring Common Prompts',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '7m 10s',
                progress: 20,
                progressText: '20%',
                subtopics: [
                  {
                    id: 1,
                    name: 'Role Prompting',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 2,
                    name: 'Context & Reference',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 3,
                    name: 'Specifying Audience',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 4,
                    name: 'Providing Examples',
                    supplementalInfo: 'Lorem ipsum',
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: 'Crafting Compelling Cover Letters with ChatGPT',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'Purpose & Structure of Cover Letters',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '5m 20s',
                progress: 100,
                progressText: '100%',
                topics: [
                  {
                    id: 1,
                    title: 'Aligning to Job Description',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 2,
                    title: 'Demonstrating Passion & Fit',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 3,
                    title: 'Evaluating Ideal Length',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                ],
              },
              {
                id: 2,
                title: 'Using ChatGPT for personalized cover letters',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '5m 20s',
                progress: 100,
                progressText: '100%',
                topics: [
                  {
                    id: 1,
                    title: 'Avoding Generic Templates',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 2,
                    title: 'Input Parameters for Personalization',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                ],
              },
              {
                id: 3,
                title: 'Using ChatGPT for Email & Communication',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '5m 20s',
                progress: 100,
                progressText: '100%',
                topics: [
                  {
                    id: 1,
                    title: 'Writing Effective Emails',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'Power Words',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Curiosity Hooks',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                  {
                    id: 2,
                    title: 'Crafting Concise Subjecet Lines',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'Avoiding Spam Triggers',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                  {
                    id: 3,
                    title: 'Crafting Professional Intro & Body Content',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                    {
                        id: 1,
                        name: 'Maintaining a Personalized Professional Tone',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Ending with a Call to Action',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            name: 'Resume Optimization with ChatGPT',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'Resume Optimization with ChatGPT',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '5m 20s',
                progress: 100,
                progressText: '100%',
                topics: [
                  {
                    id: 1,
                    title: 'Analyzing Job Descriptions',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'Parsing Key Skills & Requirements',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Translating Requirements Into Skills & Achievements',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 3,
                        name: 'Recognizing Industry-Specific Jargon',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                  {
                    id: 2,
                    title: 'Optimizing Resume for ATS Systems',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '4:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'Tailoring Summary & Objective Statements',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Structuring Resume Sectionsn for Maximum Impact',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Quantifying Achievements',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Incorporating Keywords',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Strategic Placement Without Overstuffing',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Integrating Feedback and Iterating Drafts',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                  {
                    id: 2,
                    title: 'Guided Exercises',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '4:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'Matching Candidates to Job Descriptions',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Optimizing Sample Resume Sections',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Feedback Integration',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Selecting the Strongest Resumes',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Strategic Placement Without Overstuffing',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: 'Networking Strategies with LinkedIn & ChatGPT',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'LinkedIn, Networking & ChatGPT',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '5m 20s',
                progress: 100,
                progressText: '100%',
                topics: [
                  {
                    id: 1,
                    title: 'Why LinkedIn?',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 1,
                    title: "The Power of LinkedIn's Algorithm",
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 2,
                    title: 'Using ChatGPT for Posts & Interacting with Others',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '4:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                ],
              },
              {
                id: 2,
                title: 'Creating a Compelling LinkedIn Profile',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '7m 10s',
                progress: 20,
                progressText: '20%',
                topics: [
                  {
                    id: 1,
                    title: 'Crafting an AI-Driven Summary',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 1,
                    title: 'Summarizing Experience',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 1,
                    title: 'Expanding Skills & Achievements',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                ],
              },
              {
                id: 3,
                title: 'Researching Connections',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '7m 10s',
                progress: 20,
                progressText: '20%',
                topics: [
                  {
                    id: 1,
                    title: 'Identifying Shared Experiences',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 2,
                    title: 'Crafting Requests & Messages with ChatGPT',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 3,
                    title: 'Crafting Personalized Invites with ChatGPT',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                ],
              },
              {
                id: 4,
                title: 'Templates for Outreach',
                thumbnail: 'https://via.placeholder.com/150',
                duration: '7:10',
                progress: 100,
                progressText: '100%',
                topics: [
                  {
                    id: 1,
                    title: 'Following Up On Invites',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 2,
                    title: 'Asking for Informational Interviews',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 3,
                    title: 'Personalize Without Overstepping',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 4,
                    title: 'Timing & Frequency',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                ],
              },
              {
                id: 5,
                title: 'Exploring Other Strategies',
                thumbnail: 'https://via.placeholder.com/150',
                duration: '7:10',
                progress: 100,
                progressText: '100%',
                topics: [
                  {
                    id: 1,
                    title: 'Slack Groups',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'Finding Slack Groups',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Participating in Slack Groups',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 3,
                        name: 'Networking in Slack Groups',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                  {
                    id: 2,
                    title: 'Local & Virtual Networking Events',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'Finding Networking Events',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Preparing to Participate in Networking Events',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                  {
                    id: 3,
                    title: 'Seminars & Conferences',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      {
                        id: 1,
                        name: 'Finding Seminars & Conferences',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'Preparing to Participate in Seminars & Conferences',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            name: 'Navigating Interviews with Confidence',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'Preparing for Different Types of Interviews',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '5m 20s',
                progress: 100,
                progressText: '100%',
                topics: [
                  {
                    id: 1,
                    title: 'Phone, Video & In-Person Interviews',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                  },
                  {
                    id: 2,
                    title: 'Screenings & First-Rounds',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '4:10',
                    progress: 100,
                    isSelected: false,
                  },
                  {
                    id: 3,
                    title: 'Follow-Up & Panel Interviews',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '5:10',
                    progress: 100,
                    isSelected: false,
                  },
                  {
                    id: 4,
                    title:
                      'Understanding Behavioral, Situational & Competency-Based Questions',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '5:10',
                    progress: 100,
                    isSelected: false,
                  },
                ],
              },
              {
                id: 2,
                title: 'Using ChatGPT for Interview Prep',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '7m 10s',
                progress: 20,
                progressText: '20%',
                topics: [
                  {
                    id: 1,
                    title: 'Anticipating & Preparing for Common Questions',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 2,
                    title:
                      'Crafting Concise & Impactful Responses with ChatGPT',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 3,
                    title:
                      'Structuring STAR Model Answers for Behavioral Questions',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 4,
                    title:
                      'Crafting High-Quality Questions for the Interviewer',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                  {
                    id: 5,
                    title: 'How to Negotiate Salary & Benefits',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                    subtopics: [
                      // Subtopics here
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 5,
            name: 'Virtual Interview Etiquette & Follow-Up',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'Mastering the Virtual Interview',
                thumbnail: 'https://via.placeholder.com/150',
                duration: '7:10',
                progress: 100,
                progressText: '100%',
                topics: [
                  {
                    id: 1,
                    title: 'Setting Up Your Virtual Interview Space',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                  },
                  {
                    id: 2,
                    title: 'Appearance, Body Langugage & Eye Contact',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                  },
                  {
                    id: 3,
                    title: 'Voice, Tone & Pace',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                  },
                  {
                    id: 4,
                    title: 'Handling Interruptions & Distractions',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                  },
                ],
              },
              {
                id: 2,
                title: 'Using ChatGPT for Thank-You Notes & Follow-Up',
                thumbnail: 'https://via.placeholder.com/150',
                duration: '7:10',
                progress: 100,
                progressText: '100%',
                topics: [
                  {
                    id: 1,
                    title: 'The Art of Expressing Gratitude',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                  },
                  {
                    id: 2,
                    title: 'Appreciation, Recap, Reinforcement',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                  },
                  {
                    id: 3,
                    title: 'Timing Considerations',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                  },
                ],
              },
              {
                id: 3,
                title: 'Following Up Post-Interviews',
                thumbnail: 'https://via.placeholder.com/150',
                duration: '7:10',
                progress: 100,
                progressText: '100%',
                topics: [
                {
                    id: 1,
                    title: 'Tailoring Follow-Up Messages From Feedback',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                  },
                  {
                    id: 2,
                    title: 'Positioning For Feedback Or Next Steps',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                  },
                  {
                    id: 3,
                    title: 'Addressing Concerns to Interviewer',
                    thumbnail: 'https://via.placeholder.com/150',
                    duration: '7:10',
                    progress: 100,
                    isSelected: false,
                  },
                ],
              },
            ],
          }
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
      showPractice: false,
      currentQuestion: {
        prompt:
          'Is the following suggestion meant to enhance intent or structure?',
        options: [
          { label: 'Option A', value: 'intent', text: 'Intent' },
          { label: 'Option B', value: 'structure', text: 'Structure' },
        ],
      },
      feedbackShown: false,
      isCorrect: false,
      feedbackText: '',
      submittedOption: null,
      selectedModule: {},
    };
  },
  computed: {
    currentLesson() {
      return this.course.modules?.[0].lessons?.[0];
    },
    currentTopic() {
      return this.currentLesson.topics?.[0];
    },
    currentSubTopic() {
      return this.currentTopic.subtopics?.[0];
    },
    currentSupplementalInfo() {
      return this.supplementalInfo;
    },
  },
  methods: {
    toggleSection(index) {
      this.sections[index].show = !this.sections[index].show;
    },
    hoverMiniVideo(id) {
      // Do something on hover if required
    },
    unhoverMiniVideo(id) {
      // Reset hover effects if required
    },
    selectMiniVideo(id) {
      this.miniVideos = this.miniVideos.map((video) => {
        video.isSelected = video.id === id;
        return video;
      });
    },
    toggleVideo(index) {
      if (this.activeVideoIndex === index) {
        this.activeVideoIndex = null;
      } else {
        this.activeVideoIndex = index;
      }

      this.$forceUpdate();
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
    },
    selectLesson(index) {
      this.selectedLessonIndex = index; // Update the selected lesson index
    },
    isSelectedLesson(index) {
      return this.selectedLessonIndex === index; // Check if the lesson is selected
    },
    submitAnswer() {
      if (!this.selectedOption) {
        alert('Please select an option before submitting.');
        return;
      }
      // You can add logic here to handle the answer, like giving feedback or navigating to the next question
      alert(`You chose: ${this.selectedOption}`);
    },
    submitAnswer() {
      if (!this.selectedOption) {
        alert('Please select an option before submitting.');
        return;
      }

      this.feedbackShown = true;

      if (this.selectedOption === 'intent') {
        this.isCorrect = true;
        this.feedbackText =
          'The intent of a message ensures that the core message is conveyed correctly. Good job on recognizing that!';
      } else {
        this.isCorrect = false;
        this.feedbackText =
          'This choice focuses on the structure of the message. However, always remember that the intent ensures that the core message is conveyed correctly. The structural elements come next.';
      }
      this.submittedOption = this.selectedOption;
    },
    tryAnotherExercise() {
      this.feedbackShown = false;
      // Logic to fetch a new exercise can be implemented here
    },
    skipExercise() {
      this.feedbackShown = false;
      this.showPractice = false;
      // Logic to navigate to the next part of the course or another exercise can be implemented here
    },
  },
};
</script>

<style scoped>
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

.video-lesson:hover {
  background-color: #f7f7f7;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.video-lesson:hover {
  cursor: pointer;
  transition: all 0.3s ease;
}

.line-through {
  text-decoration: line-through;
}
</style>
