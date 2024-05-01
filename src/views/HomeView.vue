<template>
  <section class="font-bold font-display">
    <section class="bg-pastel-bg py-8 p-0 min-h-screen">
      <section class="place-content-center mx-auto px-4 max-w-lg container">
        <AddTodo :addTodo="addTodo" :todos="todos"/>
        <TodoSummary :todos="todos"/>
        <TransitionGroup name="todo">
          <section v-if="todos.length <= 0" class="font-body text-center">
            <span>No task yet.. Add one now!</span>
            <EmptyTask/>
          </section>
          <TodoItems key="todo-items" :store="useTodoStore()" :todos="todos"/>
        </TransitionGroup>
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup>
import {useTodoStore} from "@/stores/todo";
import EmptyTask from "@/components/illustrations/EmptyTodo.vue";
import TodoItems from "@/components/Todo/TodoItems.vue";
import TodoSummary from "@/components/Todo/TodoSummary.vue";
import AddTodo from "@/components/Todo/AddTodo.vue";

// get the store
const {todos, addTodo} = useTodoStore()

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>