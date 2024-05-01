import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Task } from "@/types/Task";
import moment from "moment";

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref<Task[]>([]);
  try {
    tasks.value = JSON.parse(localStorage.getItem('tasks') as string) || [];
  } catch (error) {
    console.error('Failed to parse Todo from localStorage:', error);
  }

  function addTodo(task: Task) {
    tasks.value.push(task);
    tasks.value.sort((a, b) => new Date(b.created_at ?? "").getTime() - new Date(a.created_at ?? "").getTime());
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  }

  function editTodo(task: Task) {
    task.is_editing = !task.is_editing;
    watch(tasks, (newVal: any) => {
      localStorage.setItem('tasks', newVal)
    })

    watch(tasks, (newVal) => {
      localStorage.setItem('tasks', JSON.stringify(newVal))
    }, {
      deep: true
    })
  }

  const updateTodo = (task: Task) => {
    task.is_editing = false;
  }

  function deleteTodo(task: Task) {
    const index = tasks.value.indexOf(task);
    tasks.value.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  }

  function markAsComplete(task: Task) {
    task.is_completed = !task.is_completed;
    task.completed_at = task.is_completed ? moment().format('DD-MMM-YYYY') : '';
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  }

  return {
    tasks,
    updateTodo,
    addTodo,
    editTodo,
    deleteTodo,
    markAsComplete,

  }
});