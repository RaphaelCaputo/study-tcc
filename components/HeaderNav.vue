<template>
  <header
    class="relative flex items-center justify-center pt-4 pb-8 center md:h-16 text-accent-base md:bg-primary"
  >
    <div class="absolute left-0 text-xl font-bold">Logo</div>
    <h2 class="text-xl font-bold capitalize">{{ pageTitle }}</h2>
    <template v-if="isLoggedIn">
      <h2 class="text-xl font-bold capitalize" @click="logout">
        Logout, {{ user.name }}
      </h2>
    </template>
    <template v-else>
      <h2 class="text-xl font-bold capitalize">Login</h2>
    </template>
  </header>
</template>

<script>
import jsCookie from 'js-cookie'

export default {
  name: 'HeaderNav',
  computed: {
    pageTitle() {
      const split = this.$route.path.split('/')
      return split[split.length - 1]
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    },
    user() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    logout() {
      const authConfig = this.$config.auth
      jsCookie.remove(authConfig.cookieName)
      this.$store.commit('auth/user', null)
      this.$router.push('/login')
    },
  },
}
</script>
