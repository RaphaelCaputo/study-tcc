<template>
  <button
    :name="name"
    :type="type"
    class="px-10 py-4 mt-4 font-bold cursor-pointer bg-accent-base text-primary rounded-2xl"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
}
</script>
