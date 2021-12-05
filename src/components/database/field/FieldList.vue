<template>
  <div class="field-list">
    <add-field-dialog 
      :show="showAddDialog"
      :documentId="documentId"
      :error="error"
      @ok="handleOk"
      @cancel="showAddDialog = false"
    />
    <field-row
      v-for="field of fields"
      :key="field._id"
      :field="field"
      @remove="removeField(field._id)"
    />    
  </div>
</template>

<script>
import AddFieldDialog from './AddFieldDialog';
import FieldRow from './FieldRow';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'field-list',
  components: {
    AddFieldDialog,
    FieldRow,
  },
  props: {
    documentId: {
      type: String,
      default: null,
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showAddDialog: false,
    };
  },
  computed: {
    ...mapGetters('fieldList', {
      error: 'getError',
    }),
  },
  methods: {
    ...mapActions('fieldList', {
      createField: 'create',
      deleteField: 'delete',
    }),
    addField() {
      this.showAddDialog = true;
    },
    async handleOk(field) {
      await this.createField({
        field,
        select: true,
      });
      if (!this.error) {
        this.showAddDialog = false;      
      }
    },
    removeField(fieldId) {
      this.deleteField(fieldId);
    },
  },
}
</script>

<style scoped>
</style>