<template>
  <div class="text-center">
    <h1 class="text-lg font-bold">Error!</h1>
    <div>{{ error.message }} {{ error.statusCode }}</div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
