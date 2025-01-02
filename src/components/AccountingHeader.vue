<script setup lang="ts">
defineProps<{
  entry: {
    date: string;
    description: string;
  };
}>();
</script>

<template>
  <div class="grid grid-cols-2 gap-4 mb-4">
    <div class="w-1/3">
      <label class="block text-sm font-medium text-gray-700">Date</label>
      <input
        type="date"
        v-model="entry.date"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Description</label>
      <input
        type="text"
        v-model="entry.description"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  </div>
</template>