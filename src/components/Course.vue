<template>
  <!-- Main Content -->
  <main class="flex p-4" v-if="selectedNavItem === 'home'">
    <!-- Sidebar -->
    <aside
      class="h-screen min-w-[350px] max-w-sm overflow-y-auto rounded bg-white p-4 shadow-md"
    >
      <h2
        class="mb-6 text-center text-lg font-bold border border-solid rounded-md p-1"
      >
        Course Lessons
      </h2>

      <!-- Sidebar Video Lessons -->
      <a
        href="#"
        class="video-lesson mt-5 flex items-center"
        v-for="(lesson, index) in course.lessons"
        :key="index"
        :class="{ yourSelectedStyle: isSelectedLesson(index) }"
        @click.prevent="selectLesson(index)"
      >
        <div class="relative mr-2 inline-block w-16">
          <img :src="lesson.thumbnail" :alt="lesson.title" class="rounded-md" />
          <p
            class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white rounded-b-md px-1 text-[11px]"
          >
            {{ lesson.duration }}
          </p>
        </div>
        <div class="inline-block w-2/3">
          <p class="text-sm font-bold text-center">{{ lesson.title }}</p>
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
        <chevron-right class="mx-2" />
      </div>

      <h2 class="text-2xl font-bold">{{ currentLesson.title }}</h2>

      <!-- Course Video and Right Section -->
      <div class="mb-6 flex min-w-[700px]">
        <iframe src="https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="w-full h-auto"></iframe>

        <!-- Right Section: Video Description and Topics -->
        <div class="ml-4 flex w-1/3 flex-col space-y-4">
          <p class="mb-2 mt-2 text-sm italic">
            Supplementary text and details about the course, with more
            information and insights about the ongoing content.
          </p>

          <!-- Video Topics -->
          <div class="mt-2 max-h-[250px] flex-grow overflow-y-auto">
            <p class="mb-2 font-semibold">Topics discussed:</p>

            <div v-for="(section, index) in sections" :key="index">
              <!-- Video Entry -->
              <div
                class="video-topic mt-2 flex items-center p-3 border rounded-md hover:shadow-lg hover:border-opacity-60"
                @click="activateVideo(index)"
                :class="{ 'bg-blue-100': activeVideoIndex === index }"
              >
                <div class="relative mr-2 inline-block w-16">
                  <img
                    :src="section.thumbnail"
                    :alt="section.title"
                    class="rounded-md"
                  />
                  <p
                    class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white rounded-b-md px-1 text-[11px]"
                  >
                    {{ section.duration }}
                  </p>
                </div>
                <div class="inline-block w-2/3">
                  <p class="text-sm font-bold text-center">
                    {{ section.title }}
                  </p>
                  <div
                    class="relative h-2 w-full rounded-full bg-gray-200 mt-2 mb-2"
                  >
                    <div
                      class="absolute left-0 h-full rounded-full bg-green-400"
                      :style="{ width: section.progress + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Expanded Details Section for the current Video Entry -->
              <div
                v-if="activeVideoIndex === index"
                class="mt-2 p-3 bg-gray-50 border rounded-md"
              >
                <p class="text-xs italic">{{ section.description }}</p>
                <ul class="mt-2 space-y-2">
                  <li
                    v-for="topic in section.topics"
                    :key="topic"
                    @click="selectTopic(topic)"
                    class="cursor-pointer border rounded-lg px-4 py-2 flex items-center hover:bg-blue-100 hover:text-blue-700 transition-all duration-300"
                    :class="{
                      'bg-blue-200 text-blue-800 border-blue-500':
                        selectedSubtopic === topic,
                      'line-through': topic.discussed,
                    }"
                  >
                    <!-- Mocked timestamp -->
                    <span class="mr-2 text-xs text-gray-500">{{
                      topic.timestamp || '00:00'
                    }}</span>
                    {{ topic.name }}
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
            {{ currentSection.supplementalInfo.repeat(10) }}
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
            @click="
              selectedPractice = practice;
            "
          >
            <h4 class="text-sm font-bold">{{ practice.title }}</h4>
            <p class="text-xs my-2 italic">{{ practice.description }}</p>
            <p class="text-xs font-bold">
              {{ practice.exerciseCount }} exercises
            </p>
          </div>
        </div>

        <Practice :name="selectedPractice?.title"/>
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
        name: 'ChatGPT and AI Prompts',
        lessons: [
          {
            id: 1,
            title: 'What is ChatGPT?',
            thumbnail: 'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
            duration: '5m 20s',
            progress: 100,
            progressText: '100%',
          },
          {
            id: 2,
            title: 'ChatGPT And The Job Market',
            thumbnail: 'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
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
</style>
