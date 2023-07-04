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
      <ul class="grid items-center w-full gap-4 md:grid-cols-2">
        <li v-for="chapter in chapterList" :key="chapter.objectID">
          <CardChapter
            :id="chapter.objectID"
            :name="chapter.name"
            :questionsNumber="chapter.questionsNumber"
            :correctAnswers="chapter.correctAnswers"
            @selectChapter="selectChapter"
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
    subjectList() {
      return this.$store.state.subject.list
    },
    currentSubject() {
      return this.$store.state.subject.currentSubject
    },
    currentChapter() {
      return this.$store.state.chapter.currentChapter
    },
  },
  async beforeMount() {
    try {
      const subjectId = this.$route.params.id
      const hasLength = this.$store.state.chapter.list.length
      if (!hasLength || this.currentSubject.objectID !== subjectId) {
        this.$store.commit('subject/setCurrentSubject', {})
        this.$store.commit('chapter/createList', [])
        this.$store.commit('chapter/setCurrentChapter', {})

        const userId = this.$store.state.auth.user.objectID
        const getSubject = await this.$dataApi.getSubject(subjectId)
        const getChapters = await this.$dataApi.getChaptersBySubjectId(
          userId,
          subjectId
        )

        Promise.all([getChapters, getSubject]).then((response) => {
          if (response[1].ok)
            this.$store.commit('subject/setCurrentSubject', response[1].json)

          if (response[0].ok)
            this.$store.commit('chapter/createList', response[0].json.hits)
          this.$store.commit(
            'chapter/setCurrentChapter',
            response[0].json.hits[0]
          )
        })
      }
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    selectChapter(id) {
      if (this.currentChapter.objectID === id) return
      const chapter = this.chapterList.find(
        (chapter) => chapter.objectID === id
      )
      if (chapter) {
        this.$store.commit('chapter/setPlay', false)
        this.$store.commit('chapter/setCurrentChapter', chapter)
      }
    },
  },
}
</script>
