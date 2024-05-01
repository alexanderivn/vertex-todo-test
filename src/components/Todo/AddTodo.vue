<template>
  <form class="flex flex-col gap-y-4 bg-pastel-purple p-8 rounded-2xl w-full ring-2 ring-neutral-950"
        @submit.prevent="addNewTodo">
    <section class="flex justify-between items-center mb-8">
      <section class="">
        <h1 class="font-black text-5xl">Hello, Ivan</h1>
        <p class="font-bold text-2xl">What would you like to do today?</p>
      </section>
      <section class="w-96">
        <TodoCharacter/>
      </section>
    </section>

    <input v-model="newTodo" class="py-2 pl-2 rounded-lg w-full text-2xl ring-2 ring-neutral-950"
           placeholder="Cook chicken soup for dinner"
           required type="text"
           @keyup.enter="addNewTodo">
    <input v-model="dueDate"
           :min="currentDate"
           class="px-2 py-2 rounded-lg w-full text-2xl ring-2 ring-neutral-950"
           max="2030-12-31"
           onblur="(this.type='text')"
           onfocus="(this.type='date')"
           placeholder="set due date"
           type="text">
    <button class="bg-pastel-yellow p-2 rounded-lg w-full text-2xl ring-2 ring-neutral-950">Add
      Todo
    </button>
  </form>
</template>

<script lang="ts" setup>
import {currentDate} from "@/utils/dateUtils";
import TodoCharacter from "@/components/illustrations/TodoCharacter.vue";
import {ref} from "vue";
import {generateRandomId} from "@/utils/randomIdGenerator";
import moment from "moment/moment";
import type {Todo} from "@/types/Todo";

// reactive variables to store the new todo and due date, then we pass it to the addNewTodo function
const newTodo = ref('')
const dueDate = ref('')

const props = defineProps<{
  todos: Todo[]
  addTodo: (task: Todo) => void
}>()

// push todo items to the store, by calling the store addTodo function
const addNewTodo = () => {
// simple validation, if the newTodo value is empty then dont add the todo
  if (newTodo.value) {
    props.addTodo({
      id: generateRandomId(), // using random id generator in utils to generate unique id for each todo,
      title: newTodo.value,
      due_date: dueDate.value ? moment(dueDate.value).format('YYYY-MM-DD') : "",
      is_completed: false,
      is_editing: false,
      created_at: moment().format('DD-MMMM-YYYY, h:mm:ss a'),
      completed_at: "",
    })
  }
  newTodo.value = ''
}

</script>

<style scoped></style>