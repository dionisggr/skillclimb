<template>
  <div class="bg-white p-8 rounded-lg shadow-md space-y-8">
    <h1 class="text-2xl font-bold">Interactive Text Selection</h1>
    <div
      ref="selectableArea"
      @mousedown="startSelection"
      @mousemove="extendSelection"
      @mouseup="endSelection"
      class="flex flex-wrap cursor-pointer select-none text-lg font-medium border-b-2 pb-4"
    >
      <span
        v-for="(word, index) in words"
        :key="index"
        :data-index="index"
        :class="getWordClass(index)"
        class="px-1 transition-all"
      >
        {{ word }}
      </span>
    </div>
    <div v-if="selections.length" class="space-y-4">
      <h2 class="text-xl font-semibold">Your Selections</h2>
      <ul>
        <li
          v-for="(selection, idx) in selections"
          :key="idx"
          class="flex items-center space-x-4"
        >
          <span class="bg-gray-200 p-1 rounded">{{ selection.text }}</span>
          <input
            v-model="selection.label"
            :placeholder="placeholder"
            class="border rounded p-1"
          />
          <button
            @click="deleteSelection(idx)"
            class="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <i class="fas fa-trash"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Text goes here...',
    },
  },
  data() {
    return {
      words: [
        'Imagine',
        'a',
        'world',
        'where',
        'lorem',
        'ipsum',
        'is',
        'the',
        'standard',
        'text',
        'for',
        'all',
        'designs.',
        "It's",
        'been',
        'used',
        'since',
        'the',
        '1500s,',
        'when',
        'an',
        'unknown',
        'printer',
        'took',
        'a',
        'galley',
        'of',
        'type',
        'and',
        'scrambled',
        'it',
        'to',
        'make',
        'a',
        'type',
        'specimen',
        'book.',
        'But',
        'why',
        'has',
        'it',
        'survived?',
        'Not',
        'only',
        'five',
        'centuries,',
        'but',
        'also',
        'the',
        'leap',
        'into',
        'electronic',
        'typesetting,',
        'remaining',
        'essentially',
        'unchanged.',
      ],
      isSelecting: false,
      startSelectionIndex: null,
      endSelectionIndex: null,
      selectedIndices: [],
      selections: [],
      currentSelection: [],
      colors: [
        'bg-yellow-400',
        'bg-green-400',
        'bg-blue-400',
        'bg-pink-400',
        'bg-purple-400',
      ],
      nextColorIndex: 0,
      hoverColor: 'bg-gray-300',
    };
  },
  methods: {
    startSelection(event) {
      this.isSelecting = true;
      const wordElement = this.getWordElementFromEvent(event);
      if (wordElement) {
        this.startSelectionIndex = parseInt(
          wordElement.getAttribute('data-index'),
          10
        );
        this.selectedIndices = [this.startSelectionIndex];
      }
    },
    extendSelection(event) {
      if (!this.isSelecting) return;
      const wordElement = this.getWordElementFromEvent(event);
      if (wordElement) {
        this.endSelectionIndex = parseInt(
          wordElement.getAttribute('data-index'),
          10
        );
        this.updateSelectionIndices();
      }
    },
    endSelection() {
      this.isSelecting = false;
      const selectedWords = this.selectedIndices
        .map((index) => this.words[index])
        .join(' ');
      const existingIndex = this.selections.findIndex(
        (s) => s.text === selectedWords
      );
      if (existingIndex > -1) {
        this.selections.splice(existingIndex, 1);
      } else {
        this.selections.push({
          text: selectedWords,
          label: '',
          color: this.colors[this.nextColorIndex],
        });
        this.nextColorIndex = (this.nextColorIndex + 1) % this.colors.length;
      }
      this.selectedIndices = [];
      this.startSelectionIndex = null;
      this.endSelectionIndex = null;
    },
    updateSelectionIndices() {
      const minIndex = Math.min(
        this.startSelectionIndex,
        this.endSelectionIndex
      );
      const maxIndex = Math.max(
        this.startSelectionIndex,
        this.endSelectionIndex
      );
      this.selectedIndices = [];
      for (let i = minIndex; i <= maxIndex; i++) {
        this.selectedIndices.push(i);
      }
    },
    getWordElementFromEvent(event) {
      const { target } = event;
      if (target && target.hasAttribute('data-index')) {
        return target;
      }
      return null;
    },
    deleteSelection(index) {
      this.selections.splice(index, 1);
    },
    getWordClass(index) {
      const colorClass = this.getSelectionColor(index);
      if (this.selectedIndices.includes(index)) {
        return `${this.colors[this.nextColorIndex]} hover:${
          this.colors[this.nextColorIndex]
        }`;
      } else if (colorClass) {
        return `${colorClass} hover:${colorClass}`;
      } else {
        return `hover:${this.hoverColor}`;
      }
    },
    getSelectionColor(index) {
      const selection = this.selections.find((selection) => {
        const wordsOfSelection = selection.text.split(' ');
        let idx = this.words.indexOf(wordsOfSelection[0]);
        while (
          idx !== -1 &&
          idx + wordsOfSelection.length <= this.words.length
        ) {
          if (
            this.words.slice(idx, idx + wordsOfSelection.length).join(' ') ===
            selection.text
          ) {
            if (index >= idx && index < idx + wordsOfSelection.length) {
              return true;
            }
          }
          idx = this.words.indexOf(wordsOfSelection[0], idx + 1);
        }
        return false;
      });
      return selection ? selection.color : '';
    },
    isWordPartOfStoredSelections(index) {
      return this.selections.some((selection) => {
        const wordsOfSelection = selection.text.split(' ');
        let idx = this.words.indexOf(wordsOfSelection[0]);
        while (
          idx !== -1 &&
          idx + wordsOfSelection.length <= this.words.length
        ) {
          if (
            this.words.slice(idx, idx + wordsOfSelection.length).join(' ') ===
            selection.text
          ) {
            if (index >= idx && index < idx + wordsOfSelection.length) {
              return true;
            }
          }
          idx = this.words.indexOf(wordsOfSelection[0], idx + 1);
        }
        return false;
      });
    },
  },
};
</script>

<style>
/* Additional styles can be added here if needed */
</style>
