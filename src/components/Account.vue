<template>
  <div class="container mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-800">My Account</h1>
    </div>

    <div class="bg-white shadow-md rounded-lg">
      <!-- Tabs -->
      <div class="flex border-b">
        <div
          @click="activeTab = 'personalInfo'"
          class="px-4 py-2 text-sm font-medium text-gray-600 cursor-pointer hover:text-blue-500 hover:bg-gray-100"
          :class="
            activeTab === 'personalInfo' &&
            'border-b-2 bg-gray-100 border-blue-500'
          "
        >
          Profile Information
        </div>
        <div
          @click="activeTab = 'studentSettings'"
          class="px-4 py-2 text-sm font-medium text-gray-600 cursor-pointer hover:text-blue-500 hover:bg-gray-100"
          :class="
            activeTab === 'studentSettings' &&
            'border-b-2 bg-gray-100 border-blue-500'
          "
        >
          Preferences
        </div>
        <div
          @click="activeTab = 'payments'"
          class="px-4 py-2 text-sm font-medium text-gray-600 cursor-pointer hover:text-blue-500 hover:bg-gray-100"
          :class="
            activeTab === 'payments' && 'border-b-2 bg-gray-100 border-blue-500'
          "
        >
          Payments
        </div>
        <div
          @click="activeTab = 'revenue'"
          class="px-4 py-2 text-sm font-medium text-gray-600 cursor-pointer hover:text-blue-500 hover:bg-gray-100"
          :class="
            activeTab === 'revenue' && 'border-b-2 bg-gray-100 border-blue-500'
          "
        >
          Revenue
        </div>
      </div>

      <!-- Tab Contents -->
      <div class="p-6">
        <!-- Personal Information Section -->
        <div v-if="activeTab === 'personalInfo'">
          <h2 class="text-xl font-semibold mb-6">Personal Information</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col mb-4">
              <label class="mb-2 font-semibold text-gray-700">First Name</label>
              <input
                type="text"
                placeholder="John"
                class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="flex flex-col mb-4">
              <label class="mb-2 font-semibold text-gray-700">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="flex flex-col mb-4">
              <label class="mb-2 font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="flex flex-col justify-end mb-4">
              <button
                class="bg-blue-500 hover:bg-blue-700 mx-auto text-white font-bold py-2 px-6 rounded-lg w-auto self-start transition duration-300 ease-in-out"
              >
                Change Password
              </button>
            </div>
            <div class="flex flex-col mb-4 sm:col-span-2"></div>
            <div class="flex flex-col mb-4">
              <label class="mb-2 font-semibold text-gray-700">Time Zone</label>
              <select
                class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option>GMT-5</option>
                <!-- Add more time zones as needed -->
              </select>
            </div>
            <div class="flex flex-col mb-4">
              <label class="mb-2 font-semibold text-gray-700"
                >Preferred Language</label
              >
              <select
                class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option>English</option>
                <!-- Add more languages as needed -->
              </select>
            </div>
          </div>
          <div class="flex justify-center mt-6">
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-12 my-4 mt-6 rounded-full transition duration-300 ease-in-out shadow-lg"
            >
              Save
            </button>
          </div>
        </div>

        <!-- Settings Section -->
        <div class="space-y-12 mt-2" v-if="activeTab === 'studentSettings'">
<!-- Student Settings -->
<div>
  <h2 class="text-xl font-semibold mb-4">Student Settings</h2>
  <div class="space-y-4">
    <!-- Learning Pace and Content Depth -->
    <div class="flex justify-between">
      <!-- Learning Pace -->
      <div class="w-1/2 mr-2">
        <p class="font-medium mb-2">Learning Pace:</p>
        <div class="flex flex-wrap">
          <button v-for="pace in ['Slow', 'Moderate', 'Fast']" :key="pace" @click="studentSettings.learningPace = pace" :class="buttonClass(studentSettings.learningPace === pace)">
            {{ pace }}
          </button>
        </div>
      </div>

                    <!-- Practice Exercises -->
                    <div class="col-span-2">
                <p class="font-medium mb-2">Practice Exercises Importance:</p>
                <input
                  type="range"
                  min="1"
                  max="10"
                  v-model="studentSettings.exerciseImportance"
                  class="w-full"
                />
                <div class="flex justify-between text-xs mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>


    </div>

    <!-- AI Interaction and Supplemental Info -->
    <div class="flex justify-between">
            <!-- Content Depth -->
            <div class="w-1/2 ml-2">
        <p class="font-medium mb-2">Content Depth:</p>
        <div class="flex flex-wrap">
          <button v-for="depth in ['Breadth', 'Depth']" :key="depth" @click="studentSettings.contentDepth = depth" :class="buttonClass(studentSettings.contentDepth === depth)">
            {{ depth }}
          </button>
        </div>
      </div>

      <!-- AI Interaction -->
      <div class="w-1/2 mr-2">
        <p class="font-medium mb-2">AI Interaction:</p>
        <div class="flex flex-wrap">
          <button v-for="interaction in ['Conversational', 'Concise', 'Creative', 'Thought-Provoking']" :key="interaction" @click="studentSettings.aiInteraction = interaction" :class="buttonClass(studentSettings.aiInteraction === interaction)">
            {{ interaction }}
          </button>
        </div>
      </div>


    </div>
  </div>
