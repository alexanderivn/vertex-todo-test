<script lang="ts" setup>
const props = defineProps({
  width: {
    type: String,
    default: '1em',
  },
  height: {
    type: String,
    default: '1em',
  }
})
</script>

<template>
  <svg :height="props.height" :width="props.width" viewBox="0 0 50 50"
       xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
      <path d="M43.75 10.417L25 29.167l-8.333-8.334" stroke="black"/>
      <path
          d="M43.75 22.917v18.75a2.083 2.083 0 0 1-2.083 2.083H8.333a2.083 2.083 0 0 1-2.083-2.083V8.333A2.083 2.083 0 0 1 8.333 6.25h25"
          stroke="black"/>
    </g>
  </svg>

</template>

<style scoped>

</style>