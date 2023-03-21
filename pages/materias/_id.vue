<template>
  <div class="flex flex-col justify-center w-full pt-8 text-accent-base">
    <h2 class="mb-2 text-xl font-bold">{{ subject.name }}</h2>
    <h2 class="mb-2 text-lg font-bold">Questões</h2>
    <h2 class="mb-2 text-lg font-bold">Capítulos</h2>
  </div>
</template>
<script>
export default {
  name: 'MateriaPage',
  layout: 'clean',
  async asyncData({ params, $dataApi, error }) {
    const response = await $dataApi.getSubject(params.id)
    if (!response.ok)
      return error({
        statusCode: response.status,
        message: response.statusText,
      })
    return {
      subject: response.json,
    }
  },
  computed: {},
}
</script>
