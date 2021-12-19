<template>
  <div class="db-header-row" :class="{ 'db-upper-right-corner': isLastChild }">
    <div class="db-icon-and-text">
      <v-icon>mdi-file-document-outline</v-icon>
      <span>{{ documentName }}</span>
    </div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item dense @click="removeDocument">
          Delete document
        </v-list-item>
        <v-list-item dense @click="removeFields">
          Delete document fields
        </v-list-item>
      </v-list>
    </v-menu>
    <confirm-dialog 
      :show="showDocumentConfirm"
      title="Delete document?"
      :message="`Delete document ${this.documentName} and all of its fields?`"
      @confirm="confirmRemoveDocument"
      @cancel="showDocumentConfirm = false"
    />
    <confirm-dialog 
      :show="showFieldsConfirm"
      title="Delete all fields?"
      :message="`Delete all fields in document ${this.documentName}?`"
      @confirm="confirmRemoveFields"
      @cancel="showFieldsConfirm = false"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import ConfirmDialog from '../ConfirmDialog';

export default {
  name: 'document-header',
  components: {
    ConfirmDialog,
  },
  props: {
    document: Object,
    isLastChild: Boolean,
  },
  data() {
    return {
      showDocumentConfirm: false,
      showFieldsConfirm: false,
    };
  },
  computed: {
    documentName() {
      return this.document ? this.document.id : null;
    },
  },
  methods: {
    ...mapActions('documentList', {
      deleteDocument: 'delete',
      selectDocument: 'select',
    }),
    ...mapActions('fieldList', {
      deleteAllFields: 'deleteAll',
    }),
    removeDocument() {
      this.showDocumentConfirm = true;
    },
    removeFields() {
      this.showFieldsConfirm = true;
    },
    confirmRemoveDocument() {
      this.showDocumentConfirm = false
      this.deleteDocument(this.document._id);
      this.selectDocument({ first: true });
    },
    confirmRemoveFields() {
      this.showFieldsConfirm = false;
      this.deleteAllFields(this.document._id);
    },
  },
}
</script>

<style scoped>
</style>