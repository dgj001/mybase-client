<template>
  <v-dialog
    v-model="showDialog"
    max-width="290"
    @input="handleInput"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ message }}
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
          color="red"          
          @click="confirm"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'confirm-dialog',
  props: {
    show: Boolean,
    title: String,
    message: String,
  },
  data() {
    return {
      showDialog: false,
    };
  },
  watch: {
    show(newValue) {
      this.showDialog = newValue;
    },
  },
  methods: {
    cancel() {
      this.showDialog = false;
      this.$emit('cancel')
    },
    confirm() {
      this.showDialog = false;
      this.$emit('confirm');
    },
    handleInput() {
      this.$emit('cancel')
    }
  },
}
</script>

<style>

</style>