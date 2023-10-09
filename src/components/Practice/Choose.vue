<template>
  <div
    class="mt-8 bg-white p-6 rounded-lg shadow-md transition-all duration-300 transform"
  >
    <div class="flex justify-between items-center mb-6">
      <h5 class="font-semibold text-lg">Question 1: {{ current.prompt }}</h5>
      <button
        @click="showPractice = false"
        class="text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
    </div>

    <div class="flex gap-x-4" :class="{ 'flex-wrap': orientation === 'vertical' }">
      <div
        v-for="(option, index) in current.options"
        :key="index"
        class="mb-2 p-4 bg-white border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300"
        :class="{
          'bg-blue-100 border-blue-300 shadow-md':
            selectedOption === option.value && !feedbackShown,
          'bg-green-100 border-green-300 shadow-md':
            feedbackShown && isCorrect && submittedOption === option.value,
          'bg-red-100 border-red-300 shadow-md':
            feedbackShown && !isCorrect && submittedOption === option.value,
          'border-blue-300': selectedOption === option.value,
          'w-1/2': orientation === 'horizontal',
          'min-w-full': orientation === 'vertical',
        }"
        @click="selectedOption = option.value"
      >
        <h5 class="font-semibold text-lg text-blue-600">
          {{ option.label }}
        </h5>
        <p class="mt-2 text-sm text-gray-700">{{ option.text }}</p>
      </div>
    </div>

    <button
      @click="submitAnswer"
      class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-6"
    >
      Submit
    </button>

    <div
      v-if="feedbackShown"
      class="mt-6 p-4 rounded-lg border-l-4"
      :class="{
        'border-green-400 bg-green-50': isCorrect,
        'border-red-400 bg-red-50': !isCorrect,
      }"
    >
      <h6 class="font-bold mb-2" v-if="isCorrect">Correct!</h6>
      <h6 class="font-bold mb-2" v-else>Incorrect!</h6>
      <p>{{ feedbackText }}</p>
      <ul v-if="!isCorrect" class="mt-2 list-disc pl-6">
        <li>Always prioritize understanding the intent first.</li>
        <li>Structural changes can be made once the intent is clear.</li>
        <li>
          Remember, correct content with the wrong structure can still convey
          the message. But the right structure with incorrect content may
          mislead.
        </li>
      </ul>
      <div v-if="!isCorrect" class="flex justify-start mt-4 space-x-4">
        <button
          @click="tryAnotherExercise"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Try Again
        </button>
        <button
          @click="skipExercise"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Skip
        </button>
      </div>
      <div v-else class="flex justify-start mt-4 space-x-4">
        <button
          @click="tryAnotherExercise"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    orientation: {
      type: String,
      default: 'horizontal',
    },
  },
  data() {
    return {
      selectedOption: null,
      showPractice: false,
      feedbackShown: false,
      isCorrect: false,
      feedbackText: '',
      submittedOption: null,
    };
  },
  computed: {
    current() {
      const options = {
        'Intent or Structure?': {
          type: 'Question',
          prompt:
            'Is the following suggestion meant to enhance intent or structure?',
          options: [
            { label: 'Option A', value: 'intent', text: 'Intent' },
            { label: 'Option B', value: 'structure', text: 'Structure' },
          ],
        },
        'Prompt-Off': {
          type: 'Prompt',
          prompt:
            'Which prompt presents a better example for its intent?',
          options: [
            { label: 'Prompt A', value: 'a', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non erat auctor, pharetra est eu, vestibulum nulla. Cras nec aliquam lectus. Aenean non elit fermentum, consequat urna in, tincidunt nisi. Curabitur eu mi id elit cursus blandit sed ac ante. Proin ultricies orci eget sem vehicula, quis tristique quam gravida. Integer sit amet arcu luctus, fringilla orci ut, interdum orci. Nullam sed turpis sed purus dignissim euismod ac a elit. Praesent dignissim est ac sapien vehicula aliquam.' },
            { label: 'Prompt B', value: 'b', text: 'Sed luctus, mi eu venenatis tincidunt, libero neque fermentum nisl, at tincidunt arcu risus eu nunc. Nulla facilisi. Sed ut quam in justo elementum tincidunt. Fusce tempor, tortor ac varius ultricies, risus tortor venenatis justo, ac congue nibh urna at arcu. Aenean dapibus facilisis nulla, id semper lorem fermentum in. Etiam in nunc vitae orci rhoncus porttitor eu ac odio.' },
          ],
        },
      };

      return options[this.name];
    },
  },
  methods: {
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
      this.selectedOption = null;
    },
    skipExercise() {
      this.feedbackShown = false;
      this.showPractice = false;
      this.selectedOption = null;
    },
  },
};
</script>
