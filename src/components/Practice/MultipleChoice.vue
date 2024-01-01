<template>
  <div class="p-4">
    <div v-if="isContentCreator">
      <input
        v-model="selectedPractice.title"
        type="text"
        class="text-2xl font-bold my-6 p-2 border rounded w-full"
        placeholder="Enter title here"
      />
      <textarea
        v-model="selectedPractice.description"
        rows="3"
        class="w-full p-2 border rounded mb-4"
        placeholder="Enter description here"
      ></textarea>
    </div>
    <div v-else>
      <h2 class="text-2xl font-bold mt-6 mb-2">{{ selectedPractice.title }}</h2>
      <p>{{ selectedPractice.description }}</p>
    </div>
    <div v-if="isContentCreator">
      <!-- Content Creator Controls -->
      <div class="flex justify-between items-center mb-4">
        <!-- Add Question Button -->
        <button
          @click="addExercise"
          class="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl flex items-center"
        >
          <i class="fas fa-plus mr-2"></i> Add Question
        </button>
        <!-- Mode Toggle Button -->
        <div class="flex items-center">
          <span class="mr-2">Mode:</span>
          <button
            @click="toggleMode"
            :class="selectedPractice.subtype === 'single-answer' ? 'bg-green-500' : 'bg-yellow-500'"
            class="text-white font-bold py-2 px-4 rounded-xl"
          >
            {{ selectedPractice.subtype === 'single-answer' ? 'Single' : 'Multi' }}
          </button>
        </div>
      </div>
      <div class="space-y-4">
        <!-- Questions List -->
        <div
          v-for="(question, qIndex) in selectedPractice.exercises"
          :key="qIndex"
          class="border p-4 rounded-xl"
        >
          <!-- Question Text Input -->
          <div class="flex justify-between items-center mb-2">
            <input
              v-model="question.text"
              type="text"
              placeholder="Question text"
              class="border p-2 rounded w-full"
            />
            <!-- Points Input -->
            <div class="flex items-center ml-2">
              <span class="mr-2">Points:</span>
              <input
                v-model.number="question.points"
                type="number"
                min="1"
                class="w-12 p-1 border rounded"
              />
            </div>
          </div>
          <!-- Options List -->
          <div class="space-y-2">
            <div
              v-for="(option, oIndex) in question.options"
              :key="oIndex"
              class="flex items-center"
            >
              <input
                v-model="option.text"
                type="text"
                placeholder="Option"
                class="border p-2 rounded w-3/4"
              />
              <!-- Remove Option Button -->
              <button
                @click="removeOption(qIndex, oIndex)"
                class="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-xl"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <!-- Add Option Button -->
            <button
              v-if="question.options?.length < 5"
              @click="addOption(qIndex)"
              class="m-1 mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-xl"
            >
              Add Option
            </button>
          </div>
          <div class="flex justify-between items-center mt-4 px-2">
            <!-- Question Points Total -->
            <p class="font-bold mt-2">
              Total: {{ calculateQuestionPoints(question) }} pts
            </p>
            <!-- Remove Question Button -->
            <button
              @click="removeQuestion(qIndex)"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 pr-2.5 rounded-xl"
            >
              <i class="fas fa-trash mr-1"></i> Remove
            </button>
          </div>
        </div>
      </div>
      <!-- Grand Total Points -->
      <div class="flex justify-end mt-6 mr-4">
        <p class="font-bold">Practice Total: {{ calculateTotalPoints }} pts</p>
      </div>
    </div>

    <div v-else class="space-y-4 mt-4">
      <!-- Student View -->
      <h2 class="text-xl font-semibold mb-4 px-1">
        {{ !isContentCreator ? 'Answer the' : null }} Questions
      </h2>
      <form @submit.prevent="submitAnswers">
        <div
          v-for="(question, qIndex) in questions"
          :key="qIndex"
          class="mb-4 p-4 border rounded-lg shadow"
        >
          <p class="font-bold mb-2">{{ qIndex + 1 }}. {{ question.text }}</p>
          <div class="space-y-2">
            <div
              v-for="(option, oIndex) in question.options"
              :key="oIndex"
              class="option-item cursor-pointer p-2 border rounded-lg hover:bg-blue-100"
              :class="{ 'bg-blue-200': isSelected(question, option.text) }"
              @click="selectOption(question, option.text)"
            >
              {{ option.text }}
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mx-2"
          >
            Submit Answers
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isContentCreator: {
      type: Boolean,
      default: false,
    },
    selectedPractice: {
      type: Object,
    },
  },
  data() {
    return {
      questions: [
        {
          text: 'Sample Question 1',
          points: 1,
          options: [{ text: 'Option 1' }],
          selected: [],
        },
        // More questions...
      ],
    };
  },
  computed: {
    calculateTotalPoints() {
      return this.selectedPractice?.exercises.reduce(
        (total, question) => total + this.calculateQuestionPoints(question),
        0
      );
    },
  },
  methods: {
    addExercise() {
      this.$emit('add-exercise')
    },
    removeQuestion(index) {
      if (confirm('Are you sure you want to remove this question?')) {
        this.selectedPractice?.exercises.splice(index, 1);
      }
    },
    addOption(questionIndex) {
      this.selectedPractice?.exercises[questionIndex].options.push({ text: '' });
    },
    removeOption(questionIndex, optionIndex) {
      this.selectedPractice?.exercises[questionIndex].options.splice(optionIndex, 1);
    },
    toggleMode() {
      if (this.selectedPractice.subtype === 'single-answer') {
        this.selectedPractice.subtype = 'multiple-answer';

        this.selectedPractice.exercises.forEach((question) => {
          if (question.selected?.length) {
            question.selected = [...question.selected];
          } else {
            question.selected = [];
          }
        });
      } else {
        this.selectedPractice.subtype = 'single-answer';

        this.selectedPractice.exercises.forEach((question) => {
          if (question.selected?.length > 1) {
            question.selected = [];
          } else {
            question.selected = [question.selected[0]];
          }
        });
      }
    },
    calculateQuestionPoints(question) {
      return this.selectedPractice.subtype === 'single-answer'
        ? question.points
        : question.points * question.options?.length;
    },
    selectOption(question, optionText) {
      if (this.selectedPractice.subtype === 'single-answer') {
        question.selected = [optionText];
      } else {
        const index = question.selected?.indexOf(optionText);
        if (index >= 0) {
          question.selected?.splice(index, 1);
        } else {
          question.selected?.push(optionText);
        }
      }
    },

    isSelected(question, optionText) {
      return question.selected?.includes(optionText);
    },

    submitAnswers() {
      // Handle answer submission logic here
      alert('Answers submitted!'); // Placeholder action
    },
  },
};
</script>

<style>
.option-item {
  transition: background-color 0.2s ease-in-out;
}
</style>
