<template>
  <div class="bg-gray-10 min-h-screen pb-1">
    <!-- Video Content Header -->
    <div class="text-center py-6 px-6 bg-blue-500 text-white space-y-4">
      <h1 class="text-3xl lg:text-4xl font-extrabold">
        Video Content Creation
      </h1>
      <p class="text-blue-100">
        Enhance your videos with modern AI technologies.
      </p>
    </div>

    <!-- Main Content Area -->
    <div class="container mx-auto max-w-screen-xl mt-4 lg:px-4">
      <!-- Video Upload & Details -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-10 lg:p-6">
        <!-- Video Mode Selection -->
        <div class="mb-6 text-center">
          <button
            :class="{ 'bg-blue-500': !mode, 'bg-gray-200': mode }"
            @click="mode = false"
            class="px-4 py-2 rounded-l-xl text-white"
          >
            Upload
          </button>
          <button
            :class="{ 'bg-blue-500': mode, 'bg-gray-200': !mode }"
            @click="
              mode = true;
              setupVideoFeed();
            "
            class="px-4 py-2 rounded-r-xl text-white"
          >
            Record
          </button>
        </div>

        <div
          class="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6"
        >
          <!-- Upload Mode -->
          <div v-if="!mode" class="flex-1">
            <!-- Main Video Display -->
            <div v-if="uploadedVideos.length > 0" class="mb-4">
              <!-- Video Container with Overlays -->
              <div class="relative">
                <!-- Shaded Area Before the Video Starts -->
                <div
                  class="absolute bg-black bg-opacity-50"
                  :style="{
                    left: 0,
                    right: `${100 - startPointer}%`,
                    top: 0,
                    bottom: 0,
                  }"
                ></div>

                <!-- Main Video Display -->
                <video
                  ref="video"
                  :src="selectedVideo.url"
                  class="w-full h-52 lg:h-96 rounded-xl"
                  controls
                  preload="auto"
                ></video>

                <!-- Shaded Area After the Video Ends -->
                <div
                  class="absolute bg-black bg-opacity-50"
                  :style="{
                    left: `${endPointer}%`,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }"
                ></div>

                {{ selectedVideo.duration }}
              </div>
              <!-- Range Slider Control -->
              <div class="flex items-center my-4">
                <div
                  class="slider-container w-full h-1 bg-gray-300 relative select-none"
                >
                  <!-- Start Dragger -->
                  <div
                    class="absolute top-0 bg-blue-500 w-4 h-4 -mt-1.5 rounded-full cursor-pointer"
                    :style="{ left: `${startPointer}%` }"
                    @mousedown="initDrag('start')"
                  ></div>

                  <!-- End Dragger -->
                  <div
                    class="absolute top-0 bg-blue-500 w-4 h-4 -mt-1.5 rounded-full cursor-pointer"
                    :style="{ left: `${endPointer}%` }"
                    @mousedown="initDrag('end')"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Thumbnails & Sorting -->
            <div
              v-if="uploadedVideos.length > 0"
              class="flex space-x-2 overflow-x-auto py-2"
            >
              <div
                v-for="(video, index) in uploadedVideos"
                :key="video.id"
                @click="selectVideo(index)"
                class="flex flex-col items-center cursor-pointer"
              >
                <img
                  :src="video.thumbnail"
                  class="w-24 h-16 rounded-md"
                  :class="{
                    'ring-2 ring-blue-500': selectedVideo.id === video.id,
                  }"
                />
                <span class="text-xs mt-1">{{ video.name }}</span>
              </div>
            </div>

            <!-- Controls & Dropdowns (Shown after video upload) -->
            <div
              v-if="uploadedVideos.length > 0"
              class="flex flex-col lg:flex-row justify-between items-center"
            >
              <!-- Existing dropdowns and buttons -->

              <!-- New Play All and Save All buttons -->
              <div class="flex space-x-2 mt-4 lg:mt-0">
                <button
                  @click="playAllVideos"
                  class="px-4 py-2 bg-blue-500 text-white rounded-l-xl"
                >
                  Play All
                </button>
                <button
                  @click="saveAllVideos"
                  class="px-4 py-2 bg-green-600 text-white rounded-r-xl"
                >
                  Save All
                </button>
              </div>
            </div>

            <!-- Upload Input -->
            <input
              type="file"
              multiple
              @change="handleUpload"
              class="border rounded p-2 mx-4 w-full lg:w-3/4 mr-4 mb-4"
            />

            <!-- Controls & Dropdowns (Shown after video upload) -->
            <div
              v-if="uploadedVideos.length > 0"
              class="flex flex-col lg:flex-row"
            >
              <!-- Lesson & Topic Dropdowns -->
              <div class="flex-1 space-y-2 mb-4 lg:mb-0">
                <select
                  v-model="selectedLesson"
                  class="border rounded p-2 w-full"
                >
                  <option disabled value="">Select a Lesson</option>
                  <option>Lesson 1</option>
                  <option>Lesson 2</option>
                  <option>Lesson 3</option>
                </select>

                <select
                  v-model="selectedTopic"
                  class="border rounded p-2 w-full"
                >
                  <option disabled value="">Select a Topic</option>
                  <option>Topic 1</option>
                  <option>Topic 2</option>
                  <option @click="addTopic">+ Add Topic</option>
                </select>
              </div>

              <!-- Toggle between Full Course and Lesson -->
              <div class="flex space-x-2 mt-4 lg:mt-0">
                <button
                  :class="
                    courseMode === 'lesson' ? 'bg-green-600' : 'bg-gray-200'
                  "
                  @click="courseMode = 'lesson'"
                  class="px-4 py-2 rounded-l-xl text-white"
                >
                  Lesson
                </button>
                <button
                  :class="
                    courseMode === 'full-course' ? 'bg-blue-500' : 'bg-gray-200'
                  "
                  @click="courseMode = 'full-course'"
                  class="px-4 py-2 rounded-r-xl text-white min-w-fit"
                >
                  Full Course
                </button>
              </div>
            </div>
          </div>
          <!-- Record Mode -->
          <div v-if="mode" class="flex-1">
            <!-- Teleprompter Overlay -->
            <div
              v-if="showTeleprompter"
              class="fixed -top-4 left-0 right-0 z-50 text-3xl w-1/3 mx-auto"
            >
              <div class="text-center p-4">
                <div
                  class="bg-black bg-opacity-80 text-white h-screen overflow-y-auto p-4 space-y-16"
                >
                  <!-- Scrollable prompter text goes here -->
                  <p v-for="data in teleprompterData">
                    {{ data }}
                  </p>
                </div>
              </div>
            </div>
            <!-- User Full Frame Mode -->
            <video
              v-show="recordingMode === 'user' && stream"
              ref="fullFrameVideo"
              class="w-full h-96 rounded-xl"
              autoplay
              playsinline
            ></video>
            <!-- Whiteboard Mode -->
            <div
              v-show="recordingMode === 'whiteboard' && stream"
              class="w-full h-96 bg-white rounded-xl relative"
              ref="whiteboardContainer"
            >
              <img
                :src="backgroundImageURL"
                class="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                ref="backgroundImage"
                @load="onImageLoad"
              />

              <canvas
                ref="whiteboardCanvas"
                class="absolute top-0 left-0"
                @mousedown="startDrawing"
                @mousemove="draw"
                @mouseup="endDrawing"
                @mouseleave="endDrawing"
                @touchstart="startDrawing"
                @touchmove="draw"
                @touchend="endDrawing"
              ></canvas>

              <video
                ref="whiteboardVideo"
                class="absolute bottom-0 right-0 w-1/4"
                autoplay
                playsinline
              ></video>
            </div>

            <div class="mt-4 flex items-center px-8">
              <button
                @click="changeMode('user')"
                :class="{
                  'bg-gray-200': recordingMode === 'whiteboard',
                  'bg-blue-500': recordingMode === 'user',
                }"
                class="px-4 py-2 text-white rounded-l-lg h-fit"
              >
                Full Frame
              </button>

              <button
                @click="changeMode('whiteboard')"
                :class="{
                  'bg-gray-200': recordingMode === 'user',
                  'bg-blue-500': recordingMode === 'whiteboard',
                }"
                class="px-4 py-2 text-white rounded-r-lg h-fit"
              >
                Whiteboard
              </button>

              <!-- Thumbnails Container -->
              <div
                v-if="recording && backgroundImageURLs.length"
                class="mt-4 flex overflow-x-auto w-fit mx-auto ml-auto mr-0 hide-scrollbar"
              >
                <div
                  v-for="(image, index) in backgroundImageURLs"
                  :key="index"
                  class="flex-none w-28 h-20 rounded-lg overflow-hidden mx-2"
                >
                  <img :src="image" class="w-full h-full object-cover" />
                </div>
              </div>
              <!-- Blinking Recording Notification -->
              <div
                v-if="mediaRecorder && mediaRecorder.state === 'recording'"
                class="flex justify-center items-center my-4 ml-auto space-x-2"
              >
                <!-- Blinking Dot -->
                <div
                  class="w-3 h-3 bg-red-500 rounded-full animate-pulse"
                ></div>

                <!-- Recording Label -->
                <span class="text-sm text-gray-700 font-semibold"
                  >Recording</span
                >
              </div>
            </div>

            <div v-if="videoURL && !whiteboardURL" class="mt-4">
              <h4 class="text-lg font-medium text-gray-700 mb-2">Preview:</h4>
              <video
                class="w-full h-96 rounded-xl"
                controls
                :src="videoURL"
              ></video>
            </div>
            <div v-if="whiteboardURL" class="mt-4">
              <h4 class="text-lg font-medium text-gray-700 mb-2">
                Whiteboard Preview:
              </h4>
              <video
                class="w-full h-96 rounded-xl"
                controls
                :src="whiteboardURL"
              ></video>
            </div>

            <div class="flex justify-between px-4 text-center mt-8">
              <!-- Upload Canvas Button with Previous and Next Arrows -->
              <div class="flex items-center space-x-2">
                <!-- Upload Canvas Button -->
                <label
                  class="min-w-fit block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded-lg"
                >
                  Upload Canvas
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    @change="uploadImages"
                    class="hidden"
                  />
                </label>
              </div>

              <div class="flex justify-center space-x-2 items-center">
                <!-- Color Picker -->
                <input
                  type="color"
                  v-model="activeColor"
                  @change="changeColor"
                  class="w-8 h-8 cursor-pointer rounded-lg border-2 border-gray-300 px-0.5"
                />
                <!-- Clear Canvas Button -->
                <button
                  @click="clearCanvas"
                  class="bg-orange-400 hover:bg-red-700 text-white font-bold text-xs py-1 px-2 rounded-full"
                >
                  Clear
                </button>
              </div>
            </div>

            <div class="flex justify-center items-center my-4 mb-12 mt-8">
              <button
                v-if="!mediaRecorder || mediaRecorder.state !== 'recording'"
                @click="startRecording"
                class="min-w-fit px-5 py-2 w-1/3 mx-auto block bg-green-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                {{ videoURL || whiteboardURL ? 'Resume' : 'Start' }} Recording
              </button>

              <button
                v-if="recording"
                @click="pauseRecording"
                class="mt-4 px-5 py-2 w-1/3 mx-auto block bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-700 transition-colors"
              >
                {{ paused ? 'Resume Recording' : 'Pause Recording' }}
              </button>

              <button
                v-if="mediaRecorder && mediaRecorder.state === 'recording'"
                @click="stopRecording"
                class="px-5 py-2 w-1/3 mx-auto block text-white rounded-lg shadow-md hover:bg-red-700 transition-colors h-fit bg-red-500"
              >
                Stop Recording
              </button>
              <button
                v-if="videoURL || whiteboardURL"
                @click="saveRecording"
                class="px-5 py-2 mx-auto block text-white rounded-lg shadow-md hover:bg-red-700 transition-colors h-fit bg-indigo-500 w-fit"
              >
                Save As...
              </button>
            </div>
          </div>

          <!-- AI-related Features and Options -->
          <div class="flex flex-col space-y-4 w-full lg:w-1/3">
            <div class="text-lg font-medium text-gray-700 mb-2">
              AI Features:
            </div>
            <button
              @click="autoEnhance"
              class="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              AI Auto Enhance
            </button>
            <button
              @click="aiTranscription"
              class="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              AI Transcription
            </button>
            <button
              @click="aiAssistant"
              class="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              AI Insights
            </button>
            <div class="flex space-x-4">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mr-2"
                />
                Audio Enhancer
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mr-2"
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
              class="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Mark Current Video Time
            </button>
          </div>
        </div>

        <div
          v-if="courseMode === 'lesson'"
          class="mt-8 sm:p-6 bg-white rounded-xl shadow-sm mb-10 transform transition relative md:p-4 flex flex-col"
        >
          <!-- Title (Mobile and Tablet View) -->
          <h2
            class="ml-1 text-2xl sm:text-3xl font-bold tracking-wider text-gray-700 mb-6 border-b pb-3 flex items-center mt-8 md:hidden"
          >
            <i
              class="fas fa-video mr-3 sm:mr-4 text-blue-500"
              :class="{
                'text-5xl': screen === 'xs',
                'text-6xl': screen === 'sm',
              }"
            ></i>
            Lessons & Topics
          </h2>

          <!-- Add Lesson Button (Mobile and Tablet View) -->
          <button
            @click="addLesson"
            class="md:hidden text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 z-10 mb-6 mx-auto"
          >
            <i class="fas fa-plus mr-2"></i> Add Lesson
          </button>

          <!-- Title (Desktop View) -->
          <h2
            class="ml-1 text-2xl sm:text-3xl font-bold tracking-wider text-gray-700 mb-6 border-b pb-3 flex items-center mt-8 md:mt-0 hidden md:flex"
          >
            <i
              class="fas fa-video mr-3 sm:mr-4 text-blue-500"
              style="font-size: 1.3rem sm:font-size: 1.6rem"
            ></i>
            Lessons & Topics
          </h2>

          <!-- Add Lesson Button (Desktop View) -->
          <button
            @click="addLesson"
            class="md:absolute top-5 md:right-6 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 z-10 hidden md:block"
          >
            <i class="fas fa-plus mr-2"></i> Add Lesson
          </button>

          <!-- The rest of the code remains the same -->
          <div class="space-y-6">
            <div
              v-for="(lesson, lessonIndex) in videoLessons"
              :key="lessonIndex"
              class="relative border border-gray-200 rounded-lg overflow-hidden"
            >
              <!-- Lesson Header -->
              <div
                class="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 cursor-pointer transition"
                @click="toggleLesson(lessonIndex)"
              >
                <h3
                  class="text-xl font-semibold text-gray-800 flex items-center"
                >
                  <i
                    :class="{
                      'fas fa-angle-down': !isLessonCollapsed[lessonIndex],
                      'fas fa-angle-right': isLessonCollapsed[lessonIndex],
                    }"
                    class="mr-4 text-blue-500"
                  >
                  </i>
                  {{ lesson.title }}

                  <!-- Updated Edit Button -->
                  <button
                    class="ml-6 text-base hover:bg-blue-100 focus:outline-none transition rounded-full"
                  >
                    <i
                      class="fas fa-edit text-blue-600 hover:text-blue-700 text-sm mb-0.5"
                    ></i>
                  </button>
                </h3>
                <div class="flex items-center space-x-3 mx-2">
                  <button
                    v-if="lessonIndex"
                    class="text-xs font-semibold text-gray-600 hover:text-gray-800 focus:outline-none transition"
                    @click.stop="moveLessonUp(lessonIndex)"
                  >
                    <i class="fas fa-arrow-up mr-1"></i>
                    <span class="hidden md:inline">Move Up</span>
                  </button>
                  <button
                    v-if="lessonIndex < videoLessons.length - 1"
                    class="text-xs font-semibold text-gray-600 hover:text-gray-800 focus:outline-none transition"
                    @click.stop="moveLessonDown(lessonIndex)"
                  >
                    <i class="fas fa-arrow-down mr-0.5"></i>
                    <span class="hidden md:inline">Move Down</span>
                  </button>
                </div>
              </div>

              <div v-if="!isLessonCollapsed[lessonIndex]" class="px-4">
                <ul class="divide-y divide-gray-200">
                  <li
                    v-for="(topic, topicIndex) in lesson.topics"
                    :key="topicIndex"
                    class="py-4"
                  >
                    <!-- Topic Header -->
                    <div class="flex justify-between items-center mb-2">
                      <h4
                        v-if="!topic.isEditing"
                        class="text-lg text-gray-700 font-medium"
                      >
                        {{ topic.title }}
                      </h4>
                      <input
                        v-else
                        v-model="topic.title"
                        type="text"
                        class="text-lg text-gray-700 font-medium bg-blue-50 bg-opacity-30 p-2 rounded-md border border-blue-300"
                      />
                      <button
                        class="px-2.5 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none transition"
                        @click="toggleEdit(topic)"
                      >
                        <i class="fas fa-edit mr-0.5"></i>
                        {{ topic.isEditing ? 'Save' : 'Edit' }}
                      </button>
                    </div>

                    <!-- Topic Description -->
                    <div
                      v-if="!topic.isEditing"
                      class="text-sm text-gray-500 mb-2"
                    >
                      {{
                        topic.description ||
                        'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
                      }}
                    </div>
                    <textarea
                      v-else
                      v-model="topic.description"
                      class="text-sm text-gray-500 mb-2 w-full p-2 bg-blue-50 bg-opacity-30 rounded-md border border-blue-300"
                      rows="4"
                    ></textarea>

                    <!-- Topic Tags -->
                    <div v-if="!topic.isEditing" class="mb-2">
                      <span
                        v-for="tag in topic.tags"
                        :key="tag"
                        class="mr-2 p-0.5 px-4 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition cursor-pointer text-sm"
                      >
                        {{ tag }}
                      </span>
                    </div>
                    <div v-else class="flex flex-wrap mb-2 items-center">
                      <div
                        v-for="(tag, index) in topic.tags"
                        :key="index"
                        class="flex items-center m-1 p-0.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-300"
                      >
                        <input
                          v-model="topic.tags[index]"
                          class="px-4 bg-transparent focus:outline-none"
                        />
                        <button
                          @click="removeTag(topic, index)"
                          class="text-red-500 hover:text-red-600 transition text-xs mr-2"
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                      <button
                        @click="addTag(topic)"
                        class="m-1 px-3 py-2 bg-green-200 text-green-600 rounded-full text-xs hover:bg-green-300 transition"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>

                    <!-- Topic Transcript -->
                    <details class="mb-2">
                      <summary
                        class="text-sm mt-6 flex items-center text-blue-600 hover:text-blue-700 cursor-pointer transition"
                      >
                        <i class="fas fa-file-alt mr-2"></i> View Transcript
                      </summary>
                      <div class="mt-2 px-4 py-2 bg-gray-10 rounded-md text-sm">
                        {{
                          topic.transcript ||
                          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?'
                        }}
                      </div>
                    </details>
                  </li>
                  <li class="py-6 flex justify-center">
                    <button
                      class="text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out font-bold py-1.5 px-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                      @click="addTopic(lessonIndex)"
                    >
                      <i class="fas fa-plus mr-2"></i>
                      Add Topic
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- General Details -->

        <div
          class="space-y-4 px-4 sm:px-6 pb-6"
          :class="courseMode === 'lesson' ? 'mt-8' : 'mt-12'"
        >
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-700">
            Course Details
          </h2>
          <input
            v-model="videoTitle"
            type="text"
            placeholder="Course Title"
            class="border rounded p-2 w-full text-sm sm:text-base"
          />
          <textarea
            v-model="videoDescription"
            rows="4"
            placeholder="Description"
            class="border rounded p-2 w-full text-sm sm:text-base"
          ></textarea>
          <input
            v-model="videoTags"
            type="text"
            placeholder="Tags (comma separated)"
            class="border rounded p-2 w-full text-sm sm:text-base"
          />
        </div>

        <div class="mt-8 flex justify-center">
          <button
            class="px-5 py-2 mb-8 bg-blue-500 text-white rounded-2xl shadow-md hover:bg-blue-700 transition-colors"
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
  mounted() {
    this.updateCanvasSize();
    window.addEventListener('resize', this.updateCanvasSize);

    // Add all video lessons to isLessonCollapsed, except for the last one
    this.videoLessons.forEach((lesson, index) => {
      if (index < this.videoLessons.length - 1) {
        this.isLessonCollapsed[index] = true;
      }
    });
  },
  updated() {
    if (this.$refs.video) {
      this.$refs.video.timeupdate = () => {
        console.log(this.$refs.video.duration);
      };
    }
  },
  beforeDestroy() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }

    window.removeEventListener('resize', this.updateCanvasSize);
  },
  data() {
    return {
      videoLessons: [
        {
          title: 'Lesson 1',
          topics: [
            {
              title: 'Topic 1',
              description:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?',
              tags: ['tag1', 'tag2'],
              transcript:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?',
            },
            {
              title: 'Topic 2',
              description:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?',
              tags: ['tag1', 'tag2'],
              transcript:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?',
            },
          ],
        },
        {
          title: 'Lesson 2',
          topics: [
            {
              title: 'Topic 1',
              description:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?',
              tags: ['tag1', 'tag2'],
              transcript:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?',
            },
            {
              title: 'Topic 2',
              description:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?',
              tags: ['tag1', 'tag2'],
              transcript:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?',
            },
          ],
        },
        {
          title: 'Lesson 3',
          topics: [
            {
              title: 'Topic 1',
              description:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?',
              tags: ['tag1', 'tag2'],
              transcript: [
                `Ladies and Gentlemen, Good evening! Thank you for being here
                    with us today. As I stand before you, I am reminded of the
                    incredible journey that has led us to this moment. It is a
                    story marked by perseverance, innovation, and the relentless
                    pursuit of excellence.`,

                `But before we delve into the heart of our
                    discussion, let's take a moment to reflect on the immense
                    beauty that surrounds us. Look around you, the exquisite
                    blend of architecture and nature, the harmonious coexistence
                    of the past and the present. It's a testament to what we, as
                    a society, can achieve when we work together in unison.`,

                `Now, let's pivot to the core of our conversation
                    tonight. We are at the cusp of a technological renaissance.
                    The world as we know it is transforming at an unprecedented
                    pace. Technologies that were once relegated to the realms of
                    science fiction are now becoming a part of our everyday
                    lives. Artificial intelligence is revolutionizing
                    industries, biotechnology is unlocking the secrets of life,
                    and space exploration is expanding the very boundaries of
                    our world. `,
                `However, with great power comes great
                    responsibility. We must tread this path with a keen sense of
                    ethics and a profound respect for the planet that we call
                    home. It is imperative that we harness these advancements
                    not just for economic prosperity but also for the betterment
                    of humanity as a whole. `,
                `As we forge ahead, let
                    us not forget the lessons of history. Time and again, it has
                    been shown that collaboration and understanding are the
                    cornerstones of progress. In this global village, our fates
                    are intertwined like never before. It is by embracing our
                    diversity, by listening and learning from each other, that
                    we can solve the most complex challenges that lie ahead.`,

                `I want to leave you with a thought. Each one of
                    us has the power to make a difference. It doesn't matter how
                    small our actions might seem, for it's the smallest of
                    pebbles that creates the most beautiful ripples. So, I urge
                    you all to take that step, to be the change you wish to see
                    in the world. `,
                `In conclusion, as we look towards
                    the horizon, let's move forward with hope in our hearts and
                    an unwavering faith in our collective potential. The future
                    is not just something we enter, but something we create.`,

                `Thank you once again for your gracious presence
                    here tonight. Let's make it an evening of fruitful
                    discussions, meaningful connections, and an unwavering
                    commitment to shaping a better tomorrow.`,

                `Goodnight, and let's continue to dream big and
                    aspire for greatness!`,
              ],
            },
            {
              title: 'Topic 2',
              description:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?',
              tags: ['tag1', 'tag2'],
              transcript:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, vero?',
            },
          ],
        },
      ],
      videoTitle: '',
      videoDescription: '',
      videoTags: '',
      mode: false,
      stream: null,
      recordingMode: 'user',
      drawing: false,
      points: [],
      mediaRecorder: null,
      chunks: [],
      videoURL: null,
      whiteboardURL: null,
      isLessonCollapsed: {},
      courseMode: 'lesson',
      backgroundImageURL: null,
      activeColor: '#000000',
      paused: false,
      recording: false,
      backgroundImageURLs: [],
      currentImageIndex: 0,
      showTeleprompter: false,
      uploadedVideos: [],
      selectedVideo: {},
      courseMode: 'lesson',
      selectedLesson: '',
      selectedTopic: '',
      startPointer: 0,
      endPointer: 100,
      currentDragger: null,
    };
  },
  computed: {
    backgroundImageURL() {
      return this.backgroundImageURLs[this.currentImageIndex];
    },
    teleprompterData() {
      return this.videoLessons
        .map((lesson) => lesson.topics)
        .flat()
        .map((topic) => topic.transcript)
        .flat();
    },
  },
  methods: {
    initDrag(type) {
      this.currentDragger = type;
      window.addEventListener('mousemove', this.drag);
      window.addEventListener('mouseup', this.stopDrag);
    },
    drag(event) {
      const slider = this.$el.querySelector('.slider-container'); // make sure to add 'slider-container' class to your slider div
      const sliderRect = slider.getBoundingClientRect();
      const newPointerPosition =
        ((event.clientX - sliderRect.left) / sliderRect.width) * 100;
      if (
        this.currentDragger === 'start' &&
        newPointerPosition < this.endPointer
      ) {
        this.startPointer = Math.max(
          0,
          Math.min(newPointerPosition, this.endPointer)
        );
      } else if (
        this.currentDragger === 'end' &&
        newPointerPosition > this.startPointer
      ) {
        this.endPointer = Math.min(
          100,
          Math.max(newPointerPosition, this.startPointer)
        );
      }
    },

    async stopDrag() {
      window.removeEventListener('mousemove', this.drag);
      window.removeEventListener('mouseup', this.stopDrag);
      this.currentDragger = null;
      this.applyVideoClip();
    },
    applyVideoClip() {
      this.selectedVideo.clipStart = this.startPointer / 100;
      this.selectedVideo.clipEnd = this.endPointer / 100;
      const videoElement = this.$refs.video;

      if (!videoElement || videoElement.duration == Infinity) return;

      videoElement.currentTime =
        (this.startPointer / 100) * videoElement.duration;
    },
    async pauseRecording() {
      if (!this.mediaRecorder) return;

      if (this.paused) {
        this.mediaRecorder.resume();
        this.paused = false;
      } else {
        this.mediaRecorder.pause();
        this.paused = true;
      }
    },

    async setupVideoFeed() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
      }

      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        const videoElem =
          this.recordingMode === 'user'
            ? this.$refs.fullFrameVideo
            : this.$refs.whiteboardVideo;
        videoElem.srcObject = this.stream;

        await this.$nextTick(this.updateCanvasSize);

        if (this.recordingMode === 'whiteboard') {
          await this.$nextTick();
          this.recordCanvas(true); // Pass true to indicate setup mode
        }

        document.addEventListener('keydown', this.teleprompterListener);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    },

    async startRecording() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
      }

      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        const videoElem =
          this.recordingMode === 'user'
            ? this.$refs.fullFrameVideo
            : this.$refs.whiteboardVideo;
        videoElem.srcObject = this.stream;

        this.mediaRecorder = new MediaRecorder(this.stream);
        this.mediaRecorder.ondataavailable = (event) => {
          this.chunks.push(event.data);
        };
        this.mediaRecorder.onstop = this.generateVideoURL;
        this.mediaRecorder.start();

        await this.$nextTick(this.updateCanvasSize);

        if (this.recordingMode === 'whiteboard') {
          await this.$nextTick();
          this.recordCanvas();
        }

        this.recording = true;
        this.paused = false;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    },

    stopRecording() {
      this.recording = false;

      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
      }

      if (this.stream) {
        this.stream.getTracks().forEach((track) => {
          track.stop();
        });
        this.stream = null;
      }

      if (this.drawInterval) {
        clearInterval(this.drawInterval);
        this.drawInterval = null;
      }

      this.previousChunks = [...this.previousChunks, ...this.chunks]; // Append new chunks to previous chunks
      this.chunks = []; // Clear the current chunks as they've been appended to the previous chunks

      document.removeEventListener('keydown', this.teleprompterListener);
    },

    saveRecording() {
      // Check if there is a URL to save
      if (this.videoURL || this.whiteboardURL) {
        // Create an anchor element
        const link = document.createElement('a');
        // Set the href to the URL of the video or whiteboard
        link.href = this.videoURL || this.whiteboardURL;
        // Set the download attribute to suggest a filename
        link.download = this.videoURL ? 'recording.mp4' : 'whiteboard.png'; // Choose appropriate file extensions
        // Append the link to the body
        document.body.appendChild(link);
        // Trigger the download
        link.click();
        // Remove the link from the document
        document.body.removeChild(link);
      }
    },
    recordCanvas(isSetupMode = false) {
      const composedCanvas = document.createElement('canvas');
      const composedContext = composedCanvas.getContext('2d');
      const whiteboardCanvas = this.$refs.whiteboardCanvas;
      const whiteboardVideo = this.$refs.whiteboardVideo;
      const backgroundImageElem = this.$refs.backgroundImage; // Reference to the image element

      composedCanvas.width = whiteboardCanvas.width;
      composedCanvas.height = whiteboardCanvas.height;

      // Start drawing both elements onto the composed canvas
      this.drawInterval = setInterval(() => {
        composedContext.clearRect(
          0,
          0,
          composedCanvas.width,
          composedCanvas.height
        );

        // Draw the background image
        if (
          this.imageLoaded &&
          backgroundImageElem &&
          backgroundImageElem.naturalWidth
        ) {
          // Get the aspect ratios
          const canvasAspectRatio =
            composedCanvas.width / composedCanvas.height;
          const imgAspectRatio =
            backgroundImageElem.naturalWidth /
            backgroundImageElem.naturalHeight;

          let drawWidth,
            drawHeight,
            drawX = 0,
            drawY = 0;

          if (canvasAspectRatio > imgAspectRatio) {
            // Canvas is wider
            drawWidth = composedCanvas.width;
            drawHeight = drawWidth / imgAspectRatio;
            drawY = (composedCanvas.height - drawHeight) / 2;
          } else {
            // Image is wider or equal
            drawHeight = composedCanvas.height;
            drawWidth = drawHeight * imgAspectRatio;
            drawX = (composedCanvas.width - drawWidth) / 2;
          }

          composedContext.drawImage(
            backgroundImageElem,
            drawX,
            drawY,
            drawWidth,
            drawHeight
          );
        }

        // Draw the whiteboard
        composedContext.drawImage(whiteboardCanvas, 0, 0);

        // Calculate position and size for the webcam video
        const videoWidth = whiteboardCanvas.width / 4;
        const videoHeight =
          videoWidth *
          (whiteboardVideo.videoHeight / whiteboardVideo.videoWidth);
        const videoX = whiteboardCanvas.width - videoWidth;
        const videoY = whiteboardCanvas.height - videoHeight;
        composedContext.drawImage(
          whiteboardVideo,
          videoX,
          videoY,
          videoWidth,
          videoHeight
        ); // Draw the webcam video
      }, 1000 / 25); // Draw at 25 fps

      const stream = composedCanvas.captureStream(25); // Capture at 25 fps

      if (!isSetupMode) {
        // Start recording only if it's not setup mode
        this.mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm; codecs=vp9',
        });

        this.mediaRecorder.ondataavailable = (event) => {
          this.chunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          clearInterval(this.drawInterval); // Stop drawing when recording stops
          const blob = new Blob(this.chunks, { type: 'video/webm' });
          this.whiteboardURL = URL.createObjectURL(blob);
          this.chunks = []; // Clear the chunks for next recording
        };

        this.mediaRecorder.start(); // Start recording
      }
    },
    async changeMode(newMode) {
      if (this.recordingMode === newMode) {
        // No mode change needed, just return
        return;
      }

      // Stop previous recording if any
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.stopRecording();
      }

      this.recordingMode = newMode;

      // Reinitialize the stream for the new mode
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        const videoElem =
          this.recordingMode === 'user'
            ? this.$refs.fullFrameVideo
            : this.$refs.whiteboardVideo;
        videoElem.srcObject = this.stream;

        // Update the canvas size for the whiteboard
        if (this.recordingMode === 'whiteboard') {
          await this.$nextTick(this.updateCanvasSize);
          // Initialize the composite video setup
          this.initCompositeVideo();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    },

    // New function to initialize the composite video setup
    initCompositeVideo() {
      if (this.recordingMode !== 'whiteboard') {
        return;
      }

      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.recordCanvas();
      }
    },

    toggleLesson(index) {
      this.isLessonCollapsed[index] = !this.isLessonCollapsed[index];
    },
    moveLessonUp(lessonIndex) {
      if (lessonIndex > 0) {
        const aboveLesson = this.videoLessons[lessonIndex - 1];
        this.videoLessons[lessonIndex - 1] = this.videoLessons[lessonIndex];
        this.videoLessons[lessonIndex] = aboveLesson;

        if (lessonIndex in this.isLessonCollapsed) {
          const aboveLessonCollapsed = this.isLessonCollapsed[lessonIndex - 1];
          this.isLessonCollapsed[lessonIndex - 1] =
            this.isLessonCollapsed[lessonIndex];
          this.isLessonCollapsed[lessonIndex] = aboveLessonCollapsed;
        }
      }
    },
    moveLessonDown(lessonIndex) {
      if (lessonIndex < this.videoLessons.length - 1) {
        const belowLesson = this.videoLessons[lessonIndex + 1];
        this.videoLessons[lessonIndex + 1] = this.videoLessons[lessonIndex];
        this.videoLessons[lessonIndex] = belowLesson;

        if (lessonIndex in this.isLessonCollapsed) {
          const belowLessonCollapsed = this.isLessonCollapsed[lessonIndex + 1];
          this.isLessonCollapsed[lessonIndex + 1] =
            this.isLessonCollapsed[lessonIndex];
          this.isLessonCollapsed[lessonIndex] = belowLessonCollapsed;
        }
      }
    },
    generateVideoURL() {
      const blob = new Blob(this.chunks, { type: 'video/mp4' });
      this.videoURL = URL.createObjectURL(blob);
      this.chunks = [];
    },

    autoEnhance() {
      // Add your AI auto enhance logic here
    },
    aiTranscription() {
      // Add your AI transcription logic here
    },
    aiInsights() {
      // Add your AI Insights logic here
    },
    changeColor() {
      const ctx = this.$refs.whiteboardCanvas.getContext('2d');
      ctx.strokeStyle = this.activeColor;
    },

    // Modify your startDrawing method
    startDrawing(event) {
      this.drawing = true;
      this.points.push({
        x: event.offsetX,
        y: event.offsetY,
        color: this.activeColor,
      });
      const ctx = this.$refs.whiteboardCanvas.getContext('2d');
      ctx.beginPath();
      ctx.strokeStyle = this.activeColor; // Set the stroke style to the active color
      ctx.moveTo(event.offsetX, event.offsetY);
    },

    draw(event) {
      if (!this.drawing) return;
      this.points.push({
        x: event.offsetX,
        y: event.offsetY,
        color: this.activeColor,
      });
      this.continueDrawing(event.offsetX, event.offsetY, this.activeColor);
    },

    continueDrawing(x, y, color) {
      const ctx = this.$refs.whiteboardCanvas.getContext('2d');
      ctx.strokeStyle = color; // Set the stroke color for each segment
      ctx.lineTo(x, y);
      ctx.stroke();
    },

    endDrawing() {
      this.drawing = false;
      // No need to clear points here as we are not redrawing the entire line anymore.
    },

    redraw() {
      const ctx = this.$refs.whiteboardCanvas.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.lineJoin = 'round';
      ctx.lineWidth = 5;

      for (let i = 1; i < this.points.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = this.points[i - 1].color; // Use the color saved with the point
        ctx.moveTo(this.points[i - 1].x, this.points[i - 1].y);
        ctx.lineTo(this.points[i].x, this.points[i].y);
        ctx.closePath();
        ctx.stroke();
      }
    },
    updateCanvasSize() {
      if (this.$refs.whiteboardContainer && this.$refs.whiteboardCanvas) {
        const container = this.$refs.whiteboardContainer;
        const canvas = this.$refs.whiteboardCanvas;

        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    },
    toggleEdit(topic) {
      if (topic.isEditing) {
        // Handle saving logic here if needed
      }
      topic.isEditing = !topic.isEditing;
    },
    addTag(topic) {
      topic.tags.push('');
    },
    removeTag(topic, index) {
      topic.tags.splice(index, 1);
    },
    addTopic(lessonIndex) {
      this.videoLessons[lessonIndex].topics.push({
        title: 'New Topic',
        description: '',
        tags: [],
        transcript: '',
      });
    },

    uploadImages(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.backgroundImageURLs.push(e.target.result);
            if (this.currentImageIndex < 0) {
              this.currentImageIndex = 0;
            }
          };
          reader.readAsDataURL(file);
        }
      }
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.backgroundImageURLs.length - 1) {
        this.currentImageIndex++;
      }
    },
    clearBackgroundImage() {
      this.backgroundImageURL = null;
    },
    onImageLoad() {
      this.imageLoaded = true;
    },
    generateFinalVideo() {
      const blob = new Blob(this.chunks, { type: 'video/mp4' });
      this.videoURL = URL.createObjectURL(blob);
      // Reset the chunks for the next series of recordings
      this.chunks = [];
      this.isFirstRecording = true; // Reset the first recording flag
    },
    clearCanvas() {
      const canvas = this.$refs.whiteboardCanvas;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
    },
    teleprompterListener(evt) {
      if (evt.keyCode === 84) {
        this.showTeleprompter = !this.showTeleprompter;
      }
    },
    async handleUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const videoFile = files[i];

        const video = document.createElement('video');
        video.preload = 'metadata';
        const thumbnail = URL.createObjectURL(videoFile); // Mock thumbnail
        this.uploadedVideos.push({
          id: Date.now() + i, // Mock ID
          name: videoFile.name,
          url: thumbnail,
          thumbnail: thumbnail,
          clipStart: 0,
          clipEnd: 1,
        });
      }
      this.selectVideo(0); // Select the first video by default

      // Reset the input value so that the same file can be uploaded again
      event.target.value = '';

      await this.$nextTick(() => {
        const videoElement = this.$refs.video;
        videoElement.currentTime = 0.5;
        console.log(videoElement.duration);

        const onTimeUpdate = () => {
          if (!videoElement?.duration) return;

          if (
            videoElement.currentTime >=
            this.selectedVideo.clipEnd * videoElement.duration
          ) {
            videoElement.pause(); // Pause the video if it reaches the end pointer
            videoElement.currentTime = 0;
          }

          if (
            videoElement.currentTime <
            this.selectedVideo.clipStart * videoElement.duration
          ) {
            videoElement.currentTime =
              this.selectedVideo.clipStart * videoElement.duration;
          }
        };

        videoElement.addEventListener('timeupdate', onTimeUpdate);
      });
    },
    async selectVideo(index) {
      this.selectedVideo = this.uploadedVideos[index];

      this.startPointer = this.selectedVideo.clipStart * 100;
      this.endPointer = this.selectedVideo.clipEnd * 100;

      await this.$nextTick(() => {
        const videoElement = this.$refs.video;
        videoElement.src = this.selectedVideo.url; // Set the video source to the selected video
        videoElement.load(); // Load the new video source
      });

      await this.$nextTick(() => {
        console.log(this.$refs.video);
      });
    },
    addTopic() {
      // Logic to add a new topic
    },
    playAllVideos() {
      let currentVideoIndex = 0;
      const videoElement = this.$refs.video;

      const playNextVideo = () => {
        if (currentVideoIndex < this.uploadedVideos.length) {
          this.selectVideo(currentVideoIndex);

          // Wait for the video to be ready before playing
          const onCanPlay = () => {
            videoElement.play();
            videoElement.removeEventListener('canplay', onCanPlay);
          };
          videoElement.addEventListener('canplay', onCanPlay);
        }
      };

      videoElement.onended = () => {
        currentVideoIndex++;
        if (currentVideoIndex < this.uploadedVideos.length) {
          playNextVideo();
        } else {
          videoElement.onended = null; // Remove the event listener when done
        }
      };

      playNextVideo();
    },
  },
};
</script>

<style scoped>
/* Style for the toggle buttons */
button {
  transition: background-color 0.3s ease-in-out;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.blinking {
  animation: blink 1s linear infinite;
  color: red;
}
</style>
