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
        :to="`${$route.path}/criar`"
        class="px-4 py-2 ml-4 text-xl bg-accent-base text-primary rounded-xl"
      >
        +
      </NuxtLink>
    </form>

    <!-- Chapters Card -->
    <div
      class="flex-grow w-full p-2 mt-8 mb-24 overflow-y-auto text-accent-base md:mb-0"
    >
      <ul class="space-y-3">
        <li v-for="chapter in chapterList" :key="chapter.objectID">
          <CardChapter
            :id="chapter.objectID"
            :name="chapter.name"
            :questionsNumber="chapter.questionsNumber"
            :correctAnswers="chapter.correctAnswers"
            @click="selectChapter"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChapterPage',
  computed: {
    chapterList() {
      return this.$store.state.chapter.list
    },
    currentSubject() {
      return this.$store.state.subject.currentSubject
    },
  },
  async beforeMount() {
    try {
      const subjectId = this.$route.params.id
      const hasLength = this.$store.state.chapter.list.length
      if (!hasLength || this.currentSubject !== subjectId) {
        this.$store.commit('subject/setCurrentSubject', subjectId)

        const userId = this.$store.state.auth.user.objectID
        const response = await this.$dataApi.getChaptersBySubjectId(
          userId,
          subjectId
        )
        if (response.ok)
          this.$store.commit('chapter/createList', response.json.hits)
      }
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    selectChapter(id) {
      console.log('CHAPTER ID SELECT', id)
      this.$store.commit('chapter/setCurrentChapter', id)
    },
  },
}
</script>
