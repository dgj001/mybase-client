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
        :is-last-child="!selectedDocument"
        @add="showAddDialog = true"
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
      showAddDialog: false,
    };
  },
  computed: {
    ...mapGetters('documentList', {
      documents: 'getList',
      error: 'getError',
      selectedDocumentId: 'getSelectedId',
    }),
    ...mapGetters('fieldList', {
      fields: 'getList'
    }),
    selectedDocument() {
      return this.documents.find(d => d._id === this.selectedDocumentId);
    }
  },
  watch: {
    selectedDocument(newValue) {
      this.fetchFields({
        projectId: this.projectId,
        documentId: newValue._id
      });
    },
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
      selectDocument: 'selectDocument',
    }),
    ...mapActions('fieldList', {
      fetchFields: 'fetch',
    }),
    async addDocument(document) {
      await this.createDocument({
        document,
        select: true,
      });
      if (!this.error) {
        this.showAddDialog = false;      
      }
    },
    removeDocument(document) {
      this.deleteDocument(document._id);
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