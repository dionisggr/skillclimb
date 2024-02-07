export default {
  users: [
    {
      id: 'new-student',
      name: 'John Doe',
      title: 'Senior Vue.js Developer',
      bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
      imageUrl: '/src/assets/img/new_student.jpeg',
      website: 'https://johndoe.com',
      role:'student',
    },
    {
      id: 'active-student',
      name: 'John Doe',
      title: 'Senior Vue.js Developer',
      bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
      imageUrl: '/src/assets/img/active_student.jpeg',
      website: 'https://johndoe.com',
      courseIds: [1],
      role: 'student',
    },
    {
      id: 'new-instructor',
      name: 'John Doe',
      title: 'Senior Vue.js Developer',
      bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
      imageUrl: '/src/assets/img/new_instructor.jpeg',
      website: 'https://johndoe.com',
      role: 'instructor',
      courseIds: [],
    },

    {
      id: 'active-instructor',
      name: 'John Doe',
      title: 'Senior Vue.js Developer',
      bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
      imageUrl: '/src/assets/img/active_instructor.jpeg',
      website: 'https://johndoe.com',
      courseIds: [1],
      role: 'instructor',
    },
  ],
  notes: []
}