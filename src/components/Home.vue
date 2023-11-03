<template>
  <div class="bg-gray-100">
    <!-- Hero Section -->
    <section class="relative text-center pt-36 pb-24 bg-white">
      <h1 class="text-6xl font-bold">Welcome to SkillClimb</h1>
      <p class="text-gray-600 mt-4 text-xl">
        Join our community of learners and creators.
      </p>

      <!-- Call to Actions -->
      <div class="mt-16 flex justify-center space-x-6">
        <a
          href="#popular-learning-paths"
          class="px-10 py-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors text-lg cursor-pointer"
        >
          I'm a Learner
        </a>
        <a
          href="#"
          class="px-10 py-4 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-colors text-lg cursor-pointer"
          @click="$emit('open-dashboard')"
        >
          I'm a Content Creator
        </a>
      </div>

      <!-- How It Works link -->
      <div class="mt-12">
        <a
          href="#"
          @click.prevent="toggleHowItWorks"
          class="text-blue-600 hover:text-blue-700 cursor-pointer underline"
        >
          Explore the Benefits
        </a>
      </div>

      <!-- How It Works content -->
      <transition name="slide-fade">
        <div
          v-if="showHowItWorks"
          class="how-it-works-content mt-6 mx-auto w-3/4 bg-blue-500 bg-opacity-5 p-10 rounded-md shadow-md text-gray-700 leading-relaxed text-xl max-w-4xl"
        >
          <!-- Header -->
          <h2 class="text-3xl font-bold text-center mb-6">What We Offer</h2>

          <!-- Benefit Items -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="benefit in benefits"
              :key="benefit"
              class="flex items-start space-x-4"
            >
              <!-- Icon (Replace with your actual icons) -->
              <div
                class="flex-none w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center"
              >
                <span class="text-blue-500 text-2xl">&#x2714;</span>
                <!-- Checkmark, replace with an icon -->
              </div>

              <!-- Text Content -->
              <div class="flex-grow">
                {{ benefit }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </section>

    <!-- Video Introduction Section -->
    <section class="py-16 w-3/5 max-w-4xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-8">Who We Are</h2>
      <iframe
        width="100%"
        height="450"
        src="https://www.youtube.com/embed/4jjhWcWfCyE"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <p class="text-center text-gray-600 mt-4">
        Dive deep into our platform's capabilities and see what makes SkillClimb
        unique.
      </p>
    </section>

<!-- Roadmaps Section -->
<section
  class="py-16 w-full px-12 mx-auto bg-white"
  id="popular-learning-paths"
>
  <h2 class="text-4xl font-bold text-center mb-12">
    Popular Learning Paths
  </h2>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center max-w-screen-2xl mx-auto"
  >
    <div
      v-for="(path, index) in learningPaths"
      :key="path.id"
      class="course-card max-w-md cursor-pointer transform transition-transform"
      :class="!index && 'transform transition-transform hover:-translate-y-2.5 hover:shadow-lg'"
      @click="index === 0 ? $emit('open-learning-path') : null"
    >
      <div class="relative">
        <img
          :src="path.thumbnail"
          alt="Course Thumbnail"
          class="w-full h-48 object-cover rounded-t-md"
        />
        <div
          v-if="index !== 0"
          class="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-t-md"
        >
          <span class="text-slate-200 text-2xl font-semibold">Coming Soon</span>
        </div>
      </div>
      <div class="p-6 bg-white rounded-b-md">
        <h3 class="text-2xl font-semibold mb-2">{{ path.title }}</h3>
        <p class="text-gray-600">{{ path.description }}</p>
      </div>
    </div>
  </div>
</section>


    <!-- Reviews Section -->
    <section class="py-16 w-11/12 mx-auto" id="reviews">
      <h2 class="text-4xl font-bold text-center mb-12">
        What our learners say
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-2xl mx-auto">
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
            >
              &#9733;
            </span>
          </div>
          <!-- Review Text -->
          <p class="text-gray-600 text-sm">{{ review.text }}</p>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="pt-16 bg-white" id="newsletter">
      <div class="w-11/12 mx-auto">
        <h2 class="text-4xl font-bold text-center mb-4">Stay Updated</h2>
        <p class="text-center text-gray-600 mb-8">
          Subscribe to our newsletter and get the latest updates on our courses
          and special offers!
        </p>

        <div class="flex justify-center">
          <div class="w-full max-w-xl bg-gray-100 p-8 rounded-md shadow-md">
            <form
              @submit.prevent="subscribeToNewsletter"
              class="flex flex-col space-y-4"
            >
              <input
                type="email"
                v-model="subscriberEmail"
                required
                placeholder="Your Email Address"
                class="px-4 py-2 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors text-lg cursor-pointer"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
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
          'https://th.bing.com/th/id/OIG.2r6EZ7PYvfej0iVeIwcM?pid=ImgGn',
        },
        {
          id: 4,
          title: 'Job Search',
          description: 'Learn how to find and land your dream job.',
          thumbnail:
            'https://th.bing.com/th/id/OIG.Vtt8ARwvcktN5J8tR5CW?pid=ImgGn',
        },
        {
          id: 5,
          title: 'Artificial Intelligence',
          description: 'Learn about the future of AI and its applications.',
          thumbnail:
            'https://th.bing.com/th/id/OIG.p2wMsbWVtkSzuBvCuAYV?pid=ImgGn',
        },
        {
          id: 6,
          title: 'Machine Learning',
          description: 'Learn to build intelligent systems.',
          thumbnail:
            'https://th.bing.com/th/id/OIG.KAQROkJX9soTEZ7i_N_w?pid=ImgGn',
        },
        {
          id: 8,
          title: 'Prompt Engineering',
          description: 'Learn how to communicate with generative AI',
          thumbnail:
            'https://th.bing.com/th/id/OIG.ppWopHWbrsfbgrzJhe_2?pid=ImgGn',
        },
        {
          id: 7,
          title: 'Data Science',
          description: 'Learn to extract insights from data.',
          thumbnail:
            'https://th.bing.com/th/id/OIG.6Ju.JlNuDRwzMEEA4qYT?pid=ImgGn',
        },
      ],
      reviews: [
        {
          id: 1,
          userName: 'John Doe',
          userThumbnail:
            'https://th.bing.com/th/id/OIG.kMOdQ0SnPAAMGkSvGmNh?pid=ImgGn',
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
  methods: {
    toggleHowItWorks() {
      this.showHowItWorks = !this.showHowItWorks;
    },
    toggleHowItWorks() {
      this.showHowItWorks = !this.showHowItWorks;
    },
    subscribeToNewsletter() {
      if (!this.subscriberEmail) {
        alert('Please enter a valid email address.');
        return;
      }
      // Here, you might want to make an API call to subscribe the user to your newsletter.
      alert(`Thank you for subscribing, ${this.subscriberEmail}!`);
      this.subscriberEmail = ''; // Reset the email input after subscribing.
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
