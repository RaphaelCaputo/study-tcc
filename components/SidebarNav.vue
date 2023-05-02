<template>
  <ul
    class="fixed flex justify-between px-6 py-4 font-bold rounded-full md:justify-center md:static md:flex-col md:rounded-none md:p-0 bottom-4 text-accent-light bg-primary"
  >
    <li class="cursor-pointer hover:text-accent-base md:w-20 md:mb-8">
      <NuxtLink
        to="/"
        exact
        class="relative flex items-center justify-center p-2"
      >
        <div class="w-8">
          <HomeSvg />
        </div>
      </NuxtLink>
    </li>
    <li class="cursor-pointer hover:text-accent-base md:w-20 md:mb-8">
      <NuxtLink
        to="/timer"
        class="relative flex items-center justify-center p-2"
      >
        <div class="w-8">
          <TimerSvg />
        </div>
      </NuxtLink>
    </li>
    <li class="cursor-pointer hover:text-accent-base md:w-20 md:mb-8">
      <NuxtLink
        to="/materias"
        class="relative flex items-center justify-center p-2"
      >
        <div class="w-8">
          <BookSvg />
        </div>
      </NuxtLink>
    </li>
    <li class="cursor-pointer hover:text-accent-base md:w-20 md:mb-8">
      <NuxtLink to="#" class="relative flex items-center justify-center p-2">
        <div class="w-8">
          <StopWatch />
        </div>
      </NuxtLink>
    </li>
    <li class="cursor-pointer hover:text-accent-base md:w-20 md:hidden">
      <NuxtLink to="#" class="relative flex items-center justify-center p-2">
        <div class="w-8">
          <SettingsSvg />
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
ul {
  width: calc(100% - 2rem);
}

.nuxt-link-active {
  @apply text-accent-base;
}

@media (min-width: 768px) {
  ul {
    width: 5rem;
  }
  .nuxt-link-active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-top-right-radius: 90% 15%;
    border-bottom-right-radius: 90% 15%;
    @apply h-full w-1 bg-accent-base;
  }
}
</style>
