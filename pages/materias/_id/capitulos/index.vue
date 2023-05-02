<template>
  <div
    class="flex flex-col max-h-full overflow-auto md:p-8 bg-secondary rounded-l-3xl"
  >
    <form class="flex justify-between w-full">
      <div
        class="flex flex-grow px-4 py-2 font-medium border-2 rounded-full bg-secondary border-primary text-accent-base"
      >
        <input
          type="text"
          placeholder="search"
          class="w-full outline-none bg-secondary"
        />
        <IconSearch class="" />
      </div>
      <NuxtLink
        :to="`${$route.path}/criar`"
        class="px-4 py-2 ml-4 text-xl bg-accent-base text-primary rounded-xl"
      >
        +
      </NuxtLink>
    </form>

    <!-- Chapters Card -->
    <!-- <div
      class="flex-grow w-full p-2 mt-8 mb-24 overflow-y-auto text-accent-base md:mb-0"
    >
      <ul class="space-y-3">
        <li v-for="chapter in chapters" :key="chapter.objectID">
          <NuxtLink :to="`/materias/${chapter.objectID}`">
            <CardSubject
              :id="subject.objectID"
              :subject="subject.name"
              :category="subject.category"
            />
          </NuxtLink>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ChapterPage',
  // async asyncData({ params, $dataApi, error }) {
  //   const response = await $dataApi.getChaptersBySubjectId(params.id)
  //   if (!response.ok)
  //     return error({
  //       statusCode: response.status,
  //       message: response.statusText,
  //     })
  //   return {
  //     chapters: response.json,
  //   }
  // },
  computed: {},
}
</script>
