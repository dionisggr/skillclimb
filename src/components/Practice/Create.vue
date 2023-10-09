<template>
  <div class="bg-white p-8 rounded-lg shadow-lg space-y-8">
    <!-- Step 1: Selecting the Part of a Prompt -->
    <div v-if="currentStep === 1" class="space-y-4">
      <h2 class="text-xl font-semibold">Step 1: Choose Parts of a Prompt</h2>
      <div class="flex flex-wrap space-x-2">
        <button
          v-for="(part, idx) in allPromptParts"
          :key="idx"
          @click="selectPart(part)"
          :class="
            selectedPromptParts.includes(part) ? 'bg-blue-200' : 'bg-gray-100'
          "
          class="px-3 py-1 rounded-full hover:bg-blue-300 transition"
        >
          {{ part }}
        </button>
      </div>
      <button
        @click="proceedToStep2"
        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
      >
        Proceed
      </button>
    </div>

    <!-- Feedback container -->
    <div
      v-if="feedbackShown && currentStep === 2"
      :class="
        isCorrect ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
      "
      class="mt-4 p-6 border-l-4 rounded shadow-lg"
    >
      <h3 class="font-bold text-xl mb-4">
        {{ isCorrect ? 'Well Done!' : 'Oops!' }}
      </h3>
      <p>
        {{ step3Feedback || step2Feedback }}
      </p>
      <div v-if="!isCorrect" class="mt-4">
        <button
          @click="retryStep1"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Step 2: Drag and Drop Order -->
    <div v-if="currentStep === 2" class="space-y-4">
      <h2 class="text-xl font-semibold">Step 2: Arrange in Order</h2>
      <div ref="draggableContainer" class="space-y-4">
        <div
          v-for="part in orderedPromptParts"
          :key="part"
          class="draggable-item bg-gray-100 px-4 py-2 rounded shadow hover:shadow-md cursor-move"
        >
          {{ part }}
        </div>
      </div>
      <button
        @click="validateStep2"
        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
      >
        Continue
      </button>
      <div
        v-if="step2Feedback && currentStep >= 2"
        class="mt-4 p-6 border-l-4 rounded shadow-lg"
        :class="
          currentStep === 3
            ? 'bg-yellow-50 border-yellow-400'
            : 'bg-green-50 border-green-400'
        "
      >
        <h3 class="font-bold text-xl mb-4">{{ step2Feedback }}</h3>
      </div>
    </div>

    <!-- Step 3: Select Best Version -->
    <div v-if="currentStep === 3" class="space-y-4">
      <h2 class="text-xl font-semibold">Step 3: Choose the Best Version</h2>

      <!-- Display the concatenated text here -->
      <p class="mb-4">{{ selectedVersionsText }}</p>

      <div v-if="!step3Feedback" v-for="(options, idx) in versions" :key="idx" class="space-y-2">
        <h3 class="text-lg font-semibold">{{ options.label }}</h3>
        <div
          v-for="version in options.choices"
          :class="{
            'bg-blue-100': options.selected === version,
            'bg-gray-100': options.selected !== version,
          }"
          class="px-4 py-2 rounded shadow hover:shadow-md cursor-pointer"
          @click="selectVersion(idx, version)"
        >
          {{ version }}
        </div>
      </div>
      <button
        v-if="!step3Feedback"
        @click="validateStep3"
        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
      >
        Submit
      </button>

      <!-- Feedback for Step 3 -->
      <div
        v-if="step3Feedback"
        class="mt-4 p-4 border-l-4 rounded shadow-lg"
        :class="
          step3Feedback.includes('Fantastic')
            ? 'bg-green-50 border-green-400'
            : 'bg-red-50 border-red-400'
        "
      >
        <p>{{ step3Feedback }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Sortable } from '@shopify/draggable';

