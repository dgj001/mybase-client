<template>
  <div class="field-list">
    <add-row 
      label="Add field"
      @click="addField"
    />
    <field-row
      v-for="field of fields"
      :key="field._id"
      :field="field"
    />    
    <add-field-dialog 
      :show="showAddDialog"
      :documentId="documentId"
      :error="error"
      @ok="handleOk"
      @cancel="showAddDialog = false"
    />
  </div>
</template>

<script>
import AddFieldDialog from './AddFieldDialog';
import AddRow from '../AddRow';
import FieldRow from './FieldRow';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'field-list',
  components: {
    AddFieldDialog,
    AddRow,
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
  },
}
</script>

<style scoped>
</style>