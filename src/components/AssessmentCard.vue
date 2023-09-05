<template>
  <div
    class="h-fit w-full rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
  >
    <h4 class="text-sm font-medium font-bold">Intent or Structure?</h4>
    <p class="text-xs my-2">
      Identify the location where suggestions fit the prompt best
    </p>
    <p class="text-xs font-bold">5 exercises</p>
    <p class="text-xs font-bold">10 mins</p>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>
