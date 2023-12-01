<template>
  <!-- Main Content -->
  <main class="flex lg:p-4" v-if="selectedNavItem === 'home'">
    <!-- Sidebar -->
    <button
      @click="toggleSidebar"
      class="lg:hidden fixed bottom-12 left-8 z-30 flex items-center justify-center h-14 w-14 rounded-full bg-blue-500 shadow-xl text-white"
    >
      <!-- Menu Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-menu"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>

    <!-- Sidebar Content -->
    <aside
      :class="
        sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
      "
      class="w-11/12 max-w-[325px] mt-16 pt-12 fixed inset-y-0 left-0 transform overflow-y-auto bg-white p-4 shadow-md transition duration-300 z-40 lg:relative lg:translate-x-0 lg:block lg:mt-0 lg:w-full"
    >
      <h2
        class="mb-6 text-center text-lg font-bold border border-solid rounded-md p-1 absolute top-3 w-3/4 lg:w-11/12"
      >
        Course Modules
      </h2>
      <!-- Close Button (Visible only on mobile) -->
      <button
        @click="toggleSidebar"
        class="lg:hidden absolute top-4 right-4 flex items-center justify-center h-8 w-8 rounded-full bg-gray-200"
      >
        <!-- Close Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <input
        type="file"
        ref="thumbnail"
        accept="image/*"
        class="hidden"
        @change="handleThumbnailUpload($event, index)"
      />

      <!-- Sidebar Modules -->
      <div
        :class="{
          'border-blue-300 shadow-md': courseModule.id === selectedModule.id,
          'border-gray-300': courseModule.id !== selectedModule.id,
        }"
        class="video-lesson mt-3 flex items-center relative p-2 border rounded-md transition-all duration-300 ease-in-out"
        :style="
          courseModule.id === selectedModule.id && 'background-color: #f3f8ff;'
        "
        v-for="(courseModule, index) in course.modules"
        :key="index"
        @click.prevent="selectModule(index)"
      >
        <div class="relative mr-2 inline-block w-16">
          <img
            :src="courseModule.thumbnail"
            :alt="courseModule.name"
            class="rounded-md"
          />
          <p
            class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white rounded-b-md px-1 text-[11px]"
          >
            {{ courseModule.duration }}
          </p>

          <!-- Upload Icon Button -->
          <div
            v-if="isContentCreator"
            class="absolute -bottom-2 -right-2 mb-1 mr-1"
          >
            <button
              @click="uploadThumbnail(index)"
              class="text-white bg-blue-500 hover:bg-blue-700 rounded-full text-xs p-1 px-2"
            >
              <!-- Replace with your upload icon -->
              <i class="fa fa-upload"></i>
            </button>
          </div>
        </div>

        <div
          v-if="!courseModule.edit"
          class="inline-block w-2/3 overflow-hidden"
        >
          <p class="text-sm font-bold text-center px-2">
            {{ courseModule.name }}
          </p>

          <!-- Progress Bar here -->
          <div
            v-if="!isContentCreator"
            class="relative h-4 w-full rounded-full bg-gray-200 mt-2"
          >
            <div
              class="absolute left-0 h-full rounded-full bg-green-400"
              :style="{ width: courseModule.progress + '%' }"
            ></div>
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-xs"
            >
              {{ courseModule.progressText }}
            </div>
          </div>
        </div>

        <div v-else class="inline-block w-2/3">
          <input
            type="text"
            v-model="editedModule.name"
            class="text-sm font-bold text-center w-full"
          />
          <!-- Icon-based Save and Cancel buttons -->
          <div class="flex justify-center mt-2">
            <button
              @click="saveModule(index)"
              class="text-green-500 hover:text-green-700 mr-2"
            >
              <!-- Replace with your save icon -->
              <i class="fa fa-check-circle"></i>
            </button>
            <button
              @click="cancelEdit(index)"
              class="text-red-500 hover:text-red-700"
            >
              <!-- Replace with your cancel icon -->
              <i class="fa fa-times-circle"></i>
            </button>
          </div>
        </div>

        <!-- Icon buttons -->
        <div
          v-if="isContentCreator"
          class="absolute top-0 right-0 mt-2 mr-2 flex flex-col items-end justify-between text-sm h-5/6"
        >
          <button
            @click="editModule(index)"
            class="text-blue-500 hover:text-blue-700"
          >
            <!-- Replace with your edit icon -->
            <i class="fa fa-edit"></i>
          </button>
          <button
            @click="deleteLesson(index)"
            class="text-red-500 hover:text-red-700 ml-2 mr-1"
          >
            <!-- Replace with your delete icon -->
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>

      <button
        v-if="isContentCreator"
        @click="addModule"
        class="mt-7 mb-4 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl bg-blue-500 w-2/3 block mx-auto"
      >
        Add Module
      </button>
    </aside>

    <!-- Course Content -->
    <section
      class="w-full md:w-3/4 rounded bg-white p-5 pb-0 shadow-md relative lg:ml-4"
    >
      <div class="flex items-center text-sm mb-2">
        <a href="#" class="hover:underline hover:text-blue-500 font-medium">{{
          course.name
        }}</a>
        <chevron-right size="20" class="mx-1" />
      </div>

      <div class="flex items-center">
        <h2 v-if="!isEditingLessonTitle" class="text-2xl font-bold m-1 mt-4">
          {{ selectedLesson?.title }}
        </h2>
        <input
          v-else
          type="text"
          v-model="editedLesson.title"
          class="text-2xl font-bold m-1 mt-4 border-b-2 border-gray-300"
        />
        <button
          v-if="isContentCreator"
          @click="isEditingLessonTitle ? saveLesson(index) : editLessonTitle()"
          class="ml-2"
        >
          <span v-if="!isEditingLessonTitle">✎</span>
          <span v-else>✔️</span>
        </button>
        <button
          v-if="isEditingLessonTitle"
          @click="cancelEditLesson"
          class="ml-2"
        >
          ❌
        </button>
      </div>

      <!-- Course Video and Right Section -->
      <div class="mb-6 flex flex-col md:flex-row">
        <div
          :class="{
            'relative block rounded-lg overflow-hidden mx-auto w-full max-w-4xl': true,
            'shadow-lg': selectedLesson?.videoUrl,
          }"
        >
          <!-- Iframe - shown only if selectedLesson.videoUrl is not null -->
          <iframe
            v-if="selectedLesson?.videoUrl"
            :src="selectedLesson?.videoUrl"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="h-full rounded-2xl w-full mb-4 md:mb-0"
            :autoplay="false"
          ></iframe>

          <!-- Upload Button - shown only if selectedLesson.videoUrl is null -->
          <button
            v-if="!selectedLesson?.videoUrl && isContentCreator"
            @click="uploadVideo"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          >
            Upload
          </button>

          <!-- File Input - hidden -->
          <input
            type="file"
            ref="video"
            @change="handleVideoUpload"
            accept="video/*"
            hidden
          />

          <!-- Remove Video Button -->
          <button
            v-if="selectedLesson?.videoUrl && isContentCreator"
            @click="removeVideo"
            class="absolute bottom-2 right-2 text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove
          </button>
        </div>

        <!-- Right Section: Video Description and Topics -->
        <div
          class="flex-grow ml-0 md:ml-4 flex w-full md:w-2/5 flex-col space-y-4"
        >
          <!-- Video Topics -->
          <div class="h-[400px] overflow-y-auto pb-12">
            <p class="mb-2 font-semibold text-lg text-gray-800">
              Module Lessons:
            </p>

            <div v-for="(lesson, index) in selectedModule.lessons" :key="index">
              <!-- Video Entry -->
              <div
                class="relative video-lesson mt-3 flex items-center p-3 border border-blue-500 rounded-md shadow-md hover:shadow-lg border-opacity-30"
                @click="selectLesson(index)"
                :class="{
                  'border-blue-800 shadow-lg': selectedLesson.id === lesson.id,
                  'hover:bg-blue-50': selectedLesson.id !== lesson.id,
                }"
                :style="{
                  'background-color':
                    selectedLesson.id === lesson.id ? '#f3f8ff' : 'white',
                }"
              >
                <div class="relative mr-2 inline-block w-16">
                  <img
                    :src="lesson.thumbnail"
                    :alt="lesson.title"
                    class="rounded-md"
                  />
                  <p
                    class="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white rounded-b-md px-1 text-[11px]"
                  >
                    {{ lesson.duration }}
                  </p>
                </div>
                <div v-if="!lesson.isEditing" class="inline-block w-2/3">
                  <p class="text-sm font-bold ml-1">{{ lesson.title }}</p>
                  <div
                    v-if="!isContentCreator"
                    class="relative h-2 w-full rounded-full bg-gray-300 mt-2 mb-2"
                  >
                    <div
                      class="absolute left-0 h-full rounded-full bg-green-400"
                      :style="{ width: lesson.progress + '%' }"
                    ></div>
                  </div>
                </div>
                <!-- Editable Lesson Title -->
                <div v-else class="inline-block w-2/3 mt-2">
                  <input
                    type="text"
                    v-model="editedLesson.title"
                    class="w-full p-1 border rounded-md text-sm"
                  />
                </div>
                <!-- Edit and Delete Icons (Absolute Positioning) -->
                <div
                  v-if="isContentCreator && !lesson.isEditing"
                  class="absolute top-1 right-3 flex flex-col h-5/6 justify-between"
                >
                  <button
                    @click.stop="editLesson(index)"
                    class="text-blue-500 hover:text-blue-700 text-lg"
                  >
                    ✎
                  </button>
                  <button
                    @click.stop="confirmDeleteLesson(index)"
                    class="text-red-500 hover:text-red-700 text-sm"
                  >
                    🗑
                  </button>
                </div>
                <!-- Save and Cancel Icons for Editing -->
                <div
                  v-if="isContentCreator && lesson.isEditing"
                  class="absolute top-1 right-3 flex space-x-3 text-xs"
                >
                  <button
                    @click="saveLesson(index)"
                    class="text-green-500 hover:text-green-700"
                  >
                    ✔️
                  </button>
                  <button
                    @click="cancelLessonEdit(index)"
                    class="text-red-500 hover:text-red-700"
                  >
                    ❌
                  </button>
                </div>
              </div>

              <!-- Expanded Details Section for the current Video Entry -->
              <div
                v-if="lesson.id === selectedLesson.id"
                class="p-2 bg-gray-50 border rounded-md"
              >
                <p class="text-xs italic">{{ lesson.description }}</p>
                <ul class="space-y-2">
                  <li
                    v-for="(topic, topicIndex) in selectedLesson?.topics"
                    :key="topic.id"
                    class="relative cursor-pointer border rounded-lg px-4 py-3 flex justify-between text-sm font-medium items-center hover:bg-gray-100 hover:text-gray-700 transition-all duration-300"
                    :class="{
                      'bg-gray-200 hover:bg-gray-200 text-gray-800 border-gray-300':
                        selectedTopic.id === topic.id,
                      'line-through': topic.discussed,
                    }"
                  >
                    <div
                      class="flex items-center my-2"
                      @click="selectTopic(topic)"
                    >
                      <!-- Mocked timestamp -->
                      <span class="mr-4 text-xs text-gray-500">{{
                        topic.timestamp || '00:00'
                      }}</span>
                      <span v-if="!topic.isEditing" class="mr-4 block">{{
                        topic.title
                      }}</span>
                      <input
                        v-else
                        type="text"
                        v-model="editedTopic.title"
                        class="text-sm w-full"
                      />
                    </div>
                    <div
                      v-if="isContentCreator"
                      class="flex flex-col justify-between h-full absolute right-0"
                    >
                      <!-- Edit and Delete Icons -->
                      <button
                        v-if="!topic.isEditing"
                        @click.stop="editTopic(topic)"
                        class="text-blue-500 hover:text-blue-700 mr-2 text-lg mt-0.5"
                      >
                        ✎
                      </button>
                      <button
                        v-if="topic.isEditing"
                        @click.stop="saveTopicEdit(topicIndex)"
                        class="text-green-500 hover:text-green-700 mr-2 text-xs mt-0.5"
                      >
                        ✔️
                      </button>
                      <button
                        v-if="topic.isEditing"
                        @click.stop="cancelTopicEdit(topicIndex)"
                        class="text-red-500 hover:text-red-700 mr-2 text-xs mb-0.5"
                      >
                        ❌
                      </button>
                      <button
                        v-if="!topic.isEditing"
                        @click.stop="confirmDeleteTopic(topicIndex)"
                        class="text-red-500 hover:text-red-700 text-sm mb-0.5 mr-1.5"
                      >
                        🗑
                      </button>
                    </div>
                  </li>
                </ul>
                <!-- Add Topic Button for the current lesson -->
                <button
                  v-if="isContentCreator"
                  @click="addTopic()"
                  class="my-4 p-1 px-2 bg-amber-500 text-sm block mx-auto text-white rounded-md"
                >
                  Add Topic
                </button>
              </div>
            </div>

            <!-- Add Lesson Button -->
            <button
              v-if="isContentCreator"
              @click="addLesson"
              class="mt-4 p-2 px-3 block bg-blue-500 text-white rounded-xl mx-auto"
            >
              Add Lesson
            </button>
          </div>
        </div>
      </div>

      <!-- Notes Section -->
      <div v-if="!isContentCreator" class="mt-6">
        <label class="my-2 mt-8 block text-2xl font-semibold">Notes</label>

        <!-- Timestamp Button and Textarea Group -->
        <div class="relative">
          <!-- Add Timestamp Button -->
          <button
            v-if="timestamp"
            class="flex absolute top-1 right-1 rounded-full bg-red-200 text-xs px-3 pt-1 text-red-700 hover:bg-red-300 transition-all duration-300 font-semibold"
            @click="timestamp = null"
          >
            {{ timestamp }}
            <!-- X icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 inline-block ml-2 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            v-else
            class="absolute top-1 right-1 rounded-full bg-blue-100 text-xs px-3 py-1 text-blue-700 hover:bg-blue-300 transition-all duration-300 font-semibold"
            @click="addTimestamp"
          >
            + Timestamp
          </button>

          <!-- Textarea -->
          <textarea
            class="w-full rounded-lg border p-2"
            rows="4"
            placeholder="Write your note..."
            v-model="noteContent"
          ></textarea>
        </div>

        <div class="flex items-center justify-between my-2 mb-8">
          <!-- Save Note Button -->
          <button
            class="bg-blue-500 px-5 py-2 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            @click="saveNote"
          >
            Save Note
          </button>

          <!-- Expand Notes Button Styled as Hyperlink -->
          <button
            @click="expandNotes"
            class="text-blue-500 hover:text-blue-700 hover:underline mr-8 font-medium"
          >
            {{ notesExpanded ? 'Collapse Notes' : 'Expand Notes' }}
          </button>
        </div>

        <!-- Expanded Notes Display -->
        <div
          v-if="notesExpanded"
          class="my-4 p-4 bg-white border border-gray-300 rounded-md"
        >
          <div class="grid grid-cols-12 gap-4 mb-2 font-semibold text-gray-800">
            <div class="col-span-2">Timestamp</div>
            <div class="col-span-4 text-center">Note</div>
            <div class="col-span-5 text-center">Transcript</div>
            <div class="col-span-1 text-center">Actions</div>
          </div>
          <div
            v-for="(note, index) in course.notes"
            :key="note.id"
            class="mb-4 grid grid-cols-12 gap-4"
          >
            <!-- Timestamp Column -->
            <div class="col-span-2 text-sm text-gray-600 p-2">
              [{{ note.timestamp }}]
            </div>

            <!-- Note Content Column -->
            <div class="col-span-4 p-2">
              <div v-if="!note.isEditing" class="text-gray-700">
                {{ note.content }}
              </div>
              <textarea
                v-else
                rows="4"
                :key="note.id"
                v-model="note.editedContent"
                class="w-full"
                autofocus
              ></textarea>
            </div>

            <!-- Video Transcript Column -->
            <div
              v-html="generateLoremIpsum()"
              class="col-span-5 overflow-auto max-h-32 border border-gray-300 rounded-lg p-2 text-gray-500 text-sm"
            ></div>

            <!-- Edit and Delete Icons Column -->
            <div
              class="col-span-1 flex space-x-4 justify-center items-center space-y-1"
            >
              <button
                v-if="!note.isEditing"
                @click="editNote(note)"
                class="text-blue-500 hover:text-blue-700 mt-1"
              >
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button
                v-if="note.isEditing"
                @click="saveNoteEdit(note)"
                class="text-green-500 hover:text-green-700"
              >
                ✔️
              </button>
              <button
                v-if="note.isEditing"
                @click="cancelNoteEdit(note)"
                class="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
              <button
                v-if="!note.isEditing"
                @click="confirmDeleteNote(index)"
                class="text-red-500 hover:text-red-700"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- General Information Section -->
      <div class="bg-gray-100 p-2 lg:p-6 mb-6 rounded-lg shadow-lg relative">
        <!-- Back Button and Subtopic Name Wrapper -->
        <div class="flex items-center mb-4 flex-wrap m-3">
          <!-- Back Button -->
          <button
            v-if="selectedSubtopic.name"
            @click="goBack"
            class="bg-white p-2 rounded-full hover:bg-gray-200 transition-all duration-300 mr-4"
          >
            ⬅️
          </button>

          <!-- Subtopic Name -->
          <h3 v-if="!selectedSubtopic.name" class="text-3xl font-semibold mb-2">
            General Information
          </h3>
        </div>

        <template v-if="!selectedSubtopic.name">
          <div
            v-for="(subtopic, subtopicIndex) in selectedTopic?.subtopics?.[
              selectedInformation
            ]"
            :key="subtopic.id"
            class="border p-4 py-6 rounded-lg mb-3 hover:shadow-lg transition-shadow"
          >
            <!-- Collapsible Header -->
            <div
              class="flex items-center cursor-pointer"
              @click="toggleCollapse(subtopic.id)"
            >
              <span
                :class="['rotate-icon', { open: isOpen(subtopic.id) }]"
                class="text-lg"
                >▼</span
              >
              <div class="flex-grow ml-3 flex items-center">
                <h4 v-if="!subtopic.isEditing" class="text-lg font-semibold">
                  {{ subtopic.title }}
                </h4>
                <input
                  v-else
                  type="text"
                  v-model="editedSubtopic.title"
                  class="text-lg font-semibold flex-grow mr-2"
                  @click.stop=""
                />

                <!-- Edit Button -->
                <button
                  v-if="isContentCreator && !subtopic.isEditing"
                  @click.stop="editSubtopic(subtopic)"
                  class="ml-2 mt-0.5 text-gray-600 text-sm hover:text-blue-700 px-2"
                >
                  <i class="fas fa-pencil-alt"></i>
                </button>

                <!-- Delete Button -->
                <button
                  v-if="isContentCreator && !subtopic.isEditing"
                  @click.stop="confirmDeleteSubtopic(subtopicIndex)"
                  class="text-gray-600 text-sm hover:text-red-700 px-2 ml-auto"
                >
                  <i class="fas fa-trash"></i>
                </button>

                <div class="mx-4">
                  <!-- Save Button -->
                  <button
                    v-if="isContentCreator && subtopic.isEditing"
                    @click.stop="saveSubtopicEdit(subtopic)"
                    class="bg-blue-500 text-white hover:bg-blue-700 p-1 px-2 rounded-md"
                  >
                    Save
                  </button>

                  <!-- Cancel Button -->
                  <button
                    v-if="isContentCreator && subtopic.isEditing"
                    @click.stop="cancelSubtopicEdit(subtopic)"
                    class="bg-red-500 text-white hover:bg-red-700 ml-2 p-1 px-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <!-- Collapsible Content -->
            <transition name="fade">
              <div
                v-if="isOpen(subtopic.id)"
                class="text-gray-700 leading-relaxed mt-6"
              >
                <div
                  v-if="!subtopic.isEditing"
                  v-html="markdownToHtml(subtopic.supplementalInfo)"
                ></div>
                <textarea
                  v-else
                  v-model="editedSubtopic.supplementalInfo"
                  rows="8"
                  class="w-full"
                ></textarea>
              </div>
            </transition>
          </div>

          <!-- Add Subtopic Button -->
          <button
            v-if="isContentCreator"
            @click="addSubtopic(selectedInformation)"
            class="mt-8 mb-4 p-2 bg-blue-500 text-white rounded-md mx-auto block"
          >
            Add Subtopic
          </button>
        </template>
      </div>

      <!-- Practice Section -->
      <div class="my-12 cursor-pointer">
        <div
          class="flex items-center justify-between border-b-2 mt-6 pb-2"
          @click="showPractice = !showPractice"
        >
          <h3 class="ml-2 text-2xl font-semibold">Mini-Practice</h3>
        </div>

        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <template v-for="practice in practices" :key="practice.id">
            <div
              v-if="isContentCreator || !practice.hide"
              class="h-fit w-full rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md relative"
              :class="{
                'bg-blue-100 border-blue-300 shadow-md':
                  selectedPractice?.title === practice.title ||
                  selectedPracticeIds.includes(practice.id),
              }"
              @click="togglePractice(practice)"
            >
              <h4 class="text-sm font-bold">{{ practice.title }}</h4>
              <p class="text-xs my-2 italic">{{ practice.description }}</p>
              <p class="text-xs font-bold">
                {{ practice.exerciseCount }} exercises
              </p>
            </div>
          </template>
        </div>

        <Practice v-if="!isContentCreator" :name="selectedPractice?.title" />
      </div>
    </section>
  </main>
