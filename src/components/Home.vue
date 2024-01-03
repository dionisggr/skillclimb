<template>
  <div class="bg-gray-100">
    <!-- Hero Section -->
    <section
      class="relative text-center pt-12 lg:pt-36 p-4 pb-8 lg:pb-24 bg-white"
    >
      <h1 class="text-3xl lg:text-6xl font-bold">Welcome to SkillClimb</h1>
      <p class="text-gray-600 mt-4 text-lg lg:text-xl">
        Join our community of learners and creators.
      </p>

      <!-- Call to Actions -->
      <div
        class="px-4 mt-8 lg:mt-16 flex flex-wrap justify-center space-x-0 lg:space-x-6 space-y-4 lg:space-y-0"
      >
        <a
          href="#popular-learning-paths"
          class="w-full lg:w-auto block px-6 py-3 lg:px-10 lg:py-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors text-lg cursor-pointer"
        >
          I'm a Learner
        </a>
        <a
          href="#"
          @click="openDashboard"
          class="w-full lg:w-auto block mt-4 lg:mt-0 px-6 py-3 lg:px-10 lg:py-4 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-colors text-lg cursor-pointer"
        >
          I'm a Content Creator
        </a>
      </div>

      <!-- How It Works link -->
      <div class="mt-12 mb-6">
        <a
          href="#"
          @click.prevent="toggleHowItWorks"
          class="text-blue-600 hover:text-blue-700 cursor-pointer underline"
        >
          Explore Benefits
        </a>
      </div>

      <!-- How It Works content -->
      <transition name="slide-fade">
        <div
          v-if="showHowItWorks"
          class="how-it-works-content mt-4 lg:mt-6 lg:mx-auto lg:w-3/4 bg-blue-500 bg-opacity-5 p-4 lg:p-10 rounded-md shadow-md text-gray-700 leading-relaxed text-lg lg:text-xl max-w-4xl"
        >
          <!-- Header -->
          <h2 class="text-2xl lg:text-3xl font-bold text-center mb-4 lg:mb-6">
            What We Offer
          </h2>

          <!-- Benefit Items -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
            <div
              v-for="benefit in benefits"
              :key="benefit"
              class="flex items-start space-x-2 lg:space-x-4 text-base"
            >
              <!-- Icon (Replace with your actual icons) -->
              <div
                class="flex-none w-8 lg:w-10 h-8 lg:h-10 bg-blue-200 rounded-full flex items-center justify-center"
              >
                <span class="text-blue-500 text-xl lg:text-2xl">&#x2714;</span>
              </div>

              <!-- Text Content -->
              <div class="flex-grow">{{ benefit }}</div>
            </div>
          </div>
        </div>
      </transition>
    </section>

    <section class="p-10 lg:py-12 w-full px-4 max-w-xl lg:max-w-4xl mx-auto">
      <h2 class="text-2xl lg:text-4xl font-bold text-center mb-4 lg:mb-8">
        Who We Are
      </h2>
      <div class="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
        <iframe
          class="w-full h-52 lg:h-[400px]"
          src="https://www.youtube.com/embed/4jjhWcWfCyE"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <p class="text-center text-gray-600 mt-4">
        Dive deep into our platform's capabilities and see what makes SkillClimb
        unique.
      </p>
    </section>

    <!-- Roadmaps Section -->
    <section
      class="py-12 lg:py-16 w-full px-4 lg:px-12 mx-auto bg-white"
      id="popular-learning-paths"
    >
      <h2 class="text-2xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">
        Learning Paths
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 justify-center max-w-screen-xl mx-auto"
      >
        <div
          v-for="(path, index) in learningPaths"
          :key="path.id"
          class="course-card max-w-md cursor-pointer transform transition-transform hover:-translate-y-1.5 hover:shadow-lg"
          @click="$emit('open-learning-path')"
        >
          <div class="relative">
            <img
              :src="path.thumbnail"
              alt="Course Thumbnail"
              class="w-full h-40 lg:h-48 object-cover rounded-t-md"
            />
            <div
              v-if="index !== 0"
              class="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-t-md"
            >
              <span class="text-slate-200 text-xl lg:text-2xl font-semibold"
                >Coming Soon</span
              >
            </div>
          </div>
          <div class="p-4 lg:p-6 bg-white rounded-b-md">
            <h3 class="text-xl lg:text-2xl font-semibold mb-2">
              {{ path.title }}
            </h3>
            <p class="text-gray-600">{{ path.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Reviews Section -->
    <section
      class="py-8 lg:py-16 w-full px-4 max-w-screen-xl mx-auto"
      id="reviews"
    >
      <h2 class="text-2xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">
        What our learners say
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 max-w-screen-xl mx-auto"
      >
        <div
          v-for="review in reviews"
          :key="review.id"
          class="review-card rounded-lg shadow-md p-4 bg-white transition-all transform hover:-translate-y-1"
        >
          <!-- User Info -->
          <div class="flex items-center mb-3">
            <img
              :src="review.userThumbnail"
              alt="User Image"
              class="w-8 h-8 rounded-full mr-2"
            />
            <span class="text-lg font-medium">{{ review.userName }}</span>
          </div>
          <!-- Star Ratings -->
          <div class="mb-2">
            <span
              v-for="star in 5"
              :key="star"
              :class="
                star <= review.stars ? 'text-yellow-400' : 'text-gray-300'
              "
              >&#9733;</span
            >
          </div>
          <!-- Review Text -->
          <p class="text-gray-600 text-sm">{{ review.text }}</p>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-8 lg:pt-16 bg-white" id="newsletter">
      <div class="max-w-2xl mx-auto px-4 text-center">
        <h2 class="text-2xl lg:text-4xl font-bold mb-6 lg:mb-10">
          Stay in the Loop
        </h2>
        <p class="mb-6 lg:mb-10 text-gray-600">
          Subscribe to our newsletter and never miss out on new content and
          updates.
        </p>
        <!-- Subscription Form -->
        <form
          @submit.prevent="subscribeToNewsletter"
          class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <input
            type="email"
            v-model="subscriberEmail"
            class="flex-grow px-4 py-2 text-lg rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            class="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showHowItWorks: false,
      subscriberEmail: '',
      benefits: [
        'Structured video course progression with notes and video timestamps.',
        'AI-generated supplemental information and practice.',
        'AI-optimized, personalized course selection for maximum adaptive learning.',
        'Flexible video lesson sets based on chosen difficulty levels.',
        'Certifications for completing learning paths.',
      ],
      learningPaths: [
        {
          id: 1,
          title: 'ChatGPT',
          description: 'Learn about generative AI and prompt engineering',
          thumbnail:
            'https://d-cb.jc-cdn.com/sites/crackberry.com/files/styles/large/public/article_images/2023/08/openai-logo.jpg',
        },
        {
          id: 2,
          title: 'Web Development',
          description: 'Master the art of web development...',
          thumbnail:
            'https://i.ytimg.com/vi/gQojMIhELvM/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD7gwoOXxTW38khre_34WIRlyngDg',
        },
        {
          id: 3,
          title: 'Solutions Engineering',
          description: 'Learn how to evaluate and deploy software solutions',
          thumbnail:
            'https://indoreinstitute.com/wp-content/uploads/2021/09/Innovative-Engineering-Solutions-Devised-to-Fight-the-COVID-19-Pandemic.jpg',
        },
        {
          id: 4,
          title: 'Data Engineering',
          description: 'Learn how to build data pipelines and warehouses.',
          thumbnail:
            'https://www.data-vault.co.uk/wp-content/uploads/2022/04/blog_image_1100x619_DATAENGINEER.jpg',
        },
        {
          id: 5,
          title: 'Artificial Intelligence',
          description: 'Learn about the future of AI and its applications.',
          thumbnail:
            'https://thebulletin.org/wp-content/uploads/2023/08/AdobeStock_580829354.jpeg',
        },
        {
          id: 6,
          title: 'Machine Learning',
          description: 'Learn to build intelligent systems.',
          thumbnail:
            'https://emeritus.org/in/wp-content/uploads/sites/3/2023/03/types-of-machine-learning.jpg.optimal.jpg',
        },
        {
          id: 8,
          title: 'Prompt Engineering',
          description: 'Learn how to communicate with generative AI',
          thumbnail:
            'https://miro.medium.com/v2/resize:fit:800/1*csEMmQ-po3jOFGMFAtwKrg.png',
        },
        {
          id: 7,
          title: 'Data Science',
          description: 'Learn to extract insights from data.',
          thumbnail:
            'https://imageio.forbes.com/specials-images/imageserve/615a844b0e678d9d11c5fc26/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds',
        },
      ],
      reviews: [
        {
          id: 1,
          userName: 'John Doe',
          userThumbnail:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv5T9G-B_94Liv4WQ2W-ulYpOqYM_0Yq6su6KgzQEzHU1InT6k-xEMNQvydTUrtqcPQio&usqp=CAU',
          stars: 5,
          text: 'Amazing platform! I have learned so much in just a few weeks. Highly recommended!',
        },
        {
          id: 2,
          userName: 'Jane Smith',
          userThumbnail:
            'https://i.pinimg.com/736x/59/55/e2/5955e250ff4e50edd16371952d30ee8b.jpg',
          stars: 4,
          text: 'Great courses. I love the structure and the quality of the instructors.',
        },
        {
          id: 3,
          userName: 'Jill Johnson',
          userThumbnail:
            'https://corundumgroup.com/wp-content/uploads/2022/12/b.jpg',
          stars: 5,
          text: 'I have been using SkillClimb for a few months now and I am very happy with the progress I have made.',
        },
        {
          id: 4,
          userName: 'Jack Williams',
          userThumbnail:
            'https://www.profilebakery.com/wp-content/uploads/2023/03/AI-Profile-Picture.jpg',
          stars: 5,
          text: 'I have been using SkillClimb for a few months now and I am very happy with the progress I have made.',
        },
      ],
    };
  },
  computed: {
    isContentCreator() {
      return this.user.id.includes('instructor');
    },
  },
  methods: {
    toggleHowItWorks() {
      this.showHowItWorks = !this.showHowItWorks;
    },
    toggleHowItWorks() {
      this.showHowItWorks = !this.showHowItWorks;
    },
    subscribeToNewsletter() {
      this.$emit('subscribe-to-newsletter', { email: this.subscriberEmail });

      this.subscriberEmail = '';
    },
    openDashboard() {
      if (this.user?.id.includes('business')) {
        this.$emit('open-business-dashboard');
      } else if (this.user?.id) {
        this.$emit('open-creator-dashboard');
      } else {
        this.$emit('toggle-login');
      }
    },
  },
};
</script>

<style scoped>
.home-container {
  background-color: #f8f9fa;
}

.course-card {
  transition: transform 0.3s ease;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1); /* adding shadow */
  display: flex; /* making it flex */
  flex-direction: column; /* orienting children vertically */
}

.course-card > div {
  flex: 1; /* ensure content occupies available space */
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.6.0 */ {
  opacity: 0;
  transform: translateY(10px);
}

/* Adding this for a clean text presentation */
.how-it-works-content {
  line-height: 1.75; /* Adjust line-height for better readability */
  font-size: 1.125rem; /* Adjust font-size for better visibility */
}
.review-card:hover {
  transform: translateY(-3px);
}

.review-card i {
  font-size: 1.25rem; /* Adjust the star icon size */
}
</style>
