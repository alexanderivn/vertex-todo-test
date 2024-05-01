<template>
  <section class="gap-2 sm:gap-8 grid grid-cols-3 my-8 font-body text-neutral-950">
    <span class="bg-pastel-blue px-2 py-1 rounded-lg text-center text-xs ring-2 ring-neutral-950">
      {{ props.todos.length }} {{ props.todos.length > 1 ? 'tasks' : 'task' }}
    </span>

    <span class="bg-pastel-green px-2 py-1 rounded-lg text-center text-xs ring-2 ring-neutral-950">
      {{ completedTodo.length }} completed
    </span>

    <span class="bg-pastel-light-yellow px-2 py-1 rounded-lg text-center text-xs ring-2 ring-neutral-950">
      {{ dueSoonTodo }} due soon
    </span>
  </section>
</template>

<script lang="ts" setup>
import {computed, defineProps} from 'vue';
import type {Todo} from "@/types/Todo";

const props = defineProps<{
  todos: Todo[]
}>()

// filter the completed task
const completedTodo = computed(() => {
  return props.todos.filter((task: any) => task.is_completed)
})

// filter the due soon todo using moment.js, if the due date is less than or equal to 3 days from today it will marked as due soon
const dueSoonTodo = computed(() => {
  return props.todos.filter((task: any) => {
    if (task.due_date) {
      const dueDate = new Date(task.due_date)
      const today = new Date()
      const diffTime = Math.abs(dueDate.getTime() - today.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 3
    }
  }).length
})

</script>

<style scoped></style>