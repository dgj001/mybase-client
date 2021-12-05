<template>
  <div>
    <div class="grid-container">
      <project-header />
      <collection-header
        :collection="selectedCollection"
        @remove="removeCollection"
      />
      <document-header
        :document="selectedDocument"
        @remove="removeDocument"
      />
      <collection-list
        :collections="collections"
        :is-last-child="!selectedCollection"
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
      :collectionId="selectedCollection ? selectedCollection._id : null"
      :error="documentError"
      @ok="addDocument"
      @cancel="showAddDialog = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AddDocumentDialog from './AddDocumentDialog';
import CollectionHeader from './CollectionHeader';
import CollectionList from './CollectionList';
import DocumentHeader from './DocumentHeader';
import DocumentList from './DocumentList';
import FieldList from './FieldList';
import ProjectHeader from './ProjectHeader';

export default {
  name: 'project',
  components: { 
    AddDocumentDialog,
    CollectionHeader,
    CollectionList,
    DocumentHeader,
    DocumentList,
    FieldList,
    ProjectHeader,
  },
  data() {
    return {
      projectId: null,
      showAddDialog: false,
    };
  },
  computed: {
    ...mapGetters('collectionList', {
      collections: 'getList',
      selectedCollectionId: 'getSelectedId',
    }),
    ...mapGetters('documentList', {
      documents: 'getList',
      documentError: 'getError',
      selectedDocumentId: 'getSelectedId',
    }),
    ...mapGetters('fieldList', {
      fields: 'getList'
    }),
    selectedCollection() {
      return this.collections.find(c => c._id === this.selectedCollectionId);
    },
    selectedDocument() {
      return this.documents.find(d => d._id === this.selectedDocumentId);
    }
  },
  watch: {
    selectedCollection(newValue) {
      if (!newValue) return;
      this.fetchDocuments({
        collectionId: newValue._id,
      });
    },
    selectedDocument(newValue) {
      if (!newValue) return;
      this.fetchFields({
        documentId: newValue._id
      });
    },
  },
  mounted() {
    this.projectId = this.$route.params.id;
    this.fetchCollections(this.projectId);
  },
  methods: {
    ...mapActions('collectionList', {
      fetchCollections: 'fetch',
      deleteCollection: 'delete',
      selectCollection: 'select',
    }),
    ...mapActions('documentList', {
      fetchDocuments: 'fetch',
      createDocument: 'create',
      deleteDocument: 'delete',
      selectDocument: 'select',
    }),
    ...mapActions('fieldList', {
      fetchFields: 'fetch',
    }),
    removeCollection(collection) {
      this.deleteCollection(collection._id);
    },
    async addDocument(document) {
      await this.createDocument({
        document,
        select: true,
      });
      if (!this.documentError) {
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
    grid-template-columns: repeat(3, 1fr);
  box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.15);
  border-radius: 6px;
}
</style>