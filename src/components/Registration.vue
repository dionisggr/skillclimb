<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-4 z-20">
    <!-- Registration Modals Container -->
    <div class="bg-white rounded-2xl p-8 md:p-12 shadow-2xl max-w-2xl w-full mx-auto space-y-8">
      <h2 class="text-3xl md:text-4xl font-bold text-center">{{ stepTitles[currentStep - 1] }}</h2>

      <!-- Form Steps -->
      <div v-if="currentStep === 1" class="space-y-6">
        <div class="space-y-4">
          <p class="text-lg font-medium">What's your name?</p>
          <div class="flex space-x-4">
            <input v-model="formData.firstName" type="text" placeholder="First Name" class="input-field" />
            <input v-model="formData.lastName" type="text" placeholder="Last Name (Optional)" class="input-field" />
          </div>
        </div>
        <div>
          <p class="text-lg font-medium">What brings you here?</p>
          <div class="grid grid-cols-2 gap-4">
            <button v-for="option in visitReasons" :key="option" @click="formData.visitReason = option" :class="formData.visitReason === option ? 'option-button-selected' : 'option-button'">{{ option }}</button>
          </div>
        </div>
      </div>

      <div v-if="currentStep === 2" class="space-y-6">
        <div class="space-y-4">
          <input type="file" class="input-field" />
          <input v-model="formData.linkedin" type="text" placeholder="LinkedIn Profile (Optional)" class="input-field" />
          <div class="grid grid-cols-2 gap-4">
            <button v-for="role in roles" :key="role" @click="formData.currentRole = role" :class="formData.currentRole === role ? 'option-button-selected' : 'option-button'">{{ role }}</button>
          </div>
        </div>
      </div>

      <!-- Placeholder for Steps 3-5 -->
      <div v-if="currentStep >= 3 && currentStep <= 5" class="text-center">
        <p>Placeholder content for Steps 3-5.</p>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <button @click="currentStep > 1 ? prevStep() : closeModal()" class="action-button">Back</button>
        <button @click="currentStep < steps.length ? nextStep() : closeModal()" class="action-button">{{ currentStep === steps.length ? 'Finish' : 'Next' }}</button>
        <button @click="closeModal" class="finish-later-button">Finish Later</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      steps: ['Personal Information', 'Professional Information', 'Learning Preferences', 'Step 4', 'Step 5'],
      stepTitles: ['Welcome', 'Get to Know You', 'Your Learning Style', 'Step 4 Title', 'Step 5 Title'],
      formData: {
        firstName: '',
        lastName: '',
        visitReason: '',
        resume: null,
        linkedin: '',
        currentRole: '',
      },
      visitReasons: ['Learning', 'Teaching', 'Curiosity', 'Other'],
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
  },
};
</script>

<style scoped>
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
