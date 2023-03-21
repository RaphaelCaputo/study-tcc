<template>
  <div>
    <label :for="name" class="block px-4 mb-1 font-bold text-accent-base">{{
      label
    }}</label>
    <div
      class="flex flex-grow px-4 py-2 font-medium border-2 rounded-full bg-secondary border-primary text-accent-base"
    >
      <input
        :id="name"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        class="w-full outline-none bg-secondary"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'name',
    },
    label: {
      type: String,
      default: 'Label',
    },
    placeholder: {
      type: String,
      default: 'Placeholder',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
  },
}
</script>
