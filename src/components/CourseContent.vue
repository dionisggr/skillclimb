<template>
  <section class="ml-4 w-3/4 rounded bg-white p-5 shadow-md">
    <div class="flex items-center text-sm mb-2">
      <a href="#" class="hover:underline hover:text-blue-500"
        >ChatGPT and AI Prompts</a
      >
      <span class="material-icons text-gray-500 mx-2">chevron_right</span>
    </div>
    <h2 class="text-2xl font-bold">What is ChatGPT?</h2>

    <!-- Course Video and Right Section -->
    <div class="mb-6 flex">
      <video controls class="w-2/3 rounded-lg">
        <source
          src="https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_5mb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <!-- Right Section: Video Description, Progress Bar, and Topics -->
      <div class="ml-4 flex w-1/3 flex-col space-y-4">
        <p class="mb-4 mt-2 text-sm italic">
          Supplementary text and details about the course. This section provides
          more information and insights about the ongoing course content.
        </p>

        <!-- Course Progress -->
        <div class="relative mb-4 h-5 rounded-full bg-gray-200">
          <div
            class="absolute left-0 h-full rounded-full bg-green-400"
            style="width: 70%"
          ></div>
          <div
            class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-xs"
          >
            70%
          </div>
        </div>

        <!-- Video Topics -->
        <div class="mt-2 max-h-[200px] flex-grow overflow-y-auto">
          <p class="my-2 font-semibold">Topics discussed:</p>
          <label class="block">
            <input type="checkbox" class="mr-2" />
            Introduction to ChatGPT
          </label>
          <label class="block">
            <input type="checkbox" class="mr-2" />
            How ChatGPT is revolutionizing AI
          </label>
          <!-- ... More topics ... -->
        </div>
      </div>
    </div>

    <!-- Notes Section -->
    <div class="mt-6">
      <label class="mb-2 block text-lg font-semibold">Notes</label>
      <textarea
        class="mb-4 w-full rounded-lg border p-2"
        rows="4"
        id="notesArea"
      ></textarea>
      <button
        id="newSectionBtn"
        class="rounded bg-blue-500 px-4 py-2 text-white"
        style="display: none"
      >
        New Section
      </button>
    </div>

    <!-- Collapsable Assessment Section (Replaces the Take Quiz button) -->
    <div class="mb-4 cursor-pointer" id="collapsableAssessment">
      <div class="flex items-center justify-between border-b-2 mt-6 pb-2">
        <h3 class="ml-2 text-2xl font-semibold">Assessments</h3>
        <span
          class="material-icons rotate-0 transform transition-transform"
          id="arrowIcon"
          >keyboard_arrow_down</span
        >
      </div>

      <!-- Assessment Cards -->
      <div class="mt-4 hidden grid grid-cols-3 gap-4" id="assessmentCards">
        <AssessmentCard
          v-for="card in assessmentCards"
          :title="card.title"
          :description="card.description"
          :items="card.items"
          :time="card.time"
        />
      </div>
    </div>
  </section>
</template>

<script>
import AssessmentCard from './AssessmentCard.vue';

export default {
  components: {
    AssessmentCard,
  },
  data() {
    return {
      assessmentCards: [
        {
          title: 'Intent or Structure?',
          description: 'Identify the location where suggestions fit the prompt best',
          items: '5 exercises',
          time: '10 mins',
        },
        {
          title: 'Bias Busters',
          description: 'Identify potentially strong biases in provided prompts',
          items: '3 exercises',
          time: '5 mins',
        },
        {
          title: 'Parts Of A Prompt',
          description: 'Identify the location where suggestions fit the prompt best',
          items: '5 exercises',
          time: '10 mins',
        },
        {
          title: 'Prompt Puzzles',
          description: 'Identify the location where prompt suggestions are most effective',
          items: '5 exercises',
          time: '10 mins',
        },
        {
          title: 'Prompt-Off',
          description: 'Compare two prompts and identify which is better',
          items: '5 exercises',
          time: '10 mins',
        },
        {
          title: 'Prompt Crafting',
          description: 'Select which elements are missing for a high-quality prompt',
          items: '5 exercises',
          time: '10 mins',
        },
        {
          title: 'Quiz',
          description: 'The content covers all the topics from the video lessons',
          items: '10 questions',
          time: '15 mins',
        },
      ],
    };
  },
};
</script>
