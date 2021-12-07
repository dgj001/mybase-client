<template>
  <div class="field-list">
    <add-row
      label="Add field" 
      @click="addField"
      class="add-field" 
    />
    <field-row
      v-for="field of fields"
      :key="field._id"
      :field="field"
      @edit="(coords) => editField(field, coords)"
      @remove="removeField(field._id)"
    />
    <add-field-dialog 
      :show="showAddDialog"
      :documentId="documentId"
      :error="error"
      :field="fieldToEdit"
      :coords="coords"
      @ok="handleOk"
      @cancel="showAddDialog = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AddFieldDialog from './AddFieldDialog';
import AddRow from '../AddRow';
import FieldRow from './FieldRow';

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
      fieldToEdit: null,
      showAddDialog: false,
      coords: { x: 0, y: 0 },
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
      patchField: 'patch',
      deleteField: 'delete',
    }),
    addField(coords) {
      this.coords = coords;
      this.showAddDialog = true;
    },
    async handleOk(field) {
      if (this.fieldToEdit) {
        // editing
        this.patchField({
          fieldId: this.fieldToEdit._id,
          changes: field
        });
      } else {
        // creating
        await this.createField({
          field,
          select: true,
        });
      }
      if (!this.error) {
        this.showAddDialog = false;
        this.fieldToEdit = null;
      }
    },
    editField(field, coords) {
      this.fieldToEdit = field;
      this.coords = coords;
      this.showAddDialog = true;
    },
    removeField(fieldId) {
      this.deleteField(fieldId);
    },
  },
}
</script>

<style scoped>
</style>