<template>
  <div>
    <form class="flex flex-col space-y-4" @submit.prevent="onSubmit">
      <a-input
        v-model="email"
        name="email"
        label="Email"
        type="email"
        placeholder="Digite o email de login"
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
      <a-button name="Login" type="submit" />
    </form>
    <div class="flex justify-center mt-4 text-accent-light">
      <NuxtLink to="/registrar"
        >Não tem uma conta? Resgistre-se aqui.
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import jsCookie from 'js-cookie'
import { required, email } from 'vuelidate/lib/validators'
import AButton from '~/components/atoms/AButton.vue'
import AInput from '~/components/atoms/AInput.vue'

export default {
  components: { AButton, AInput },
  layout: 'loginLayout',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  mounted() {
    this.email = ''
    this.password = ''
  },
  methods: {
    async onSubmit() {
      try {
        this.$v.$touch()
        if (this.$v.$invalid) return

        const response = await fetch('/api/login', {
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

        if (response.ok) {
          const authConfig = this.$config.auth
          const json = await response.json()
          console.log(json)
          jsCookie.set(authConfig.cookieName, json.token, {
            expires: 1,
            sameSite: 'Lax',
          })
          this.$router.push('/')
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
