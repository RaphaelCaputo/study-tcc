<template>
  <div class="flex min-h-screen text-dark-fg">
    <SidebarNav />
    <div class="flex flex-col flex-grow">
      <HeaderNav />
      <div class="flex-grow bg-primary">
        <main class="min-h-full p-4 bg-secondary rounded-l-3xl">
          <Nuxt />
        </main>
      </div>
      <FooterNav />
    </div>
  </div>
</template>
