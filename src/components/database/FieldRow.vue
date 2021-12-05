<template>
  <div class="project-row">
    <div class="project-left">
      <div class="project-button" />
      <div class="project-name">
        {{ field.name }}:
      </div>
      <div class="project-value">
        "{{ field.value }}"
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'field-row',
  props: {
    field: Object,
  },
}
</script>

<style scoped>
</style>