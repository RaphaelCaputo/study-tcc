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
        v-model="color"
        name="color"
        label="Cor"
        type="color"
        placeholder="Escolha uma Cor"
        :validation="$v.color"
        @blur="$v.color.$touch()"
      />
      <a-button name="Register" type="submit" />
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import AButton from '~/components/atoms/AButton.vue'
import AInput from '~/components/atoms/AInput.vue'
// import { unWrap } from '~/utils/fetchUtils'

export default {
  components: { AButton, AInput },
  data() {
    return {
      name: '',
      color: '',
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
    },
    color: {
      required,
    },
  },
  mounted() {
    this.name = ''
    this.color = ''
  },
  methods: {
    async onSubmit() {
      // TODO: make preset color instead of color picker on of each HSL intersection and pure color
      try {
        this.$v.$touch()
        if (this.$v.$invalid) return

        const payload = {
          name: this.name,
          color: this.color,
          userId: this.$store.state.auth.user.objectID,
          createdAt: new Date().toISOString(),
        }
        const response = await fetch('/api/subject', {
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
          const addedSubject = {
            objectID: json.objectID,
            ...payload,
          }
          this.$store.commit('subject/addOneToList', addedSubject)
          console.log('json', json)
          console.log('addedSub', addedSubject)
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
