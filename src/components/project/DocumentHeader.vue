<template>
  <div class="header-row">
    {{ documentName }}
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item dense @click="handleListItemLClick">
          Delete document
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'document-header',
  props: {
    document: Object,
  },
  computed: {
    documentName() {
      return this.document ? this.document.id : null;
    },
  },
  methods: {
    handleListItemLClick() {
      this.$emit('remove', this.document);
    },
  }
}
</script>

<style scoped>
@import './project.css';

.v-list-item {
  cursor: pointer;
}

.v-list-item:hover {
  background-color: #ebebeb;
}
</style>