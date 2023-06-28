<template>
  <div>
    <form class="flex flex-col space-y-4" @submit.prevent="onSubmit">
      <a-input
        v-model="name"
        name="name"
        label="Nome"
        type="text"
        placeholder="Digite o nome"
        :validation="$v.name"
        @blur="$v.name.$touch()"
      />
      <a-input
        v-model="questionsNumber"
        name="questionsNumber"
        label="Total de questões"
        type="number"
        placeholder="Digite o número de questões"
        :validation="$v.questionsNumber"
        @blur="$v.questionsNumber.$touch()"
      />
      <a-input
        v-model="correctAnswers"
        name="correctAnswers"
        label="Total de acertos"
        type="number"
        placeholder="Digite o número de acertos"
        :validation="$v.correctAnswers"
        @blur="$v.correctAnswers.$touch()"
      />
      <a-input
        v-model="studyTime"
        name="studyTime"
        label="Tempo estudado (segundos)"
        type="number"
        placeholder="Digite o tempo estudado em segundos"
        :validation="$v.studyTime"
        @blur="$v.studyTime.$touch()"
      />
      <a-button name="Editar" type="submit" />
    </form>
  </div>
</template>

<script>
import { required, minLength, between, numeric } from 'vuelidate/lib/validators'
import AButton from '~/components/atoms/AButton.vue'
import AInput from '~/components/atoms/AInput.vue'
// import { unWrap } from '~/utils/fetchUtils'

export default {
  components: { AButton, AInput },
  // layout: 'clean',
  data() {
    return {
      name: '',
      questionsNumber: '',
      correctAnswers: '',
      studyTime: '',
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
    },
    questionsNumber: {
      numeric,
      between: between(0, 250),
    },
    correctAnswers: {
      numeric,
      between: between(0, 250),
    },
    studyTime: {
      numeric,
      between: between(0, 86400),
    },
  },
  computed: {
    currentChapter() {
      return this.$store.state.chapter.currentChapter
    },
  },
  mounted() {
    this.name = this.currentChapter.name
    this.questionsNumber = String(this.currentChapter.questionsNumber)
    this.correctAnswers = String(this.currentChapter.correctAnswers)
    this.studyTime = String(this.currentChapter.studyTime)
  },
  methods: {
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      const id = this.currentChapter.objectID
      const payload = {
        name: this.name,
        questionsNumber: this.questionsNumber,
        correctAnswers: this.correctAnswers,
        studyTime: this.studyTime,
        id,
        selectedChapter: true,
      }

      await this.$store.dispatch('chapter/updateChapterReq', payload)
      this.$router.push(`${this.$route.path.split('/editar')[0]}`)
    },
  },
}
</script>
