export default {
  users: [
    {
      id: 'new-student',
      name: 'John Doe',
      title: 'Senior Vue.js Developer',
      bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
      imageUrl: 'https://source.unsplash.com/random/80x80',
      website: 'https://johndoe.com',
      role:'student',
    },
    {
      id: 'active-student',
      name: 'John Doe',
      title: 'Senior Vue.js Developer',
      bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
      imageUrl: 'https://source.unsplash.com/random/80x82',
      website: 'https://johndoe.com',
      courseIds: [1],
      role: 'student',
    },
    {
      id: 'new-instructor',
      name: 'John Doe',
      title: 'Senior Vue.js Developer',
      bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
      imageUrl: 'https://source.unsplash.com/random/80x81',
      website: 'https://johndoe.com',
      role: 'instructor',
      courseIds: [],
    },

    {
      id: 'active-instructor',
      name: 'John Doe',
      title: 'Senior Vue.js Developer',
      bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
      imageUrl: 'https://source.unsplash.com/random/80x83',
      website: 'https://johndoe.com',
      courseIds: [1],
      role: 'instructor',
    },
    {
      id: 'new-business',
      name: 'John Doe',
      title: 'Senior Vue.js Developer',
      bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
      imageUrl: 'https://source.unsplash.com/random/80x84',
      website: 'https://johndoe.com',
      courseIds: [1],
      role: 'student',
      company: 'JD Company'
    },
    {
      id: 'active-business',
      name: 'John Doe',
      title: 'Senior Vue.js Developer',
      bio: 'A passionate web developer and instructor with over 10 years of experience. John has taught over 50,000 students online and has worked on numerous web projects using Vue.js.',
      imageUrl: 'https://source.unsplash.com/random/80x85',
      website: 'https://johndoe.com',
      courseIds: [1],
      role: 'instructor',
      company: 'JD Company'
    }
  ],
  notes: []
}