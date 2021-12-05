<template>
  <div class="document-list" :class="{ 'right-border': !isLastChild }">
    <add-row 
      label="Add document" 
      @click="addDocument"
    />
    <document-row 
      v-for="document of documents"
      :key="document._id"
      :document="document"
    />
  </div>
</template>

<script>
import AddRow from '../AddRow';
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
    isLastChild: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    addDocument() {
      this.$emit('add');
    },
  },
}
</script>

<style scoped>
</style>