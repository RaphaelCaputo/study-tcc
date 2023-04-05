<template>
  <div class="flex flex-col min-h-screen p-4 text-dark-fg bg-secondary md:p-0">
    <HeaderNav />
    <div class="flex flex-col md:flex-row md:flex-grow">
      <SidebarNav />
      <div class="flex-grow md:bg-primary">
        <main class="min-h-full md:p-4 bg-secondary rounded-l-3xl">
          <Nuxt />
        </main>
      </div>
    </div>
    <FooterNav />
  </div>
</template>
<script>
export default {
  middleware: 'auth',
}
</script>
