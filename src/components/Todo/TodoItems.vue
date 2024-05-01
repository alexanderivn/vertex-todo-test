<template>
  <section class="rounded-2xl font-body">
    <section v-for="todo in props.todos" :key="todo.id">
      <section
          :class="todo.completed_at ? 'bg-pastel-green transition duration-500' : 'bg-pastel-blue'"
          class="relative my-2 p-8 rounded-2xl w-full text-neutral-950 transition duration-500 ring-2 ring-neutral-950">

        <transition-group>
          <section v-if="todo.is_editing" class="flex flex-col gap-y-2 text-black">
            <input v-model="todo.title"
                   class="py-2 pl-2 rounded-lg w-full text-2xl ring-2 ring-neutral-950"
                   type="text"
                   @keyup.enter="editTodo(todo)"
                   @keyup.esc="editTodo(todo)">
            <input v-model="todo.due_date" class="px-2 py-2 rounded-lg w-full text-2xl ring-2 ring-neutral-950"
                   max="2030-12-31"
                   onblur="(this.type='text')"
                   onfocus="(this.type='date')"
                   placeholder="set due date"
                   type="text">
            <button class="bg-pastel-pink mt-4 p-2 rounded-lg w-full text-2xl ring-2 ring-neutral-950"
                    @click="updateTodo(todo)">Done
            </button>
          </section>

          <section v-else>
            <section class="flex md:flex-row flex-col justify-between items-center gap-y-8 mb-8">
              <section class="flex flex-col space-y-4">
                <span class="text-neutral-500 text-xs">Created: {{ formatDate(todo.created_at) }}</span>
                <span v-if="todo.completed_at"
                      class="text-neutral-500 text-xs">Completed: {{ formatDate(todo.completed_at) }}</span>
                <span v-if="todo.due_date && !todo.is_completed"
                      class="bg-pastel-yellow px-4 py-1 rounded-lg w-fit text-xs ring-2 ring-neutral-950">
                  Due: {{ formatDate(todo.due_date) }}
                </span>
              </section>

              <section class="flex gap-x-4">
                <button class="bg-white p-2 rounded-lg" @click="editTodo(todo)">
                  <EditIcon height="1.5em" width="1.5em"/>
                </button>
                <button class="bg-pastel-green px-2 py-1 rounded-lg text-xs" @click="markAsComplete(todo)">
                  <CompleteIcon height="1.5em" width="1.5em"/>
                </button>
                <button class="bg-red-500 px-2 py-1 rounded-lg text-xs" @click="deleteTodo(todo)">
                  <DeleteIcon height="1.5em" width="1.5em"/>
                </button>
              </section>
            </section>
            <h5 class="font-bold break-all" @dblclick="editTodo(todo)">{{ todo.title }}</h5>
          </section>
        </transition-group>
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup>
import {useTodoStore} from "@/stores/todo";
import type {Todo} from "@/types/Todo";
import EditIcon from "@/components/icons/EditIcon.vue";
import CompleteIcon from "@/components/icons/CompleteIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import {formatDate} from "@/utils/dateUtils";

// we can use inject instead of props if this component is a child of another component to avoid prop drilling
const props = defineProps<{
  store: any,
  todos: Todo[]
}>()

// get the store
const {editTodo, deleteTodo, markAsComplete, updateTodo} = useTodoStore()

</script>

<style scoped></style>