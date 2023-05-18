<template>
  <div>
    <form class="flex flex-col space-y-4" @submit.prevent="onSubmit">
      <a-input
        v-model="name"
        name="name"
        label="Nome"
        type="text"
        placeholder="Digite o seu nome"
        :validation="$v.name"
        @blur="$v.name.$touch()"
      />
      <a-input
        v-model="questionsNumber"
        name="questionsNumber"
        label="Total de questões"
        type="number"
        placeholder="Digite o seu nome"
        :validation="$v.questionsNumber"
        @blur="$v.questionsNumber.$touch()"
      />
      <a-input
        v-model="correctAnswers"
        name="correctAnswers"
        label="Total de acertos"
        type="number"
        placeholder="Digite o seu nome"
        :validation="$v.correctAnswers"
        @blur="$v.correctAnswers.$touch()"
      />
      <a-button name="Register" type="submit" />
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
  data() {
    return {
      name: '',
      questionsNumber: '',
      correctAnswers: '',
      // checkbox "estudado"
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
  },
  mounted() {
    this.name = ''
    this.questionsNumber = '0'
    this.correctAnswers = '0'
  },
  methods: {
    async onSubmit() {
      // TODO: make preset color instead of color picker on of each HSL intersection and pure color
      try {
        this.$v.$touch()
        if (this.$v.$invalid) return

        const subjectId = this.$route.params.id
        const payload = {
          name: this.name,
          questionsNumber: this.questionsNumber,
          correctAnswers: this.correctAnswers,
          userId: this.$store.state.auth.user.objectID,
          subjectId,
          createdAt: new Date().toISOString(),
          studyTime: 0,
        }
        const response = await fetch('/api/chapter', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('submit!')
        console.log('response', response)

        if (response.ok) {
          const json = await response.json()
          const addedChapter = {
            objectID: json.objectID,
            ...payload,
          }
          this.$store.commit('chapter/addOneToList', addedChapter)
          console.log('json', json)
          console.log('addedChapter', addedChapter)
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
