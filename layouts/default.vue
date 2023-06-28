<template>
  <div
    class="flex min-w-full min-h-screen p-4 text-dark-fg bg-secondary md:p-0 md:bg-primary"
  >
    <SidebarNav class="md:min-h-screen" />
    <div class="container md:w-full">
      <HeaderNav class="flex" />
      <Nuxt class="main" />
      <FooterNav class="hidden footer md:block" />
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
}
</script>
<style lang="scss" scoped>
.container {
  max-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
}
</style>
