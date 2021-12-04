<template>
  <div class="container">
    <add-row label="Add document" />
    <document-row 
      v-for="document of documents"
      :key="document._id"
      :document="document"
    />
  </div>
</template>

<script>
import AddRow from './AddRow';
import DocumentRow from './DocumentRow';

export default {
  name: 'document-list',
  components: {
    AddRow,
    DocumentRow,
  },
  props: {
    documents: {
      type: Array,
      default: () => [],
    },
  }
}
</script>

<style scoped>
@import './project.css';
</style>