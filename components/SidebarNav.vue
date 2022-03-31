<template>
  <div class="flex flex-col justify-between w-20 bg-primary">
    <div class="flex justify-center items-center h-20 text-accent font-boldo">
      Logo
    </div>
    <div class="text-accent-light font-bold">
      <ul>
        <li class="hover:text-accent-base mb-10 cursor-pointer">
          <NuxtLink
            to="/"
            exact
            class="relative flex justify-center items-center h-14"
          >
            <div class="w-8">
              <HomeSvg />
            </div>
          </NuxtLink>
        </li>
        <li class="hover:text-accent-base mb-10 cursor-pointer">
          <NuxtLink
            to="/timer"
            class="relative flex justify-center items-center h-14"
          >
            <div class="w-8">
              <TimerSvg />
            </div>
          </NuxtLink>
        </li>
        <li class="hover:text-accent-base mb-10 cursor-pointer">
          <NuxtLink
            to="#"
            class="relative flex justify-center items-center h-14"
          >
            <div class="w-8">
              <BookSvg />
            </div>
          </NuxtLink>
        </li>
        <li class="hover:text-accent-base mb-10 cursor-pointer">
          <NuxtLink
            to="#"
            class="relative flex justify-center items-center h-14"
          >
            <div class="w-8">
              <StopWatch />
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div
      class="flex justify-center items-center h-20 text-accent-light font-bold"
    >
      <div
        class="flex justify-center items-center hover:text-accent-base h-14 cursor-pointer"
      >
        <div class="w-8">
          <SettingsSvg />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.nuxt-link-active {
  @apply text-accent-base;
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
</style>
