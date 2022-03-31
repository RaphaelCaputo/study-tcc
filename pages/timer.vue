<template>
  <div class="flex flex-col items-center justify-center">
    <h1>Timer page!</h1>
    <div
      class="relative flex items-center justify-center mt-20 border-8 rounded-full w-96 h-96"
    >
      <div class="absolute -top-20">
        <StopWatchTop class="w-24 h-24" />
      </div>
      <div class="absolute -top-4 left-64">
        <StopWatchSide class="w-10 h-10" />
      </div>
      <div>Random Text</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
