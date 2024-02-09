<template>
  <div
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-4 z-20"
  >
  <transition name="modal" appear>
    <!-- Registration Modal Container -->
    <div
      class="bg-white rounded-2xl pt-8 md:px-12 shadow-2xl max-w-3xl h-3/4 w-full mx-auto space-y-4 relative max-h-[550px]"
    >
      <!-- Custom Progress Bar -->
      <div class="absolute left-8 right-12 top-6 mb-8">
        <div class="flex justify-between items-center">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex flex-col items-center"
          >
            <!-- Circle -->
            <div
              class="w-7 h-7 rounded-full flex items-center justify-center text-sm z-20"
              :class="
                currentStep > index
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              "
            >
              <span>{{ index + 1 }}</span>
            </div>
            <div class="text-xs mt-1">{{ step }}</div>
          </div>
        </div>
        <!-- Progress Bar -->
        <div class="absolute top-3 left-11 right-9 h-1.5 bg-gray-200">
          <div
            class="h-1.5 bg-green-500"
            :style="{
              width: ((currentStep - 1) / (steps.length - 1)) * 100 + '%',
            }"
          ></div>
        </div>
      </div>

      <h2 class="text-3xl md:text-4xl font-bold text-center pt-16">
        {{ stepTitles[currentStep - 1] }}
      </h2>
      <transition name="slide-fade" mode="out-in">
        <div :key="currentStep" class="space-y-6">
          <!-- Step 1: Personal Information -->
          <div v-if="currentStep === 1">
            <div class="space-y-4">
              <p class="text-lg font-medium">What's your name?</p>
              <div class="flex space-x-4">
                <input
                  v-model="formData.firstName"
                  type="text"
                  placeholder="First Name"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
                <input
                  v-model="formData.lastName"
                  type="text"
                  placeholder="Last Name (Optional)"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
            </div>
            <div>
              <p class="text-lg font-medium mt-6 mb-4">What brings you here?</p>
              <div class="grid grid-cols-3 gap-4">
                <button
                  v-for="option in visitReasons"
                  :key="option"
                  @click="toggleVisitReason(option)"
                  :class="[
                    'px-4 py-2 border rounded-lg transition',
                    selectedVisitReasons.includes(option)
                      ? 'text-white bg-blue-500 hover:bg-blue-600'
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200',
                  ]"
                >
                  {{ option }}
                </button>
              </div>
            </div>
          </div>

          <!-- Step 2: Professional Information -->
          <div v-if="currentStep === 2">
            <div class="space-y-2 mt-10">
              <div class="flex items-center">
                <!-- Custom Resume Upload -->
                <label class="flex items-center">
                  <span class="text-lg font-medium">Resume?</span>
                  <div class="relative ml-6">
                    <button
                      class="mx-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                    >
                      <input type="file" class="hidden" />
                      Upload
                    </button>
                  </div>
                </label>

                <!-- LinkedIn Profile Input -->
                <div class="flex items-center w-full ml-6">
                  <label for="linkedin" class="text-lg font-medium"
                    >LinkedIn</label
                  >
                  <input
                    id="linkedin"
                    v-model="formData.linkedin"
                    type="text"
                    class="ml-4 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="Enter your LinkedIn profile"
                  />
                </div>
              </div>
              <!-- Roles Selection -->
              <div>
                <p class="text-lg font-medium mt-4">Current Status</p>
                <div class="grid grid-cols-2 gap-4">
                  <button
                    v-for="role in roles"
                    :key="role"
                    @click="formData.currentRole = role"
                    :class="
                      formData.currentRole === role
                        ? 'px-3 py-2 border rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition'
                        : 'px-3 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition'
                    "
                  >
                    {{ role }}
                  </button>
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <!-- Language Preference Selection -->
                <div class="flex items-center mt-4 w-3/5">
                  <label for="language" class="font-medium min-w-fit"
                    >Preferred Language</label
                  >
                  <select
                    id="language"
                    v-model="formData.language"
                    class="ml-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full"
                    placeholder="Select your language"
                  >
                    <!-- Language options -->
                    <option value="English">English</option>
                    <option value="English">Spanish</option>
                    <!-- Add more languages as needed -->
                  </select>
                </div>

                <!-- Time Zone Selection -->
                <div class="flex items-center mt-4 w-2/5">
                  <label for="timeZone" class="font-medium min-w-fit"
                    >Time Zone</label
                  >
                  <select
                    id="timeZone"
                    v-model="formData.timeZone"
                    class="w-full ml-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="Select your time zone"
                  >
                    <!-- Time zone options -->
                    <option value="GMT-5">GMT-5</option>
                    <option value="GMT-6">GMT-6</option>
                    <!-- Add more time zones as needed -->
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Learning Preferences -->
          <div v-if="currentStep === 3" class="space-y-4 text-base">
            <div class="space-y-2 mt-8">
              <div class="flex justify-between space-x-2">
                <!-- Learning Pace Preference -->
                <div class="w-1/2">
                  <p class="font-semibold mb-1">Learning Pace:</p>
                  <div class="space-x-3">
                    <button
                      v-for="pace in ['Slow', 'Moderate', 'Fast']"
                      :key="pace"
                      @click="formData.learningPace = pace.toLowerCase()"
                      :class="[
                        'px-2 py-1 border rounded-lg transition text-sm',
                        formData.learningPace === pace.toLowerCase()
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                      ]"
                    >
                      {{ pace }}
                    </button>
                  </div>
                </div>

                <!-- Practice Exercise Preference -->
                <div class="w-1/2">
                  <p class="font-semibold mb-1">Practice Exercises:</p>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    v-model="formData.exerciseImportance"
                    class="w-full range range-primary"
                  />
                  <div class="flex justify-between text-xs mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              </div>

              <div class="flex justify-between space-x-2">
                <!-- Content Depth Preference -->
                <div class="w-1/2">
                  <p class="font-semibold mb-1">Content Depth:</p>
                  <div class="space-x-3">
                    <button
                      v-for="depth in ['Breadth', 'Depth']"
                      :key="depth"
                      @click="formData.contentDepth = depth.toLowerCase()"
                      :class="[
                        'px-2 py-1 border rounded-lg transition text-sm',
                        formData.contentDepth === depth.toLowerCase()
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                      ]"
                    >
                      {{ depth }}
                    </button>
                  </div>
                </div>

                <!-- Preferred Student AI Interaction -->
                <div class="w-1/2">
                  <p class="font-semibold mb-1">AI Interaction:</p>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="interaction in [
                        'Conversational',
                        'Concise',
                        'Creative',
                        'Thought-Provoking',
                      ]"
                      :key="interaction"
                      @click="toggleAIInteraction(interaction.toLowerCase())"
                      :class="[
                        'px-2 py-1 border rounded-lg transition text-sm',
                        formData.aiInteractions.includes(
                          interaction.toLowerCase()
                        )
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                      ]"
                    >
                      {{ interaction }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Preferred Supplemental Material Type -->
              <div class="w-full">
                <p class="font-semibold mb-1">Supplemental Info:</p>
                <div class="flex justify-around flex-wrap">
                  <button
                    v-for="material in [
                      'Summary Notes',
                      'Detailed Explanations',
                      'Real-World Connections',
                      'Study Questions',
                    ]"
                    :key="material"
                    @click="formData.supplementalMaterialType = material"
                    :class="[
                      'px-2 py-1 border rounded-lg transition text-sm my-1',
                      formData.supplementalMaterialType === material
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    ]"
                  >
                    {{ material }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Assessments -->
          <div v-if="currentStep === 4" class="space-y-12 text-lg">
            <div class="flex justify-between space-x-8 mt-10">
              <!-- Difficulty Adjustment Preference -->
              <div class="w-1/2">
                <p class="font-semibold mb-1">Difficulty Adjustment:</p>
                <div class="flex justify-around">
                  <button
                    v-for="difficulty in [
                      'Uniform Difficulty',
                      'Adjust to Performance',
                    ]"
                    :key="difficulty"
                    @click="
                      formData.difficultyAdjustment = difficulty.toLowerCase()
                    "
                    :class="[
                      'px-2 py-1 border rounded-lg transition text-sm',
                      formData.difficultyAdjustment === difficulty.toLowerCase()
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    ]"
                  >
                    {{ difficulty }}
                  </button>
                </div>
              </div>

              <!-- Exercise Focus Preference -->
              <div class="w-1/2">
                <p class="font-semibold mb-1">Exercise Focus:</p>
                <div class="flex justify-around">
                  <button
                    v-for="focus in ['Focus on Repetition', 'Focus on Mastery']"
                    :key="focus"
                    @click="formData.exerciseFocus = focus.toLowerCase()"
                    :class="[
                      'px-2 py-1 border rounded-lg transition text-sm',
                      formData.exerciseFocus === focus.toLowerCase()
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    ]"
                  >
                    {{ focus }}
                  </button>
                </div>
              </div>
            </div>

            <div class="flex justify-between space-x-8">
              <!-- Feedback Frequency Preference -->
              <div class="w-1/2">
                <p class="font-semibold mb-1">Feedback Frequency:</p>
                <div class="flex justify-around">
                  <button
                    v-for="frequency in [
                      'After Each Question',
                      'After Full Exercise',
                    ]"
                    :key="frequency"
                    @click="
                      formData.feedbackFrequency = frequency
                        .toLowerCase()
                        .replace(/ /g, '_')
                    "
                    :class="[
                      'px-2 py-1 border rounded-lg transition text-sm',
                      formData.feedbackFrequency ===
                      frequency.toLowerCase().replace(/ /g, '_')
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    ]"
                  >
                    {{ frequency }}
                  </button>
                </div>
              </div>

              <!-- Exercise Type Preference -->
              <div class="w-1/2">
                <p class="font-semibold mb-1">Preferred Exercise Type:</p>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="type in ['Theoretical', 'Practical', 'Mixed']"
                    :key="type"
                    @click="toggleExerciseType(type.toLowerCase())"
                    :class="[
                      'px-2 py-1 border rounded-lg transition text-sm',
                      formData.exerciseTypes.includes(type.toLowerCase())
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    ]"
                  >
                    {{ type }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Subtle Finish Later Button -->
      <div class="flex justify-between pt-10 absolute bottom-6 left-6 right-6">
        <button
          @click="$emit('close-registration')"
          class="px-12 py-2 text-sm shadow-lg text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition"
        >
          Finish Later...
        </button>
        <!-- Back and Next Navigation buttons -->
        <div class="flex space-x-2">
          <button
            v-if="currentStep > 1"
            @click.stop="prevStep"
            class="px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition"
          >
            Back
          </button>
          <button
            v-if="currentStep < steps.length"
            @click.stop="nextStep"
            class="px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition"
          >
            Next
          </button>
          <button
            v-else
            @click.stop="$emit('close-registration')"
            class="px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
          >
            Begin
          </button>
        </div>
      </div>
    </div>
  </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      steps: [
        'Personal Information',
        'Professional Information',
        'Learning Preferences',
        'Assessments',
      ],
      stepTitles: [
        'Welcome',
        'Get to Know You',
        'Your Learning Style',
        'Assessment Preferences',
      ],
      formData: {
        firstName: '',
        lastName: '',
        visitReason: '',
        resume: null,
        linkedin: '',
        currentRole: '',
        language: '',
        timeZone: '',
        learningPace: '',
        exerciseImportance: 5,
        contentDepth: '',
        aiInteractions: [],
        learningFormat: '',
        difficultyAdjustment: '',
        exerciseFocus: '',
        feedbackFrequency: '',
        exerciseTypes: [],
        topicCoverage: '',
      },
      visitReasons: [
        'Upskilling',
        'Career Change',
        'Self-Growth',
        'Teaching',
        'Other',
      ],
      selectedVisitReasons: [],
      roles: ['Employed', 'Student', 'Unemployed', 'Self-employed'],
    };
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    prevStep() {
      this.currentStep--;
    },
    closeModal() {
      // Close the modal and reset the form
      this.currentStep = 1;
      // Reset form data logic here
    },
    toggleVisitReason(reason) {
      const index = this.selectedVisitReasons.indexOf(reason);
      if (index > -1) {
        // Reason is already selected, remove it
        this.selectedVisitReasons.splice(index, 1);
      } else {
        // Reason is not selected, add it
        this.selectedVisitReasons.push(reason);
      }
    },
    toggleExerciseType(type) {
      const index = this.formData.exerciseTypes.indexOf(type);
      if (index > -1) {
        this.formData.exerciseTypes.splice(index, 1);
      } else {
        this.formData.exerciseTypes.push(type);
      }
    },
  },
};
</script>

<style scoped>
/* Slightly slower fade and slide down for entering */
.slide-fade-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

/* Slightly quicker fade and slide up for leaving */
.slide-fade-leave-active {
  transition: opacity 0.1s ease-in, transform 0.1s ease-in;
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.7s, transform 0.7s;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.input-field {
  @apply w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition;
}
.option-button {
  @apply px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition;
}
.option-button-selected {
  @apply px-4 py-2 border rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition;
}
.action-button {
  @apply px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition;
}
.finish-later-button {
  @apply px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition;
}
</style>
