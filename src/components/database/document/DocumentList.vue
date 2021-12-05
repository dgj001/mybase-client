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
    <add-document-dialog 
      :show="showAddDialog"
      :collectionId="collectionId"
      :error="error"
      @ok="handleOk"
      @cancel="showAddDialog = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AddDocumentDialog from './AddDocumentDialog';
import AddRow from '../AddRow';
import DocumentRow from './DocumentRow';

export default {
  name: 'document-list',
  components: {
    AddDocumentDialog,
    AddRow,
    DocumentRow,
  },
  props: {
    collectionId: {
      type: String,
      default: null,
    },
    documents: {
      type: Array,
      default: () => [],
    },
    isLastChild: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showAddDialog: false,
    }
  },
  computed: {
    ...mapGetters('documentList', {
      error: 'getError',
    })
  },
  methods: {
    ...mapActions('documentList', {
      createDocument: 'create',
    }),
    addDocument() {
      this.showAddDialog = true;
    },
    async handleOk(document) {
      await this.createDocument({
        document,
        select: true,
      });
      if (!this.error) {
        this.showAddDialog = false;      
      }
    }
  },
}
</script>

<style scoped>
</style>