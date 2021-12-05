<template>
  <div class="field-list">
    <add-row label="Add field" />
    <field-row
      v-for="field of fields"
      :key="field._id"
      :field="field"
    />
  </div>
</template>

<script>
import AddRow from './AddRow';
import FieldRow from './FieldRow';

export default {
  name: 'field-list',
  components: {
    AddRow,
    FieldRow,
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
  }
}
</script>

<style scoped>
</style>