<template>
  <div class="bg-gray-10 min-h-screen pb-1">
    <!-- Video Content Header -->
    <div class="text-center py-10 bg-blue-500 text-white">
      <h1 class="text-4xl font-extrabold">Video Content Creation</h1>
      <p class="text-blue-100">
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
            :class="{ 'bg-blue-500': !mode, 'bg-gray-200': mode }"
            @click="mode = false"
            class="px-4 py-2 rounded-l-xl text-white"
          >
            Upload
          </button>
          <button
            :class="{ 'bg-blue-500': mode, 'bg-gray-200': !mode }"
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
            <div class="mt-2 flex items-center justify-between mr-2">
              <input type="file" class="border rounded p-2 w-3/4 mr-4" />

              <!-- Toggle between Full Course and Lesson -->
              <div class="flex">
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
                class="absolute top-0 left-0 w-full h-full object-cover rounded-xl opacity-50"
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

            <div class="mt-4 flex space-x-4">
              <button
                @click="changeMode('user')"
                :class="{
                  'bg-gray-200': recordingMode === 'whiteboard',
                  'bg-blue-500': recordingMode === 'user',
                }"
                class="px-4 py-2 text-white rounded-l-lg"
                :disabled="!stream"
              >
                Full Frame
              </button>

              <button
                @click="changeMode('whiteboard')"
                :class="{
                  'bg-gray-200': recordingMode === 'user',
                  'bg-blue-500': recordingMode === 'whiteboard',
                }"
                class="px-4 py-2 text-white rounded-r-lg"
              >
                Whiteboard
              </button>
              <!-- Upload Background Button -->
              <div class="flex items-center space-x-2">
                <label
                  class="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Upload Background
                  <input
                    type="file"
                    accept="image/*"
                    @change="uploadImage"
                    class="hidden"
                  />
                </label>

                <!-- Color Picker -->
                <input
                  type="color"
                  v-model="activeColor"
                  @change="changeColor"
                  class="w-8 h-8 cursor-pointer rounded-full border-2 border-gray-300 p-1"
                />
              </div>
            </div>

            <button
              @click="startRecording"
              class="mt-4 px-5 py-2 w-1/3 mx-auto block bg-green-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Start Recording
            </button>
            <!-- Add Stop Recording button -->
            <button
              v-if="stream"
              @click="stopRecording"
              class="mt-4 px-5 py-2 w-1/3 mx-auto block bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors"
            >
              Stop Recording
            </button>

            <div v-if="videoURL" class="mt-4">
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

            <input
              type="file"
              accept="image/*"
              @change="uploadImage"
              class="mt-4"
            />
          </div>

          <!-- AI-related Features and Options -->
          <div class="w-1/3 flex flex-col space-y-4">
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

        <!-- Lessons & Topics Arrangement -->
        <div
          v-if="courseMode === 'lesson'"
          class="mt-8 p-6 bg-white rounded-xl shadow-sm mb-10 transform transition relative"
        >
          <!-- Add Lesson Button -->
          <button
            class="absolute top-6 right-6 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            @click="addLesson"
          >
            <i class="fas fa-plus mr-2"></i>
            Add Lesson
          </button>
          <h2
            class="ml-1 text-3xl font-bold tracking-wider text-gray-700 mb-6 border-b pb-3 flex items-center"
          >
            <i
              class="fas fa-video mr-4 text-blue-500"
              style="font-size: 1.6rem"
            ></i>
            Lessons & Topics
          </h2>

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
                    class="ml-12 text-base hover:bg-blue-100 focus:outline-none transition rounded-full"
                  >
                    <i
                      class="fas fa-edit text-blue-600 hover:text-blue-700"
                    ></i>
                  </button>
                </h3>
                <div class="flex items-center space-x-3 mx-2">
                  <button
                    v-if="lessonIndex"
                    class="text-xs font-semibold text-gray-600 hover:text-gray-800 focus:outline-none transition"
                    @click.stop="moveLessonUp(lessonIndex)"
                  >
                    <i class="fas fa-arrow-up mr-1"></i> Move Up
                  </button>
                  <button
                    v-if="lessonIndex < videoLessons.length - 1"
                    class="text-xs font-semibold text-gray-600 hover:text-gray-800 focus:outline-none transition"
                    @click.stop="moveLessonDown(lessonIndex)"
                  >
                    <i class="fas fa-arrow-down mr-0.5"></i> Move Down
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
          class="space-y-4 px-6 pb-6"
          :class="courseMode === 'lesson' ? 'mt-8' : 'mt-12'"
        >
          <h2 class="text-3xl font-semibold text-gray-700">Course Details</h2>
          <input
            v-model="videoTitle"
            type="text"
            placeholder="Course Title"
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
    };
  },
  methods: {
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

        this.$nextTick(this.updateCanvasSize);

        if (this.recordingMode === 'whiteboard') {
          await this.$nextTick();
          this.recordCanvas();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    },
    stopRecording() {
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
    },
    recordCanvas() {
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
    },
    changeMode(newMode) {
      this.recordingMode = newMode;

      if (this.stream) {
        const videoElem =
          this.recordingMode === 'user'
            ? this.$refs.fullFrameVideo
            : this.$refs.whiteboardVideo;
        videoElem.srcObject = this.stream;
      }

      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        // If we are currently recording, switch the recording to the new mode
        this.stopRecording(); // Stop the current recording
        this.startRecording(); // Start a new recording in the new mode
      }

      if (newMode === 'whiteboard') {
        this.$nextTick(this.updateCanvasSize);
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

    uploadImage(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.backgroundImageURL = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    clearBackgroundImage() {
      this.backgroundImageURL = null;
    },
    onImageLoad() {
      this.imageLoaded = true;
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
