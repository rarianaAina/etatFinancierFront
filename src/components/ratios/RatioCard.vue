<script setup lang="ts">
defineProps<{
  title: string
  value: number
  threshold: number
  description: string
}>()

const getRatioStatus = (value: number, threshold: number) => {
  return value >= threshold ? 'text-green-600' : 'text-red-600'
}
</script>

<template>
  <div class="bg-gray-50 p-4 rounded-lg">
    <h3 class="text-lg font-semibold text-gray-700 mb-2">{{ title }}</h3>
    <div class="text-3xl font-bold" :class="getRatioStatus(value, threshold)">
      {{ value.toFixed(2) }}{{ title === 'ROE' || title === 'ROA' ? '%' : '' }}
    </div>
    <p class="text-sm text-gray-600 mt-2">{{ description }}</p>
  </div>
</template>