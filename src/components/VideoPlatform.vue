<template>
  <div class="bg-gray-50 min-h-screen">

    <!-- Video Content Header -->
    <div class="text-center py-10 bg-indigo-600 text-white">
      <h1 class="text-4xl font-extrabold">Video Content Creation</h1>
      <p class="text-indigo-200">
        Enhance your videos with modern AI technologies.
      </p>
    </div>

    <!-- Main Content Area -->
    <div class="container mx-auto px-4 max-w-screen-xl mt-4">
      
      <!-- Video Upload & Details -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-10">

        <!-- Video Mode Selection -->
        <div class="mb-6 text-center">
          <button
            :class="{ 'bg-indigo-600': !mode, 'bg-gray-300': mode }"
            @click="mode = false"
            class="px-4 py-2 rounded-l-xl text-white"
          >
            Upload
          </button>
          <button
            :class="{ 'bg-indigo-600': mode, 'bg-gray-300': !mode }"
            @click="mode = true"
            class="px-4 py-2 rounded-r-xl text-white"
          >
            Record
          </button>
        </div>

        <div class="flex space-x-6">

          <!-- Upload Mode -->
          <div v-if="!mode" class="flex-1">
            <video class="w-full h-96 rounded-xl" controls></video>
            <div class="mt-4">
              <input type="file" class="border rounded p-2 w-full" />
            </div>
          </div>

          <!-- Record Mode -->
          <div v-if="mode" class="flex-1">

            <!-- Placeholder for live recording feed -->
            <div
              class="w-full h-96 bg-gray-300 rounded-xl mb-4 flex items-center justify-center"
            >
              <span class="text-gray-600">Live Feed Here</span>
            </div>
            <button
              @click="startRecording"
              class="px-5 py-2 w-1/3 mx-auto block bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              Start Recording
            </button>
          </div>

          <!-- AI-related Features and Options -->
          <div class="w-1/3 flex flex-col space-y-4">
            <div class="text-lg font-medium text-gray-700 mb-2">
              AI Features:
            </div>
            <button
              @click="autoEnhance"
              class="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              AI Auto Enhance
            </button>
            <button
              @click="aiTranscription"
              class="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              AI Transcription
            </button>
            <button
              @click="aiAssistant"
              class="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              AI Assistance
            </button>
            <div class="flex space-x-4">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
                />
                Audio Enhancer
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
                />
                Scene Detection
              </label>
            </div>
            <input
              type="text"
              placeholder="Mark Topic"
              class="border rounded p-2 w-full"
            />
            <button
              class="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              Mark Current Video Time
            </button>
          </div>
        </div>

        <!-- General Details -->
        <div class="mt-8 space-y-4">
          <h2 class="text-2xl font-semibold text-gray-700">Video Details</h2>
          <input
            v-model="videoTitle"
            type="text"
            placeholder="Video Title"
            class="border rounded p-2 w-full"
          />
          <textarea
            v-model="videoDescription"
            rows="4"
            placeholder="Description"
            class="border rounded p-2 w-full"
          ></textarea>
          <input
            v-model="videoTags"
            type="text"
            placeholder="Tags (comma separated)"
            class="border rounded p-2 w-full"
          />
        </div>

        <div class="mt-8 flex justify-center">
          <button
            class="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            Save & Process
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoTitle: '',
      videoDescription: '',
      videoTags: '',
      mode: false, // Default to upload mode (false)
    };
  },
  methods: {
    autoEnhance() {
      // Add your AI auto enhance logic here
    },
    aiTranscription() {
      // Add your AI transcription logic here
    },
    startRecording() {
      // Add your start recording logic here
    },
    aiAssistant() {
      // Add your AI assistance logic here
    },
  },
};
</script>

<style scoped>
/* Style for the toggle buttons */
button {
  transition: background-color 0.3s ease-in-out;
}
</style>
