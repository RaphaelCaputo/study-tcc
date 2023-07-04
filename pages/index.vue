<template>
  <div
    class="flex flex-col items-center justify-center h-full md:p-4 bg-secondary rounded-l-3xl"
  >
    <h2>Home page!</h2>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'redirectToMaterias',
}
</script>
