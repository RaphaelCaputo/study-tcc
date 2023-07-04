<template>
  <div
    class="flex flex-col max-h-full overflow-auto md:p-8 bg-secondary rounded-l-3xl"
  >
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
      <NuxtLink
        to="/materias/criar"
        class="px-4 py-2 ml-4 text-xl bg-accent-base text-primary rounded-xl"
      >
        +
      </NuxtLink>
    </form>

    <!-- Subjects Card -->
    <div
      class="flex-grow w-full p-2 mt-8 mb-24 overflow-y-auto text-accent-base md:mb-0"
    >
      <ul class="grid items-center w-full gap-4 md:grid-cols-2">
        <li v-for="subject in subjectList" :key="subject.objectID">
          <NuxtLink :to="`/materias/${subject.objectID}/capitulos`">
            <CardSubject
              :id="subject.objectID"
              :subject="subject.name"
              :category="subject.category"
            />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubjectsPage',
  computed: {
    subjectList() {
      return this.$store.state.subject.list
    },
  },
  async beforeMount() {
    try {
      const hasLength = this.$store.state.subject.list.length
      if (!hasLength) {
        const userId = this.$store.state.auth.user.objectID
        const response = await this.$dataApi.getSubjectByUserId(userId)
        if (response.ok)
          this.$store.commit('subject/createList', response.json.hits)
      }
    } catch (error) {
      console.error(error)
    }
  },
}
</script>
