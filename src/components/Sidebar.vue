<template>
  <aside
    class="h-screen w-1/4 max-w-sm overflow-y-auto rounded bg-white p-4 shadow-md"
  >
    <h2 class="mb-4 text-center text-lg font-bold">Course Lessons</h2>

    <!-- Sidebar Video Lessons -->
    <a href="#" class="mt-5 block">
      <img
        src="https://via.placeholder.com/150"
        alt="Thumbnail"
        class="mr-2 inline-block h-12 w-16 rounded-md"
      />
      <div class="inline-block w-2/3">
        <p class="text-sm font-bold text-center">What is ChatGPT?</p>
        <p class="mb-0.5 ml-0.5 text-xs text-gray-400">5m 20s</p>
        <div class="relative h-4 w-full rounded-full bg-gray-200">
          <div
            class="absolute left-0 h-full rounded-full bg-green-400"
            style="width: 70%"
          ></div>
          <div
            class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-xs"
          >
            70%
          </div>
        </div>
      </div>
    </a>
    <a href="#" class="mt-5 block">
      <img
        src="https://via.placeholder.com/150"
        alt="Thumbnail"
        class="mr-2 inline-block h-12 w-16 rounded-md"
      />
      <div class="inline-block w-2/3">
        <p class="text-sm font-bold text-center">ChatGPT And The Job Market</p>
        <p class="mb-0.5 ml-0.5 text-xs text-gray-400">5m 20s</p>
        <div class="relative h-4 w-full rounded-full bg-gray-200">
          <div
            class="absolute left-0 h-full rounded-full bg-green-400"
            style="width: 0"
          ></div>
          <div
            class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-xs italic text-slate-600"
          >
            Not yet started
          </div>
        </div>
      </div>
    </a>

    <!-- ... More video lessons ... -->
  </aside>
</template>
