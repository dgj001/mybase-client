<template>
  <div class="header-row" :class="{ 'upper-right-corner': isLastChild }">
    <div class="icon-and-text">
      <v-icon>mdi-file-document-outline</v-icon>
      <span>{{ documentName }}</span>
    </div>
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
        <v-list-item dense @click="deleteDocument">
          Delete document
        </v-list-item>
        <v-list-item dense @click="deleteFields">
          Delete document fields
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
    isLastChild: Boolean,
  },
  computed: {
    documentName() {
      return this.document ? this.document.id : null;
    },
  },
  methods: {
    deleteDocument() {
      this.$emit('remove', this.document);
    },
    deleteFields() {
      this.$emit('removeFields', this.document);
    },
  },
}
</script>

<style scoped>
.upper-right-corner {
  border-top-right-radius: 6px;
}
.v-list-item {
  cursor: pointer;
}
.v-list-item:hover {
  background-color: #ebebeb;
}
</style>