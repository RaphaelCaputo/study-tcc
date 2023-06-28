<template>
  <header
    class="relative flex items-center justify-center pt-4 pb-8 md:justify-start md:pt-8 md:pb-4 text-accent-base"
  >
    <template v-if="isRootPage">
      <div class="absolute left-0 text-xl font-bold md:hidden">Logo</div>
      <h2 class="text-xl font-bold capitalize md:hidden">{{ pageTitle }}</h2>
    </template>
    <template v-else>
      <div class="flex justify-between w-full">
        <NuxtLink :to="actionReturn" exact>
          <div class="mt-[2px] text-xl font-bold md:hidden">
            <ArrowLeftSvg />
          </div>
        </NuxtLink>
        <h2 class="text-xl font-bold capitalize md:hidden">{{ pageTitle }}</h2>
        <h2 class="hidden text-xl font-bold capitalize md:block">
          {{ pageTitle }}
        </h2>
        <div class="text-xl font-bold md:hidden">Logo</div>
      </div>
    </template>
    <!-- <template v-if="isLoggedIn">
      <h2 class="text-xl font-bold capitalize" @click="logout">
        Logout, {{ user.name }}
      </h2>
    </template>
    <template v-else>
      <h2 class="text-xl font-bold capitalize">Login</h2>
    </template> -->
  </header>
</template>

<script>
import jsCookie from 'js-cookie'

export default {
  name: 'HeaderNav',
  computed: {
    currentRoute() {
      return this.$route.path.split('/')
    },
    isRootPage() {
      return this.currentRoute.length <= 2
    },
    pageTitle() {
      const route = this.currentRoute[this.currentRoute.length - 1]
      const routeNames = {
        materias: 'matérias',
        capitulos: this.getSubjectPageTitle,
        criar: 'criar',
        editar: 'editar',
      }
      return routeNames[route]
    },
    actionReturn() {
      const route = this.currentRoute[this.currentRoute.length - 1]
      const action = this.currentRoute[this.currentRoute.length - 1]

      const routeNames = {
        capitulos: '/materias',
        criar: this.$route.path.split(action)[0],
        editar: this.$route.path.split(`/${action}`)[0],
      }
      return routeNames[route]
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    },
    user() {
      return this.$store.state.auth.user
    },
    currentSubject() {
      return this.$store.state.subject.currentSubject.objectID
    },
    getSubjectPageTitle() {
      return this.$store.getters['subject/getSubjectPageTitle']
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
