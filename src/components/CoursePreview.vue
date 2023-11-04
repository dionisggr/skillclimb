<template>
  <main class="flex flex-col p-4 max-w-screen-xl mx-auto">
    <!-- Header / Title -->
    <div class="text-center py-6 bg-white rounded-lg">
      <h1 class="text-3xl font-semibold">Course Preview</h1>
      <p class="text-gray-600">Get a glimpse of what you'll learn.</p>
    </div>

    <!-- Introductory Video Section -->
    <section
      class="relative block rounded-lg shadow-lg overflow-hidden mx-auto w-full max-w-4xl"
      style=" "
    >
      <iframe
        src="https://www.youtube.com/embed/1GNsWa_EZdw?si=cXiwSUe1odIDdUAM"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="w-full min-h-52 h-[50vw] max-h-[450px] object-cover"
      ></iframe>
      <div
        class="absolute top-0 left-0 bg-gradient-to-b from-black to-transparent text-white p-4 w-full"
      >
        <h1 class="text-2xl font-bold">{{ course.name }}</h1>
        <p>{{ course.description }}</p>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-white rounded-lg p-6 mt-8 text-center">
      <h2 class="text-2xl font-bold mb-6">Start Your Journey Now</h2>
      <p class="text-gray-600 mb-6">
        Enroll in the "{{ course.title }}" course and begin your learning
        adventure with {{ course.instructor.name }} as your guide.
      </p>
      <div
        class="flex flex-col md:flex-row md:justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
      >
        <!-- Conditional rendering based on isLoggedIn -->
        <button
          @click="$emit(isLoggedIn ? 'continue-course' : 'open-course')"
          class="text-white font-semibold rounded-lg py-3 px-8 w-full md:w-auto transition-colors duration-300 ease-in-out focus:outline-none active:outline-none border-blue-700"
          :class="
            isLoggedIn
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-blue-500 hover:bg-blue-600'
          "
        >
          <!-- Text changes based on isLoggedIn -->
          {{ isLoggedIn ? 'Continue' : 'Enroll Now' }}
        </button>
      </div>
      <div
        v-if="showCourseStarting"
        class="mt-6 bg-gray-100 border-t border-gray-300 pt-6"
      >
        <h3 class="text-xl font-semibold mb-3">Course Starting...</h3>
        <div class="relative h-5 w-full bg-gray-300 rounded-lg overflow-hidden">
          <div
            class="absolute h-5 bg-green-500 transition-width"
            :style="{ width: courseStartingProgress + '%' }"
          ></div>
        </div>
      </div>
    </section>

    <!-- Curriculum Section -->
    <section class="bg-white rounded-lg p-6 shadow-lg mt-4">
      <h2 class="text-xl font-bold mb-4">Curriculum</h2>
      <div v-for="(_module, index) in course.modules" :key="index" class="mb-4">
        <div
          :class="[
            'mb-3 bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-all duration-200 cursor-pointer shadow-md',
            index < 2 &&
              isLoggedIn &&
              'completed-module bg-green-200 hover:bg-green-300',
          ]"
          @click="_module.hide = !_module.hide"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span
                class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4"
              >
                {{ index + 1 }}
              </span>
              <p class="flex-grow">{{ _module.name }}</p>
            </div>
            <span class="text-sm text-gray-600">{{ _module.duration }}</span>
          </div>
        </div>
        <transition name="slide-fade">
          <div v-if="!_module.hide" class="mt-2 ml-6 md:ml-8 lg:ml-12">
            <div
              v-for="topic in _module.lessons"
              :key="topic"
              :class="[
                'my-1 p-2 bg-gray-100 rounded hover:shadow-md hover:bg-gray-300 transition-all duration-200 cursor-pointer',
                index < 2 &&
                  isLoggedIn &&
                  'completed-topic bg-green-200 hover:bg-green-300',
              ]"
            >
              {{ topic.title }}
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- What You'll Learn Section -->
    <section class="bg-white rounded-lg p-6 mt-8">
      <h2 class="text-xl font-bold mb-6 text-center">What You'll Learn</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in course.learnings"
          :key="index"
          class="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <svg class="w-8 h-8 text-green-500 mb-3" viewBox="0 0 24 24">
            <path
              d="M20 12l-1.39-.81l.36-2.19l1.81.68l.4-2.01l-1.82-.67l.37-2.18L20 4l-1.09-.39l.02-.02L12 2L2.47 9l1.66 5l-1.63 5l1.25.46L12 22l6.84-2.53l.02-.02L20 12z"
            ></path>
          </svg>
          <p class="text-center">{{ item }}</p>
        </div>
      </div>
    </section>

