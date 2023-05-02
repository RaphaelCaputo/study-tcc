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
        @blur="$emit('blur', $event.target.value)"
      />
    </div>
    <div v-if="isValidation('required')" class="px-4">
      O campo {{ lowercaseLabel }} é obrigatório.
    </div>
    <div v-if="isValidation('email')" class="px-4">
      Deve ser um e-mail válido!
    </div>
    <div v-if="isValidation('minLength')" class="px-4">
      É preciso ter pelo menos
      {{ validation.$params.minLength.min }} caracteres.
    </div>
    <div v-if="isValidation('sameAsPassword')" class="px-4">
      As senhas devem ser idênticas.
    </div>
    <div v-if="isValidation('between')" class="px-4">
      Valor entre
      {{ validation.$params.between.min }} e
      {{ validation.$params.between.max }}.
    </div>
    <div v-if="isValidation('numeric')" class="px-4">
      Precisa ser um número.
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
    validation: {
      type: Object,
      required: true,
    },
  },
  computed: {
    lowercaseLabel() {
      return this.label.toLowerCase()
    },
  },
  methods: {
    isValidation(validationName) {
      if (validationName === 'sameAsPassword') {
        return (
          this.validation.$dirty &&
          this.validation.$params[validationName] &&
          !this.validation[validationName] &&
          this.validation.required
        )
      }
      return (
        this.validation.$dirty &&
        this.validation.$params[validationName] &&
        !this.validation[validationName]
      )
    },
  },
}
</script>
