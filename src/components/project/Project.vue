<template>
  <div class="data-container">
    <document-list 
      :documents="documents"
      @select="handleSelect"
    />
    <field-list :fields="fields" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import DocumentList from './DocumentList';
import FieldList from './FieldList';

export default {
  name: 'project',
  components: { 
    DocumentList ,
    FieldList,
  },
  data() {
    return {
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
    const projectId = this.$route.params.id;

    this.fetchDocuments(projectId);
    this.fetchFields(projectId);
  },
  methods: {
    ...mapActions('documentList', {
      fetchDocuments: 'fetch',
    }),
    ...mapActions('fieldList', {
      fetchFields: 'fetch',
    }),
    handleSelect(document) {
      console.log(document)
    },
  }
}
</script>

<style scoped>
.data-container {
  display: flex;
  box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.15);
  border-radius: 6px;
}
</style>