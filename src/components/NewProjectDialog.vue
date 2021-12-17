<template>
 <v-dialog
    v-model="showDialog"
    @input="handleInput"
  >
    <v-card>
      <v-card-title class="primary white--text">
        Create a project
      </v-card-title>

   </v-card>
   <v-card-actions>
     <v-spacer></v-spacer>
     
   </v-card-actions>
  </v-dialog>
</template>

<script>
export default {
  name: 'new-project-dialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showDialog: false,
      projectName: null,
    };
  },
  computed: {
    nameDisabled() {
      return false;
    },
  },
  watch: {
    show(newValue) {
     this.reset();
     this.showDialog = newValue;
   },
  },
  methods: {
    handleInput() {
      // click outside of dialog closing it
      this.$emit('cancel')
    },
    cancel() {
      this.$emit('cancel');
    },
    reset() {
      this.projectName = null;
    },
  },
}
</script>

<style scoped>

</style>