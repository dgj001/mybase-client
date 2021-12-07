<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="false"
    :position-x="coords.x"
    :position-y="coords.y"
    @input="handleInput"
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
          {{ field ? 'Update' : 'Add'}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'field-dialog',
  props: {
    show: Boolean,
    documentId: String,
    field: Object,
    error: String,
    coords: Object,
  },
  data() {
    return {
      showMenu: false,
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
      this.showMenu = newValue;
      if (this.field) {
        this.fieldName = this.field.name;
        this.fieldValue = this.field.value;
      } else {
      this.fieldName = null;
      this.fieldValue = null;
      }
    },
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
    handleInput() {
      this.$emit('cancel');
    },
  },
}
</script>

<style scoped>
</style>