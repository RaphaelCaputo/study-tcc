<template>
  <header
    class="relative flex items-center justify-center pt-4 pb-8 center md:h-16 text-accent-base md:bg-primary"
  >
    <div class="absolute left-0 text-xl font-bold">Logo</div>
    <h2 class="text-xl font-bold capitalize">{{ pageTitle }}</h2>
    <template v-if="$auth.loggedIn">
      <h2 class="text-xl font-bold capitalize">Logout</h2>
    </template>
    <template v-else>
      <a class="text-xl font-bold capitalize" @click="$auth.login()">Login</a>
    </template>
  </header>
</template>

<script>
export default {
  name: 'HeaderNav',
  computed: {
    pageTitle() {
      const split = this.$route.path.split('/')
      return split[split.length - 1]
    },
  },
  mounted() {
    console.log(this.$auth)
  },
  methods: {
    logOut() {
      this.$auth.logout()
    },
  },
}
</script>
