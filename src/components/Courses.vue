<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Header / Title -->
    <div class="text-center py-8 bg-white">
      <h1 class="text-3xl font-semibold">Our Courses</h1>
      <p class="text-gray-600">Discover courses tailored for you.</p>
    </div>

    <div class="container mx-auto px-4 max-w-screen-xl">
      <!-- Filters / Toggles / Search Bar -->
      <div class="w-3/4 mx-auto p-4 mt-6">
        <input
          v-model="searchTerm"
          @input="searchCourses"
          type="text"
          placeholder="Search for a course..."
          class="w-full p-3 rounded-md shadow-md"
        />

        <div class="mt-4 flex space-x-2">
          <button
            v-for="category in mainCategories"
            :key="category"
            @click="selectCategory(category)"
            :class="
              category === selectedCategory
                ? 'bg-blue-500 text-white'
                : 'bg-white'
            "
            class="px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-colors"
          >
            {{ category }}
          </button>
        </div>
      </div>

      
      <!-- Course Lists by Category -->
      <div v-for="subCategory in getFilteredSubCategories()" :key="subCategory">
        <h2 class="text-2xl font-semibold p-4">{{ subCategory }}</h2>

        <div class="p-4 flex overflow-x-auto space-x-4">
          <div
            v-for="course in getFilteredCourses(subCategory)"
            :key="course.id"
            class="flex-none w-64 bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer group"
            @click="$emit('preview-course')"
          >
            <!-- Thumbnail -->
            <div
              class="relative transition-transform transform group-hover:-translate-y-1"
            >
              <img
                :src="course.thumbnail"
                alt="Course Thumbnail"
                class="w-full h-40 rounded-lg object-cover"
              />
              <div
                class="absolute bottom-4 left-4 transition-transform transform group-hover:-translate-y-1"
              >
                <h3
                  class="text-lg font-extrabold text-white text-shadow w-11/12"
                >
                  {{ course.title }}
                </h3>
              </div>
            </div>

            <!-- Content -->
            <div
              class="mt-4 transition-transform transform group-hover:-translate-y-1"
            >
              <p class="text-gray-500 text-sm min-h-[60px]">{{ course.description }}</p>
              <div class="flex justify-between mt-4">
                <div class="flex items-center space-x-2">
                  <div
                    class="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs"
                  >
                    {{ course.author[0] }}
                  </div>
                  <p class="text-sm text-gray-400">{{ course.author }}</p>
                </div>
                <span
                  class="text-xs bg-gray-200 text-gray-600 py-1 px-2 rounded-full"
                >
                  {{ course.duration }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      selectedCategory: null,
      mainCategories: ['Web Development', 'Solutions Engineering', 'ChatGPT', 'Job Search', 'Interview Preparation'],
      courses: [
        // Front-End: HTML/CSS Basics
        {
          id: 1,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Introduction to HTML and CSS',
          description:
            'Dive into the world of web development with this beginner-friendly course.',
          author: 'John Doe',
          duration: '1 week',
          tag: 'HTML/CSS Basics',
        },
        {
          id: 2,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Responsive Web Design with Flexbox and Grid',
          description:
            'Learn how to make your websites look great on any device.',
          author: 'Jane Smith',
          duration: '2 weeks',
          tag: 'Web Development',
        },
        {
          id: 3,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Advanced CSS Animations',
          description:
            'Create stunning user experiences using CSS transitions and keyframes.',
          author: 'Jack White',
          duration: '1.5 weeks',
          tag: 'HTML/CSS Basics',
        },
        // Front-End: JavaScript Essentials
        {
          id: 4,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Mastering JavaScript',
          description:
            'From basics to ES6, master the JavaScript language and its quirks.',
          author: 'Jane Smith',
          duration: '3 weeks',
          tag: 'JavaScript Essentials',
        },
        {
          id: 5,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'JavaScript: The Async Parts',
          description:
            'Understand promises, async/await, and event-driven programming.',
          author: 'John Doe',
          duration: '2 weeks',
          tag: 'JavaScript Essentials',
        },
        {
          id: 6,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'JavaScript DOM Manipulation',
          description:
            'Interact and modify web pages in real time using the Document Object Model.',
          author: 'Jack White',
          duration: '2.5 weeks',
          tag: 'JavaScript Essentials',
        },
        {
          id: 7,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Getting Started with Node.js',
          description: 'Dive deep into backend development with Node.js.',
          author: 'Alice Blue',
          duration: '3 weeks',
          tag: 'Node.js Fundamentals',
        },
        {
          id: 8,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Building RESTful APIs with Express.js',
          description: 'Design and build robust APIs for your applications.',
          author: 'Bob Green',
          duration: '2 weeks',
          tag: 'Node.js Fundamentals',
        },
        {
          id: 9,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Database Integration with MongoDB and Mongoose',
          description: 'Learn to integrate MongoDB into your Node.js apps.',
          author: 'Charlie Black',
          duration: '3 weeks',
          tag: 'Node.js Fundamentals',
        },

        // DevOps: Docker Essentials
        {
          id: 10,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Introduction to Docker and Containers',
          description: 'Get started with containerization and Docker.',
          author: 'Daisy Red',
          duration: '2 weeks',
          tag: 'Docker Essentials',
        },
        {
          id: 11,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Docker Compose for Development Environments',
          description:
            'Structure and run multi-container applications with Docker Compose.',
          author: 'Ella Purple',
          duration: '1.5 weeks',
          tag: 'Docker Essentials',
        },
        {
          id: 12,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Optimizing Docker Images for Production',
          description: 'Best practices for building efficient Docker images.',
          author: 'Frank White',
          duration: '1 week',
          tag: 'Docker Essentials',
        },

        // Full-Stack: MERN Stack Basics
        {
          id: 13,
          mainCategory: 'Web Development',
          subCategory: 'Full-Stack',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Building Web Apps with the MERN Stack',
          description:
            'Combine MongoDB, Express.js, React, and Node.js to create full-stack web apps.',
          author: 'Grace Yellow',
          duration: '4 weeks',
          tag: 'MERN Stack Basics',
        },
        {
          id: 14,
          mainCategory: 'Web Development',
          subCategory: 'Full-Stack',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Full-Stack Authentication and Authorization',
          description: 'Implement secure login systems in your MERN apps.',
          author: 'Hugo Brown',
          duration: '3 weeks',
          tag: 'MERN Stack Basics',
        },
        {
          id: 15,
          mainCategory: 'Web Development',
          subCategory: 'Full-Stack',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'MERN Deployment and Production Best Practices',
          description:
            'Deploy your MERN applications and optimize them for the real world.',
          author: 'Ivy Orange',
          duration: '3.5 weeks',
          tag: 'MERN Stack Basics',
        },
        // Back-End: SQL Basics
        {
          id: 16,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'SQL for Web Developers',
          description: 'Introduction to SQL for web application development.',
          author: 'Jacob Teal',
          duration: '2 weeks',
          tag: 'SQL Basics',
        },
        {
          id: 17,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Mastering Joins and Aggregates in SQL',
          description:
            'Advanced SQL techniques for querying relational databases.',
          author: 'Kylie Pink',
          duration: '3 weeks',
          tag: 'SQL Basics',
        },
        {
          id: 18,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Database Design and Normalization',
          description: 'Principles of robust and scalable database design.',
          author: 'Leonard Gray',
          duration: '3 weeks',
          tag: 'SQL Basics',
        },

        // DevOps: Kubernetes Basics
        {
          id: 19,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Getting Started with Kubernetes',
          description:
            'A comprehensive introduction to Kubernetes and container orchestration.',
          author: 'Monica Azure',
          duration: '3 weeks',
          tag: 'Kubernetes Basics',
        },
        {
          id: 20,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Deploying Microservices on Kubernetes',
          description:
            'Hands-on techniques for deploying and scaling applications using Kubernetes.',
          author: 'Nolan Violet',
          duration: '3 weeks',
          tag: 'Kubernetes Basics',
        },
        {
          id: 21,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Kubernetes Networking and Security Best Practices',
          description:
            'Ensuring safe and efficient communication in Kubernetes clusters.',
          author: 'Olivia Indigo',
          duration: '4 weeks',
          tag: 'Kubernetes Basics',
        },
        {
          id: 22,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'CSS Preprocessors: An Introduction to SASS',
          description:
            'Enhance your CSS with variables, mixins, and more using SASS.',
          author: 'Patty Ruby',
          duration: '1 week',
          tag: 'HTML/CSS Basics',
        },
        {
          id: 23,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Building Web Layouts with CSS Grid',
          description: 'Create complex web layouts easily with CSS Grid.',
          author: 'Quincy Quartz',
          duration: '1.5 weeks',
          tag: 'HTML/CSS Basics',
        },
        {
          id: 24,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Modern CSS Techniques and Best Practices',
          description: 'Stay updated with the latest trends in CSS.',
          author: 'Rachel Rose',
          duration: '2 weeks',
          tag: 'HTML/CSS Basics',
        },

        // Front-End: JavaScript Essentials
        {
          id: 25,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Deep Dive into JavaScript Promises',
          description: 'Master asynchronous programming with Promises.',
          author: 'Steve Silver',
          duration: '2 weeks',
          tag: 'JavaScript Essentials',
        },
        {
          id: 26,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'JavaScript Frameworks: An Overview',
          description: 'Explore the landscape of modern JS frameworks.',
          author: 'Tina Teal',
          duration: '3 weeks',
          tag: 'JavaScript Essentials',
        },
        {
          id: 27,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Unit Testing in JavaScript',
          description:
            'Write maintainable code by mastering unit testing in JS.',
          author: 'Ursula Ultramarine',
          duration: '3 weeks',
          tag: 'JavaScript Essentials',
        },

        // ... [Existing Back-End, DevOps, and Full-Stack courses]

        // Back-End: Express.js Fundamentals
        {
          id: 28,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Deep Dive into Express.js',
          description:
            'Understanding middleware, routes, and advanced patterns.',
          author: 'Victor Vanilla',
          duration: '3 weeks',
          tag: 'Express.js Fundamentals',
        },
        {
          id: 29,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Security Best Practices in Express.js',
          description: 'Protect your backend with security best practices.',
          author: 'Wendy Walnut',
          duration: '3 weeks',
          tag: 'Express.js Fundamentals',
        },
        {
          id: 30,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Performance Tuning in Express.js',
          description:
            'Optimize your Express applications for maximum performance.',
          author: 'Xander Xerox',
          duration: '2 weeks',
          tag: 'Express.js Fundamentals',
        },

        // DevOps: CI/CD Basics
        {
          id: 31,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Introduction to CI/CD',
          description:
            'Understand the principles and benefits of Continuous Integration and Continuous Deployment.',
          author: 'Yasmine Yellow',
          duration: '2 weeks',
          tag: 'CI/CD Basics',
        },
        {
          id: 32,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Setting up CI/CD Pipelines with Jenkins',
          description:
            'Implement automated build and deployment pipelines with Jenkins.',
          author: 'Zane Zinc',
          duration: '3 weeks',
          tag: 'CI/CD Basics',
        },
        {
          id: 33,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Deploying Applications with GitLab CI/CD',
          description:
            'Leverage GitLab for continuous integration and deployment tasks.',
          author: 'Aria Amethyst',
          duration: '3 weeks',
          tag: 'CI/CD Basics',
        },
        {
          id: 34,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Event-driven Programming in Node.js',
          description:
            'Understand the asynchronous nature of Node and how it impacts performance and scalability.',
          author: 'Benjamin Blue',
          duration: '2 weeks',
          tag: 'Node.js Fundamentals',
        },
        {
          id: 35,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'File System Operations in Node.js',
          description:
            'Manipulate files and directories using the built-in fs module.',
          author: 'Cassandra Cyan',
          duration: '1.5 weeks',
          tag: 'Node.js Fundamentals',
        },
        {
          id: 36,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Streams and Buffers in Node.js',
          description:
            'Handle data efficiently using streams and buffers in Node.',
          author: 'David Denim',
          duration: '2 weeks',
          tag: 'Node.js Fundamentals',
        },

        // Additional Docker Essentials
        {
          id: 37,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Managing Data and Volumes in Docker',
          description:
            'Learn to persist data in Docker using bind mounts and volumes.',
          author: 'Elena Emerald',
          duration: '1.5 weeks',
          tag: 'Docker Essentials',
        },
        {
          id: 38,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Docker Swarm for Container Orchestration',
          description:
            'Scale and manage your Docker containers using Docker Swarm.',
          author: 'Felix Fawn',
          duration: '2 weeks',
          tag: 'Docker Essentials',
        },
        {
          id: 39,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Docker Networking Deep Dive',
          description:
            'Understand and manage Docker networks for secure and efficient communication.',
          author: 'Gina Gold',
          duration: '2 weeks',
          tag: 'Docker Essentials',
        },

        // Additional MERN Stack Basics
        {
          id: 40,
          mainCategory: 'Web Development',
          subCategory: 'Full-Stack',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'State Management with Redux in MERN',
          description:
            'Efficiently manage application state in your MERN stack using Redux.',
          author: 'Henry Hazel',
          duration: '3 weeks',
          tag: 'MERN Stack Basics',
        },
        {
          id: 41,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Server-side Rendering with Next.js in MERN',
          description:
            'Optimize your MERN apps for SEO and performance using server-side rendering with Next.js.',
          author: 'Isabella Ivory',
          duration: '3 weeks',
          tag: 'MERN Stack Basics',
        },
        {
          id: 42,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Microservices Architecture in MERN',
          description:
            'Break down your MERN applications into scalable microservices.',
          author: 'Jack Jade',
          duration: '4 weeks',
          tag: 'MERN Stack Basics',
        },
        {
          id: 43,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Optimizing SQL Queries for Performance',
          description: 'Techniques to make your SQL queries run faster.',
          author: 'Brian Bronze',
          duration: '3 weeks',
          tag: 'SQL Basics',
        },
        {
          id: 44,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Advanced Database Indexing',
          description:
            'Improve database search performance using advanced indexing strategies.',
          author: 'Carla Copper',
          duration: '2.5 weeks',
          tag: 'SQL Basics',
        },
        {
          id: 45,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'SQL Transactions and Concurrency',
          description:
            'Ensure data integrity by understanding transactions and concurrency.',
          author: 'Derek Diamond',
          duration: '3 weeks',
          tag: 'SQL Basics',
        },

        // Additional courses for 'Kubernetes Basics'
        {
          id: 46,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Kubernetes Storage Solutions',
          description: 'Understanding storage in Kubernetes clusters.',
          author: 'Elaine Emerald',
          duration: '3 weeks',
          tag: 'Kubernetes Basics',
        },
        {
          id: 47,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Kubernetes Cluster Monitoring with Prometheus',
          description:
            'Monitor your Kubernetes cluster effectively with Prometheus.',
          author: 'Fiona Fluorite',
          duration: '3 weeks',
          tag: 'Kubernetes Basics',
        },
        {
          id: 48,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Kubernetes Logging with EFK Stack',
          description:
            'Implement logging in Kubernetes using Elasticsearch, Fluentd, and Kibana.',
          author: 'Gary Garnet',
          duration: '2 weeks',
          tag: 'Kubernetes Basics',
        },

        // Additional courses for 'Express.js Fundamentals'
        {
          id: 49,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Express.js Routing Best Practices',
          description:
            'Deep dive into advanced routing techniques in Express.js.',
          author: 'Holly Hematite',
          duration: '2 weeks',
          tag: 'Express.js Fundamentals',
        },
        {
          id: 50,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Building RESTful Web Services with Express.js',
          description: 'Develop robust RESTful web services using Express.js.',
          author: 'Ian Ivory',
          duration: '3 weeks',
          tag: 'Express.js Fundamentals',
        },
        {
          id: 51,
          mainCategory: 'Web Development',
          subCategory: 'Back-End',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Express.js and GraphQL Integration',
          description:
            'Implement GraphQL APIs in your Express.js applications.',
          author: 'Jill Jasper',
          duration: '3 weeks',
          tag: 'Express.js Fundamentals',
        },

        // Additional courses for 'CI/CD Basics'
        {
          id: 52,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Automated Testing in CI/CD Pipelines',
          description:
            'Integrate automated tests into your deployment pipelines.',
          author: 'Kyle Kyanite',
          duration: '2 weeks',
          tag: 'CI/CD Basics',
        },
        {
          id: 53,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'CI/CD with GitHub Actions',
          description:
            'Leverage GitHub Actions for your integration and deployment needs.',
          author: 'Laura Lapis',
          duration: '2.5 weeks',
          tag: 'CI/CD Basics',
        },
        {
          id: 54,
          mainCategory: 'Web Development',
          subCategory: 'DevOps',
          thumbnail: 'https://via.placeholder.com/150',
          title: 'Infrastructure as Code in CI/CD',
          description:
            'Use tools like Terraform in your CI/CD pipelines to manage infrastructure.',
          author: 'Mike Malachite',
          duration: '3 weeks',
          tag: 'CI/CD Basics',
        },
      ],
    };
  },
  methods: {
    searchCourses() {
      this.mainCategories = ['Full-Stack', 'Front-End', 'Back-End', 'DevOps'];
    },
    getFilteredSubCategories() {
      const coursesByMainCategory = this.courses.filter((course) =>
        this.selectedCategory
          ? course.mainCategory === this.selectedCategory
          : true
      );
      const subCategories = [
        ...new Set(coursesByMainCategory.map((course) => course.subCategory)),
      ];

      return subCategories;
    },
    getFilteredCourses(subCategory) {
      return this.courses.filter(
        (course) =>
          course.subCategory === subCategory &&
          (!this.searchTerm ||
            course.title
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())) &&
          (!this.selectedCategory ||
            course.mainCategory.includes(this.selectedCategory))
      );
    },
    selectCategory(category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = null;
      } else {
        this.selectedCategory = category;
      }
    },
  },
};
</script>

<style scoped>
.text-shadow {
  text-shadow: 0 0 5px rgba(37, 99, 235, 0.9); /* Darker blueish value with increased opacity */
}
</style>
