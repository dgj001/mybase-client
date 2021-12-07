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
      @edit="editField(field)"
      @remove="removeField(field._id)"
    />
    <v-menu
      v-model="showAddDialog"
      :close-on-content-click="false"
      :position-x="coords.x"
      :position-y="coords.y"
    >
      <v-card>
        <v-card-text>
          Testing 1, 2, 3
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="showAddDialog = false"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AddRow from '../AddRow';
import FieldRow from './FieldRow';

export default {
  name: 'field-list',
  components: {
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
      deleteField: 'delete',
    }),
    addField(coords) {
      console.log(coords)
      this.coords = coords;
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
    editField(field) {
      this.fieldToEdit = field;
    },
    removeField(fieldId) {
      this.deleteField(fieldId);
    },
  },
}
</script>

<style scoped>
</style>