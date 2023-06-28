<template>
  <div
    class="container min-w-full min-h-screen p-4 text-dark-fg bg-secondary md:p-0 md:bg-primary"
  >
    <HeaderNav class="header" />
    <SidebarNav class="nav md:h-full" />
    <Nuxt class="main" />
    <FooterNav class="hidden footer md:block" />
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
  grid-template-areas:
    'header '
    'main '
    'nav ';
}

header {
  grid-area: header;
}

nav {
  grid-area: nav;
}

main {
  grid-area: main;
}

footer {
  grid-area: footer;
}

@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'header header'
      'nav main'
      'footer footer';
  }
}
</style>
