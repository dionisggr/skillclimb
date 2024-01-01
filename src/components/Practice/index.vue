<template>
  <MultipleChoice
    v-if="selectedPractice?.type === 'multiple-choice'"
    :isContentCreator="isContentCreator"
    :selectedPractice="selectedPractice"
  />
</template>

<script>
import MultipleChoice from './MultipleChoice.vue';

export default {
  components: {
    MultipleChoice,
  },
  props: {
    selectedPractice: {
      type: Object,
      default: () => ({})
    },
    isContentCreator: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      practiceOptions: [
        {
          type: 'multiple-choice',
          subtype: 'single-answer',
        },
        {
          type: 'multiple-choice',
          subtype: 'multiple-answer',
        },
      ],
    };
  },
};
</script>
