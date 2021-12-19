<template>
  <v-card
    class="mb-5 full-height"
    elevation="4"
    width="300px"
    height="210px"
    @click="open"
  >
    <v-card-text class="full-height pa-2 d-flex flex-column">
      <v-spacer></v-spacer>
      <div class="mx-auto d-flex flex-column">
        <v-icon large>mdi-plus</v-icon>
        Add project
      </div>
      <v-spacer></v-spacer>    
    </v-card-text>
    <new-project-dialog
      :show="showNewDialog"
      @cancel="showNewDialog = false"
    />
  </v-card>
</template>

<script>
import NewProjectDialog from './NewProjectDialog';

export default {
  name: 'new-project-card',
  components: {
    NewProjectDialog,
  },
  data() {
    return {
      showNewDialog: false,
    };
  },
  methods: {
    open() {
      this.showNewDialog = true;
    },
  },
}
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>