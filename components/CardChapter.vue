<template>
  <div
    class="w-full p-2 border-2 cursor-pointer rounded-xl border-primary"
    :class="[selectedChapter ? 'bg-accent-base' : 'bg-secondary']"
    @click="$emit('selectChapter', id)"
  >
    <div
      class="p-2 rounded-xl"
      :class="[
        selectedChapter
          ? 'bg-accent-base text-primary'
          : 'bg-primary text-accent-base',
      ]"
    >
      <div class="flex items-center justify-between space-x-2">
        <h3>{{ name }}</h3>
        <NuxtLink :to="`${$route.path}/editar`">
          <EditSvg v-if="selectedChapter" />
        </NuxtLink>
      </div>
      <p class="mt-2 text-sm text-accent-light">
        {{ questionsNumber }} Questões
      </p>
      <div class="flex items-center space-x-4">
        <div
          class="w-full h-2 rounded"
          :class="[selectedChapter ? 'bg-accent-light' : 'bg-secondary']"
        >
          <div
            class="h-full rounded"
            :class="[selectedChapter ? 'bg-primary' : 'bg-accent-base']"
            :style="{ width: percent + '%' }"
          ></div>
        </div>
        <div class="whitespace-nowrap">{{ percent }} %</div>
      </div>
      <div
        v-if="selectedChapter"
        class="flex items-center mt-4 space-x-2"
        @click="toggleTimer"
      >
        <div
          class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-accent-base"
        >
          <PlaySvg v-if="!isPlay" class="w-6 h-6 ml-[1px]" />
          <PauseSvg v-else class="w-5 h-5" />
        </div>
        <div>
          {{ formatTimer(Number(currentChapter.studyTime) + Number(counter)) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSubject',
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    questionsNumber: {
      type: String,
      required: true,
    },
    correctAnswers: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ticker: undefined,
      counter: 0,
      formattedTime: '00:00:00',
    }
  },
  computed: {
    percent() {
      return (
        (Number(this.correctAnswers) * 100) / Number(this.questionsNumber) || 0
      )
    },
    currentChapter() {
      return this.$store.state.chapter.currentChapter
    },
    selectedChapter() {
      return this.currentChapter
        ? this.currentChapter.objectID === this.id
        : false
    },
    isPlay() {
      return this.$store.state.chapter.isPlay
    },
    chapterTime() {
      return this.$store.state.chapter.chapterTime
    },
  },
  beforeDestroy() {
    this.$store.commit('chapter/setPlay', false)
  },
  methods: {
    toggleTimer() {
      if (!this.isPlay) {
        this.$store.commit('chapter/setPlay', true)
        this.startTimer()
      } else {
        this.$store.commit('chapter/setPlay', false)
        this.stopTimer()
      }
    },
    startTimer() {
      this.ticker = setInterval(() => {
        if (!this.isPlay) {
          clearInterval(this.ticker)
          this.updateChapter(this.counter, this.selectedChapter)
          this.$store.commit('chapter/setChapterTime', 0)
          this.counter = 0
          return
        }

        this.counter++
        this.$store.commit('chapter/setChapterTime', this.counter)
        this.formattedTime = this.formatTimer(
          Number(this.counter) + Number(this.currentChapter.studyTime)
        )
      }, 1000)
    },
    stopTimer() {
      this.$store.commit('chapter/setPlay', false)
    },
    formatTimer(time) {
      const hours = Math.floor(time / 3600)
      const minutes = Math.floor((time - hours * 3600) / 60)
      const seconds = time - hours * 3600 - minutes * 60

      const displaySeconds = seconds < 10 ? `0${seconds}` : seconds
      const displayMinutes = minutes < 10 ? `0${minutes}` : minutes
      const displayHours = hours < 10 ? `0${hours}` : hours

      return `${displayHours}:${displayMinutes}:${displaySeconds}`
    },
    async updateChapter(addTime, selectedChapter) {
      const payload = {
        id: this.id,
        selectedChapter,
        addTime,
      }
      await this.$store.dispatch('chapter/updateChapterReq', payload)
    },
  },
}
</script>