</div>

      <!-- Supplemental Info -->
      <div class="w-1/2 ml-2">
        <p class="font-medium mb-2">Supplemental Info:</p>
        <div class="flex flex-wrap">
          <button v-for="material in ['Summary Notes', 'Detailed Explanations', 'Real-World Connections', 'Study Questions']" :key="material" @click="studentSettings.supplementalMaterial = material" :class="buttonClass(studentSettings.supplementalMaterial === material)">
            {{ material }}
          </button>
        </div>
      </div>

        </div>

        <!-- Payments Section -->
        <div v-if="activeTab === 'payments'">
          <h2 class="text-xl font-semibold mb-6">Credit Cards</h2>

          <!-- Current Credit Cards -->
          <div class="mb-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <!-- Mock Credit Card -->
              <div
                v-for="card in creditCards"
                :key="card.id"
                class="relative p-4 border rounded-lg shadow transition ease-in-out duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  class="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
                  @click="confirmDelete(card.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <p class="text-xs text-gray-500">Cardholder</p>
                <p class="font-semibold">{{ card.cardholder }}</p>
                <p class="font-semibold mt-2">
                  **** **** **** {{ card.last4Digits }}
                </p>
                <p class="text-sm">
                  Exp: {{ card.expirationMonth }}/{{ card.expirationYear }}
                </p>
                <!-- Card Type at the Bottom Right -->
                <div class="absolute bottom-2 right-2">
                  <p class="text-sm font-semibold mx-3">{{ card.type }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Credit Card Button -->
          <div class="flex justify-center mt-4">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-colors duration-200"
              @click="openCreditCardModal"
            >
              Add Credit Card
            </button>
          </div>

          <!-- Credit Card Modal -->
          <div
            v-if="isCreditCardModalOpen"
            class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          >
            <div
              class="relative bg-white p-8 rounded-lg shadow-2xl max-w-md w-full m-4"
            >
              <!-- Close Button -->
              <div
                class="absolute top-0 right-0 mt-4 mr-4 cursor-pointer"
                @click="isCreditCardModalOpen = false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-gray-600 hover:text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <div class="mb-6">
                <h3 class="text-2xl font-semibold text-center text-gray-900">
                  New Credit Card
                </h3>
              </div>
              <div class="space-y-5">
                <input
                  v-model="newCreditCard.cardholderName"
                  type="text"
                  placeholder="Cardholder Name"
                  class="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ease-in-out"
                />
                <input
                  v-model="newCreditCard.cardNumber"
                  type="text"
                  placeholder="Card Number"
                  class="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ease-in-out"
                />
                <div class="flex justify-between gap-3">
                  <input
                    v-model="newCreditCard.expirationDate"
                    type="text"
                    placeholder="Expiration Date (MM/YY)"
                    class="px-4 py-3 border border-gray-300 rounded-lg flex-1 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ease-in-out"
                  />
                  <input
                    v-model="newCreditCard.cvv"
                    type="text"
                    placeholder="CVV"
                    class="px-4 py-3 border border-gray-300 rounded-lg flex-1 w-1/2 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ease-in-out"
                  />
                </div>
                <div>
                  <select
                    class="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition ease-in-out text-gray-400"
                  >
                    <option value="" disabled selected>Card Type</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                  </select>
                </div>
              </div>
              <div class="flex justify-center mt-8">
                <button
                  @click="addCard"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition duration-300 ease-in-out"
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>

          <!-- Payments -->
          <div class="mt-12" v-if="activeTab === 'payments'">
            <h2 class="text-xl font-semibold mb-6">Payments</h2>

            <!-- Subtle Report Issue Button -->
            <div class="text-right mb-2">
              <button
                class="text-gray-600 hover:text-gray-800 text-sm py-1 px-3 border border-gray-300 rounded-lg hover:shadow"
              >
                Report an Issue
              </button>
            </div>

            <!-- Payment History Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th class="py-3 px-6">ID</th>
                    <th class="py-3 px-6">Date</th>
                    <th class="py-3 px-6">Item</th>
                    <th class="py-3 px-6">Amount</th>
                    <th class="py-3 px-6">Status</th>
                    <th class="py-3 px-6">Card Used</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(payment, index) in paymentHistory"
                    :key="payment.id"
                    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                  >
                    <td class="py-4 px-6">{{ payment.id }}</td>
                    <td class="py-4 px-6">{{ payment.date }}</td>
                    <td class="py-4 px-6">{{ payment.item }}</td>
                    <td class="py-4 px-6">$ {{ payment.amount }}</td>
                    <td class="py-4 px-6">{{ payment.status }}</td>
                    <td class="py-4 px-6">
                      **** **** **** {{ payment.cardLast4 }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Revenue Section -->
        <div v-if="activeTab === 'revenue'">
          <h2 class="text-xl font-semibold mb-4">Revenue</h2>
          <p class="text-gray-600">
            Track your earnings and withdrawal history.
          </p>
          <!-- Subtle Report Issue Button -->
          <div class="text-right mb-2">
            <button
              class="text-gray-600 hover:text-gray-800 text-sm py-1 px-3 border border-gray-300 rounded-lg hover:shadow"
            >
              Report an Issue
            </button>
          </div>
          <!-- Revenue History Table -->
          <div class="mt-6 overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th class="py-3 px-6">Date</th>
                  <th class="py-3 px-6">Item</th>
                  <th class="py-3 px-6">Type</th>
                  <th class="py-3 px-6">Status</th>
                  <th class="py-3 px-6">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(revenue, index) in revenueHistory"
                  :key="revenue.id"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                >
                  <td class="py-4 px-6">{{ revenue.date }}</td>
                  <td class="py-4 px-6">{{ revenue.item }}</td>
                  <td class="py-4 px-6">{{ revenue.type }}</td>
                  <td class="py-4 px-6">{{ revenue.status }}</td>
                  <td class="py-4 px-6">$ {{ revenue.amount }}</td>
                </tr>
              </tbody>
            </table>
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
      activeTab: 'personalInfo',
      isCreditCardModalOpen: false,
      newCreditCard: {},
      studentSettings: {
        emailNotifications: true,
      },
      creditCards: [
        {
          id: 1,
          last4Digits: '1234',
          expirationMonth: '08',
          expirationYear: '2023',
          cardholder: 'John Doe',
          type: 'Visa',
        },
        {
          id: 2,
          last4Digits: '5678',
          expirationMonth: '10',
          expirationYear: '2024',
          cardholder: 'John Doe',
          type: 'Mastercard',
        },
        {
          id: 3,
          last4Digits: '9012',
          expirationMonth: '12',
          expirationYear: '2025',
          cardholder: 'John Doe',
          type: 'American Express',
        },
      ],
      paymentHistory: [
        {
          id: 1,
          date: '2023-01-15',
          item: 'Course Subscription',
          amount: 100,
          status: 'Completed',
          cardLast4: '1234',
        },
        {
          id: 2,
          date: '2023-02-15',
          item: 'Course Materials',
          amount: 150,
          status: 'Completed',
          cardLast4: '5678',
        },
        {
          id: 3,
          date: '2023-03-15',
          item: 'Membership Renewal',
          amount: 200,
          status: 'Pending',
          cardLast4: '9012',
        },
        {
          id: 4,
          date: '2023-04-15',
          item: 'Webinar Entry',
          amount: 50,
          status: 'Completed',
          cardLast4: '1234',
        },
        {
          id: 5,
          date: '2023-05-15',
          item: 'E-book Purchase',
          amount: 30,
          status: 'Completed',
          cardLast4: '5678',
        },
      ],
      revenueHistory: [
        {
          id: 1,
          amount: 200,
          date: '2023-03-20',
          item: 'Enrollments / Engagement',
          type: 'Monthly Student Engagement Share',
          status: 'Scheduled',
          enrollments: 10,
          engagement: 80,
        },
        {
          id: 2,
          amount: 250,
          date: '2023-02-26',
          item: 'Introduction to AI - John Doe',
          type: 'Course Purchase',
          status: 'Complete',
          enrollments: 15,
          engagement: 90,
        },
        {
          id: 3,
          amount: 300,
          date: '2023-02-20',
          item: 'Enrollments / Engagement',
          type: 'Monthly Student Engagement Share',
          status: 'Complete',
          enrollments: 20,
          engagement: 70,
        },
      ],
    };
  },
  methods: {
    confirmDelete(cardId) {
      if (confirm('Are you sure you want to delete this credit card?')) {
        this.creditCards = this.creditCards.filter(
          (card) => card.id !== cardId
        );
      }
    },
    openCreditCardModal() {
      this.isCreditCardModalOpen = true;
    },
    addCard() {
      if (
        this.newCreditCard.cardholder &&
        this.newCreditCard.cardNumber &&
        this.newCreditCard.expirationDate &&
        this.newCreditCard.cvv &&
        this.newCreditCard.type
      ) {
        this.creditCards.push({
          id: this.creditCards.length + 1,
          last4Digits: this.newCreditCard.cardNumber.slice(-4),
          expirationMonth: this.newCreditCard.expirationDate.split('/')[0],
          expirationYear: this.newCreditCard.expirationDate.split('/')[1],
          cardholder: this.newCreditCard.cardholder,
          type: his.newCreditCard.type, // Replace with actual card type detection
        });
        this.isCreditCardModalOpen = false;
      } else {
        alert('Please fill out all fields.');
      }
    },
    toggleEngagementMethod(method) {
      const index = this.instructorSettings?.engagementMethods?.indexOf(method);
      if (index > -1) {
        this.instructorSettings?.engagementMethods?.splice(index, 1);
      } else {
        this.instructorSettings?.engagementMethods?.push(method);
      }
    },
    buttonClass(isActive) {
      return [
        'px-3 py-1 border rounded-lg transition',
        isActive
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      ];
    },
  },
};
</script>
