<template>
  <div class="bg-gray-100">
    <!-- Hero Section -->
    <section class="relative text-center py-36 pb-32 bg-white">
      <h1 class="text-6xl font-bold">Welcome to SkillClimb</h1>
      <p class="text-gray-600 mt-4 text-xl">
        Join our community of learners and creators.
      </p>

      <!-- Call to Actions -->
      <div class="mt-16 flex justify-center space-x-6">
        <a href="#popular-learning-paths"
          class="px-10 py-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors text-lg cursor-pointer">
          I'm a Learner
        </a>
        <a href="#" 
          class="px-10 py-4 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-colors text-lg cursor-pointer"
          @click="$emit('open-dashboard')">
          I'm a Content Creator
        </a>
      </div>

      <!-- How It Works link -->
      <div class="mt-12">
        <a href="#" @click.prevent="toggleHowItWorks" 
           class="text-blue-600 hover:text-blue-700 cursor-pointer underline">
          Explore the Benefits
        </a>
      </div>

      <!-- How It Works content -->
      <transition name="slide-fade">
        <div v-if="showHowItWorks"
             class="how-it-works-content mt-10 mx-auto w-1/2 text-gray-700 leading-relaxed text-xl">
          <!-- Benefit Items -->
          <div v-for="benefit in benefits" :key="benefit" class="flex items-center space-y-4">
            <span class="block w-4 h-4 bg-blue-500 rounded-full mr-4"></span>
            {{ benefit }}
          </div>
        </div>
      </transition>
    </section>

    <!-- Video Introduction Section -->
    <section class="py-16 w-4/6 mx-auto">
      <h2 class="text-4xl font-bold text-center mb-8">Who We Are</h2>
      <video controls class="w-full mb-8">
        <source src="" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p class="text-center text-gray-600">
        Dive deep into our platform's capabilities and see what makes SkillClimb unique.
      </p>
    </section>

    <!-- Roadmaps Section -->
    <section class="py-16 w-full px-12 mx-auto bg-white" id="popular-learning-paths">
      <h2 class="text-4xl font-bold text-center mb-12">
        Popular Learning Paths
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        <div class="course-card max-w-md cursor-pointer transform transition-transform hover:-translate-y-2.5 hover:shadow-lg"
             v-for="path in learningPaths" :key="path.id"
             @click="$emit('open-learning-path')">
          <img :src="path.thumbnail" alt="Course Thumbnail"
               class="w-full h-48 object-cover rounded-t-md" />
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="review in reviews" :key="review.id"
             class="review-card rounded-lg shadow-md p-4 bg-white transition-all transform hover:-translate-y-1">
          <!-- User Info -->
          <div class="flex items-center mb-3">
            <img :src="review.userThumbnail" alt="User Image"
                 class="w-8 h-8 rounded-full mr-2" />
            <span class="text-lg font-medium">{{ review.userName }}</span>
          </div>
          <!-- Star Ratings -->
          <div class="mb-2">
            <span v-for="star in 5" :key="star"
                  :class="star <= review.stars ? 'text-yellow-400' : 'text-gray-300'">
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
        <h2 class="text-4xl font-bold text-center mb-4">
          Stay Updated
        </h2>
        <p class="text-center text-gray-600 mb-8">
          Subscribe to our newsletter and get the latest updates on our courses and special offers!
        </p>

        <div class="flex justify-center">
          <div class="w-full max-w-xl bg-gray-100 p-8 rounded-md shadow-md">
            <form @submit.prevent="subscribeToNewsletter" class="flex flex-col space-y-4">
              <input type="email" v-model="subscriberEmail" required
                     placeholder="Your Email Address"
                     class="px-4 py-2 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none" />
              <button type="submit"
                      class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors text-lg cursor-pointer">
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
        'AI-optimized course selection based on your profile for maximum adaptive learning.',
        'Flexible video lesson sets based on chosen difficulty levels.',
        'Certifications for completing learning paths.',
      ],
      learningPaths: [
        {
          id: 1,
          title: 'Web Development',
          description: 'Master the art of web development...',
          thumbnail: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          title: 'Solutions Engineering',
          description: 'Learn how to evaluate and deploy software solutions',
          thumbnail: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          title: 'ChatGPT',
          description: 'Learn about generative AI and prompt engineering',
          thumbnail: 'https://via.placeholder.com/150',
        },
        {
          id: 4,
          title: 'Job Search',
          description: 'Learn how to find and land your dream job.',
          thumbnail: 'https://via.placeholder.com/150',
        },
        {
          id: 5,
          title: 'Artificial Intelligence',
          description: 'Learn about the future of AI and its applications.',
          thumbnail: 'https://via.placeholder.com/150',
        },
        {
          id: 6,
          title: 'Machine Learning',
          description: 'Learn to build intelligent systems.',
          thumbnail: 'https://via.placeholder.com/150',
        },
        {
          id: 8,
          title: 'Prompt Engineering',
          description: 'Learn how to communicate with generative AI',
          thumbnail: 'https://via.placeholder.com/150',
        },
        {
          id: 7,
          title: 'Data Science',
          description: 'Learn to extract insights from data.',
          thumbnail: 'https://via.placeholder.com/150',
        },
      ],
      reviews: [
        {
          id: 1,
          userName: 'John Doe',
          userThumbnail: 'https://via.placeholder.com/50',
          stars: 5,
          text: 'Amazing platform! I have learned so much in just a few weeks. Highly recommended!',
        },
        {
          id: 2,
          userName: 'Jane Smith',
          userThumbnail: 'https://via.placeholder.com/50',
          stars: 4,
          text: 'Great courses. I love the structure and the quality of the instructors.',
        },
        {
          id: 3,
          userName: 'Jill Johnson',
          userThumbnail: 'https://via.placeholder.com/50',
          stars: 5,
          text: 'I have been using SkillClimb for a few months now and I am very happy with the progress I have made.',
        },
        {
          id: 4,
          userName: 'Jack Williams',
          userThumbnail: 'https://via.placeholder.com/50',
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
      this.subscriberEmail = '';  // Reset the email input after subscribing.
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

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15); /* enhanced shadow on hover */
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
