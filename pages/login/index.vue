<template>
  <div>
    <form class="flex flex-col space-y-4" @submit.prevent="onSubmit">
      <a-input
        v-model="email"
        name="email"
        label="Email"
        type="email"
        placeholder="Digite o email de login"
      />
      <a-input
        v-model="senha"
        name="usuario"
        label="Senha"
        type="password"
        placeholder="Digite a senha"
      />
      <a-button name="Login" type="submit" />
    </form>
  </div>
</template>

<script>
import AButton from '~/components/atoms/AButton.vue'
import AInput from '~/components/atoms/AInput.vue'
export default {
  components: { AButton, AInput },
  layout: 'loginLayout',
  data() {
    return {
      email: '',
      senha: '',
    }
  },
  mounted() {
    this.email = ''
    this.senha = ''
  },
  methods: {
    onSubmit() {
      this.$auth.loginWith('auth0')
    },
  },
}
</script>
