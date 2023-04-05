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
        v-model="email"
        name="email"
        label="E-mail"
        type="email"
        placeholder="Digite o seu email"
        :validation="$v.email"
        @blur="$v.email.$touch()"
      />
      <a-input
        v-model="password"
        name="password"
        label="Senha"
        type="password"
        placeholder="Digite a senha"
        :validation="$v.password"
        @blur="$v.password.$touch()"
      />
      <a-input
        v-model="confirmPassword"
        name="confirmPassword"
        label="Confirmar senha"
        type="password"
        placeholder="Confirme a senha"
        :validation="$v.confirmPassword"
        @blur="$v.confirmPassword.$touch()"
      />
      <a-button name="Register" type="submit" />
    </form>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import AButton from '~/components/atoms/AButton.vue'
import AInput from '~/components/atoms/AInput.vue'
// import { unWrap } from '~/utils/fetchUtils'

export default {
  components: { AButton, AInput },
  layout: 'loginLayout',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  mounted() {
    this.email = ''
    this.password = ''
    this.confirmPassword = ''
  },
  methods: {
    async onSubmit() {
      try {
        this.$v.$touch()
        if (this.$v.$invalid) return

        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('submit!')
        console.log('response', response)

        if (response.ok) {
          const json = await response.json()
          console.log('json', json)
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
