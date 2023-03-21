<template>
  <div class="flex flex-col items-center justify-center">
    <form class="flex justify-between w-full">
      <div
        class="flex flex-grow px-4 py-2 font-medium border-2 rounded-full bg-secondary border-primary text-accent-base"
      >
        <input
          type="text"
          placeholder="search"
          class="w-full outline-none bg-secondary"
        />
        <IconSearch class="" />
      </div>
      <button
        type="button"
        class="px-4 py-2 ml-4 text-xl bg-accent-base text-primary rounded-xl"
      >
        +
      </button>
    </form>

    <!-- Subjects Card -->
    <div class="flex flex-col justify-center w-full pt-8 text-accent-base">
      <h2 class="mb-2 text-lg font-bold">Subjects</h2>
      <CardSubject category="Math" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubjectPage',
}
</script>
