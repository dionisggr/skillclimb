<template>
  <div class="bg-gray-100 min-h-screen pb-8">
    <!-- Header / Title -->
    <div class="text-center py-8 bg-white">
      <h1 class="text-3xl font-semibold">Our Courses</h1>
      <p class="text-gray-600">Discover courses tailored for you.</p>
    </div>

    <div class="container mx-auto px-8 max-w-screen-2xl">
      <!-- Filters / Toggles / Search Bar -->
      <div class="mx-auto p-4 mt-6 lg:w-3/4">
        <input
          v-model="searchTerm"
          @input="searchCourses"
          type="text"
          placeholder="Search for a course..."
          class="w-full p-3 rounded-lg shadow-md"
        />

        <div
          class="mt-4 flex space-x-2 pb-1.5 overflow-x-scroll hide-scrollbar"
        >
          <button
            v-for="category in mainCategories"
            :key="category"
            @click="selectCategory(category)"
            :class="
              category === selectedCategory
                ? 'bg-blue-500 text-white'
                : 'bg-white'
            "
            class="min-w-fit px-3 py-2 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-colors"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Course Lists by Category -->
      <div class="space-y-10 mt-10">
      <div
        class="mt-10 relative"
        v-for="subCategory in getFilteredSubCategories()"
        :key="subCategory"
      >
        <h2 class="text-xl md:text-2xl font-bold text-gray-700 mb-4 pl-4">
          {{ subCategory }}
        </h2>

        <!-- Scroll Arrows Container -->
        <div class="absolute top-0 right-0 flex items-center mr-2">
          <!-- Adjust height as needed -->
          <button
            class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition ease-in-out duration-150 z-10"
            @click="scrollLeft(subCategory)"
            aria-label="Scroll Left"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition ease-in-out duration-150 ml-2 z-10"
            @click="scrollRight(subCategory)"
            aria-label="Scroll Right"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div class="flex overflow-x-auto hide-scrollbar">
          <div
            v-for="course in getFilteredCourses(subCategory)"
            :key="course.id"
            class="flex-none mx-2"
            style="width: 16rem"
          >
            <div
              class="relative bg-white rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer h-full"
              @click="$emit('preview-course')"
            >
              <div class="w-full h-36 bg-gray-200 rounded-t-lg overflow-hidden">
                <img
                  :src="course.thumbnail"
                  alt="Course Thumbnail"
                  class="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>

              <div class="p-4 pb-16">
                <!-- Extra padding-bottom to accommodate the absolute positioned author section -->
                <div class="max-h-14">
                  <h3 class="font-semibold text-gray-800 line-clamp-2">
                    {{ course.title }}
                  </h3>
                </div>
                <p class="text-sm text-gray-600 mt-2 line-clamp-3">
                  <!-- Added line-clamp-3 for description -->
                  {{ course.description }}
                </p>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <!-- Absolute positioning for author section -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span
                      class="inline-block w-8 h-8 bg-blue-500 text-white text-sm rounded-full flex items-center justify-center"
                    >
                      {{ course.author[0] }}
                    </span>
                    <span class="ml-2 text-sm text-gray-500 truncate">{{
                      course.author
                    }}</span>
                  </div>
                  <span
                    class="inline-block bg-gray-100 text-gray-800 text-xs py-1 px-3 rounded-full"
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      selectedCategory: null,
      mainCategories: [
        'Web Development',
        'Solutions Engineering',
        'ChatGPT',
        'Job Search',
        'Interview Preparation',
      ],
      courses: [
        // Front-End: HTML/CSS Basics
        {
          id: 1,
          mainCategory: 'Web Development',
          subCategory: 'Front-End',
          thumbnail:
            'data:image/png;base64,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',
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
          thumbnail:
            'https://img-c.udemycdn.com/course/750x422/3304778_ed4b_2.jpg',
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
          thumbnail:
            'https://media.licdn.com/dms/image/D5612AQGmzFcIS-B9TQ/article-cover_image-shrink_600_2000/0/1685824237920?e=2147483647&v=beta&t=52kFB8joUSrrSu-ESI21yix2zZeTIlS6uNFhUZTbK_U',
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
          thumbnail: 'https://i.ytimg.com/vi/_qMBsIwyAK0/maxresdefault.jpg',
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
          thumbnail:
            'https://static.skillshare.com/uploads/video/thumbnails/41fb80abbe0b8a57897aecbe4c23390f/448-252',
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
          thumbnail: 'https://i.ytimg.com/vi/gG3pytAY2MY/maxresdefault.jpg',
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
          thumbnail: 'https://i.ytimg.com/vi/3qau30Waeyc/maxresdefault.jpg',
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
          thumbnail: 'https://i.ytimg.com/vi/-PdjUx9JZ2E/maxresdefault.jpg',
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
          thumbnail:
            'https://images.tutorialedge.net/thumbnails/docker-for-beginners.png',
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
          thumbnail: 'https://i.ytimg.com/vi/DX1T-PKHKhg/maxresdefault.jpg',
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
          thumbnail: 'https://i.ytimg.com/vi/ne6cjHJQQck/maxresdefault.jpg',
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
          thumbnail:
            'https://yourengineer.in/wp-content/uploads/2021/07/PD-Leverage-MERN-Stack-for-building-efficient-websites-Thumbnail.png',
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
          thumbnail:
            'https://i.ytimg.com/vi/Ct9O9YZp2UA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDjryyc9YumsiOlOvpDdDBv306Kpw',
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
          thumbnail: 'https://i.ytimg.com/vi/LYWgPSbPDfQ/maxresdefault.jpg',
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
          thumbnail:
            'https://cosmolearning.org/images_dir/courses/1077/profile-thumbnail-w300.jpg',
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
          thumbnail: 'https://i.ytimg.com/vi/IAxEZC_TQ-0/maxresdefault.jpg',
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
          thumbnail:
            'https://i.ytimg.com/vi/R5CwAq1a0Og/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDRCS1qHFqa0mtJtD2RVxd6mBZy2g',
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
          thumbnail: 'https://i.ytimg.com/vi/SfM-82abTkQ/maxresdefault.jpg',
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
          thumbnail: 'https://i.ytimg.com/vi/MNs_7avLIJ4/maxresdefault.jpg',
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
