<template>
  <div class="grid-container">
    <database-header
      :is-first-child="true"
      :is-last-child="false"
      :project="project"
    />
    <collection-header
      :collection="selectedCollection"
      :is-last-child="false"
      @remove="removeCollection"
    />
    <document-header
      :document="selectedDocument"
      :is-last-child="true"
      @remove="removeDocument"
      @removeFields="removeFields"
    />
    <collection-list
      :project="project"
      :collections="collections"
      :is-last-child="!selectedCollection"
    />
    <document-list
      :collectionId="selectedCollection ? selectedCollection._id : null"
      :documents="documents"
      :is-last-child="!selectedDocument"
    />
    <field-list
      :documentId="selectedDocument ? selectedDocument._id : null"
      :fields="fields"
    />
    <confirm-dialog 
      :show="deleteFields.show"
      :title="deleteFields.title"
      :message="deleteFields.message"
      @confirm="confirmDeleteFields"
      @cancel="deleteFields.show = false;"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import CollectionHeader from './collection/CollectionHeader';
import CollectionList from './collection/CollectionList';
import ConfirmDialog from './ConfirmDialog';
import DatabaseHeader from './DatabaseHeader';
import DocumentHeader from './document/DocumentHeader';
import DocumentList from './document/DocumentList';
import FieldList from './field/FieldList';

export default {
  name: 'database',
  components: { 
    CollectionHeader,
    CollectionList,
    ConfirmDialog,
    DatabaseHeader,
    DocumentHeader,
    DocumentList,
    FieldList,
  },
  data() {
    return {
      deleteFields: {
        show: false,
        title: '',
        message: '',
        documentId: null,
      }
    };
  },
  computed: {
    ...mapGetters('project', {
      project: 'getProject',
    }),
    ...mapGetters('collectionList', {
      collections: 'getList',
      selectedCollectionId: 'getSelectedId',
    }),
    ...mapGetters('documentList', {
      documents: 'getList',
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
    const projectId = this.$route.params.id;
    this.fetchProject(projectId);
    this.fetchCollections(projectId);
  },
  methods: {
    ...mapActions('project', {
      fetchProject: 'fetch',
    }),
    ...mapActions('collectionList', {
      fetchCollections: 'fetch',
      deleteCollection: 'delete',
      selectCollection: 'select',
    }),
    ...mapActions('documentList', {
      fetchDocuments: 'fetch',
      deleteDocument: 'delete',
      selectDocument: 'select',
    }),
    ...mapActions('fieldList', {
      fetchFields: 'fetch',
      deleteAllFields: 'deleteAll',
    }),
    removeCollection(collection) {
      this.deleteCollection(collection._id);
    },
    removeDocument(document) {
      this.deleteDocument(document._id);
    },
    removeFields(document) {
      this.deleteFields.documentId = document._id;
      this.deleteFields.title = 'Delete all fields?';
      this.deleteFields.message = `Delete all fields in document ${document.id}?`;
      this.deleteFields.show = true;
    },
    confirmDeleteFields() {
      this.deleteFields.show = false;
      this.deleteAllFields(this.deleteFields.documentId);
    }
  }
}
</script>

<style scoped>
@import './database.css';
.grid-container {
  width: 100%;
  height: 100%;
  display: grid;
  background-color: white;
  grid-template-rows: auto 1fr;
  grid-template-columns: repeat(3, 1fr);
  box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.15);
  border-radius: 6px;
}
</style>