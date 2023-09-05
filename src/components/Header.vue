<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between bg-white p-4 shadow-md"
  >
    <h1 class="text-xl font-semibold">SkillClimb</h1>
    <nav>
      <input
        type="text"
        placeholder="Search course..."
        class="mr-6 w-80 rounded-xl border p-2 px-4"
      />
      <a href="#" class="mx-2 rounded px-2 py-1 text-gray-700 hover:bg-gray-200"
        >Home</a
      >
      <a href="#" class="mx-2 rounded px-2 py-1 text-gray-700 hover:bg-gray-200"
        >Courses</a
      >
      <a href="#" class="mx-2 rounded px-2 py-1 text-gray-700 hover:bg-gray-200"
        >Certifications</a
      >
      <a href="#" class="mx-2 rounded px-2 py-1 text-gray-700 hover:bg-gray-200"
        >About</a
      >
      <button id="settingsBtn" class="ml-4 rounded-md bg-gray-200 p-2">
        <span class="material-icons">account_circle</span>
      </button>
    </nav>
  </header>
</template>
