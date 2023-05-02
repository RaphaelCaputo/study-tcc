<template>
  <div
    class="w-full p-2 border-2 cursor-pointer rounded-xl bg-secondary border-primary"
  >
    <div class="px-4 py-4 rounded-xl bg-primary text-accent-base">
      <div class="flex items-center space-x-2">
        <Component :is="categoryIcon"></Component>
        <div>{{ subject }}</div>
      </div>
      <p class="mt-2 text-sm text-accent-light">
        0 Capítulos | 0 Horas estudadas
      </p>
    </div>
  </div>
</template>

<script>
import IconPencilRuler from './IconPencilRuler.vue'
import IconSearch from './IconSearch.vue'

export default {
  name: 'CardSubject',
  components: {
    IconPencilRuler,
    IconSearch,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      default: 'Math',
    },
    category: {
      type: String,
      default: 'math',
    },
  },
  computed: {
    categoryIcon() {
      return this.category === 'math' ? IconPencilRuler : IconSearch
    },
  },
}
</script>
