<template>
  <div class="document-list">
    <add-row 
      label="Add document" 
      @click="addDocument"
    />
    <document-row 
      v-for="document of documents"
      :key="document._id"
      :document="document"
      :selected="document._id === selectedId"
      @select="selectDocument"
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
  },
  data() {
    return {
      selectedId: null,
    };
  },
  watch: {
    documents() {
      if (this.documents.length) {
        this.selectDocument(this.documents[0])
      }
    }
  },
  methods: {
    addDocument() {
      this.$emit('add');
    },
    selectDocument(document) {
      this.selectedId = document._id;
      this.$emit('select', document);
    }
  },
}
</script>

<style scoped>
@import './project.css';
</style>