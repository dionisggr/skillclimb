<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between bg-white p-4 shadow-md"
  >
    <div class="flex items-center">
      <!-- Simple SVG ladder icon as a placeholder -->
      <svg
        class="h-6 w-6 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M7 0h2v24H7zm8 0h2v24h-2zm-6 4h6v2h-6zm6 5H9v-2h6zm-6 5h6v2h-6zm6 5H9v-2h6z"
        />
      </svg>
      <h1 class="text-xl font-semibold">SkillClimb</h1>
    </div>
    <nav class="flex items-center space-x-16">
      <div
        class="flex py-1"
        v-for="link in ['Home', 'Courses', 'Certifications', 'About']"
      >
        <a href="#" class="rounded text-gray-700 hover:bg-gray-200">{{
          link
        }}</a>
      </div>
      <div class="flex items-center">
        <input
          type="text"
          placeholder="Search course..."
          class="w-80 rounded-xl border p-2 px-4 ml-8"
        />
        <button
          class="rounded-full bg-gray-200 ml-8 mr-6 p-2 hover:shadow-lg transform transition-all duration-200"
        >
          <account-circle />
        </button>
      </div>
    </nav>
  </header>

  <!-- Main Content -->
  <main class="flex p-4">
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
      <a href="#" class="video-lesson mt-5 flex items-center">
        <!-- Thumbnail with Duration Overlay -->
        <div class="relative mr-2 inline-block w-16">
          <img
            src="https://via.placeholder.com/150"
            alt="Thumbnail"
            class="rounded-md"
          />
          <!-- Absolutely positioned video duration -->
          <p
            class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white rounded-b-md px-1 text-[11px]"
          >
            5m 20s
          </p>
        </div>

        <div class="inline-block w-2/3 py-2">
          <p class="text-sm font-bold text-center">What is ChatGPT?</p>
          <div class="relative h-4 w-full rounded-full bg-gray-200 mt-2">
            <div
              class="absolute left-0 h-full rounded-full bg-green-400"
              style="width: 100%"
            ></div>
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-xs"
            >
              100%
            </div>
          </div>
        </div>
      </a>
      <a href="#" class="video-lesson mt-5 flex items-center">
        <!-- Thumbnail with Duration Overlay -->
        <div class="relative mr-2 inline-block w-16">
          <img
            src="https://via.placeholder.com/150"
            alt="Thumbnail"
            class="rounded-md"
          />
          <!-- Absolutely positioned video duration -->
          <p
            class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white rounded-b-md px-1 text-[11px]"
          >
            7m 10s
          </p>
        </div>

        <div class="inline-block w-2/3">
          <p class="text-sm font-bold text-center">
            ChatGPT And The Job Market
          </p>
          <div class="relative h-4 w-full rounded-full bg-gray-200 mt-2">
            <div
              class="absolute left-0 h-full rounded-full bg-green-400"
              style="width: 20%"
            ></div>
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-xs"
            >
              20%
            </div>
          </div>
        </div>
      </a>

      <a href="#" class="video-lesson mt-5 flex items-center">
        <!-- Thumbnail with Duration Overlay -->
        <div class="relative mr-2 inline-block w-16">
          <img
            src="https://via.placeholder.com/150"
            alt="Thumbnail"
            class="rounded-md"
          />
          <!-- Absolutely positioned video duration -->
          <p
            class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white rounded-b-md px-1 text-[11px]"
          >
            8m 40s
          </p>
        </div>

        <div class="inline-block w-2/3">
          <p class="text-sm font-bold text-center">
            Crafting Effective Prompts
          </p>
          <div class="relative h-4 w-full rounded-full bg-gray-200 mt-2">
            <div
              class="absolute left-0 h-full rounded-full bg-green-400"
              style="width: 0"
            ></div>
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-xs italic text-slate-700"
            >
              Not yet started
            </div>
          </div>
        </div>
      </a>

      <a href="#" class="video-lesson mt-5 flex items-center">
        <!-- Thumbnail with Duration Overlay -->
        <div class="relative mr-2 inline-block w-16">
          <img
            src="https://via.placeholder.com/150"
            alt="Thumbnail"
            class="rounded-md"
          />
          <!-- Absolutely positioned video duration -->
          <p
            class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white rounded-b-md px-1 text-[11px]"
          >
            6m 55s
          </p>
        </div>

        <div class="inline-block w-2/3">
          <p class="text-sm font-bold text-center">Prompt Examples</p>
          <div class="relative h-4 w-full rounded-full bg-gray-200 mt-2">
            <div
              class="absolute left-0 h-full rounded-full bg-green-400"
              style="width: 0"
            ></div>
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-xs italic text-slate-700"
            >
              Not yet started
            </div>
          </div>
        </div>
      </a>

      <!-- ... More video lessons ... -->
    </aside>

    <!-- Course Content -->
    <section class="ml-4 w-3/4 rounded bg-white p-5 pb-20 shadow-md relative">

    <!-- Course Progress -->
    <div class="absolute rounded-full bg-blue-500 text-white p-2 w-fit ml-auto right-[35%]">
        Course Progress: 10%
    </div>
    
    <div class="flex items-center text-sm mb-2">
        <a href="#" class="hover:underline hover:text-blue-500">ChatGPT and AI Prompts</a>
        <chevron-right class="mx-2" />
    </div>
    
    <h2 class="text-2xl font-bold">ChatGPT And The Job Market</h2>

    <!-- Course Video and Right Section -->
    <div class="mb-6 flex min-w-[700px]">
        <video controls class="w-2/3 rounded-lg">
            <source src="https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_5mb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <!-- Right Section: Video Description and Topics -->
        <div class="ml-4 flex w-1/3 flex-col space-y-4">
            <p class="mb-4 mt-2 text-sm italic">
                Supplementary text and details about the course, with more information and insights about the ongoing content.
            </p>

            <!-- Video Topics -->
            <div class="mt-2 max-h-[200px] flex-grow overflow-y-auto">
                <p class="my-2 font-semibold">Topics discussed:</p>
                <!-- Mini-section 1 -->
                <div @click="showSection1 = !showSection1" class="cursor-pointer mb-2">
                    Mini-section 1 <chevron-down />
                </div>
                <div v-if="showSection1">
                    <p>Topic 1.1</p>
                    <p>Topic 1.2</p>
                    <p>Topic 1.3</p>
                </div>

                <!-- Mini-section 2 -->
                <div @click="showSection2 = !showSection2" class="cursor-pointer mb-2">
                    Mini-section 2 <chevron-down />
                </div>
                <div v-if="showSection2">
                    <p>Topic 2.1</p>
                    <p>Topic 2.2</p>
                    <p>Topic 2.3</p>
                </div>

                <!-- Mini-section 3 -->
                <div @click="showSection3 = !showSection3" class="cursor-pointer mb-2">
                    Mini-section 3 <chevron-down />
                </div>
                <div v-if="showSection3">
                    <p>Topic 3.1</p>
                    <p>Topic 3.2</p>
                    <p>Topic 3.3</p>
                </div>
            </div>
        </div>
    </div>

      <!-- Notes Section -->
      <div class="mt-6">
        <label class="mb-2 block text-lg font-semibold">Notes</label>
        <textarea class="w-full rounded-lg border p-2" rows="4"></textarea>
        <button
          class="rounded bg-blue-500 px-4 py-2 text-white"
          style="display: none"
        >
          New Section
        </button>
      </div>

      <!-- Collapsable Practice Section -->
      <div class="my-12 cursor-pointer">
        <div
          class="flex items-center justify-between border-b-2 mt-6 pb-2"
          @click="showPractice = !showPractice"
        >
          <h3 class="ml-2 text-2xl font-semibold">Mini-Practice</h3>
          <arrow-down lass="rotate-0 transform transition-transform" />
        </div>

        <div v-if="showPractice" class="mt-4 grid grid-cols-3 gap-4">
          <div
            class="h-fit w-full rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <h4 class="text-sm font-bold">Intent or Structure?</h4>
            <p class="text-xs my-2 italic">
              Identify the location where suggestions fit best in the prompt
            </p>
            <p class="text-xs font-bold">5 exercises</p>
          </div>

          <div
            class="h-fit w-full rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <h4 class="text-sm font-bold">Bias Busters</h4>
            <p class="text-xs my-2 italic">
              Identify potentially strong biases in provided prompts
            </p>
            <p class="text-xs font-bold">3 exercises</p>
          </div>

          <div
            class="h-fit w-full rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <h4 class="text-sm font-bold">Parts Of A Prompt</h4>
            <p class="text-xs my-2 italic">
              Identify the location where suggestions fit the prompt best
            </p>
            <p class="text-xs font-bold">5 exercises</p>
          </div>

          <div
            class="h-fit w-full rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <h4 class="text-sm font-bold">Prompt Puzzles</h4>
            <p class="text-xs my-2 italic">
              Identify the location where suggestions fit the prompt best
            </p>
            <p class="text-xs font-bold">5 exercises</p>
          </div>

          <div
            class="h-fit w-full rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <h4 class="text-sm font-bold">Prompt-Off</h4>
            <p class="text-xs my-2 italic">
              Identify the location where suggestions fit the prompt best
            </p>
            <p class="text-xs font-bold">5 exercises</p>
          </div>

          <div
            class="h-fit w-full rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <h4 class="text-sm font-bold">Prompt Crafting</h4>
            <p class="text-xs my-2 italic">
              Identify the location where suggestions fit the prompt best
            </p>
            <p class="text-xs font-bold">5 exercises</p>
          </div>
        </div>
      </div>

      <!-- Collapsable Assessments Section -->
      <div class="mb-4 cursor-pointer">
        <div
          class="flex items-center justify-between border-b-2 mt-6 pb-2"
          @click="showAssessments = !showAssessments"
        >
          <h3 class="ml-2 text-2xl font-semibold">Quiz</h3>
          <arrow-down lass="rotate-0 transform transition-transform" />
        </div>

        <div v-if="showAssessments" class="mt-4 grid grid-cols-3 gap-4">
          <div
            class="h-fit w-full rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <h4 class="text-sm font-bold">Practice Quiz</h4>
            <p class="text-xs my-2">
              The content covers all the topics from the video lessons
            </p>
            <p class="text-xs font-bold">10 questions</p>
            <p class="text-xs font-bold">No time limit</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="mt-20 bg-gray-800 py-6 text-center text-white">
    &copy; 2023 SkillClimb. All rights reserved.
  </footer>
</template>

<script>
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue';
import ArrowDown from 'vue-material-design-icons/ArrowDown.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';

export default {
  components: {
    AccountCircle,
    ChevronRight,
    ArrowDown,
  },
  data() {
    return {
      showPractice: false,
      showAssessments: false,
    };
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
</style>