<!-- Instructor Info Section -->
<section
  class="bg-gradient-to-r from-blue-500 to-green-400 rounded-lg p-6 shadow-lg text-white mt-2"
>
  <h2 class="text-xl font-bold mb-4">Instructor</h2>
  <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
    <img
      :src="course.instructor.imageUrl"
      alt="Instructor"
      class="w-24 h-24 rounded-full border-4 border-white mx-auto sm:mx-0"
    />
    <div class="text-center sm:text-left">
      <p class="text-2xl font-semibold">{{ course.instructor.name }}</p>
      <p class="mb-2">{{ course.instructor.title }}</p>
      <p>{{ course.instructor.bio }}</p>
      <a
        :href="course.instructor.website"
        class="block mt-4 text-sm underline"
        >Visit Instructor's Website</a
      >
    </div>
  </div>
</section>

  </main>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      course: {
        name: 'Job Searching with ChatGPT',
        description:
          'Learn how to use ChatGPT to optimize your job search and land your dream job!',
        instructor: {
          name: 'John Doe',
          title: 'Senior Vue.js Developer',
          bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
          imageUrl: '//placekitten.com/200/200',
          website: 'https://johndoe.com',
        },
        learnings: [
          "What ChatGPT Can and Can't Do",
          'Job Description Parsing Strategies',
          'Resume Optimization',
          'Cover Letter Optimization',
          'Networking Strategies',
          'Communication Etiquette',
        ],
        modules: [
          {
            id: 1,
            name: 'ChatGPT and AI Prompts',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'AI, LLMS and ChatGPT',
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
                    subtopics: [
                      {
                        id: 1,
                        name: 'What is Artificial Intelligence',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 2,
                        name: 'What are Large Language Models?',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 3,
                        name: 'OpenAI, GPT and ChatGPT',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 4,
                        name: 'What ChatGPT Can and Can\t Do',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 5,
                        name: 'General Use Cases',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 6,
                        name: 'GPT 3.5-Turbo vs GPT-4',
                        supplementalInfo: 'Lorem ipsum',
                      },
                      {
                        id: 7,
                        name: 'Other LLM Options and Tools',
                        supplementalInfo: 'Lorem ipsum',
                      },
                    ],
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
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '7m 10s',
                progress: 20,
                progressText: '20%',
                subtopics: [
                  {
                    id: 1,
                    name: 'Prompt Psychology: Intent, Context & Structure',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 1,
                    name: 'Leveraging & Avoiding Biases',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 2,
                    name: 'Refining & Iterating Prompts',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 3,
                    name: 'Prompt Engineering Basics',
                    supplementalInfo: 'Lorem ipsum',
                  },
                ],
              },
              {
                id: 4,
                title: 'Exploring Common Prompts',
                thumbnail:
                  'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
                duration: '7m 10s',
                progress: 20,
                progressText: '20%',
                subtopics: [
                  {
                    id: 1,
                    name: 'Role Prompting',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 2,
                    name: 'Context & Reference',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 3,
                    name: 'Specifying Audience',
                    supplementalInfo: 'Lorem ipsum',
                  },
                  {
                    id: 4,
                    name: 'Providing Examples',
                    supplementalInfo: 'Lorem ipsum',
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: 'Crafting Compelling Cover Letters with ChatGPT',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'Purpose & Structure of Cover Letters',
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
            name: 'Resume Optimization with ChatGPT',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'Resume Optimization with ChatGPT',
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
                        name: 'Structuring Resume Sectionsn for Maximum Impact',
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
            id: 3,
            name: 'Networking Strategies with LinkedIn & ChatGPT',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'LinkedIn, Networking & ChatGPT',
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
            id: 4,
            name: 'Navigating Interviews with Confidence',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'Preparing for Different Types of Interviews',
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
                    title:
                      'Crafting Concise & Impactful Responses with ChatGPT',
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
                    title:
                      'Crafting High-Quality Questions for the Interviewer',
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
            id: 5,
            name: 'Virtual Interview Etiquette & Follow-Up',
            thumbnail: 'https://via.placeholder.com/150',
            lessons: [
              {
                id: 1,
                title: 'Mastering the Virtual Interview',
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
        ],
      },
    };
  },
};
</script>

<style scoped>
.completed-module {
  text-decoration: line-through;
  opacity: 0.7;
}

.completed-topic {
  text-decoration: line-through;
  opacity: 0.7;
}
</style>
