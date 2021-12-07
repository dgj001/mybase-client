<template>
  <v-menu
    v-model="showDialog"
    :close-on-content-click="false"
    :attach="'#attachMenu'"
  >
    <v-card>
      <v-card-text>
        <div v-if="error" class="red--text">
          {{ error }}
        </div>
        <div class="mb-2" />
        <table>
          <tr>
            <td>
              <div class="mb-2">Field</div>
            </td>
            <td>
              <div class="mb-2">Value</div>
            </td>
          </tr>
          <tr>
            <td>
              <v-text-field 
                outlined 
                dense 
                v-model="fieldName"
                hide-details
                style="padding-right: 10px"
              />
            </td>
            <td>
              <v-text-field 
                outlined 
                dense
                hide-details
                v-model="fieldValue" 
              />
            </td>
          </tr>
        </table>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          :disabled="addDisabled"
          @click="add"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'add-field-dialog',
  props: {
    show: Boolean,
    documentId: String,
    field: Object,
    error: String,
  },
  data() {
    return {
      showDialog: false,
      fieldName: null,
      fieldValue: null,
    };
  },
  computed: {
    addDisabled() {
      return !this.fieldName || !this.fieldName.length;
    },
  },
  watch: {
    show(newValue) {
      this.fieldName = null;
      this.fieldValue = null;
      this.showDialog = newValue;
    },
    field(newValue) {
      this.fieldName = newValue.name;
      this.fieldValue = newValue.value;
    }
  },
  methods: {
    add() {
      const newField = {
        documentId: this.documentId,
        name: this.fieldName,
        value: this.fieldValue,
      };
      this.$emit('ok', newField);
    },
    cancel() {
      this.$emit('cancel');
    },
  }
}
</script>

<style scoped>
</style>