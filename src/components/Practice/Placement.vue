<template>
  <div class="bg-white p-8 rounded-lg shadow-md space-y-8">
    <h1 class="text-2xl font-bold">Assessment Practice</h1>

    <div v-if="!feedbackShown" class="border-b border-gray-200 mb-4">
      <h2 class="text-xl font-semibold mb-2">Sentence to Place:</h2>
      <p class="bg-blue-50 p-4 rounded">{{ sentenceToAdd }}</p>
    </div>

    <div
      v-if="feedbackShown"
      class="border-b border-gray-200 mb-4 p-4 rounded-lg"
      :class="feedbackCorrect ? 'bg-green-50' : 'bg-red-50'"
    >
      <h2
        :class="feedbackCorrect ? 'text-green-500' : 'text-red-500'"
        class="text-xl font-semibold mb-2"
      >
        {{ feedbackCorrect ? 'Correct!' : 'Incorrect!' }}
      </h2>
      <p>{{ feedbackText }}</p>
      <div class="mt-4">
        <button
          @click="retry"
          class="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 shadow-md mr-2 text-sm"
        >
          Try Again
        </button>
        <button
          class="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 shadow-md text-sm"
          @click="retry"
        >
          Skip
        </button>
      </div>
    </div>

    <div class="text-lg">
      <template v-for="(sentence, index) in paragraphs">
        <span
          :class="
            index === correctPlacementIndex + 1 && feedbackShown
              ? feedbackCorrect
                ? 'text-green-400'
                : 'text-red-500'
              : ''
          "
        >
          {{ sentence }}
        </span>
        <button
          v-if="
            !feedbackShown && sentenceToAdd && index < paragraphs.length - 1
          "
          @click="checkAndProvideFeedback(index)"
          class="bg-blue-300 rounded-full w-6 h-6 mx-2 inline-flex items-center justify-center hover:bg-blue-200 cursor-pointer"
        >
          +
        </button>
        <span
          v-if="feedbackShown && index < paragraphs.length - 1"
          class="mx-0.5"
        ></span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sentenceToAdd:
        'For example, enhancing your cover letter with relevant experiences.',
      paragraphs: [
        'Using ChatGPT for job searching is innovative.',
        'It helps draft personalized cover letters.',
        'Interview simulations with ChatGPT increase confidence.',
        'This way, candidates are better prepared for actual interviews.',
      ],
      correctPlacementIndex: 1,
      feedbackShown: false,
      feedbackCorrect: false,
      feedbackText: '',
    };
  },
  methods: {
    checkAndProvideFeedback(index) {
      if (index === this.correctPlacementIndex) {
        this.feedbackCorrect = true;
        this.feedbackText =
          'You chose the right spot! The sentence enhances the context provided by the second sentence.';
      } else {
        this.feedbackCorrect = false;
        this.feedbackText =
          "That's not the ideal placement. The sentence best fits after the mention of drafting personalized cover letters.";
      }
      this.feedbackShown = true;
      this.paragraphs.splice(
        this.correctPlacementIndex + 1,
        0,
        this.sentenceToAdd
      );
      this.sentenceToAdd = '';
    },
    retry() {
      // Reset state to try again
      this.paragraphs.splice(this.correctPlacementIndex + 1, 1);
      this.sentenceToAdd =
        'For example, enhancing your cover letter with relevant experiences.';
      this.feedbackShown = false;
    },
  },
};
</script>

<style scoped>
/* You can add any additional TailwindCSS styles or other CSS here */
</style>
