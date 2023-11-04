<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">
        Choose Your Pricing Plan
      </h1>

      <!-- Responsive Grid -->
      <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Single Course Card -->
        <div
          class="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          <h2 class="text-2xl font-bold mb-4">Single Course Purchase</h2>
          <p class="text-lg text-gray-700 mb-6">Pay once, study forever.</p>

          <ul class="mb-6 space-y-3">
            <li>Full access to selected course</li>
            <li>Regular course updates</li>
            <li>
              <span class="text-green-500 font-bold">10 credits</span> for
              AI-generated content
            </li>
            <li>24/7 customer support</li>
          </ul>

          <div class="text-4xl font-bold mb-6">$199</div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Purchase Course
          </button>
        </div>

        <!-- Subscription Card -->
        <div
          class="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          <h2 class="text-2xl font-bold mb-4">Monthly Subscription</h2>
          <p class="text-lg text-gray-700 mb-6">
            Access all courses with one subscription.
          </p>

          <ul class="mb-6 space-y-3">
            <li>Unlimited access to all courses</li>
            <li>New courses every month</li>
            <li>
              <span class="text-green-500 font-bold">30 credits</span> for
              AI-generated content
            </li>
            <li>Priority 24/7 customer support</li>
            <li>Cancel anytime</li>
          </ul>

          <div class="text-4xl font-bold mb-6">$29.99/month</div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Subscribe Now
          </button>
        </div>
      </div>

      <!-- Credits Purchase Info -->
      <div
        class="mt-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg overflow-hidden w-full mx-auto py-2 lg:py-0 lg:w-2/3"
      >
        <div
          class="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between"
        >
          <!-- Left Content: Text & Icon -->
          <div
            class="flex items-start sm:items-center space-x-4 lg:space-x-6 text-center sm:text-left"
          >
            <!-- Icon: should remain a circle -->
            <div class="shrink-0">
              <div
                class="bg-white rounded-full p-3 lg:p-4 shadow-md inline-flex items-center justify-center"
              >
                <img
                  src="https://tailwindui.com/img/logos/workcation.svg"
                  alt="Credits Icon"
                  class="h-8 w-8"
                />
              </div>
            </div>

            <!-- Text -->
            <div class="flex-grow sm:mt-0 sm:ml-4">
              <p
                class="text-white text-xl lg:text-2xl font-semibold mb-2 leading-snug text-left"
              >
                Need more AI interaction credits?
              </p>
              <p class="text-blue-200 text-sm lg:text-base leading-relaxed text-left">
                Unlock more AI-generated content with our flexible credit packs.
              </p>
            </div>
          </div>

          <!-- Right Content: Button -->
          <div class="mt-5 sm:mt-0 flex justify-center">
            <button
              class="my-2 bg-white text-blue-600 font-semibold py-2 px-4 lg:px-5 rounded-full hover:bg-gray-100 hover:text-blue-700 transition duration-300 ease-in-out"
            >
              Buy Credits
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pricing',
  // any logic or data can be added here
};
</script>

<style scoped>
/* Any specific styling not covered by Tailwind can be added here */
</style>