</template>

<script>
import { marked } from 'marked';
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue';
import ArrowDown from 'vue-material-design-icons/ArrowDown.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import Practice from './Practice/index.vue';

export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    isNewCourse: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AccountCircle,
    ChevronRight,
    ArrowDown,
    Practice,
  },
  mounted() {
    if (this.user.id.includes('new-instructor')) {
      this.course.modules = [];
      return;
    } else {
      this.setupModules();
    }

    if (this.user.id.includes('new-student')) {
      this.course.notes = [];
    }

    if (this.user.id.includes('active-student')) {
      this.setupNotes();
    }

    this.setup();
  },
  data() {
    return {
      selectedPractice: null,
      timestamp: null,
      selectedNavItem: 'home',
      supplementalInfo:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales ullamcorper vehicula.'.repeat(
          10
        ),
      selectedSubtopic: null,
      showPractice: false,
      selectedInformation: 'Simplified',
      showPractice: false,
      showAssessments: false,
      course: {
        id: 1,
        instructor: {
          id: 'active-instructor',
        },
        name: 'ChatGPT for Job Searching & Interview Prep',
        notes: [],
        modules: [],
      },
      generatedSubtopics: [
        {
          id: 1,
          name: 'So, What Is Machine Learning?',
          supplementalInfo: 'Lorem ipsum',
        },
        {
          id: 2,
          name: "What's the possibility of an AI takeover?",
          supplementalInfo: 'Lorem ipsum',
        },
      ],
      practices: [
        {
          id: 1,
          title: 'Intent or Structure?',
          description:
            'Identify the location where suggestions fit best in the prompt',
          exerciseCount: 5,
          hide: false,
        },
        {
          id: 2,
          title: 'Bias Busters',
          description: 'Identify potentially strong biases in provided prompts',
          exerciseCount: 3,
          hide: false,
        },
        {
          id: 3,
          title: 'Parts Of A Prompt',
          description:
            'Identify the location where suggestions fit the prompt best',
          exerciseCount: 5,
          hide: false,
        },
        {
          id: 4,
          title: 'Prompt Puzzles',
          description:
            'Identify the location where suggestions fit the prompt best',
          exerciseCount: 5,
          hide: false,
        },
        {
          id: 5,
          title: 'Prompt-Off',
          description:
            'Identify the location where suggestions fit the prompt best',
          exerciseCount: 5,
          hide: false,
        },
        {
          id: 6,
          title: 'Prompt Crafting',
          description:
            'Identify the location where suggestions fit the prompt best',
          exerciseCount: 5,
          hide: false,
        },
      ],
      selectedSubtopic: {},
      selectedTopic: {},
      selectedOption: null,
      selectedLessonIndex: null,
      showPractice: false,
      currentQuestion: {
        prompt:
          'Is the following suggestion meant to enhance intent or structure?',
        options: [
          { label: 'Option A', value: 'intent', text: 'Intent' },
          { label: 'Option B', value: 'structure', text: 'Structure' },
        ],
      },
      feedbackShown: false,
      isCorrect: false,
      feedbackText: '',
      submittedOption: null,
      selectedModule: {},
      openSubtopics: [],
      sidebarOpen: false,
      editedModule: {},
      editedTopic: {},
      editedSubtopic: {},
      editedLesson: null,
      noteContent: null,
      notesExpanded: false,
      selectedPracticeIds: [],
    };
  },
  computed: {
    currentLesson() {
      return this.course.modules?.[0].lessons?.[0];
    },
    currentTopic() {
      return this.currentLesson.topics?.[0];
    },
    currentSubTopic() {
      return this.currentTopic.subtopics?.[0];
    },
    currentSupplementalInfo() {
      return this.supplementalInfo;
    },
    isContentCreator() {
      return this.user?.id?.includes('instructor');
    },
    isEnrolled() {
      return this.user?.courseIds?.includes(this.course.id);
    },
  },
  methods: {
    toggleHide(practice) {
      practice.hide = !practice.hide;
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    hoverMiniVideo(id) {
      // Do something on hover if required
    },
    unhoverMiniVideo(id) {
      // Reset hover effects if required
    },
    selectTopic(topic) {
      this.selectedTopic = topic;
    },
    selectSubtopic(subtopic) {
      this.selectedSubtopic = subtopic;
    },
    goBack() {
      this.selectedSubtopic = {};
    },
    selectOption(option) {
      this.selectedOption = 'Lorem ipsum dolor sit amet option ' + option;
    },
    selectModule(index) {
      this.selectedModule = this.course.modules[index];
      this.selectedLesson = this.selectedModule.lessons[0];
    },
    isSelectedLesson(index) {
      return this.selectedLessonIndex === index; // Check if the lesson is selected
    },
    submitAnswer() {
      if (!this.selectedOption) {
        alert('Please select an option before submitting.');
        return;
      }
      // You can add logic here to handle the answer, like giving feedback or navigating to the next question
      alert(`You chose: ${this.selectedOption}`);
    },
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
      // Logic to fetch a new exercise can be implemented here
    },
    skipExercise() {
      this.feedbackShown = false;
      this.showPractice = false;
      // Logic to navigate to the next part of the course or another exercise can be implemented here
    },
    markdownToHtml(markdown) {
      return marked.parse(markdown);
    },
    toggleCollapse(subtopicId) {
      if (this.openSubtopics.includes(subtopicId)) {
        this.openSubtopics = this.openSubtopics.filter(
          (id) => id !== subtopicId
        );
      } else {
        this.openSubtopics.push(subtopicId);
      }
    },
    isOpen(subtopicId) {
      return this.openSubtopics.includes(subtopicId);
    },
    setOption(selectedOption) {
      this.selectedInformation = selectedOption;
    },
    togglePractice(practice) {
      if (this.isContentCreator) {
        if (this.selectedPracticeIds?.includes(practice.id)) {
          this.selectedPracticeIds = this.selectedPracticeIds.filter(
            (id) => id !== practice.id
          );
        } else {
          this.selectedPracticeIds.push(practice.id);
        }

        return;
      }

      if (this.selectedPractice?.title === practice?.title) {
        this.showPractice = false;
        this.selectedPractice = null;
      } else {
        this.showPractice = true;
        this.selectedPractice = practice;
        this.selectedPractice.edit = true;
      }
    },
    selectPractice(practice) {
      this.selectedPractice = practice;
    },
    selectLesson(index) {
      this.selectedLesson = this.selectedModule.lessons[index];
      this.selectedTopic = this.selectedLesson.topics[0];

      this.$forceUpdate();
    },
    async deleteLesson(index) {
      const lessonToDelete = this.course.modules[index];

      if (
        confirm(
          `Are you sure you want to delete the lesson: ${lessonToDelete.name}?`
        )
      ) {
        try {
          this.course.modules.splice(index, 1);
        } catch (error) {
          console.error('Error deleting lesson:', error);
        }
      }
    },
    editModule(index) {
      this.course.modules[index].edit = true;
      this.editedModule = { ...this.course.modules[index] };
    },
    async saveModule(index) {
      this.course.modules[index] = this.editedModule;

      this.cancelEdit(index);
    },
    cancelEdit(index) {
      this.course.modules[index].edit = false;
    },
    addModule() {
      const newModule = {
        name: 'New Module',
        edit: true,
        lessons: [],
        edit: true,
        thumbnail: 'https://via.placeholder.com/150',
      };

      this.course.modules.push(newModule);
      this.editedModule = newModule;
    },

    uploadThumbnail(index) {
      this.editedModule = this.course.modules[index];

      this.$refs.thumbnail.click();
    },
    handleThumbnailUpload() {
      const file = this.$refs.thumbnail.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.editedModule.thumbnail = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    uploadVideo() {
      this.$refs.video.click();
    },
    handleVideoUpload() {
      const file = this.$refs.video.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.selectedLesson.videoUrl = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    removeVideo() {
      if (confirm('Are you sure you want to remove this video?')) {
        this.selectedLesson.videoUrl = null;
      }
    },
    editLesson(index) {
      const lesson = this.selectedModule.lessons[index];
      lesson.isEditing = true;
      this.editedLesson = { ...lesson };
    },

    saveLesson(index) {
      this.editedLesson.isEditing = false;

      if (index) {
        this.selectedModule.lessons[index] = this.editedLesson;
      } else {
        const lesson = this.selectedModule.lessons.find(
          (lesson) => lesson.id === this.editedLesson.id
        );

        Object.assign(lesson, this.editedLesson);
      }
      this.editedLesson = null;
    },

    cancelLessonEdit(index) {
      this.selectedModule.lessons[index].isEditing = false;
      this.editedLesson = null;
    },

    confirmDeleteLesson(index) {
      if (confirm('Are you sure you want to delete this lesson?')) {
        this.selectedModule.lessons.splice(index, 1);
      }
    },
    editTopic(topic) {
      topic.isEditing = true;
      this.editedTopic = { ...topic };
    },
    addTopic() {
      const newTopic = {
        title: 'New Topic',
        thumbnail: 'https://via.placeholder.com/150',
        duration: '7m 10s',
        progress: 20,
        progressText: '20%',
        topics: [],
      };

      this.selectedLesson.topics.push(newTopic);
      this.editedTopic = newTopic;
    },
    saveTopicEdit(topicIndex) {
      this.editedTopic.isEditing = false;
      this.selectedLesson.topics[topicIndex] = this.editedTopic;
      this.editedTopic = null;
    },
    cancelTopicEdit(topicIndex) {
      this.selectedLesson.topics[topicIndex].isEditing = false;
      this.editedTopic = null;
    },
    confirmDeleteTopic(topicIndex) {
      if (confirm('Are you sure you want to delete this topic?')) {
        this.selectedLesson.topics.splice(topicIndex, 1);
      }
    },
    cancelEditLesson() {
      this.editedLesson = null;
      this.selectedLesson.isEditing = false;
    },
    editSubtopic(subtopic) {
      subtopic.isEditing = true;
      this.editedSubtopic = { ...subtopic };

      if (!this.openSubtopics.includes(subtopic.id)) {
        this.openSubtopics.push(subtopic.id);
      }
    },
    addSubtopic() {
      const newSubtopic = {
        id: Date.now().toString(),
        title: 'New Subtopic',
        supplementalInfo: 'Lorem ipsum',
        isEditing: true,
      };

      this.selectedTopic.subtopics[this.selectedInformation].push(newSubtopic);
      this.openSubtopics.push(newSubtopic.id);

      this.editedSubtopic = newSubtopic;
      this.selectedSubtopic = newSubtopic;
    },
    saveSubtopicEdit(subtopic) {
      Object.assign(subtopic, this.editedSubtopic);

      this.selectedSubtopic = subtopic;
      this.selectedSubtopic.isEditing = false;
    },
    cancelSubtopicEdit(subtopic) {
      subtopic.isEditing = false;
      this.editedSubtopic = {};
    },
    removeSubtopic(subtopicIndex) {
      if (confirm('Are you sure you want to delete this subtopic?')) {
        this.selectedTopic.subtopics.splice(subtopicIndex, 1);
      }
    },
    confirmDeleteSubtopic(subtopicIndex) {
      if (confirm('Are you sure you want to delete this subtopic?')) {
        this.selectedTopic.subtopics[this.selectedInformation].splice(
          subtopicIndex,
          1
        );
      }
    },
    expandNotes() {
      this.notesExpanded = !this.notesExpanded;
    },
    generateLoremIpsum() {
      const loremIpsumText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

      // Split the text into sentences.
      const sentences = loremIpsumText.split('. ');
      const randomIndex = Math.floor(Math.random() * sentences.length);

      // Highlight a random sentence.
      sentences[
        randomIndex
      ] = `<span class="bg-yellow-200">${sentences[randomIndex]}.</span>`;

      // Reassemble the text.
      return sentences.join('. ');
    },
    editNote(note) {
      note.isEditing = true;
      note.editedContent = note.content;
    },

    saveNoteEdit(note) {
      note.content = note.editedContent;
      note.timestamp = this.timestamp;
      note.isEditing = false;
    },

    cancelNoteEdit(note) {
      note.isEditing = false;
    },

    confirmDeleteNote(index) {
      if (confirm('Are you sure you want to delete this note?')) {
        this.course.notes.splice(index, 1);
      }
    },
    addTimestamp() {
      this.timestamp = new Date().toLocaleTimeString().toString();
    },
    saveNote() {
      console.log(this.noteContent);
      const newNote = {
        content: this.noteContent,
        timestamp: this.timestamp || 'N/A',
        isEditing: false,
      };

      this.course.notes.push(newNote);
      this.noteContent = null;
      this.timestamp = null;
    },
    setup() {
      this.selectModule(0);
      this.selectLesson(0);
      this.activeVideoIndex = 0;
      this.selectedTopic = this.selectedLesson?.topics[0];
      this.selectedSubtopic = this.selectedTopic.subtopics.Simplified[0];

      this.openSubtopics.push(this.selectedLesson.id);
    },
    setupNotes() {
      this.course.notes = [
        {
          id: 1,
          content:
            "Discussed the fundamentals of environmental science and its importance in today's world.",
          module_id: 1,
          lesson_id: 1,
          timestamp: '00:02:15',
        },
        {
          id: 2,
          content:
            'Key takeaway: Photosynthesis is critical for the energy cycle of the Earth.',
          module_id: 2,
          lesson_id: 2,
          timestamp: '00:05:30',
        },
        {
          id: 3,
          content:
            'Learnt about Pythagorean theorem and its applications in calculating the distance between two points.',
          module_id: 3,
          lesson_id: 3,
          timestamp: '00:03:45',
        },
        {
          id: 4,
          content:
            "Explored the concept of gravitational force and Newton's law of universal gravitation.",
          module_id: 4,
          lesson_id: 4,
          timestamp: '00:04:20',
        },
        {
          id: 5,
          content:
            'Reviewed historical events leading up to World War I, focusing on political alliances.',
          module_id: 5,
          lesson_id: 5,
          timestamp: '00:06:10',
        },
        // ... potentially more notes ...
      ];
    },
    setupModules() {
      this.course.modules = [
        {
          id: 1,
          name: 'ChatGPT and AI Prompts',
          thumbnail: 'https://via.placeholder.com/150',
          lessons: [
            {
              id: 1,
              title: 'AI, LLMS and ChatGPT',
              videoUrl:
                'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '5m 20s',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'Overview of AI and LLMS',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: {
                    Simplified: [
                      {
                        id: 1,
                        title: 'What is Artificial Intelligence',
                        supplementalInfo:
                          "**Understanding Intelligence**\n\nHuman Intelligence is the ability to learn, understand, reason, solve problems, and adapt to new situations. Artificial Intelligence seeks to create machines that can mimic some aspects of human intelligence for specific tasks.<br><br>**How Computers 'Learn'**\n\nUnlike humans, computers recognize patterns in data and make predictions based on these patterns. This subset of AI, where computers learn from data without being explicitly programmed, is called Machine Learning. Examples include recommendation systems on streaming platforms or email spam filters.<br><br>**Use Cases & Achievements**\n\nAI has seen a myriad of applications and breakthroughs, from creating art and music, to beating world champions in complex games like Go. The evolution of AI has culminated in the development of advanced models such as Large Language Models, which will be explored in the next lesson.",
                      },
                      {
                        id: 2,
                        title: 'What are Large Language Models?',
                        supplementalInfo:
                          "**Big Brain for Text**\n\nThink of LLMs as a big brain that has read tons of books, articles, and websites. It knows a lot about language and can talk about many topics because of all the things it has 'read'.<br><br>**Learning from Lots of Examples**\n\nJust as we learn by reading and experiencing, LLMs learn by processing vast amounts of text from the internet. This helps them to understand context, answer questions, or even help with writing.<br><br>**Helping in Daily Tasks**\n\nImagine having a helper who can write emails, answer queries, or even help you with your homework. That's what LLMs can do! They power chatbots, help authors, and even assist in research by understanding and generating human-like text.",
                      },
                      {
                        id: 3,
                        title: 'OpenAI, GPT and ChatGPT',
                        supplementalInfo:
                          "**OpenAI: A Leader in AI Research**\n\nOpenAI is like a top-notch school for artificial intelligence. They've created many smart programs, including one you might have heard of: GPT.<br><br>**GPT: Getting Smarter Over Time**\n\nImagine a phone series where each new version gets better. GPT is like that for AI. Each version can talk better and understands more.<br><br>**ChatGPT: Like Texting an AI Friend**\n\nChatGPT is a special version of GPT. It's great at chatting and can help answer questions or talk about many topics, much like a knowledgeable friend.",
                      },
                      {
                        id: 4,
                        title: "What ChatGPT Can and Can't Do",
                        supplementalInfo:
                          "**A Smart Conversationalist**\n\nChatGPT is like that friend who's great at trivia nights: knowledgeable on many topics. But, it's not perfect.<br><br>**It Doesn't Know Everything**\n\nWhile ChatGPT knows a lot, it might not have the latest news or solve super tricky problems. It's best to double-check if something seems off.<br><br>**A Helper, Not a Decision Maker**\n\nRemember, ChatGPT is there to help and provide info. But important decisions? Those are best left to humans.",
                      },
                      {
                        id: 5,
                        title: 'General Use Cases',
                        supplementalInfo:
                          "**Help Desk in Your Pocket**\n\nWith AI, you can have a virtual helper answering common questions, making customer service faster.<br><br>**Need a Quick Summary or Article?**\n\nAI can help draft or shorten texts, which is super useful if you're in a hurry or need a concise version.<br><br>**Speaking Global Languages**\n\nImagine a tool that can instantly translate languages or even adapt products to different cultures. That's AI helping businesses go global!",
                      },
                      {
                        id: 6,
                        title: 'GPT 3.5-Turbo vs GPT-4',
                        supplementalInfo:
                          "**GPT-4: The Newer, Smarter AI**\n\nThink of GPT-4 as a new model of a smartphone, while GPT-3.5-Turbo is the earlier version. GPT-4 understands and chats even better, but the older version might be more cost-effective for some uses.<br><br>**Choosing the Best Tool for the Job**\n\nIt's like deciding between a sports car and a family sedan. Both have their strengths, and the best choice depends on what you need: speed, cost, or other factors.",
                      },
                      {
                        id: 7,
                        title: 'Other LLM Options and Tools',
                        supplementalInfo:
                          "**There's More Than Just One AI in Town**\n\nWhile OpenAI made GPT, companies like Google and Facebook have their own AIs too. Each has its unique strengths.<br><br>**Special AIs for Special Jobs**\n\nSome AIs are like expert chefs, specializing in one thing, be it finance, healthcare, or something else. Knowing them can be handy for specific tasks.<br><br>**Tools to Make AI Work for You**\n\nJust as there are many apps to make your phone more useful, there are tools that help you use AI in different ways, making it fit perfectly into your projects.",
                      },
                    ],
                    Explore: [
                      {
                        id: 1,
                        title: 'What is Artificial Intelligence',
                        supplementalInfo:
                          "**Understanding Intelligence**\n\nIntelligence, in its broadest sense, refers to the ability to perceive information, retain it as knowledge, and apply it towards adaptive behaviors within an environment or context. Human intelligence embodies complex cognitive feats such as reasoning, problem-solving, perception, abstract thought, and the use of language. Artificial Intelligence (AI) aims to emulate or simulate these aspects of human intelligence in machines, creating systems that can perform tasks which would typically require human cognition. This includes a broad spectrum of capabilities such as visual perception, speech recognition, decision-making, and translation between languages. The quest to understand intelligence also intertwines with philosophical, psychological, and neuroscientific explorations, as AI researchers seek to understand not only what intelligence is, but also how it can be represented and replicated in non-biological systems.<br><br>**How Computers 'Learn'**\n\nLearning, in the context of AI, often refers to the ability of machines to improve their performance over time as they are exposed to more data. At the heart of this process is a subset of AI known as Machine Learning (ML). ML algorithms use statistical methods to enable computers to 'learn' from data, identifying patterns and making decisions with minimal human intervention. A further advancement in this field is Deep Learning, which involves neural networks with multiple layers that can learn increasingly abstract representations of the data. These networks are inspired by the structure and function of the human brain. Through techniques such as supervised learning, unsupervised learning, and reinforcement learning, these systems can perform a wide array of tasks — from recognizing speech and images to predicting stock market trends. The essence of how computers learn is rooted in their ability to process vast amounts of data and extract useful patterns or insights that would be impossible or impractical for humans to discern.<br><br>**Use Cases & Achievements**\n\nThe applications of AI are diverse and have permeated almost every sector. In healthcare, AI algorithms assist in disease detection and personalized medicine. In finance, they are used for fraud detection, algorithmic trading, and risk management. The realm of autonomous vehicles relies heavily on AI for navigation and decision-making. In the creative industries, AI has been utilized for generating music, art, and even writing scripts. One of the most significant achievements in AI is the development of advanced models such as Large Language Models (LLMs), which can understand and generate human language with remarkable proficiency. These models are transforming the way we interact with technology, offering new possibilities in fields ranging from education to customer service. The advancements in AI have not only showcased the ingenuity of machine intelligence but have also sparked important conversations about ethics, governance, and the future relationship between humans and intelligent machines.",
                      },
                      {
                        id: 2,
                        title: 'What are Large Language Models?',
                        supplementalInfo:
                          "**Expansive Knowledge Repositories**\n\nLarge Language Models (LLMs), such as GPT (Generative Pre-trained Transformer), are akin to vast repositories of linguistic information. They can be visualized as extensive neural networks that have 'ingested' a wide swath of human language from books, articles, websites, and other text-based mediums. This extensive training enables them to have a broad understanding of human language, allowing them to engage in conversations, answer queries, and even create content across a multitude of subjects. Their capacity to process and generate language is not merely a function of their size but also a testament to the intricate architecture that enables them to make connections and associations within the data they have 'learned'.<br><br>**Learning from Patterns in Text**\n\nThe process through which LLMs acquire their knowledge is reminiscent of human learning, but it occurs on a much larger and faster scale. By analyzing and processing massive datasets containing text (often sourced from the internet), LLMs learn the intricacies of human language, including grammar, colloquialisms, and even the nuances of different writing styles. They recognize patterns, learn from context, and develop the ability to generate coherent and contextually relevant text. The mechanism underlying this learning process is often referred to as 'unsupervised learning', where the model inherently learns to predict the next word in a sentence, thereby gaining an understanding of language structure and information without explicit instructions.<br><br>**Versatile Assistants in Digital Spaces**\n\nIn practical applications, LLMs have become increasingly prevalent as versatile digital assistants. They augment human capabilities by taking on tasks such as drafting and summarizing emails, generating creative content, aiding in language translation, and providing tutoring or research assistance. In customer service, they power sophisticated chatbots that can handle a range of inquiries, providing timely and contextually relevant responses. For writers and researchers, LLMs offer tools for brainstorming and writing, often reducing the time and effort involved in these creative processes. The influence of LLMs extends into domains such as programming, where they can assist in code generation, and even in specialized fields like law and medicine, where they can help professionals by quickly sifting through vast amounts of information to provide relevant insights. The capabilities of LLMs signify a remarkable advancement in the field of AI, hinting at a future where human and machine collaboration is increasingly seamless and productive.",
                      },
                      {
                        id: 3,
                        title: 'OpenAI, GPT and ChatGPT',
                        supplementalInfo:
                          "**OpenAI: A Leader in AI Research**\n\nOpenAI stands as a beacon in the realm of artificial intelligence, much like a prestigious institution dedicated to the advancement of knowledge. Founded with the ethos of ensuring that artificial general intelligence (AGI) benefits all of humanity, OpenAI has been at the forefront of cutting-edge research and innovation. It has developed a suite of advanced AI models and tools that have significantly impacted various fields, ranging from natural language processing to robotics. OpenAI's ethos revolves around openness, sharing their discoveries through publications and partnerships, and fostering an inclusive approach to technology. They're also deeply engaged in understanding and addressing the ethical implications of AI, ensuring that their work aligns with a broad set of safety and security principles.<br><br>**GPT: Getting Smarter Over Time**\n\nGenerative Pre-trained Transformer, or GPT, is a series of AI language models developed by OpenAI. Picture it as a smartphone line, where each successive model unveils new, sophisticated features. GPT began with its initial version, which was impressive in its own right, but with each iteration — from GPT-2 to GPT-3 and beyond — its capabilities have exponentially grown. These models have showcased remarkable proficiency in understanding and generating human language, learning from a diverse range of internet texts. With each version, GPT has improved not only in its linguistic fluency but also in its ability to comprehend context, make sense of nuanced instructions, and even exhibit creativity. This progressive enhancement has solidified GPT's status as a pivotal innovation in the field of AI.<br><br>**ChatGPT: Like Texting an AI Friend**\n\nChatGPT is a specialized offshoot of the GPT series, tailored specifically for conversational engagement. Think of it as texting with a friend who is knowledgeable, informative, and ever-present. ChatGPT is adept at understanding and generating human-like responses, making it an invaluable tool for a myriad of applications — from customer service bots to personal digital assistants. Its ability to engage in coherent and contextually relevant dialogue sets it apart, making it not just a technological marvel but a friendly AI companion capable of assisting, informing, and entertaining users across the globe. The development of ChatGPT is a testament to the strides made in the field of conversational AI, showcasing a future where human-AI interaction becomes as seamless and natural as conversing with our fellow humans.",
                      },
                      {
                        id: 4,
                        title: "What ChatGPT Can and Can't Do",
                        supplementalInfo:
                          "**A Smart Conversationalist**\n\nChatGPT, developed by OpenAI, is akin to a versatile conversationalist, equipped with a wealth of knowledge spanning various domains. Its strength lies in understanding and generating human-like text, making it an excellent partner for discussions, Q&A sessions, and educational purposes. Its capabilities extend to tasks like language translation, summarizing articles, generating creative content, and even coding assistance. However, while ChatGPT is adept at handling a diverse range of topics, akin to a friend who excels at trivia nights, it is not infallible. Its responses may occasionally miss the mark or lack depth in highly specialized areas, underscoring its status as a sophisticated tool rather than an omniscient entity.<br><br>**It Doesn't Know Everything**\n\nChatGPT possesses a substantial repository of information up to its last training cut-off in April 2023. However, it does not have the capability to browse the internet for real-time updates or access new information post-training. This limitation means that it might not be aware of the most recent events, discoveries, or advancements. Additionally, while it can solve many complex problems and answer intricate questions, its proficiency is not absolute, particularly in areas that require highly specialized expertise or up-to-the-minute knowledge. Users are encouraged to apply critical thinking and validate information, especially when ChatGPT's responses pertain to rapidly evolving fields or current events.<br><br>**A Helper, Not a Decision Maker**\n\nChatGPT serves as an assistive tool designed to support and enhance human capabilities. It can provide explanations, suggestions, and insights drawn from its extensive training data. However, it does not possess consciousness, emotions, or ethical reasoning, and as such, it should not be relied upon for making significant decisions. Decisions that involve complex ethical considerations, nuanced human judgment, or critical thinking are best left to humans. Users should leverage ChatGPT's strengths as an informative and educational resource while recognizing its limitations and retaining ultimate authority over decision-making processes.",
                      },
                      {
                        id: 5,
                        title: 'General Use Cases',
                        supplementalInfo:
                          "**Help Desk in Your Pocket**\n\nThe integration of AI into customer service has revolutionized the way businesses interact with their clientele. Virtual assistants, powered by sophisticated AI algorithms, are capable of handling a wide array of customer inquiries without human intervention. These AI-powered help desks can provide 24/7 support, answering common questions, guiding users through troubleshooting steps, and even resolving complex issues. They learn from each interaction, constantly improving their ability to assist. This not only makes customer service faster and more efficient but also allows human customer service representatives to focus on more complex and nuanced cases where human empathy and understanding are irreplaceable.<br><br>**Need a Quick Summary or Article?**\n\nIn the fast-paced world where information overload is common, AI's ability to digest, summarize, and even generate content is invaluable. Whether it's condensing a lengthy report into a few key bullet points, drafting an article on a given topic, or simply crafting a concise summary of a long document, AI-driven natural language processing tools are becoming increasingly adept. These tools are particularly useful for professionals who need to stay informed but are short on time, as well as for students and researchers who need to process large volumes of text efficiently. The technologies underlying these capabilities are continually advancing, making them more reliable and accurate in understanding and replicating human language.<br><br>**Speaking Global Languages**\n\nThe barriers of language and cultural differences have long been obstacles in the path of global business and communication. AI-powered translation and localization tools are dismantling these barriers, enabling instantaneous and accurate translation of text and speech between myriad languages. This technology is not limited to direct translation; it can also adapt products, services, and communications to fit different cultural contexts, a process known as localization. By understanding and respecting cultural nuances, AI helps businesses expand their reach and resonate with diverse audiences worldwide. The impact of these AI applications is profound, facilitating international diplomacy, global commerce, and cross-cultural understanding.",
                      },
                      {
                        id: 6,
                        title: 'GPT 3.5-Turbo vs GPT-4',
                        supplementalInfo:
                          "**GPT-4: The Newer, Smarter AI**\n\nGPT-4 can be likened to the latest flagship smartphone model, representing a significant leap forward in technology compared to its predecessor, GPT-3.5-Turbo. With a more sophisticated architecture, GPT-4 boasts enhanced comprehension and conversational abilities, enabling it to understand context more deeply and generate more nuanced and complex responses. Its expanded knowledge base and improved reasoning capabilities allow it to tackle a wider range of questions and tasks with greater accuracy. However, this cutting-edge performance may come at a higher cost, both financially and computationally, making GPT-3.5-Turbo a more cost-effective solution for certain applications where the highest level of sophistication isn't a necessity.<br><br>**Choosing the Best Tool for the Job**\n\nThe choice between GPT-3.5-Turbo and GPT-4 mirrors the decision between purchasing a sports car or a family sedan. Each has its own set of advantages tailored to different needs. GPT-3.5-Turbo, akin to a reliable family sedan, offers robust performance at a more affordable price point, making it suitable for a variety of everyday tasks. On the other hand, GPT-4, much like a high-performance sports car, excels in situations that demand the utmost in sophistication and power. Factors such as budget, application complexity, and performance requirements will guide the decision, ensuring the selected model aligns with the specific needs and goals of the user.",
                      },
                      {
                        id: 7,
                        title: 'Other LLM Options and Tools',
                        supplementalInfo:
                          "**There's More Than Just One AI in Town**\n\nOpenAI's GPT series may be among the most well-known, but it's far from the only player in the field. Giants like Google, Facebook (Meta), and other tech innovators have thrown their hats into the AI ring, each developing their own versions of Large Language Models (LLMs). These models, while sharing some foundational principles, often incorporate unique algorithms, structures, and training data, which confer distinct strengths and advantages tailored to different applications. This diversity in AI technology promotes a healthy competitive landscape and encourages continuous innovation and improvement.<br><br>**Special AIs for Special Jobs**\n\nSimilar to expert chefs specializing in particular cuisines, certain AI models are fine-tuned for specific domains, such as finance, healthcare, or legal analysis. These specialized AIs are trained on domain-specific data, enabling them to handle intricate tasks with a higher degree of expertise and precision. Understanding the nuances and capabilities of these specialized AIs can be invaluable when addressing complex challenges within a particular field.<br><br>**Tools to Make AI Work for You**\n\nJust as a plethora of apps can transform a smartphone into a versatile tool for various tasks, a range of software and platforms are available to harness the power of AI for diverse applications. From plug-and-play solutions to customizable frameworks, these tools are designed to make AI accessible and adaptable, allowing individuals and businesses to integrate advanced AI capabilities seamlessly into their projects and workflows. Whether it's enhancing customer service, streamlining data analysis, or sparking creative endeavors, the right tools can unlock the full potential of AI to meet specific needs and objectives.",
                      },
                    ],
                    'For You': [
                      {
                        id: 1,
                        title:
                          'What is Artificial Intelligence for Solutions Engineers',
                        supplementalInfo:
                          "**Understanding Intelligence in Solutions Engineering**\n\nIntelligence, within the realm of solutions engineering, can be thought of as the ability to conceptualize, design, and implement complex systems that solve specific problems. Solutions engineers must possess a comprehensive understanding of both the technological and business aspects of a system, ensuring it aligns with organizational goals and client needs. In this context, Artificial Intelligence (AI) can be a powerful tool, enabling the creation of systems that not only automate tasks but also adapt and improve over time. AI can be leveraged to optimize workflows, predict system failures, and provide data-driven insights, making it an indispensable asset for solutions engineers aiming to craft cutting-edge and efficient solutions.<br><br>**How Computers 'Learn' in Solutions Engineering**\n\nFor solutions engineers, the concept of 'learning' in computers transcends mere data analysis; it encompasses the ability to integrate AI systems into broader technical architectures. Machine Learning (ML), a subset of AI, empowers computers to identify patterns and make informed decisions. Solutions engineers can utilize ML to enhance system functionalities such as predictive maintenance, anomaly detection in networks, and personalized user experiences. Deep Learning, with its advanced neural networks, can further enable systems to handle complex tasks like natural language processing and computer vision, critical in areas such as chatbot development and quality control. Understanding the intricacies of how these AI systems learn and evolve is crucial for solutions engineers to build scalable and robust solutions tailored to the nuanced requirements of their clients.<br><br>**Use Cases & Achievements in Solutions Engineering**\n\nThe practical applications of AI in solutions engineering are vast and impactful. In the realm of customer relationship management (CRM), AI-powered analytics can provide deeper insights into customer behavior, aiding in the development of more targeted solutions. In cybersecurity, AI-driven threat detection systems can proactively identify and neutralize potential breaches. Solutions engineers can also harness AI in developing smart infrastructure systems that manage resources more efficiently and sustainably. Among the noteworthy achievements in AI is the advent of Large Language Models (LLMs), which have revolutionized natural language interactions between users and systems. For solutions engineers, the implications are profound; they can now build more intuitive interfaces and sophisticated support systems, enhancing user engagement and operational efficiency. The evolution of AI is a testament to the remarkable capabilities that solutions engineers can harness to drive innovation and solve some of the most challenging problems facing industries today.",
                      },
                      {
                        id: 2,
                        title:
                          'What are Large Language Models for Solutions Engineers?',
                        supplementalInfo:
                          '**Expansive Knowledge Repositories for Engineering Solutions**\n\nLarge Language Models (LLMs) like GPT are not just vast stores of linguistic data; for solutions engineers, they are dynamic blueprints and tools for building complex language-based systems. Imagine an extensive neural network that has digested a comprehensive range of linguistic inputs – from technical manuals to colloquial conversations. This extensive training allows LLMs to understand and interact in human language, making them invaluable in designing systems that require natural language understanding. The sophistication of LLMs lies not only in their size but in their intricate architecture, which allows solutions engineers to tap into their ability to make connections and draw insights from the data they have learned, enabling the creation of more intuitive and human-centric solutions.<br><br>**Learning from Patterns in Text for Advanced Engineering Applications**\n\nLLMs learn similarly to humans but at a vastly accelerated and larger scale, sifting through terabytes of textual data. This learning empowers them with an understanding of language nuances, which is critical for solutions engineers as they design systems that interact with users or process language data. The pattern recognition and contextual understanding capabilities of LLMs mean that engineers can incorporate these models into applications that require a sophisticated grasp of language, such as automated documentation, intelligent search engines, and advanced data analytics. The unsupervised learning aspect of LLMs, where they inherently predict and understand language structure, is particularly beneficial in applications where engineers seek to implement systems that adapt and improve without constant reprogramming.<br><br>**Versatile Assistants in Engineering and Digital Innovation**\n\nFor solutions engineers, LLMs offer a powerful resource in crafting digital solutions. They serve as advanced tools for tasks like generating technical documentation, providing support in coding through automated code suggestions, and even assisting in complex problem-solving by scouring through extensive databases for relevant information. In customer support, LLMs can be integrated into systems to power sophisticated chatbots that not only respond to inquiries but also learn from interactions to provide better service over time. For engineers working in research and development, LLMs are invaluable in synthesizing research material, brainstorming design ideas, and even generating prototypes of written content. Their application is also extending into specialized domains like software engineering, where they assist in debugging and optimizing code. The advent of LLMs marks a significant milestone for solutions engineers, heralding a new era of AI-assisted engineering that promises to revolutionize the way solutions are conceptualized, designed, and implemented.',
                      },
                      {
                        id: 3,
                        title:
                          'OpenAI, GPT, and ChatGPT for Solutions Engineers',
                        supplementalInfo:
                          "**OpenAI: A Leader in AI Research Tailored for Solutions Engineering**\n\nOpenAI, akin to an innovation powerhouse, plays a pivotal role in advancing the field of artificial intelligence, with a special resonance for solutions engineers. As architects of complex systems, solutions engineers can leverage the groundbreaking research and tools developed by OpenAI to enhance their solutions, from improving algorithmic efficiency to integrating next-gen AI capabilities. OpenAI's commitment to open-source principles and ethical AI aligns with the need for transparent and secure systems in solutions engineering. OpenAI's advancements in AI serve as both a toolbox and a source of inspiration for solutions engineers, providing them with cutting-edge resources to tackle complex engineering challenges and drive forward digital transformation initiatives within their organizations.<br><br>**GPT: Evolving Intelligence for Solutions Engineering**\n\nGenerative Pre-trained Transformer, or GPT, stands as a testament to the evolutionary progress in AI, much like the progressive development of a sophisticated engineering system. Each iteration, from GPT-2 to GPT-3 and beyond, has marked a significant leap forward, presenting solutions engineers with increasingly powerful tools. GPT models, with their advanced language understanding and generation capabilities, can be harnessed for tasks such as automating documentation, enhancing code generation, and optimizing communication channels. Solutions engineers can integrate GPT into their systems to improve efficiency, reduce error rates, and create more intuitive user interfaces, ensuring that the systems they design are not only functional but also user-centric and responsive.<br><br>**ChatGPT: Revolutionizing Conversational Interfaces for Solutions Engineering**\n\nChatGPT represents a paradigm shift in conversational AI, serving as an essential asset for solutions engineers looking to implement intelligent conversational interfaces. Whether it's for troubleshooting, customer service, or user interaction, ChatGPT can provide a seamless, natural language-based layer of interaction that enhances the user experience. Solutions engineers can integrate ChatGPT into their systems to offer real-time support, automate routine inquiries, and gather user feedback efficiently. The sophistication of ChatGPT in understanding context and generating relevant responses enables solutions engineers to create systems that are not only functionally robust but also communicatively intelligent, bridging the gap between human users and the digital systems they interact with.",
                      },
                      {
                        id: 4,
                        title:
                          "What ChatGPT Can and Can't Do for Solutions Engineers",
                        supplementalInfo:
                          "**A Smart Conversationalist in Solutions Design**\n\nChatGPT, developed by OpenAI, serves as a multifaceted tool in the arsenal of a solutions engineer. Its capacity to understand and generate human-like text makes it an invaluable asset for automating customer support, streamlining communication, and providing coding assistance. Solutions engineers can harness ChatGPT to develop advanced chatbots for customer interaction, assist in debugging code, or even generate documentation. Its versatility extends to translating technical jargon for non-technical stakeholders, summarizing lengthy technical documents, and brainstorming ideas for project solutions. Despite its breadth of knowledge, solutions engineers must be cognizant of its limitations. ChatGPT might not always grasp the subtleties of highly specialized engineering domains or the latest technological breakthroughs, necessitating a critical evaluation of its responses.<br><br>**It Doesn't Know Everything in Engineering**\n\nChatGPT's knowledge, while extensive, is frozen at the point of its last update in April 2023. This means that it does not have the capacity to access or comprehend new developments, research, or data that have emerged post-training. For solutions engineers, this limitation underscores the need for due diligence, particularly when dealing with cutting-edge technologies or industry-specific advancements. While ChatGPT can offer a solid foundation, solutions engineers should corroborate its responses with the latest research, industry trends, and data before integrating them into their solutions.<br><br>**A Helper, Not a Decision Maker in Engineering Solutions**\n\nIn the realm of solutions engineering, ChatGPT stands as an assistive entity, not a substitute for human expertise and decision-making. While it can generate suggestions, explanations, and data-driven insights, it lacks the innate human abilities to grasp context, exercise ethical judgment, and understand the nuanced dynamics of stakeholder relationships. Solutions engineers should leverage ChatGPT as a supportive tool to augment their capabilities, especially during the ideation and design phases. However, the responsibility for making pivotal decisions, especially those involving ethical considerations, complex problem-solving, and human-centric design principles, firmly remains in the hands of the engineers. By acknowledging ChatGPT's strengths and limitations, solutions engineers can effectively incorporate this AI tool into their workflow, enhancing their productivity and creative problem-solving capacity.",
                      },
                      {
                        id: 5,
                        title: 'AI-Driven Solutions for Solutions Engineers',
                        supplementalInfo:
                          "**AI-Enhanced Customer Support Systems**\n\nFor solutions engineers, integrating AI into customer support systems transcends traditional help desks. It involves architecting complex, scalable solutions that leverage AI's potential to enhance customer experience. Virtual assistants and chatbots, driven by AI, not only offer round-the-clock support but also collect valuable data on customer interactions and preferences. This data can be analyzed to refine customer support strategies, anticipate customer needs, and tailor services. For solutions engineers, the challenge lies in seamlessly integrating these AI systems with existing IT infrastructure and ensuring they can evolve with the growing needs of the business. They must also ensure that these systems complement human agents, handling routine inquiries while escalating more complex issues that require a human touch.<br><br>**Summarization and Content Generation Engines**\n\nIn a solutions engineering context, AI-driven tools that summarize and generate content can be a boon for documentation, report generation, and knowledge management. Solutions engineers can employ these tools to automatically generate technical documentation, executive summaries of project progress, or even draft initial versions of complex technical reports. By leveraging AI for these tasks, solutions engineers can ensure consistency and accuracy in documentation while saving significant time and resources. Moreover, integrating these AI systems with project management tools can streamline workflows, ensuring that all stakeholders have access to timely, relevant, and concise information.<br><br>**Cross-Cultural Communication and Localization Platforms**\n\nFor solutions engineers working in global markets, AI-powered translation and localization tools are invaluable. These tools facilitate the development of software and systems that can be easily adapted for different languages and cultural contexts, ensuring that products are globally accessible and culturally relevant. Solutions engineers must consider not just the linguistic translation but also the cultural nuances and user experience in different regions. By integrating AI-driven localization tools, they can ensure that products and services are well-received in diverse markets, avoiding cultural faux pas and enhancing global user engagement. The challenge for solutions engineers is to integrate these tools in a way that they can continually learn from user feedback and evolve to meet the dynamic demands of global communication.",
                      },
                      {
                        id: 6,
                        title: 'GPT-3.5-Turbo vs GPT-4 for Solutions Engineers',
                        supplementalInfo:
                          "**GPT-4: The Newer, Smarter AI from a Solutions Engineer's Perspective**\n\nGPT-4 represents the cutting-edge in AI technology, akin to the latest innovation in a long line of transformative tools at a solutions engineer's disposal. For professionals tasked with designing complex systems and solutions, GPT-4 offers unparalleled advancements. Its deeper comprehension and sophisticated conversational abilities enable it to grasp the intricacies of technical documentation, user requirements, and system specifications with greater precision. GPT-4's expanded knowledge base and improved reasoning capabilities allow solutions engineers to extract nuanced insights, perform more accurate risk assessments, and devise more innovative solutions. However, this enhanced performance comes with higher computational and financial costs. Solutions engineers must weigh these factors against project budgets and the necessity for cutting-edge AI capabilities when deciding on the appropriate tool for their specific applications.<br><br>**Choosing the Best Tool for the Job in Solutions Engineering**\n\nThe selection between GPT-3.5-Turbo and GPT-4 for solutions engineers parallels the choice between different grades of engineering materials or software suites. GPT-3.5-Turbo, with its reliable performance and cost-effectiveness, is like a trusted toolkit – versatile for a wide range of engineering challenges but without the frills of the latest innovation. It is well-suited for projects where AI is used for optimizing workflows, generating routine reports, or managing customer inquiries. Conversely, GPT-4 is the high-end, specialized equipment for complex, high-stakes projects. Its advanced capabilities make it ideal for tasks requiring deep technical analysis, creative problem-solving, or interaction with complex data sets. Ultimately, the decision hinges on a thorough analysis of project requirements, client expectations, and budget constraints, ensuring the selected AI model drives value and aligns with the strategic goals of the project.",
                      },
                      {
                        id: 7,
                        title:
                          'Other LLM Options and Tools for Solutions Engineers',
                        supplementalInfo:
                          "**Exploring the Landscape of LLMs for Solutions Engineering**\n\nWhile OpenAI's GPT series has gained significant traction, it represents just one of many advancements in the field of Large Language Models (LLMs) from the perspective of a solutions engineer. Major players like Google, Facebook (Meta), and a host of emerging tech innovators are continuously evolving their own LLMs. Each of these models brings a unique blend of algorithms, architectures, and training methodologies. As a solutions engineer, understanding the differentiating features and strengths of each LLM is crucial in selecting the right one for system integration, ensuring alignment with the technical and business requirements of a project.<br><br>**Domain-Specific LLMs: Tailoring AI for Precision Engineering**\n\nIn the same way that certain materials or components are chosen for their suitability in particular engineering contexts, specialized AIs are trained with domain-specific data to perform tasks with greater accuracy and relevance. For solutions engineers, leveraging these domain-tailored AIs can mean the difference between a generic solution and one that truly resonates with the client's needs. Whether optimizing a financial forecasting system, enhancing diagnostic accuracy in healthcare, or improving legal document analysis, domain-specific LLMs empower solutions engineers to deliver targeted and sophisticated solutions.<br><br>**Empowering Solutions Engineers with AI Tools**\n\nThe right set of tools can transform the theoretical power of AI into practical, deployable solutions. A variety of software platforms and frameworks are at the disposal of solutions engineers, ranging from plug-and-play applications to customizable suites that can be intricately molded to fit the contours of any project. These tools not only streamline the integration of AI into existing systems but also enable solutions engineers to craft innovative features and functionalities, elevating the utility and efficiency of the solutions they engineer. Whether it's refining user experience, automating data-driven decision-making, or enhancing predictive maintenance, the adept use of these AI tools can significantly amplify the impact and value of engineered solutions.",
                      },
                    ],
                    Examples: [
                      {
                        id: 1,
                        title: 'What is Artificial Intelligence',
                        supplementalInfo:
                          '**Pattern Recognition** - AI systems can identify patterns and regularities in data. For example, facial recognition software detects and recognizes human faces in images and videos. <br><br>**Natural Language Processing (NLP)** - This involves the ability of a machine to understand and interpret human language. Applications include voice assistants like Siri and Alexa, and language translation services like Google Translate. <br><br>**Machine Learning in Retail** - Retailers use AI to predict stock levels, optimize prices, personalize recommendations, and enhance customer service through chatbots. <br><br>**Autonomous Vehicles** - Self-driving cars use a combination of AI technologies, including computer vision, sensor fusion, and decision-making, to navigate and drive without human input. <br><br>**Healthcare Diagnostics** - AI algorithms can analyze medical images, like X-rays or MRIs, to assist doctors in diagnosing diseases early and accurately. <br><br>**Smart Home Devices** - Devices like smart thermostats and lights learn from your behavior to save energy and enhance convenience. <br><br>**Fraud Detection** - Financial institutions use AI to monitor transactions in real-time, identifying patterns indicative of fraudulent activity. <br><br>**Robotics** - AI-powered robots are employed in manufacturing, performing tasks ranging from assembly to inspection with high precision. <br><br>**Content Moderation** - Online platforms utilize AI to automatically detect and flag inappropriate or harmful content. <br><br>**AI in Entertainment** - Streaming services use AI to recommend movies and shows based on your viewing history, and video games use it to create challenging, adaptive opponents.',
                      },
                      {
                        id: 2,
                        title: 'What are Large Language Models?',
                        supplementalInfo:
                          '**Conversation and Comprehension** - LLMs like GPT can engage in conversations, answering questions and providing explanations much like a human would. <br><br>**Content Creation** - These models can write essays, create poetry, or even generate code, assisting in various creative and technical endeavors. <br><br>**Language Translation** - LLMs can translate text between languages, breaking down language barriers in communication. <br><br>**Educational Assistance** - They can serve as tutors, explaining complex subjects and providing personalized learning experiences. <br><br>**Email Drafting and Summarization** - LLMs help in drafting, summarizing, and managing emails, increasing productivity in workplace communication. <br><br>**Customer Service Bots** - These models power chatbots that can handle customer queries efficiently, improving the user experience. <br><br>**Research and Information Gathering** - LLMs can sift through large volumes of data, summarizing research papers or providing quick answers to queries. <br><br>**Programming Assistance** - They assist in writing and debugging code, making the software development process more efficient. <br><br>**Creative Writing and Brainstorming** - LLMs offer suggestions and ideas, aiding writers in overcoming creative blocks. <br><br>**Personalized Recommendations** - Based on user interactions, LLMs can provide personalized content, product, or service recommendations.',
                      },
                      {
                        id: 3,
                        title: 'OpenAI, GPT and ChatGPT',
                        supplementalInfo:
                          "**OpenAI's Mission and Vision** - OpenAI is a research organization focused on creating and promoting friendly AI for the betterment of humanity. They emphasize safety, security, and ethical considerations in AI development.<br><br>**AI Safety and Ethics** - OpenAI dedicates substantial efforts towards ensuring AI advancements are aligned with ethical guidelines and safety measures to prevent unintended consequences.<br><br>**OpenAI's Contributions** - OpenAI has contributed significantly to various AI fields, including robotics, computer vision, and NLP, enhancing AI's capabilities and applications.<br><br>**GPT's Evolution** - From GPT-1 to GPT-3, and beyond, each version has showcased advancements in understanding and generating human language, becoming more contextually aware and nuanced.<br><br>**Language Understanding** - GPT models are trained on diverse internet text, allowing them to comprehend and generate a wide array of content, from poetry to technical manuals.<br><br>**GPT in Business** - GPT's language capabilities have been employed in various industries for tasks like automated customer support, content creation, and data analysis.<br><br>**ChatGPT's Conversational Abilities** - Designed for dialogue, ChatGPT can provide human-like responses in real-time, useful in applications like tutoring, virtual assistance, and interactive entertainment.<br><br>**Accessibility of AI** - ChatGPT and other models developed by OpenAI have made AI more accessible and user-friendly, enabling wider adoption across sectors.<br><br>**AI for Good** - OpenAI's advancements have also been used for social good initiatives, such as providing educational support, mental health assistance, and promoting accessibility for individuals with disabilities.<br><br>**Fostering AI Literacy** - OpenAI has played a role in educating the public about AI, demystifying its workings, and encouraging responsible usage and understanding of AI technologies.",
                      },
                      {
                        id: 4,
                        title: "What ChatGPT Can and Can't Do",
                        supplementalInfo:
                          "**Language Translation** - ChatGPT can translate text between various languages, aiding communication across language barriers.<br><br>**Writing Assistance** - It can help draft essays, emails, and reports, offering suggestions for grammar, style, and content.<br><br>**Coding Help** - ChatGPT can assist with writing and debugging code in several programming languages.<br><br>**Learning & Tutoring** - It can provide explanations on a wide range of topics, from history to quantum physics, acting as a virtual tutor.<br><br>**Entertainment** - ChatGPT can generate poems, stories, and even jokes, offering a creative outlet or a bit of humor.<br><br>**Not Internet-Connected** - ChatGPT doesn't have the ability to access or retrieve information from the internet or databases in real-time.<br><br>**No Personal Experiences** - It cannot form memories or personal experiences and thus can't provide personal advice or opinions.<br><br>**Limited Depth in Specialized Domains** - While knowledgeable, ChatGPT may not have the depth of understanding that true experts have in specialized fields.<br><br>**Not a Substitute for Professional Advice** - ChatGPT shouldn't be used as a substitute for professional advice in medical, legal, or safety-critical areas.<br><br>**No Consciousness or Emotions** - It does not have feelings, consciousness, or subjective experiences, so it cannot provide emotional support or ethical judgments.",
                      },
                      {
                        id: 5,
                        title: 'General Use Cases',
                        supplementalInfo:
                          '**Personalized Learning** - AI in education adapts to individual learning styles and paces. It can identify areas where students struggle and tailor content to their needs, making education more accessible and effective.<br><br>**Smart Agriculture** - Farmers use AI to monitor crop health, predict weather patterns, and optimize resource use, leading to increased yields and sustainable practices.<br><br>**Predictive Maintenance** - In manufacturing and utilities, AI predicts when machines are likely to fail, allowing for maintenance before costly breakdowns occur.<br><br>**Traffic Management** - Cities are implementing AI to analyze traffic patterns and optimize signals, reducing congestion and improving safety.<br><br>**Energy Efficiency** - AI optimizes energy usage in buildings and power grids, reducing waste and saving costs.<br><br>**Financial Advisory Services** - AI-powered robo-advisors provide personalized investment advice, making financial planning more accessible.<br><br>**Drug Discovery and Development** - AI accelerates the process of discovering new drugs by predicting how different compounds will behave.<br><br>**Media Personalization** - AI curates personalized news feeds and entertainment options based on user preferences and behaviors.<br><br>**E-commerce Optimization** - AI enhances online shopping experiences with personalized recommendations, visual search, and fraud detection.<br><br>**Disaster Prediction and Response** - AI analyzes data from sensors and satellites to predict natural disasters and help coordinate emergency response efforts.',
                      },
                      {
                        id: 6,
                        title: 'GPT 3.5-Turbo vs GPT-4',
                        supplementalInfo:
                          "**Architecture Complexity** - GPT-4's architecture is more complex, allowing it to understand and generate content that's closer to a human's level of sophistication.<br><br>**Comprehension and Contextual Understanding** - GPT-4 excels in understanding context and nuance, making it better suited for tasks that require a deep understanding of the subject matter.<br><br>**Content Generation** - GPT-4 can create more nuanced and complex content, useful for applications like creative writing, advanced coding, and complex problem-solving.<br><br>**Multilingual Capabilities** - GPT-4's advanced algorithms provide stronger support for a broader range of languages, making it more versatile for global applications.<br><br>**Knowledge Base** - GPT-4 has access to a more extensive and up-to-date knowledge base, allowing it to provide more accurate information and analysis.<br><br>**Cost-Effectiveness** - GPT-3.5-Turbo may offer a more cost-effective solution for businesses and users that do not require the cutting-edge capabilities of GPT-4.<br><br>**Computational Efficiency** - GPT-3.5-Turbo can be more efficient for tasks that don't need the advanced capabilities of GPT-4, saving computational resources.<br><br>**Ease of Integration** - GPT-3.5-Turbo may be easier to integrate into existing systems and applications due to its lower complexity and resource requirements.<br><br>**Scalability** - GPT-4's advanced features may be better suited for scaling complex applications, while GPT-3.5-Turbo could be more suitable for scaling simpler tasks.<br><br>**User Experience** - GPT-4 can provide a more sophisticated user experience, particularly in applications that require nuanced interactions, like advanced tutoring systems or intricate customer service bots.",
                      },
                      {
                        id: 7,
                        title: 'Other LLM Options and Tools',
                        supplementalInfo:
                          "**Global Tech Titans** - Beyond OpenAI's GPT, tech giants like Google have developed BERT, used for understanding the context of words in search queries, while Facebook (Meta) has created RoBERTa, an optimized model for a wide range of NLP tasks. <br><br>**Sector-Specific AI** - Models like BioBERT specialize in biomedical texts, FinBERT focuses on financial texts, and Legal-BERT is adapted to understand legal language, each serving their respective professional fields with higher accuracy. <br><br>**User-Friendly Platforms** - Tools like Hugging Face offer user-friendly interfaces and a library of pre-trained models, making it easier for developers to experiment with and deploy AI applications. <br><br>**Code Generation and Assistance** - GitHub Copilot, powered by OpenAI, suggests code and functions to developers, streamlining the software development process. <br><br>**AI-Powered Creativity** - Platforms like DALL-E and DeepArt use AI to generate unique images and artwork based on textual descriptions or style emulation. <br><br>**Language Translation Services** - Services like DeepL offer highly accurate translations by leveraging specialized language models, facilitating global communication. <br><br>**Personalization Engines** - AI models are used in e-commerce to provide personalized shopping experiences by recommending products based on user behavior and preferences. <br><br>**Automated Customer Support** - Chatbots and virtual assistants powered by AI provide 24/7 customer service, handling inquiries and resolving issues efficiently. <br><br>**Content Creation** - AI tools assist in content generation, from writing marketing copy to composing music, enhancing creativity and productivity. <br><br>**Business Analytics** - AI-driven analytics tools help businesses derive actionable insights from data, optimizing strategies for marketing, sales, and operations.",
                      },
                    ],
                  },
                },
                {
                  id: 2,
                  title: 'Biases, Inaccuracies & Responsible Use',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '4:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'What is a Bias?',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Biases in AI-Generated Content',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Hallucinations and How to Avoid Them',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 4,
                      name: 'General Recommendations',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 3,
                  title: 'Ethical Considerations & Privacy',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '5:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'ChatGPT & Your Privacy',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'What Data is Collected?',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'How You Can Protect Your Privacy',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 4,
                      name: 'AI Assistance vs AI Dependence',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
              ],
            },
            {
              id: 2,
              title: 'ChatGPT And The (Modern) Job Market',
              videoUrl:
                'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '7m 10s',
              progress: 20,
              progressText: '20%',
              topics: [
                {
                  id: 6,
                  title: 'How Recruiters Are Leveraging ChatGPT',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Screening Applications',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Communication & Networking',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Deepening Interviews',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 4,
                      name: 'Automation & "Efficiency"',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 7,
                  title: 'The New Problem With Job Searching',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Job Searching & AI',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Applicant Expectations vs Hiring Realities',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Metric-Obsessed "Human" Resources',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 4,
                      name: 'Skill Evaluation vs Depth of Knowledge',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 8,
                  title: 'How Applicants Are Taking Advantage of ChatGPT',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '4:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Writing Resumes & Cover Letters',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Optimizing for ATS',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Communication & Networking',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 4,
                      name: 'Company & Role Research',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 5,
                      name: 'Comprehensive Interview Prep',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 6,
                      name: 'Generating High-Quality Questions',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 7,
                      name: 'Salary Negotation Strategies',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 8,
                      name: 'Personal Brand Building',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
              ],
            },
            {
              id: 3,
              title: 'Crafting Effective Prompts',
              videoUrl:
                'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '7m 10s',
              progress: 20,
              progressText: '20%',
              topics: [
                {
                  id: 6,
                  title: 'How Recruiters Are Leveraging ChatGPT',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Screening Applications',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Communication & Networking',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Deepening Interviews',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 4,
                      name: 'Automation & "Efficiency"',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 7,
                  title: 'The New Problem With Job Searching',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Job Searching & AI',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Applicant Expectations vs Hiring Realities',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Metric-Obsessed "Human" Resources',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 4,
                      name: 'Skill Evaluation vs Depth of Knowledge',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 8,
                  title: 'How Applicants Are Taking Advantage of ChatGPT',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '4:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Writing Resumes & Cover Letters',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Optimizing for ATS',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Communication & Networking',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 4,
                      name: 'Company & Role Research',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 5,
                      name: 'Comprehensive Interview Prep',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 6,
                      name: 'Generating High-Quality Questions',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 7,
                      name: 'Salary Negotation Strategies',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 8,
                      name: 'Personal Brand Building',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
              ],
            },
            {
              id: 4,
              videoUrl:
                'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              title: 'Exploring Common Prompts',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '7m 10s',
              progress: 20,
              progressText: '20%',
              topics: [
                {
                  id: 6,
                  title: 'How Recruiters Are Leveraging ChatGPT',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Screening Applications',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Communication & Networking',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Deepening Interviews',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 4,
                      name: 'Automation & "Efficiency"',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 7,
                  title: 'The New Problem With Job Searching',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Job Searching & AI',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Applicant Expectations vs Hiring Realities',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Metric-Obsessed "Human" Resources',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 4,
                      name: 'Skill Evaluation vs Depth of Knowledge',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 8,
                  title: 'How Applicants Are Taking Advantage of ChatGPT',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '4:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Writing Resumes & Cover Letters',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Optimizing for ATS',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Communication & Networking',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 4,
                      name: 'Company & Role Research',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 5,
                      name: 'Comprehensive Interview Prep',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 6,
                      name: 'Generating High-Quality Questions',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 7,
                      name: 'Salary Negotation Strategies',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 8,
                      name: 'Personal Brand Building',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 3,
          name: 'Cover Letters & Email Communication',
          thumbnail: 'https://via.placeholder.com/150',
          lessons: [
            {
              id: 1,
              title: 'Purpose & Structure of Cover Letters',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '5m 20s',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'Aligning to Job Description',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 2,
                  title: 'Demonstrating Passion & Fit',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 3,
                  title: 'Evaluating Ideal Length',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
              ],
            },
            {
              id: 2,
              title: 'Using ChatGPT for personalized cover letters',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '5m 20s',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'Avoding Generic Templates',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 2,
                  title: 'Input Parameters for Personalization',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
              ],
            },
            {
              id: 3,
              title: 'Using ChatGPT for Email & Communication',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '5m 20s',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'Writing Effective Emails',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Power Words',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Curiosity Hooks',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 2,
                  title: 'Crafting Concise Subjecet Lines',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Avoiding Spam Triggers',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 3,
                  title: 'Crafting Professional Intro & Body Content',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Maintaining a Personalized Professional Tone',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Ending with a Call to Action',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Resume Optimization',
          thumbnail: 'https://via.placeholder.com/150',
          lessons: [
            {
              id: 1,
              title: 'Resume Optimization with ChatGPT',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '5m 20s',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'Analyzing Job Descriptions',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Parsing Key Skills & Requirements',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Translating Requirements Into Skills & Achievements',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Recognizing Industry-Specific Jargon',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 2,
                  title: 'Optimizing Resume for ATS Systems',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '4:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Tailoring Summary & Objective Statements',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Structuring Resume Sections for Maximum Impact',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Quantifying Achievements',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Incorporating Keywords',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Strategic Placement Without Overstuffing',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Integrating Feedback and Iterating Drafts',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 2,
                  title: 'Guided Exercises',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '4:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Matching Candidates to Job Descriptions',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Optimizing Sample Resume Sections',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Feedback Integration',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Selecting the Strongest Resumes',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Strategic Placement Without Overstuffing',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: 'LinkedIn Networking Strategies',
          thumbnail: 'https://via.placeholder.com/150',
          lessons: [
            {
              id: 1,
              title: 'LinkedIn, Networking & ChatGPT',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '5m 20s',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'Why LinkedIn?',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 1,
                  title: "The Power of LinkedIn's Algorithm",
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 2,
                  title: 'Using ChatGPT for Posts & Interacting with Others',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '4:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
              ],
            },
            {
              id: 2,
              title: 'Creating a Compelling LinkedIn Profile',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '7m 10s',
              progress: 20,
              progressText: '20%',
              topics: [
                {
                  id: 1,
                  title: 'Crafting an AI-Driven Summary',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 1,
                  title: 'Summarizing Experience',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 1,
                  title: 'Expanding Skills & Achievements',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
              ],
            },
            {
              id: 3,
              title: 'Researching Connections',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '7m 10s',
              progress: 20,
              progressText: '20%',
              topics: [
                {
                  id: 1,
                  title: 'Identifying Shared Experiences',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 2,
                  title: 'Crafting Requests & Messages with ChatGPT',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 3,
                  title: 'Crafting Personalized Invites with ChatGPT',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
              ],
            },
            {
              id: 4,
              title: 'Templates for Outreach',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail: 'https://via.placeholder.com/150',
              duration: '7:10',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'Following Up On Invites',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 2,
                  title: 'Asking for Informational Interviews',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 3,
                  title: 'Personalize Without Overstepping',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 4,
                  title: 'Timing & Frequency',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
              ],
            },
            {
              id: 5,
              title: 'Exploring Other Strategies',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail: 'https://via.placeholder.com/150',
              duration: '7:10',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'Slack Groups',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Finding Slack Groups',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Participating in Slack Groups',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 3,
                      name: 'Networking in Slack Groups',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 2,
                  title: 'Local & Virtual Networking Events',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Finding Networking Events',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Preparing to Participate in Networking Events',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
                {
                  id: 3,
                  title: 'Seminars & Conferences',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    {
                      id: 1,
                      name: 'Finding Seminars & Conferences',
                      supplementalInfo: 'Lorem ipsum',
                    },
                    {
                      id: 2,
                      name: 'Preparing to Participate in Seminars & Conferences',
                      supplementalInfo: 'Lorem ipsum',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 5,
          name: 'Navigating Interviews',
          thumbnail: 'https://via.placeholder.com/150',
          lessons: [
            {
              id: 1,
              title: 'Preparing for Different Types of Interviews',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '5m 20s',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'Phone, Video & In-Person Interviews',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                },
                {
                  id: 2,
                  title: 'Screenings & First-Rounds',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '4:10',
                  progress: 100,
                  isSelected: false,
                },
                {
                  id: 3,
                  title: 'Follow-Up & Panel Interviews',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '5:10',
                  progress: 100,
                  isSelected: false,
                },
                {
                  id: 4,
                  title:
                    'Understanding Behavioral, Situational & Competency-Based Questions',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '5:10',
                  progress: 100,
                  isSelected: false,
                },
              ],
            },
            {
              id: 2,
              title: 'Using ChatGPT for Interview Prep',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail:
                'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
              duration: '7m 10s',
              progress: 20,
              progressText: '20%',
              topics: [
                {
                  id: 1,
                  title: 'Anticipating & Preparing for Common Questions',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 2,
                  title: 'Crafting Concise & Impactful Responses with ChatGPT',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 3,
                  title:
                    'Structuring STAR Model Answers for Behavioral Questions',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 4,
                  title: 'Crafting High-Quality Questions for the Interviewer',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
                {
                  id: 5,
                  title: 'How to Negotiate Salary & Benefits',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                  subtopics: [
                    // Subtopics here
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 6,
          name: 'Virtual Interview Etiquette',
          thumbnail: 'https://via.placeholder.com/150',
          lessons: [
            {
              id: 1,
              title: 'Mastering the Virtual Interview',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail: 'https://via.placeholder.com/150',
              duration: '7:10',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'Setting Up Your Virtual Interview Space',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                },
                {
                  id: 2,
                  title: 'Appearance, Body Langugage & Eye Contact',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                },
                {
                  id: 3,
                  title: 'Voice, Tone & Pace',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                },
                {
                  id: 4,
                  title: 'Handling Interruptions & Distractions',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                },
              ],
            },
            {
              id: 2,
              title: 'Using ChatGPT for Thank-You Notes & Follow-Up',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail: 'https://via.placeholder.com/150',
              duration: '7:10',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'The Art of Expressing Gratitude',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                },
                {
                  id: 2,
                  title: 'Appreciation, Recap, Reinforcement',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                },
                {
                  id: 3,
                  title: 'Timing Considerations',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                },
              ],
            },
            {
              id: 3,
              title: 'Following Up Post-Interviews',
              videoUrl: 'https://www.youtube.com/embed/o5MutYFWsM8?si=fgz694AFm8ol7rae',
              thumbnail: 'https://via.placeholder.com/150',
              duration: '7:10',
              progress: 100,
              progressText: '100%',
              topics: [
                {
                  id: 1,
                  title: 'Tailoring Follow-Up Messages From Feedback',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                },
                {
                  id: 2,
                  title: 'Positioning For Feedback Or Next Steps',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                },
                {
                  id: 3,
                  title: 'Addressing Concerns to Interviewer',
                  thumbnail: 'https://via.placeholder.com/150',
                  duration: '7:10',
                  progress: 100,
                  isSelected: false,
                },
              ],
            },
          ],
        },
      ];
    },
  },
  watch: {
    'user.id'(newId) {
      if (newId.includes('new-instructor')) {
        this.course.modules = [];
        this.selectedModule = {};
        this.selectedLesson = {};
        this.selectedTopic = {};
        this.selectedSubtopic = {};
        return;
      } else {
        this.setupModules();
      }

      if (newId.includes('new-student')) {
        this.course.notes = [];
      }

      if (newId.includes('active-student')) {
        this.setupNotes();
      }

      this.setup();
    },
  },
};
</script>

<style scoped>
/* Custom styling for hover, color, and shadow effects */
.video-lesson {
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.video-lesson:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.mini-video {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.mini-video:hover {
  background-color: #f5f5f5;
}

.mini-video.selected {
  background-color: #e0e0e0;
}

.thumbnail {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
}

.duration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  padding: 2px 4px;
  text-align: center;
  font-size: 10px;
  border-radius: 0 0 5px 5px;
}

.video-lesson:hover {
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.video-lesson:hover {
  cursor: pointer;
  transition: all 0.3s ease;
}

.line-through {
  text-decoration: line-through;
}

.rotate-icon {
  transition: transform 0.3s ease-in-out;
}
.rotate-icon.open {
  transform: rotate(180deg);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
