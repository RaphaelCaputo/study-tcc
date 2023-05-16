<template>
  <div
    class="w-full p-2 border-2 cursor-pointer rounded-xl border-primary"
    :class="[currentChapter === id ? 'bg-accent-base' : 'bg-secondary']"
    @click="$emit('click', id)"
  >
    <div
      class="p-2 rounded-xl"
      :class="[
        currentChapter === id
          ? 'bg-accent-base text-primary'
          : 'bg-primary text-accent-base',
      ]"
    >
      <div class="flex items-center justify-between space-x-2">
        <h3>{{ name }}</h3>
        <NuxtLink :to="`${$route.path}/criar`">
          <EditSvg v-if="currentChapter === id" />
        </NuxtLink>
      </div>
      <p class="mt-2 text-sm text-accent-light">
        {{ questionsNumber }} Questões
      </p>
      <div class="flex items-center space-x-4">
        <div
          class="w-full h-2 rounded"
          :class="[currentChapter === id ? 'bg-accent-light' : 'bg-secondary']"
        >
          <div
            class="h-full rounded"
            :class="[currentChapter === id ? 'bg-primary' : 'bg-accent-base']"
            :style="{ width: percent + '%' }"
          ></div>
        </div>
        <div class="whitespace-nowrap">{{ percent }} %</div>
      </div>
      <div
        v-if="currentChapter === id"
        class="flex items-center mt-4 space-x-2"
        @click="toggleTimer"
      >
        <div
          class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-accent-base"
        >
          <PlaySvg v-if="!isPlay" class="w-6 h-6 ml-[1px]" />
          <PauseSvg v-else class="w-5 h-5" />
        </div>
        <div>00:00</div>
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
      isPlay: false,
    }
  },
  computed: {
    percent() {
      return (Number(this.correctAnswers) * 100) / Number(this.questionsNumber)
    },
    currentChapter() {
      return this.$store.state.chapter.currentChapter
    },
  },
  methods: {
    toggleTimer() {
      this.isPlay = !this.isPlay
      if (this.isPlay) {
        console.log('start Timer')
      }
    },
  },
}
</script>
