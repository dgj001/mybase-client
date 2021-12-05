<template>
  <div class="header-row" :class="{ 'right-border': !isLastChild }">
    {{ collectionName }}
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
          Delete collection
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'collection-header',
  props: {
    collection: Object,
    isLastChild: Boolean,
  },
  computed: {
    collectionName() {
      return this.collection ? this.collection.name : null;
    },
  },
  methods: {
    handleListItemLClick() {
      this.$emit('remove', this.collection);
    },
  },
}
</script>

<style scoped>

</style>