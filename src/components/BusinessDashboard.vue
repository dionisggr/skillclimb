<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Dashboard Header -->
    <header class="text-center py-8 bg-blue-600 text-white">
      <h1 class="text-4xl font-bold">Synapse AI's Dashboard</h1>
      <p>Empower your team with AI-driven learning</p>
    </header>

    <!-- Navigation Bar -->
    <div class="flex justify-center items-center bg-white py-4 px-8 shadow-md text-lg">
      <div>
        <a href="#" class="text-blue-600 mx-2">Home</a>
        <a href="#" class="text-blue-600 mx-2">Courses</a>
        <a href="#" class="text-blue-600 mx-2">Employees</a>
        <a href="#" class="text-blue-600 mx-2">Reports</a>
      </div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto px-6 mt-6">
      <!-- Courses Overview Section -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Courses Overview</h2>
        <div class="grid grid-cols-3 gap-4">
          <div
            class="bg-white p-4 shadow rounded-lg"
            v-for="course in courses"
            :key="course.id"
          >
            <h3 class="font-semibold text-lg">{{ course.name }}</h3>
            <p class="text-sm text-gray-600">{{ course.description }}</p>
            <span class="text-sm text-blue-600"
              >{{ course.lessons?.length }} Lessons</span
            >
          </div>
        </div>
      </section>

      <!-- Enhanced Employee and Team Progress Section -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Team and Employee Progress</h2>
        <div class="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search Employee..."
            class="border p-2 rounded w-1/3"
          />
          <select class="border p-2 rounded">
            <option>All Teams</option>
            <option>Team A</option>
            <option>Team B</option>
            <!-- Add more teams as needed -->
          </select>
        </div>
        <div v-for="team in teams" :key="team.id">
          <h3 class="text-lg font-semibold my-2">{{ team.name }}</h3>
          <table class="min-w-full bg-white shadow rounded-lg mb-4">
            <thead>
              <tr>
                <th class="px-4 py-2">Employee Name</th>
                <th class="px-4 py-2">Course</th>
                <th class="px-4 py-2">Progress</th>
                <th class="px-4 py-2">Assessment Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in team.employees" :key="employee.id">
                <td class="border px-4 py-2">{{ employee.name }}</td>
                <td class="border px-4 py-2">{{ employee.course }}</td>
                <td class="border px-4 py-2">{{ employee.progress }}%</td>
                <td class="border px-4 py-2">
                  {{ employee.assessmentScore }} / 100
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Enhanced Assessment Reports Section -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Assessment Reports</h2>
        <div class="grid grid-cols-3 gap-4">
          <div
            class="bg-white p-4 shadow rounded-lg"
            v-for="report in reports"
            :key="report.id"
          >
            <h3 class="font-semibold text-lg">{{ report.title }}</h3>
            <p class="text-sm text-gray-600">{{ report.summary }}</p>
          </div>
        </div>
      </section>

      <!-- Enhanced AI Insights Section -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">AI Insights</h2>
        <div
          v-for="insight in aiInsights"
          :key="insight.id"
          class="bg-white p-4 shadow rounded-lg mb-4"
        >
          <h3 class="font-semibold text-lg">{{ insight.title }}</h3>
          <p class="text-sm text-gray-600">{{ insight.detail }}</p>
          <ul class="list-disc pl-5">
            <!-- List insights here -->
            <li v-for="detail in insight.details" :key="detail.id">
              {{ detail.text }}
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'BusinessDashboard',
  data() {
    return {
      courses: [
        {
          id: 1,
          name: 'Product Deep Dive',
          description:
            'In-depth understanding of our main product features and benefits',
          shared: true,
        },
        {
          id: 2,
          name: 'Client Success Stories',
          description:
            'Case studies on how our product has helped clients achieve success',
          shared: true,
        },
        {
          id: 3,
          name: 'Competitive Advantage Analysis',
          description:
            'Identifying and leveraging our unique market advantages',
          shared: true,
        },
        {
          id: 4,
          name: 'Internal Tools Mastery',
          description: 'Comprehensive training on our internal software tools',
          shared: true,
        },
        {
          id: 5,
          name: 'Our Workflows',
          description: 'Best practices for efficient workflow within our teams',
          shared: true,
        },
        {
          id: 6,
          name: 'Client Interaction Strategies',
          description: 'Building and maintaining strong client relationships',
          shared: false,
          teamSpecific: 'Team A',
        },
        {
          id: 7,
          name: 'Feature Development Process',
          description: 'End-to-end process of developing new product features',
          shared: false,
          teamSpecific: 'Team C',
        },
        {
          id: 9,
          name: 'Our Competitors',
          description: 'Understanding our key competitors and their products',
          shared: false,
          teamSpecific: 'Team D',
        },
        {
          id: 10,
          name: 'Market Trend Analysis',
          shared: false,
          teamSpecific: 'Team E',
        },
      ],
      teams: [
      {
        id: 1,
        name: 'Team A - Project Management',
        employees: [
          { id: 1, name: 'Alice Johnson', course: 'Project Management Essentials', progress: 80, assessmentScore: 88 },
          { id: 2, name: 'Bob Smith', course: 'Workflow Optimization', progress: 75, assessmentScore: 82 },
          { id: 3, name: 'Charlie Davis', course: 'Internal Tool Mastery', progress: 90, assessmentScore: 91 },
          // ... more employees for Team A
        ]
      },
      {
        id: 2,
        name: 'Team B - Client Relations',
        employees: [
          { id: 4, name: 'Diana Green', course: 'Advanced Client Interaction', progress: 85, assessmentScore: 87 },
          { id: 5, name: 'Edward Harris', course: 'Client Success Stories', progress: 78, assessmentScore: 79 },
          { id: 6, name: 'Fiona Brown', course: 'Competitive Advantage Analysis', progress: 82, assessmentScore: 85 },
          // ... more employees for Team B
        ]
      },
      {
        id: 3,
        name: 'Team C - Product Development',
        employees: [
          { id: 7, name: 'George King', course: 'Feature Development Process', progress: 88, assessmentScore: 90 },
          { id: 8, name: 'Hannah Lee', course: 'Our Product Deep Dive', progress: 92, assessmentScore: 94 },
          { id: 9, name: 'Ian Moore', course: 'Internal Tool Mastery', progress: 80, assessmentScore: 83 },
          // ... more employees for Team C
        ]
      },
      {
        id: 4,
        name: 'Team D - Market Analysis',
        employees: [
          { id: 10, name: 'Julia Carter', course: 'Market Trend Analysis', progress: 76, assessmentScore: 77 },
          { id: 11, name: 'Kevin White', course: 'Competitor Comparison Report', progress: 84, assessmentScore: 86 },
          { id: 12, name: 'Lily Thompson', course: 'Client Success Stories', progress: 89, assessmentScore: 91 },
          // ... more employees for Team D
        ]
      },
      {
        id: 5,
        name: 'Team E - Data Security',
        employees: [
          { id: 13, name: 'Mason Wilson', course: 'Data Security Protocols', progress: 90, assessmentScore: 93 },
          { id: 14, name: 'Natalie Young', course: 'Our Product Deep Dive', progress: 85, assessmentScore: 88 },
          { id: 15, name: 'Oscar Martinez', course: 'Workflow Optimization', progress: 78, assessmentScore: 80 },
          // ... more employees for Team E
        ]
      },
      // ... more teams if needed
    ],
      reports: [
        {
          id: 1,
          title: 'Product Feature Utilization',
          summary: 'Analysis of how different teams utilize product features',
        },
        {
          id: 2,
          title: 'Workflow Efficiency Report',
          summary: 'Insights into the workflow efficiency across teams',
        },
        {
          id: 3,
          title: 'Client Feedback Summary',
          summary: 'Aggregated client feedback on our services and products',
        },
        {
          id: 4,
          title: 'Competitor Comparison Report',
          summary:
            'Comparative analysis of our product against key competitors',
        },
        {
          id: 5,
          title: 'Team Performance Evaluation',
          summary: 'Quarterly performance evaluation of all teams',
        },
      ],
      aiInsights: [
        {
          id: 1,
          title: 'Skill Gaps and Training Needs',
          detail:
            'AI analysis of skill gaps in teams and recommended training modules',
        },
        {
          id: 2,
          title: 'Product Knowledge Distribution',
          detail:
            'Insights into the distribution of product knowledge across departments',
        },
      ],
    };
  },

  // methods, computed properties, etc.
};
</script>

<style scoped>
/* Custom TailwindCSS styles */
</style>
