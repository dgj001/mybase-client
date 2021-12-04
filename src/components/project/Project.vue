<template>
  <div class="grid-container">
    <collection-header />
    <document-header
      v-if="selectedDocument"
      :document="selectedDocument"
    />
    <document-list 
      :documents="documents"
      @select="handleSelect"
    />
    <field-list
      v-if="fields !== null"
      :fields="fields"      
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import CollectionHeader from './CollectionHeader';
import DocumentHeader from './DocumentHeader';
import DocumentList from './DocumentList';
import FieldList from './FieldList';

export default {
  name: 'project',
  components: { 
    CollectionHeader,
    DocumentHeader,
    DocumentList,
    FieldList
  },
  data() {
    return {
      projectId: null,
      selectedDocument: null,
    };
  },
  computed: {
    ...mapGetters('documentList', {
      documents: 'getList',
    }),
    ...mapGetters('fieldList', {
      fields: 'getList'
    }),
  },
  mounted() {
    this.projectId = this.$route.params.id;
    this.fetchDocuments(this.projectId);
  },
  methods: {
    ...mapActions('documentList', {
      fetchDocuments: 'fetch',
    }),
    ...mapActions('fieldList', {
      fetchFields: 'fetch',
    }),
    handleSelect(document) {
      this.selectedDocument = document;
      this.fetchFields({
        projectId: this.projectId,
        documentId: document._id
      });
    },
  }
}
</script>

<style scoped>
.grid-container {
  width: 100%;
  display: grid;
    grid-template-columns: repeat(2, 1fr);
  box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.15);
  border-radius: 6px;
}
</style>