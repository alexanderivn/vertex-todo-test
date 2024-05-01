<template>
  <section class="rounded-2xl font-body">
    <section v-for="task in props.tasks" :key="task.id">
      <section
          :class="task.completed_at ? 'bg-pastel-green transition duration-500' : 'bg-pastel-blue'"
          class="relative my-2 p-8 rounded-2xl w-full text-neutral-950 transition duration-500 ring-2 ring-neutral-950">

        <transition-group>
          <section v-if="task.is_editing" class="flex flex-col gap-y-2 text-black">
            <input v-model="task.title"
                   class="py-2 pl-2 rounded-lg w-full text-2xl ring-2 ring-neutral-950"
                   type="text"
                   @keyup.enter="editTodo(task)"
                   @keyup.esc="editTodo(task)">
            <input v-model="task.due_date" class="px-2 py-2 rounded-lg w-full text-2xl ring-2 ring-neutral-950"
                   type="date">
            <button class="bg-pastel-pink mt-4 p-2 rounded-lg w-full text-2xl ring-2 ring-neutral-950"
                    @click="editTodo(task)">Done
            </button>
          </section>

          <section v-else>
            <section class="flex md:flex-row flex-col justify-between items-center gap-y-8 mb-8">
              <section class="flex flex-col space-y-4">
                <span class="text-neutral-500 text-xs">Created: {{ formatDate(task.created_at) }}</span>
                <span v-if="task.completed_at"
                      class="text-neutral-500 text-xs">Completed: {{ formatDate(task.completed_at) }}</span>
                <span v-if="task.due_date && !task.is_completed"
                      class="bg-pastel-yellow px-4 py-1 rounded-lg w-fit text-xs ring-2 ring-neutral-950">
                  Due: {{ formatDate(task.due_date) }}
                </span>
              </section>

              <section class="flex gap-x-4">
                <button class="bg-white p-2 rounded-lg" @click="editTodo(task)">
                  <EditIcon height="1.5em" width="1.5em"/>
                </button>
                <button class="bg-pastel-tasks-completed px-2 py-1 rounded-lg text-xs" @click="markAsComplete(task)">
                  <CompleteIcon height="1.5em" width="1.5em"/>
                </button>
                <button class="bg-red-500 px-2 py-1 rounded-lg text-xs" @click="deleteTodo(task)">
                  <DeleteIcon height="1.5em" width="1.5em"/>
                </button>
              </section>
            </section>
            <h5 class="font-bold break-all" @dblclick="editTodo(task)">{{ task.title }}</h5>
          </section>
        </transition-group>
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup>
import {useTodoStore} from "@/stores/todo";
import type {Task} from "@/types/Task";
import EditIcon from "@/components/icons/EditIcon.vue";
import CompleteIcon from "@/components/icons/CompleteIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import {formatDate} from "@/utils/dateUtils";

// we can use inject instead of props if this component is a child of another component to avoid prop drilling
const props = defineProps<{
  store: any,
  tasks: Task[]
}>()

// get the store
const {editTodo, deleteTodo, markAsComplete} = useTodoStore()

</script>

<style scoped></style>