export default {
  created() {
    this.allPromptParts = [...this.promptParts, ...this.mockParts];
  },

  mounted() {
    this.initializeDraggable();
  },
  beforeDestroy() {
    if (this.sortable) {
      this.sortable.destroy();
    }
  },
  watch: {
    currentStep(step) {
      if (step === 2) {
        this.$nextTick(() => {
          this.initializeDraggable();
        });
      }
    },
  },
  data() {
    return {
      currentStep: 1,
      promptParts: ['role', 'task', 'instructions', 'context'],
      mockParts: ['mock1', 'mock2', 'mock3', 'mock4', 'mock5'],
      allPromptParts: [],
      selectedPromptParts: [],
      orderedPromptParts: [],
      versions: [],
      feedback: null,
      feedbackShown: false,
      isCorrect: false,
      selectedVersionsText: '',
      step2Feedback: null,
      step3Feedback: null,
    };
  },
  methods: {
    selectPart(part) {
      if (this.selectedPromptParts.includes(part)) {
        this.selectedPromptParts = this.selectedPromptParts.filter(
          (p) => p !== part
        );
      } else {
        this.selectedPromptParts.push(part);
      }
    },
    proceedToStep2() {
      const mockSelections = this.selectedPromptParts.filter((part) =>
        this.mockParts.includes(part)
      );
      if (mockSelections.length > 0) {
        this.isCorrect = false;
        this.feedbackShown = true;
      } else {
        this.isCorrect = true;
        this.feedbackShown = true;
        this.currentStep = 2;
        this.orderedPromptParts = [...this.selectedPromptParts]; // <-- This line initializes the orderedPromptParts array
        this.versions = this.selectedPromptParts.map((part) => ({
          label: part,
          choices: [
            `${part} version 1`,
            `${part} version 2`,
            `${part} version 3`,
          ],
        }));
      }
    },

    retryStep1() {
      this.selectedPromptParts = [];
      this.feedbackShown = false;
    },
    validateStep2() {
      // Here you can add the logic to validate the order. For simplicity, assuming the original order is correct
      if (
        JSON.stringify(this.orderedPromptParts) ===
        JSON.stringify(this.promptParts)
      ) {
        this.currentStep = 3;
      } else {
        this.feedback = 'The order seems incorrect. Try again!';
      }
    },
    retryStep2() {
      this.orderedPromptParts = [...this.selectedPromptParts];
      this.feedback = null;
    },
    selectVersion(idx, version) {
      this.versions[idx].selected = version;
    },
    validateStep3() {
      // Here you can add logic to validate the selected versions
      // For now, just printing them
      console.log(this.versions);
    },
    initializeDraggable() {
      if (this.sortable) {
        this.sortable.destroy();
      }

      this.sortable = new Sortable(this.$refs.draggableContainer, {
        draggable: '.draggable-item',
      });

      this.sortable.on('sortable:stop', (event) => {
        const oldIndex = event.data.oldIndex;
        const newIndex = event.data.newIndex;

        if (oldIndex !== newIndex) {
          const reorderedArray = [...this.orderedPromptParts];
          reorderedArray.splice(
            newIndex,
            0,
            reorderedArray.splice(oldIndex, 1)[0]
          );
          this.orderedPromptParts = reorderedArray;
        }
      });
    },
    selectVersion(idx, version) {
      if (this.versions[idx].selected === version) {
        // If the version is already selected, deselect it
        this.versions[idx].selected = null;
      } else {
        this.versions[idx].selected = version;
      }

      // Update the concatenated text
      this.selectedVersionsText = this.versions
        .map((opt) => opt.selected || '')
        .join(' ');
    },
    validateStep2() {
      if (
        JSON.stringify(this.orderedPromptParts) ===
        JSON.stringify(this.promptParts)
      ) {
        this.currentStep = 3;
        this.step2Feedback = 'Great! The order is correct.';
      } else {
        this.step2Feedback = 'The order seems incorrect. Try again!';
      }
    },
    validateStep3() {
      // Logic for validation (add according to your requirements)
      const isValid = this.versions.every((v) => v.selected !== null);

      if (isValid) {
        this.step3Feedback = 'Fantastic! You have made the right selections.';
      } else {
        this.step3Feedback =
          'Some sections are not chosen. Please select a version for each.';
      }
    },
  },
};
</script>

<style scoped>
/* You can add any scoped styling here using tailwind or regular CSS */
</style>
