<template>
  <div
    class="flex min-w-full min-h-screen text-dark-fg bg-secondary md:p-0 md:bg-primary"
  >
    <SidebarNav class="md:min-h-screen" />
    <div class="p-4 st-container md:p-0">
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
.st-container {
  max-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
}
</style>
