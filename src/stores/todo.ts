import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Todo } from "@/types/Todo";
import moment from "moment";

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);
  try {
    todos.value = JSON.parse(localStorage.getItem('todos') as string) || [];
  } catch (error) {
    console.error('Failed to parse Todo from localStorage:', error);
  }

  function addTodo(todo: Todo) {
    todos.value.push(todo);
    todos.value.sort((a, b) => new Date(b.created_at ?? "").getTime() - new Date(a.created_at ?? "").getTime());
    localStorage.setItem('todos', JSON.stringify(todos.value));
  }

  function editTodo(todo: Todo) {
    todo.is_editing = !todo.is_editing;
    watch(todos, (newVal: any) => {
      localStorage.setItem('todos', newVal)
    })

    watch(todos, (newVal) => {
      localStorage.setItem('todos', JSON.stringify(newVal))
    }, {
      deep: true
    })
  }

  const updateTodo = (todo: Todo) => {
    todo.is_editing = false;
  }

  function deleteTodo(todo: Todo) {
    const index = todos.value.indexOf(todo);
    todos.value.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos.value));
  }

  function markAsComplete(todo: Todo) {
    todo.is_completed = !todo.is_completed;
    todo.completed_at = todo.is_completed ? moment().format('DD-MMM-YYYY') : '';
    localStorage.setItem('todos', JSON.stringify(todos.value));
  }

  return {
    todos,
    updateTodo,
    addTodo,
    editTodo,
    deleteTodo,
    markAsComplete,

  }
});