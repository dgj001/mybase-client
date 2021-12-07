<template>
  <v-dialog
    v-model="showDialog"
    width="500"
    @click:outside="cancel"
  >
    <v-card>
      <v-card-title class="text-h5 primary white--text">
        Add a document
      </v-card-title>

      <v-card-text class="card-body">
        <div v-if="error" class="red--text">
          {{ error }}
        </div>
        <div class="mb-2">
          Document ID
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                mdi-help-rhombus-outline
              </v-icon>
            </template>
            <span>
              A collection must contain at least one document.<br>
              Documents store your data as fields.<br>
              Auto-generate a document ID or customize one if needed.
            </span>
          </v-tooltip>
        </div>
        <v-text-field 
          outlined 
          dense
          v-model="documentName"
        />
      </v-card-text>

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
          :disabled="saveDisabled"
          @click="ok"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'add-document-dialog',
  props: {
    show: Boolean,
    collectionId: String,
    error: String,
  },
  data() {
    return {
      showDialog: false,
      documentName: null,
    };
  },
  computed: {
    saveDisabled() {
      return !this.documentName || !this.documentName.length;
    },
  },
  watch: {
    show(newValue) {
      this.documentName = null;
      this.showDialog = newValue;
    },
  },
  methods: {
    ok() {
      const newDoc = {
        id: this.documentName,
        collectionId: this.collectionId,
      };
      this.$emit('ok', newDoc)
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