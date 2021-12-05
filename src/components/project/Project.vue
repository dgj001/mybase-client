<template>
  <div>
    <div class="grid-container">
      <collection-header />
      <document-header
        v-if="selectedDocument"
        :document="selectedDocument"
        @remove="removeDocument"
      />
      <document-list 
        :documents="documents"
        @add="showAddDialog = true"
        @select="selectDocument"
      />
      <field-list
        v-if="fields !== null"
        :fields="fields"      
      />
    </div>
    <add-document-dialog 
      :show="showAddDialog"
      :projectId="projectId"
      :error="error"
      @ok="addDocument"
      @cancel="showAddDialog = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AddDocumentDialog from './AddDocumentDialog';
import CollectionHeader from './CollectionHeader';
import DocumentHeader from './DocumentHeader';
import DocumentList from './DocumentList';
import FieldList from './FieldList';

export default {
  name: 'project',
  components: { 
    AddDocumentDialog,
    CollectionHeader,
    DocumentHeader,
    DocumentList,
    FieldList
  },
  data() {
    return {
      projectId: null,
      selectedDocument: null,
      showAddDialog: false,
    };
  },
  computed: {
    ...mapGetters('documentList', {
      documents: 'getList',
      error: 'getError',
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
      createDocument: 'create',
      deleteDocument: 'delete',
    }),
    ...mapActions('fieldList', {
      fetchFields: 'fetch',
    }),
    async addDocument(document) {
      await this.createDocument(document);
      if (!this.error) {
        this.showAddDialog = false;      
        this.selectDocument(document);
      }
    },
    removeDocument(document) {
      this.deleteDocument(document._id);
    },
    selectDocument(document) {
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