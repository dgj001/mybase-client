<template>
  <v-dialog
    v-model="showDialog"
    width="500"
    @click:outside="cancel"
  >
    <v-card>
      <v-card-title class="text-h5 primary white--text">
        Add a field
      </v-card-title>

      <v-card-text class="card-body">
        <div v-if="error" class="red--text">
          {{ error }}
        </div>
        <div class="mb-2" />
        
        <v-text-field solo v-model="fieldName" />
        <v-text-field solo v-model="fieldValue" />
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="cancel"
        >
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
  </v-dialog>
</template>

<script>
export default {
  name: 'add-field-dialog',
  props: {
    show: Boolean,
    documentId: String,
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
  },
  methods: {
    add() {
      const newField = {
        documentId: this.documentId,
        name: this.fieldName,
        value: this.fieldValue,
      };
      this.$emit('ok', newField)
    },
    cancel() {
      this.$emit('cancel');
    },
  }
}
</script>

<style scoped>
.card-body {
  margin-top: 10px;
}
</style>